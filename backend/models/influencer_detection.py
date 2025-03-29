
import random
import time

class InfluencerDetectionModel:
    """
    Model for detecting influential accounts on Reddit
    """
    
    TOPICS = [
        "technology", "sports", "politics", "gaming", "music", 
        "movies", "art", "science", "health", "fitness", 
        "food", "travel", "fashion", "beauty", "finance", 
        "crypto", "memes", "news", "education", "programming"
    ]
    
    @staticmethod
    def analyze_user(username):
        """
        Analyze a username to determine their influence score
        
        Args:
            username (str): The Reddit username to analyze
            
        Returns:
            dict: Influencer score details
        """
        print(f"Analyzing user {username} for influencer metrics")
        
        # Simulate API delay
        time.sleep(1.2)
        
        details = [
            {"criteriaName": "Account Age", "score": round(random.random() * 5, 2), "maxScore": 5},
            {"criteriaName": "Content Reach", "score": round(random.random() * 5, 2), "maxScore": 5},
            {"criteriaName": "Engagement Rate", "score": round(random.random() * 5, 2), "maxScore": 5},
            {"criteriaName": "Follower Count", "score": round(random.random() * 5, 2), "maxScore": 5},
            {"criteriaName": "Authority Score", "score": round(random.random() * 5, 2), "maxScore": 5},
        ]
        
        return {
            "username": username,
            "score": int(random.random() * 60) + 40,  # Random score between 40-100
            "details": details
        }
    
    @staticmethod
    def get_subreddit_influencers(subreddit):
        """
        Get top influencers in a subreddit
        
        Args:
            subreddit (str): The subreddit to analyze
            
        Returns:
            list: List of top influencers with their metrics
        """
        print(f"Finding influencers in r/{subreddit}")
        
        # Simulate API delay
        time.sleep(1.8)
        
        # Generate 4-6 random influencer accounts
        count = random.randint(4, 6)
        results = []
        
        for _ in range(count):
            # Generate 1-3 random topics
            topic_count = random.randint(1, 3)
            random_topics = []
            
            for i in range(topic_count):
                topic = InfluencerDetectionModel.TOPICS[random.randint(0, len(InfluencerDetectionModel.TOPICS) - 1)]
                if topic not in random_topics:
                    random_topics.append(topic)
            
            # Add subreddit as a topic if it's not already included
            if subreddit not in random_topics and random.random() > 0.5:
                random_topics.append(subreddit)
            
            results.append({
                "username": f"{subreddit}_user{random.randint(1, 10000)}",
                "score": int(random.random() * 30) + 70,  # Higher influence score 70-100
                "followers": int(random.random() * 500000) + 10000,  # 10k to 510k followers
                "engagement": round(random.random() * 8 + 2, 1),  # 2.0% to 10.0% engagement
                "topics": random_topics,
                "sentiment": round(random.random() * 0.6 + 0.4, 2),  # 0.4 to 1.0 sentiment
                "botProbability": round(random.random() * 0.3, 2),  # 0.0 to 0.3 bot probability
            })
        
        return results
