
import { BotDetectionModel, BotScore } from './models/botDetection';
import { 
  InfluencerDetectionModel, 
  Influencer, 
  InfluencerScore 
} from './models/influencerDetection';
import { SentimentAnalysisModel, SentimentResult } from './models/sentimentAnalysis';
import { 
  TrendForecastingModel, 
  TrendData, 
  ActivityData 
} from './models/trendForecasting';

/**
 * Central API class to access all backend models
 * In a real application, this would connect to actual backend APIs
 */
export class RedditInsightAPI {
  // Bot Detection API
  public static async analyzeBotUser(username: string): Promise<BotScore> {
    return BotDetectionModel.analyzeUser(username);
  }
  
  public static async getSubredditBots(subreddit: string): Promise<BotScore[]> {
    return BotDetectionModel.getSubredditBots(subreddit);
  }
  
  // Influencer Detection API
  public static async analyzeInfluencer(username: string): Promise<InfluencerScore> {
    return InfluencerDetectionModel.analyzeUser(username);
  }
  
  public static async getSubredditInfluencers(subreddit: string): Promise<Influencer[]> {
    return InfluencerDetectionModel.getSubredditInfluencers(subreddit);
  }
  
  // Sentiment Analysis API
  public static async analyzeSubredditSentiment(subreddit: string): Promise<SentimentResult[]> {
    return SentimentAnalysisModel.analyzeSubreddit(subreddit);
  }
  
  // Trend Forecasting API
  public static async getTrendData(
    subreddit: string, 
    historyMonths?: number, 
    forecastMonths?: number
  ): Promise<TrendData[]> {
    return TrendForecastingModel.getTrendData(subreddit, historyMonths, forecastMonths);
  }
  
  public static async getActivityData(subreddit: string, months?: number): Promise<ActivityData[]> {
    return TrendForecastingModel.getActivityData(subreddit, months);
  }
}
