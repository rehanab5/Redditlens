
import random
import time

class BotDetectionModel:
    """
    Model for detecting bot accounts on Reddit
    """
    
    @staticmethod
    def analyze_user(username):
        """
        Analyze a username to determine if it's likely a bot
        
        Args:
            username (str): The Reddit username to analyze
            
        Returns:
            dict: Bot detection score details
        """
        print(f"Analyzing user {username} for bot behavior")
        
        # Simulate API delay
        time.sleep(1)
        
        # Generate random details
        details = [
            {"criteriaName": "Account Age", "score": round(random.random() * 5, 2), "maxScore": 5},
            {"criteriaName": "Comment Patterns", "score": round(random.random() * 5, 2), "maxScore": 5},
            {"criteriaName": "Post Frequency", "score": round(random.random() * 5, 2), "maxScore": 5},
            {"criteriaName": "Content Diversity", "score": round(random.random() * 5, 2), "maxScore": 5},
            {"criteriaName": "Interaction Ratio", "score": round(random.random() * 5, 2), "maxScore": 5},
        ]
        
        return {
            "username": username,
            "score": int(random.random() * 40) + 60,  # Random score between 60-100
            "details": details
        }
    
    @staticmethod
    def get_subreddit_bots(subreddit):
        """
        Get a list of potential bots in a subreddit
        
        Args:
            subreddit (str): The subreddit to analyze
            
        Returns:
            list: List of potential bots with their scores
        """
        print(f"Finding bots in r/{subreddit}")
        
        # Simulate API delay
        time.sleep(1.5)
        
        # Generate 3-5 random bot accounts
        bot_count = random.randint(3, 5)
        bot_prefixes = ["AutoMod", "NewsBot", "RepostBot", "ModeratorBot", "AnalyticsBot", "TrendBot"]
        results = []
        
        for i in range(bot_count):
            username = f"{bot_prefixes[i % len(bot_prefixes)]}{random.randint(1, 10000)}"
            details = [
                {"criteriaName": "Account Age", "score": round(random.random() * 5, 2), "maxScore": 5},
                {"criteriaName": "Comment Patterns", "score": round(random.random() * 5, 2), "maxScore": 5},
                {"criteriaName": "Post Frequency", "score": round(random.random() * 5, 2), "maxScore": 5},
                {"criteriaName": "Content Diversity", "score": round(random.random() * 5, 2), "maxScore": 5},
                {"criteriaName": "Interaction Ratio", "score": round(random.random() * 5, 2), "maxScore": 5},
            ]
            
            results.append({
                "username": username,
                "score": int(random.random() * 15) + 85,  # High bot score 85-100
                "details": details
            })
        
        return results
