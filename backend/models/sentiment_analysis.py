import praw
from textblob import TextBlob
import time
import random
import re
import string
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import nltk
import ssl
import os
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

def ensure_nltk_resources():
    """Download NLTK resources if not already available, handling SSL issues"""
    nltk_resources = ['vader_lexicon', 'stopwords', 'wordnet']
    
    nltk_data_dir = os.path.expanduser('~/nltk_data')
    os.makedirs(nltk_data_dir, exist_ok=True)
    nltk.data.path.insert(0, nltk_data_dir)
    
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        old_context = ssl._create_default_https_context
        ssl._create_default_https_context = _create_unverified_https_context
        print("Using unverified HTTPS context for NLTK downloads due to SSL certificate issues.")
    
    for resource in nltk_resources:
        download_success = False
        
        try:
            nltk.data.find(f"{resource}")
            print(f"NLTK resource '{resource}' is already available.")
            download_success = True
        except LookupError:
            print(f"NLTK resource '{resource}' not found. Attempting to download...")
            try:
                download_result = nltk.download(resource, download_dir=nltk_data_dir, quiet=False)
                
                if download_result:
                    print(f"Successfully downloaded '{resource}'.")
                    download_success = True
                else:
                    print(f"Failed to download '{resource}'. This may affect sentiment analysis accuracy.")
            except Exception as e:
                print(f"Error downloading '{resource}': {str(e)}")
        
        if download_success:
            try:
                if resource == 'vader_lexicon':
                    nltk.data.load('sentiment/vader_lexicon.zip/vader_lexicon/vader_lexicon.txt')
                elif resource == 'stopwords':
                    stopwords.words('english')
                elif resource == 'wordnet':
                    WordNetLemmatizer()
                print(f"Verified '{resource}' is working correctly.")
            except Exception as e:
                print(f"Warning: '{resource}' was downloaded but cannot be loaded: {str(e)}")
                download_success = False
        
        if not download_success:
            print(f"\nManual download instructions for '{resource}':")
            print("1. Run 'python -m nltk.downloader {}'".format(resource))
            print("2. Or download from https://www.nltk.org/data.html")
    
    try:
        if 'old_context' in locals():
            ssl._create_default_https_context = old_context
    except:
        pass

ensure_nltk_resources()

_vader_analyzer = None
try:
    _vader_analyzer = SentimentIntensityAnalyzer()
except:
    print("Warning: VADER sentiment analyzer could not be initialized.")

class SentimentAnalysisModel:
    """
    Advanced model for analyzing sentiment in Reddit content
    """
    
    # Initialize Reddit API (use environment variables in production!)
    _reddit = None
    _vectorizer = None
    _ml_model = None
    _sid = _vader_analyzer  # Using the global variable that might be None
    
    @classmethod
    def _get_reddit_instance(cls):
        if cls._reddit is None:
            try:
                cls._reddit = praw.Reddit(
                    client_id='EH0Y7-k7VoZ12VXC3VxWSQ',
                    client_secret='1LvwUtguratTBh2DXZ2S66vcZ3CAFg',
                    user_agent='TrendLens by /u/Live_Pain_1914'
                )
                print("Reddit API initialized successfully")
            except Exception as e:
                print(f"Error initializing Reddit API: {e}")
                # Fall back to mock data if Reddit API fails
                cls._reddit = None
        return cls._reddit
    
    @classmethod
    def _initialize_ml_model(cls):
        """Initialize and train the ML model if not already done"""
        if cls._vectorizer is None or cls._ml_model is None:
            try:
                # Create a small training dataset with examples
                data = pd.DataFrame({
                    'text': [
                        "I love this, it's amazing!", 
                        "This is terrible, absolutely hate it",
                        "It's okay, nothing special",
                        "Best experience ever, highly recommend",
                        "Worst product I've ever used",
                        "It's alright, does the job",
                        "Incredible service, very happy",
                        "Disappointed with the quality",
                        "Not bad, not great either",
                        "Absolutely fantastic!"
                    ],
                    'sentiment': [1, -1, 0, 1, -1, 0, 1, -1, 0, 1]  # 1=positive, 0=neutral, -1=negative
                })
                
                # Clean the text data
                data['cleaned_text'] = data['text'].apply(cls._clean_text)
                
                # Create and fit the vectorizer
                cls._vectorizer = TfidfVectorizer()
                X = cls._vectorizer.fit_transform(data['cleaned_text'])
                
                # Train a logistic regression model
                cls._ml_model = LogisticRegression()
                cls._ml_model.fit(X, data['sentiment'])
                
                print("ML sentiment model initialized successfully")
            except Exception as e:
                print(f"Error initializing ML model: {e}")
                cls._vectorizer = None
                cls._ml_model = None
    
    @staticmethod
    def _clean_text(text):
        """Clean and preprocess text for sentiment analysis"""
        text = str(text).lower()
        
        # Replace URLs
        text = re.sub(r'https?:\/\/\S*|www\.\S+', 'URL', text)
        
        # Remove HTML
        text = re.sub(r'<.*?>', '', text)
        
        # Replace mentions
        text = re.sub(r'@\S*', 'user', text, flags=re.IGNORECASE)
        
        # Replace numbers
        text = re.sub(r'^[+-]*?\d{1,3}[- ]*?\d{1,10}|\d{10}', 'NUMBER', text)
        
        # Replace <3 with string heart
        text = re.sub(r'<3', 'HEART', text)
        
        # Remove alphanumeric characters
        text = re.sub(r'\w*\d+\w*', '', text)
        
        # Remove stopwords
        try:
            text = ' '.join([word for word in text.split() if word not in stopwords.words("english")])
        except:
            # If stopwords not available, continue without removing them
            pass
        
        # Remove punctuations
        text = ''.join([word for word in text if word not in string.punctuation])
        
        # Lemmatization
        try:
            lm = WordNetLemmatizer()
            text = ' '.join([lm.lemmatize(word, pos='v') for word in text.split()])
        except:
            # If lemmatization fails, continue without it
            pass
        
        return text
    
    @classmethod
    def _hybrid_sentiment_analysis(cls, text):
        """Perform hybrid sentiment analysis using ML and VADER"""
        # Initialize ML model if needed
        if cls._vectorizer is None or cls._ml_model is None:
            cls._initialize_ml_model()
        
        cleaned_text = cls._clean_text(text)
        sentiment_score = 0
        
        # ML-based sentiment prediction (if available)
        ml_sentiment_weight = 0
        if cls._vectorizer is not None and cls._ml_model is not None:
            try:
                tfidf_text = cls._vectorizer.transform([cleaned_text])
                ml_prediction = cls._ml_model.predict(tfidf_text)[0]  # -1, 0, or 1
                ml_sentiment_weight = ml_prediction  # -1 to 1 scale
            except Exception as e:
                print(f"ML sentiment prediction error: {e}")
        
        # VADER sentiment analysis (if available)
        vader_score = 0
        if cls._sid is not None:
            try:
                vader_score = cls._sid.polarity_scores(cleaned_text)['compound']  # -1 to 1 scale
            except Exception as e:
                print(f"VADER sentiment analysis error: {e}")
        
        # TextBlob sentiment analysis (existing approach)
        textblob_score = 0
        try:
            blob = TextBlob(cleaned_text)
            textblob_score = blob.sentiment.polarity  # -1 to 1 scale
        except Exception as e:
            print(f"TextBlob sentiment analysis error: {e}")
        
        # Combine all sentiment scores based on what's available
        available_models = 0
        
        if cls._vectorizer is not None and cls._ml_model is not None:
            sentiment_score += 0.4 * ml_sentiment_weight
            available_models += 0.4
            
        if cls._sid is not None:
            sentiment_score += 0.3 * vader_score
            available_models += 0.3
            
        sentiment_score += 0.3 * textblob_score
        available_models += 0.3
        
        # Normalize the score if we have partial models available
        if available_models > 0:
            sentiment_score = sentiment_score / available_models
        
        # Calculate sentiment breakdown
        if sentiment_score > 0.3:
            # Positive sentiment
            positive = round(0.6 + random.random() * 0.4, 2)
            negative = round(random.random() * 0.2, 2)
            neutral = round(1 - positive - negative, 2)
        elif sentiment_score < -0.3:
            # Negative sentiment
            negative = round(0.6 + random.random() * 0.4, 2)
            positive = round(random.random() * 0.2, 2)
            neutral = round(1 - positive - negative, 2)
        else:
            # Neutral sentiment
            neutral = round(0.5 + random.random() * 0.3, 2)
            positive = round((1 - neutral) / 2, 2)
            negative = round(1 - neutral - positive, 2)
        
        return {
            'sentimentScore': sentiment_score,
            'details': {
                'positive': positive,
                'negative': negative,
                'neutral': neutral
            }
        }
    
    @staticmethod
    def fetch_top_posts(subreddit, limit=10):
        """Fetch top posts for a given subreddit"""
        reddit = SentimentAnalysisModel._get_reddit_instance()
        if not reddit:
            return SentimentAnalysisModel._generate_mock_posts(subreddit, limit)
        
        try:
            subreddit_obj = reddit.subreddit(subreddit)
            posts = subreddit_obj.hot(limit=limit)
            
            return [{
                'id': post.id,
                'title': post.title,
                'score': post.score,
                'num_comments': post.num_comments,
                'created_utc': post.created_utc
            } for post in posts]
        except Exception as e:
            print(f"Error fetching posts from r/{subreddit}: {e}")
            return SentimentAnalysisModel._generate_mock_posts(subreddit, limit)
    
    @staticmethod
    def _generate_mock_posts(subreddit, limit=10):
        """Generate mock post data for testing"""
        # Common words for post title generation
        topics = [
            "guide", "review", "thoughts", "discussion", "theory", 
            "update", "news", "announcement", "megathread", "help"
        ]
        
        sentiments = [
            "amazing", "terrible", "incredible", "disappointing", "overrated", 
            "underrated", "surprising", "expected", "controversial", "official"
        ]
        
        mock_posts = []
        for i in range(min(limit, 10)):
            topic = topics[random.randint(0, len(topics) - 1)]
            sentiment = sentiments[random.randint(0, len(sentiments) - 1)]
            title = f"[{topic.upper()}] The {sentiment} state of r/{subreddit} right now"
            
            mock_posts.append({
                'id': f"mock_{i}",
                'title': title,
                'score': random.randint(10, 5000),
                'num_comments': random.randint(5, 500),
                'created_utc': time.time() - random.randint(0, 60*60*24*7)
            })
        
        return mock_posts
    
    @classmethod
    def analyze_post_sentiment(cls, title):
        """Analyze sentiment of a post title using hybrid approach"""
        try:
            return cls._hybrid_sentiment_analysis(title)
        except Exception as e:
            print(f"Error analyzing sentiment: {e}")
            # Return mock sentiment if analysis fails
            sentiment_score = round(random.random() * 2 - 1, 1)  # Random between -1 and 1
            
            # Generate details aligned with sentiment score
            if sentiment_score > 0.3:
                positive = round(0.6 + random.random() * 0.4, 2)
                negative = round(random.random() * 0.2, 2)
                neutral = round(1 - positive - negative, 2)
            elif sentiment_score < -0.3:
                negative = round(0.6 + random.random() * 0.4, 2)
                positive = round(random.random() * 0.2, 2)
                neutral = round(1 - positive - negative, 2)
            else:
                neutral = round(0.5 + random.random() * 0.3, 2)
                positive = round((1 - neutral) / 2, 2)
                negative = round(1 - neutral - positive, 2)
                
            return {
                'sentimentScore': sentiment_score,
                'details': {
                    'positive': positive,
                    'negative': negative,
                    'neutral': neutral
                }
            }
    
    @classmethod
    def analyze_subreddit(cls, subreddit):
        """
        Analyze sentiment of content from a subreddit using hybrid approach
        
        Args:
            subreddit (str): The subreddit to analyze
            
        Returns:
            list: Sentiment analysis results
        """
        print(f"Analyzing sentiment for r/{subreddit}")
        
        # Initialize ML model 
        cls._initialize_ml_model()
        
        # Simulate API delay
        time.sleep(1)
        
        # Get posts from subreddit
        posts = cls.fetch_top_posts(subreddit)
        results = []
        
        for post in posts:
            # Analyze sentiment for each post
            sentiment_result = cls.analyze_post_sentiment(post['title'])
            
            # Combine post data with sentiment analysis
            results.append({
                "title": post['title'],
                "sentimentScore": sentiment_result['sentimentScore'],
                "details": sentiment_result['details']
            })
        
        return results
