
export interface TrendData {
  date: string;
  value: number | null;
  predictedValue: number | null;
}

export interface ActivityData {
  date: string;
  posts: number;
  comments: number;
}

export class TrendForecastingModel {
  /**
   * Get historical trend data and forecast future trends
   * @param subreddit The subreddit to analyze
   * @param months Number of months of historical data
   * @param forecastMonths Number of months to forecast
   * @returns Trend data with historical and predicted values
   */
  public static async getTrendData(
    subreddit: string, 
    months: number = 8, 
    forecastMonths: number = 4
  ): Promise<TrendData[]> {
    console.log(`Forecasting trends for r/${subreddit} with ${months} months history and ${forecastMonths} months forecast`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const currentDate = new Date();
    const data: TrendData[] = [];
    
    // Generate historical data
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      
      // Generate somewhat realistic trend with some randomness and an upward trend
      const baseValue = 30 + (months - i) * 5; // Base trend going up over time
      const randomVariation = Math.random() * 30 - 15; // Random variation between -15 and +15
      
      data.push({
        date: this.formatDate(date),
        value: Math.round(baseValue + randomVariation),
        predictedValue: null,
      });
    }
    
    // Generate forecast data
    const lastValue = data[data.length - 1].value || 0;
    for (let i = 1; i <= forecastMonths; i++) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() + i);
      
      // Generate forecast with upward trend and some randomness
      const trendIncrease = lastValue * 0.05 * i; // 5% increase per month
      const randomVariation = Math.random() * 20 - 5; // Random variation between -5 and +15
      
      data.push({
        date: this.formatDate(date),
        value: null,
        predictedValue: Math.round(lastValue + trendIncrease + randomVariation),
      });
    }
    
    return data;
  }
  
  /**
   * Get historical activity data (posts and comments)
   * @param subreddit The subreddit to analyze
   * @param months Number of months of historical data
   * @returns Activity data with posts and comments counts
   */
  public static async getActivityData(subreddit: string, months: number = 8): Promise<ActivityData[]> {
    console.log(`Getting activity data for r/${subreddit} over ${months} months`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const currentDate = new Date();
    const data: ActivityData[] = [];
    
    // Generate activity data
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      
      // Generate somewhat realistic data with some randomness and seasonal patterns
      const seasonality = 1 + 0.2 * Math.sin(i / 12 * 2 * Math.PI); // Seasonal factor
      const basePosts = 100 + i * 10; // Slight upward trend in post count
      const baseComments = 700 + i * 50; // Slight upward trend in comment count
      
      data.push({
        date: this.formatDate(date),
        posts: Math.round(basePosts * seasonality * (0.9 + Math.random() * 0.3)),
        comments: Math.round(baseComments * seasonality * (0.9 + Math.random() * 0.3)),
      });
    }
    
    return data;
  }
  
  /**
   * Format a date as YYYY-MM
   */
  private static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }
}
