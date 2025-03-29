
// Bot Detection Types
export interface BotScore {
  username: string;
  score: number;
  details: BotScoreCriteria[];
}

export interface BotScoreCriteria {
  criteriaName: string;
  score: number;
  maxScore: number;
}

// Influencer Detection Types
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

// Sentiment Analysis Types
export interface SentimentResult {
  title: string;
  sentimentScore: number;
  details: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

// Trend Forecasting Types
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
