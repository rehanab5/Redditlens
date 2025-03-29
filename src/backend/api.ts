
/**
 * Central API class to access all backend models via Flask API
 */
export class RedditInsightAPI {
  private static readonly API_BASE_URL = 'http://localhost:5000/api';

  // Bot Detection API
  public static async analyzeBotUser(username: string) {
    const response = await fetch(`${this.API_BASE_URL}/bot/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return await response.json();
  }
  
  public static async getSubredditBots(subreddit: string) {
    const response = await fetch(`${this.API_BASE_URL}/bot/subreddit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subreddit }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return await response.json();
  }
  
  // Influencer Detection API
  public static async analyzeInfluencer(username: string) {
    const response = await fetch(`${this.API_BASE_URL}/influencer/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return await response.json();
  }
  
  public static async getSubredditInfluencers(subreddit: string) {
    const response = await fetch(`${this.API_BASE_URL}/influencer/subreddit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subreddit }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return await response.json();
  }
  
  // Sentiment Analysis API
  public static async analyzeSubredditSentiment(subreddit: string) {
    const response = await fetch(`${this.API_BASE_URL}/sentiment/subreddit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subreddit }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return await response.json();
  }
  
  // Trend Forecasting API
  public static async getTrendData(
    subreddit: string, 
    historyMonths?: number, 
    forecastMonths?: number
  ) {
    const response = await fetch(`${this.API_BASE_URL}/trend/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        subreddit,
        historyMonths,
        forecastMonths
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return await response.json();
  }
  
  public static async getActivityData(subreddit: string, months?: number) {
    const response = await fetch(`${this.API_BASE_URL}/trend/activity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        subreddit,
        months 
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return await response.json();
  }
}
