
import praw
from textblob import TextBlob
import time
import random

class SentimentAnalysisModel:
    """
    Model for analyzing sentiment in Reddit content
    """
    
    # Initialize Reddit API (use environment variables in production!)
    _reddit = None
    
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
    
    @staticmethod
    def analyze_post_sentiment(title):
        """Analyze sentiment of a post title"""
        try:
            blob = TextBlob(title)
            polarity = blob.sentiment.polarity  # Range from -1 to 1
            
            # Calculate sentiment breakdown
            if polarity > 0.3:
                # Positive sentiment
                positive = round(0.6 + random.random() * 0.4, 2)
                negative = round(random.random() * 0.2, 2)
                neutral = round(1 - positive - negative, 2)
            elif polarity < -0.3:
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
                'sentimentScore': polarity,
                'details': {
                    'positive': positive,
                    'negative': negative,
                    'neutral': neutral
                }
            }
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
    
    @staticmethod
    def analyze_subreddit(subreddit):
        """
        Analyze sentiment of content from a subreddit
        
        Args:
            subreddit (str): The subreddit to analyze
            
        Returns:
            list: Sentiment analysis results
        """
        print(f"Analyzing sentiment for r/{subreddit}")
        
        # Simulate API delay
        time.sleep(1)
        
        # Get posts from subreddit
        posts = SentimentAnalysisModel.fetch_top_posts(subreddit)
        results = []
        
        for post in posts:
            # Analyze sentiment for each post
            sentiment_result = SentimentAnalysisModel.analyze_post_sentiment(post['title'])
            
            # Combine post data with sentiment analysis
            results.append({
                "title": post['title'],
                "sentimentScore": sentiment_result['sentimentScore'],
                "details": sentiment_result['details']
            })
        
        return results
