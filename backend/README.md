
# TrendLens Backend

This is the Python Flask backend for the TrendLens application, which provides Reddit analytics and insights.

## Setup

1. Create a virtual environment and activate it:
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```
pip install -r requirements.txt
```

3. Run the Flask application:
```
python app.py
```

The server will run on http://localhost:5000 by default.

## API Endpoints

### Bot Detection
- `POST /api/bot/analyze` - Analyze a username to determine if it's a bot
- `POST /api/bot/subreddit` - Get potential bots in a subreddit

### Influencer Detection
- `POST /api/influencer/analyze` - Analyze a username to determine their influence score
- `POST /api/influencer/subreddit` - Get top influencers in a subreddit

### Sentiment Analysis
- `POST /api/sentiment/subreddit` - Analyze sentiment of content from a subreddit

### Trend Forecasting
- `POST /api/trend/data` - Get historical trend data and forecast future trends
- `POST /api/trend/activity` - Get historical activity data (posts and comments)

## Models

The backend includes the following ML models:
- Bot Detection Model
- Influencer Detection Model
- Sentiment Analysis Model
- Trend Forecasting Model

These are currently using mock data, but can be extended to use actual ML models.
