
import random
import time

class SentimentAnalysisModel:
    """
    Model for analyzing sentiment in Reddit content
    """
    
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
        time.sleep(2)
        
        # Common words for post title generation
        topics = [
            "guide", "review", "thoughts", "discussion", "theory", 
            "update", "news", "announcement", "megathread", "help"
        ]
        
        sentiments = [
            "amazing", "terrible", "incredible", "disappointing", "overrated", 
            "underrated", "surprising", "expected", "controversial", "official"
        ]
        
        # Generate 6-8 random posts
        post_count = random.randint(6, 8)
        results = []
        
        for _ in range(post_count):
            # Generate a random sentiment from -1 to 1
            sentiment_score = round(random.random() * 2 - 1, 1)
            
            # Generate details that align with the sentiment score
            if sentiment_score > 0.3:
                # Positive sentiment
                positive = round(0.6 + random.random() * 0.4, 1)
                negative = round(random.random() * 0.2, 1)
                neutral = round(1 - positive - negative, 1)
            elif sentiment_score < -0.3:
                # Negative sentiment
                negative = round(0.6 + random.random() * 0.4, 1)
                positive = round(random.random() * 0.2, 1)
                neutral = round(1 - positive - negative, 1)
            else:
                # Neutral sentiment
                neutral = round(0.5 + random.random() * 0.3, 1)
                positive = round((1 - neutral) / 2, 1)
                negative = round(1 - neutral - positive, 1)
            
            # Create a random post title
            topic = topics[random.randint(0, len(topics) - 1)]
            sentiment = sentiments[random.randint(0, len(sentiments) - 1)]
            title = f"[{topic.upper()}] The {sentiment} state of r/{subreddit} right now"
            
            results.append({
                "title": title,
                "sentimentScore": sentiment_score,
                "details": {
                    "positive": positive,
                    "negative": negative,
                    "neutral": neutral,
                }
            })
        
        return results
