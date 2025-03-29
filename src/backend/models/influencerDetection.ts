
export interface Influencer {
  username: string;
  score: number;
  followers: number;
  engagement: number;
  topics: string[];
  sentiment: number;
  botProbability: number;
}

export interface InfluencerScore {
  username: string;
  score: number;
  details: InfluencerScoreCriteria[];
}

export interface InfluencerScoreCriteria {
  criteriaName: string;
  score: number;
  maxScore: number;
}

export class InfluencerDetectionModel {
  private static readonly TOPICS = [
    "technology", "sports", "politics", "gaming", "music", 
    "movies", "art", "science", "health", "fitness", 
    "food", "travel", "fashion", "beauty", "finance", 
    "crypto", "memes", "news", "education", "programming"
  ];

  /**
   * Analyze a username to determine their influence score
   * @param username The Reddit username to analyze
   * @returns Influencer score details
   */
  public static async analyzeUser(username: string): Promise<InfluencerScore> {
    console.log(`Analyzing user ${username} for influencer metrics`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return {
      username,
      score: Math.floor(Math.random() * 60) + 40, // Random score between 40-100
      details: [
        { criteriaName: "Account Age", score: Math.random() * 5, maxScore: 5 },
        { criteriaName: "Content Reach", score: Math.random() * 5, maxScore: 5 },
        { criteriaName: "Engagement Rate", score: Math.random() * 5, maxScore: 5 },
        { criteriaName: "Follower Count", score: Math.random() * 5, maxScore: 5 },
        { criteriaName: "Authority Score", score: Math.random() * 5, maxScore: 5 },
      ],
    };
  }

  /**
   * Get top influencers in a subreddit
   * @param subreddit The subreddit to analyze
   * @returns List of top influencers with their metrics
   */
  public static async getSubredditInfluencers(subreddit: string): Promise<Influencer[]> {
    console.log(`Finding influencers in r/${subreddit}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    // Generate 4-6 random influencer accounts
    const count = Math.floor(Math.random() * 3) + 4;
    
    return Array(count).fill(null).map(() => {
      // Generate 1-3 random topics
      const topicCount = Math.floor(Math.random() * 3) + 1;
      const randomTopics: string[] = [];
      
      for (let i = 0; i < topicCount; i++) {
        const topic = this.TOPICS[Math.floor(Math.random() * this.TOPICS.length)];
        if (!randomTopics.includes(topic)) {
          randomTopics.push(topic);
        }
      }
      
      // Add subreddit as a topic if it's not already included
      if (!randomTopics.includes(subreddit) && Math.random() > 0.5) {
        randomTopics.push(subreddit);
      }
      
      return {
        username: `${subreddit}_user${Math.floor(Math.random() * 10000)}`,
        score: Math.floor(Math.random() * 30) + 70, // Higher influence score 70-100
        followers: Math.floor(Math.random() * 500000) + 10000, // 10k to 510k followers
        engagement: parseFloat((Math.random() * 8 + 2).toFixed(1)), // 2.0% to 10.0% engagement
        topics: randomTopics,
        sentiment: parseFloat((Math.random() * 0.6 + 0.4).toFixed(2)), // 0.4 to 1.0 sentiment
        botProbability: parseFloat((Math.random() * 0.3).toFixed(2)), // 0.0 to 0.3 bot probability
      };
    });
  }
}
