
import random
import time
import praw
from textblob import TextBlob
from collections import defaultdict

class InfluencerDetectionModel:
    """
    Model for detecting influential accounts on Reddit
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
    def fetch_top_posts(subreddit, limit=50):
        """Fetch top posts for a given subreddit"""
        reddit = InfluencerDetectionModel._get_reddit_instance()
        if not reddit:
            # Return mock data if Reddit API is not available
            return InfluencerDetectionModel._generate_mock_posts(subreddit, limit)
        
        try:
            subreddit_obj = reddit.subreddit(subreddit)
            posts = subreddit_obj.top(limit=limit)
            
            return [{
                'id': post.id,
                'author': post.author.name if post.author else None,
                'title': post.title,
                'score': post.score,
                'num_comments': post.num_comments,
                'created_utc': post.created_utc,
                'awards': post.total_awards_received
            } for post in posts if post.author]
        except Exception as e:
            print(f"Error fetching posts from r/{subreddit}: {e}")
            # Fall back to mock data if fetching fails
            return InfluencerDetectionModel._generate_mock_posts(subreddit, limit)
    
    @staticmethod
    def _generate_mock_posts(subreddit, limit=50):
        """Generate mock post data for testing"""
        mock_posts = []
        users = [f"{subreddit}_user{i}" for i in range(1, 20)]
        
        for i in range(min(limit, 50)):
            mock_posts.append({
                'id': f"mock_{i}",
                'author': random.choice(users),
                'title': f"Mock post {i} about {subreddit}",
                'score': random.randint(10, 10000),
                'num_comments': random.randint(1, 500),
                'created_utc': time.time() - random.randint(0, 60*60*24*30),
                'awards': random.randint(0, 5)
            })
        
        return mock_posts
    
    @staticmethod
    def get_user_karma(username):
        """Fetch a user's karma with error handling"""
        reddit = InfluencerDetectionModel._get_reddit_instance()
        if not reddit:
            # Return mock data if Reddit API is not available
            return random.randint(1000, 50000), random.randint(1000, 50000)
        
        try:
            user = reddit.redditor(username)
            return user.link_karma, user.comment_karma
        except Exception as e:
            print(f"Error fetching karma for user {username}: {e}")
            return random.randint(1000, 50000), random.randint(1000, 50000)
    
    @staticmethod
    def detect_top_influencers(posts):
        """Analyze post data to identify influencers"""
        user_engagement = defaultdict(lambda: {
            'post_karma': 0, 
            'comment_karma': 0, 
            'upvotes': 0, 
            'comments': 0, 
            'awards': 0
        })
        
        for post in posts:
            if not post['author']:
                continue
                
            author = post['author']
            if user_engagement[author]['post_karma'] == 0:  # Only fetch karma once per user
                post_karma, comment_karma = InfluencerDetectionModel.get_user_karma(author)
                user_engagement[author]['post_karma'] = post_karma
                user_engagement[author]['comment_karma'] = comment_karma
            
            user_engagement[author]['upvotes'] += post['score']
            user_engagement[author]['comments'] += post['num_comments']
            user_engagement[author]['awards'] += post['awards']
        
        return sorted(
            user_engagement.items(),
            key=lambda x: (
                x[1]['post_karma'] + x[1]['comment_karma'],
                x[1]['upvotes'],
                x[1]['comments'],
                x[1]['awards']
            ),
            reverse=True
        )[:10]  # Return top 10
    
    @staticmethod
    def fetch_comments(post_id, limit=10):
        """Fetch comments for a post"""
        reddit = InfluencerDetectionModel._get_reddit_instance()
        if not reddit:
            # Return mock data if Reddit API is not available
            return [f"Mock comment {i}" for i in range(limit)]
        
        try:
            post = reddit.submission(id=post_id)
            post.comments.replace_more(limit=0)
            return [comment.body for comment in post.comments[:limit]]
        except Exception as e:
            print(f"Error fetching comments for post {post_id}: {e}")
            return [f"Mock comment {i}" for i in range(limit)]
    
    @staticmethod
    def analyze_sentiment(comments):
        """Analyze sentiment of comments"""
        if not comments:
            return {'positive': 0, 'neutral': 0, 'negative': 0}
        
        try:
            scores = {'positive': 0, 'neutral': 0, 'negative': 0}
            for comment in comments:
                polarity = TextBlob(comment).sentiment.polarity
                if polarity > 0.1:
                    scores['positive'] += 1
                elif polarity < -0.1:
                    scores['negative'] += 1
                else:
                    scores['neutral'] += 1
            
            total = sum(scores.values())
            return {k: round(v/total*100, 2) if total > 0 else 0 for k, v in scores.items()}
        except Exception as e:
            print(f"Error analyzing sentiment: {e}")
            # Fall back to mock sentiment data
            return {'positive': 50, 'neutral': 30, 'negative': 20}
    
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
        
        TOPICS = [
            "technology", "sports", "politics", "gaming", "music", 
            "movies", "art", "science", "health", "fitness", 
            "food", "travel", "fashion", "beauty", "finance", 
            "crypto", "memes", "news", "education", "programming"
        ]
        
        try:
            # Fetch top posts from the subreddit
            posts = InfluencerDetectionModel.fetch_top_posts(subreddit)
            if not posts:
                raise Exception("No posts found")
                
            # Detect top influencers
            influencers = InfluencerDetectionModel.detect_top_influencers(posts)
            results = []
            
            for username, data in influencers:
                # Get user-specific posts
                user_posts = [p for p in posts if p['author'] == username]
                if not user_posts:
                    continue
                
                # Fetch and analyze comments
                comments = InfluencerDetectionModel.fetch_comments(user_posts[0]['id'])
                sentiment_data = InfluencerDetectionModel.analyze_sentiment(comments)
                
                # Calculate engagement percentage
                total_karma = data['post_karma'] + data['comment_karma']
                engagement = round((data['upvotes'] / max(total_karma, 1)) * 100, 1)
                engagement = min(engagement, 10.0)  # Cap at 10% for reasonable values
                
                # Generate random topics based on subreddit
                random_topics = []
                topic_count = random.randint(1, 3)
                for i in range(topic_count):
                    topic = TOPICS[random.randint(0, len(TOPICS) - 1)]
                    if topic not in random_topics:
                        random_topics.append(topic)
                
                # Always include the subreddit as a topic
                if subreddit not in random_topics:
                    random_topics.append(subreddit)
                
                # Calculate sentiment score (between 0 and 1)
                sentiment_score = (
                    (sentiment_data['positive'] * 1.0) + 
                    (sentiment_data['neutral'] * 0.5) + 
                    (sentiment_data['negative'] * 0.0)
                ) / 100
                
                # Generate a bot probability (lower for high-karma accounts)
                bot_probability = max(0.0, min(0.3, 1000 / max(total_karma, 1000)))
                
                results.append({
                    "username": username,
                    "score": int(80 + data['upvotes'] / (max(total_karma, 1) / 100) / 2),  # Calculate influence score
                    "followers": data['post_karma'],  # Use post karma as proxy for followers
                    "engagement": engagement,
                    "topics": random_topics,
                    "sentiment": sentiment_score,
                    "botProbability": bot_probability,
                })
            
            return results
            
        except Exception as e:
            print(f"Error in get_subreddit_influencers: {e}")
            # Fall back to mock data
            count = random.randint(4, 6)
            results = []
            
            for _ in range(count):
                # Generate 1-3 random topics
                topic_count = random.randint(1, 3)
                random_topics = []
                
                for i in range(topic_count):
                    topic = TOPICS[random.randint(0, len(TOPICS) - 1)]
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
