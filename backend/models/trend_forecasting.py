
import random
import time
from datetime import datetime, timedelta

class TrendForecastingModel:
    """
    Model for forecasting trends in Reddit activity
    """
    
    @staticmethod
    def get_trend_data(subreddit, months=8, forecast_months=4):
        """
        Get historical trend data and forecast future trends
        
        Args:
            subreddit (str): The subreddit to analyze
            months (int): Number of months of historical data
            forecast_months (int): Number of months to forecast
            
        Returns:
            list: Trend data with historical and predicted values
        """
        print(f"Forecasting trends for r/{subreddit} with {months} months history and {forecast_months} months forecast")
        
        # Simulate API delay
        time.sleep(1.5)
        
        current_date = datetime.now()
        data = []
        
        # Generate historical data
        for i in range(months - 1, -1, -1):
            date = current_date - timedelta(days=30 * i)
            
            # Generate somewhat realistic trend with some randomness and an upward trend
            base_value = 30 + (months - i) * 5  # Base trend going up over time
            random_variation = random.random() * 30 - 15  # Random variation between -15 and +15
            
            data.append({
                "date": TrendForecastingModel.format_date(date),
                "value": round(base_value + random_variation),
                "predictedValue": None
            })
        
        # Generate forecast data
        last_value = data[-1]["value"] or 0
        for i in range(1, forecast_months + 1):
            date = current_date + timedelta(days=30 * i)
            
            # Generate forecast with upward trend and some randomness
            trend_increase = last_value * 0.05 * i  # 5% increase per month
            random_variation = random.random() * 20 - 5  # Random variation between -5 and +15
            
            data.append({
                "date": TrendForecastingModel.format_date(date),
                "value": None,
                "predictedValue": round(last_value + trend_increase + random_variation)
            })
        
        return data
    
    @staticmethod
    def get_activity_data(subreddit, months=8):
        """
        Get historical activity data (posts and comments)
        
        Args:
            subreddit (str): The subreddit to analyze
            months (int): Number of months of historical data
            
        Returns:
            list: Activity data with posts and comments counts
        """
        print(f"Getting activity data for r/{subreddit} over {months} months")
        
        # Simulate API delay
        time.sleep(1.2)
        
        current_date = datetime.now()
        data = []
        
        # Generate activity data
        for i in range(months - 1, -1, -1):
            date = current_date - timedelta(days=30 * i)
            
            # Generate somewhat realistic data with some randomness and seasonal patterns
            seasonality = 1 + 0.2 * (i / 12 * 2 * 3.14159)  # Seasonal factor
            base_posts = 100 + i * 10  # Slight upward trend in post count
            base_comments = 700 + i * 50  # Slight upward trend in comment count
            
            data.append({
                "date": TrendForecastingModel.format_date(date),
                "posts": round(base_posts * seasonality * (0.9 + random.random() * 0.3)),
                "comments": round(base_comments * seasonality * (0.9 + random.random() * 0.3))
            })
        
        return data
    
    @staticmethod
    def format_date(date):
        """
        Format a date as YYYY-MM
        """
        return f"{date.year}-{date.month:02d}"
