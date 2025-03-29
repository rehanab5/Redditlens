
from flask import Flask, jsonify, request
from flask_cors import CORS
from models.bot_detection import BotDetectionModel
from models.influencer_detection import InfluencerDetectionModel
from models.sentiment_analysis import SentimentAnalysisModel
from models.trend_forecasting import TrendForecastingModel

app = Flask(__name__)
CORS(app)

# Bot Detection Routes
@app.route('/api/bot/analyze', methods=['POST'])
def analyze_bot_user():
    data = request.get_json()
    username = data.get('username')
    result = BotDetectionModel.analyze_user(username)
    return jsonify(result)

@app.route('/api/bot/subreddit', methods=['POST'])
def get_subreddit_bots():
    data = request.get_json()
    subreddit = data.get('subreddit')
    result = BotDetectionModel.get_subreddit_bots(subreddit)
    return jsonify(result)

# Influencer Detection Routes
@app.route('/api/influencer/analyze', methods=['POST'])
def analyze_influencer():
    data = request.get_json()
    username = data.get('username')
    result = InfluencerDetectionModel.analyze_user(username)
    return jsonify(result)

@app.route('/api/influencer/subreddit', methods=['POST'])
def get_subreddit_influencers():
    data = request.get_json()
    subreddit = data.get('subreddit')
    result = InfluencerDetectionModel.get_subreddit_influencers(subreddit)
    return jsonify(result)

# Sentiment Analysis Routes
@app.route('/api/sentiment/subreddit', methods=['POST'])
def analyze_subreddit_sentiment():
    data = request.get_json()
    subreddit = data.get('subreddit')
    result = SentimentAnalysisModel.analyze_subreddit(subreddit)
    return jsonify(result)

# Trend Forecasting Routes
@app.route('/api/trend/data', methods=['POST'])
def get_trend_data():
    data = request.get_json()
    subreddit = data.get('subreddit')
    history_months = data.get('historyMonths', 8)
    forecast_months = data.get('forecastMonths', 4)
    result = TrendForecastingModel.get_trend_data(subreddit, history_months, forecast_months)
    return jsonify(result)

@app.route('/api/trend/activity', methods=['POST'])
def get_activity_data():
    data = request.get_json()
    subreddit = data.get('subreddit')
    months = data.get('months', 8)
    result = TrendForecastingModel.get_activity_data(subreddit, months)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
