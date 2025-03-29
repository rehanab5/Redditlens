
// This file contains mock data for the application
// In a real application, this would be replaced with actual API calls

// Bot detection data
export const mockUserBotScore = {
  username: "RedditUser123",
  score: 65,
  details: [
    { criteriaName: "Account Age", score: 2, maxScore: 5 },
    { criteriaName: "Comment Patterns", score: 4, maxScore: 5 },
    { criteriaName: "Post Frequency", score: 3.5, maxScore: 5 },
    { criteriaName: "Content Diversity", score: 2, maxScore: 5 },
    { criteriaName: "Interaction Ratio", score: 1.5, maxScore: 5 },
  ],
};

export const mockSubredditBots = [
  {
    username: "NewsBot5000",
    score: 92,
    details: [
      { criteriaName: "Account Age", score: 1, maxScore: 5 },
      { criteriaName: "Comment Patterns", score: 5, maxScore: 5 },
      { criteriaName: "Post Frequency", score: 4.8, maxScore: 5 },
      { criteriaName: "Content Diversity", score: 1.2, maxScore: 5 },
      { criteriaName: "Interaction Ratio", score: 0.5, maxScore: 5 },
    ],
  },
  {
    username: "AutoModerator",
    score: 98,
    details: [
      { criteriaName: "Account Age", score: 5, maxScore: 5 },
      { criteriaName: "Comment Patterns", score: 5, maxScore: 5 },
      { criteriaName: "Post Frequency", score: 5, maxScore: 5 },
      { criteriaName: "Content Diversity", score: 1, maxScore: 5 },
      { criteriaName: "Interaction Ratio", score: 0.5, maxScore: 5 },
    ],
  },
  {
    username: "QuoteBot",
    score: 85,
    details: [
      { criteriaName: "Account Age", score: 3, maxScore: 5 },
      { criteriaName: "Comment Patterns", score: 4.5, maxScore: 5 },
      { criteriaName: "Post Frequency", score: 3.7, maxScore: 5 },
      { criteriaName: "Content Diversity", score: 1.5, maxScore: 5 },
      { criteriaName: "Interaction Ratio", score: 1, maxScore: 5 },
    ],
  },
  {
    username: "RepostSentinel",
    score: 88,
    details: [
      { criteriaName: "Account Age", score: 4, maxScore: 5 },
      { criteriaName: "Comment Patterns", score: 4.8, maxScore: 5 },
      { criteriaName: "Post Frequency", score: 3.5, maxScore: 5 },
      { criteriaName: "Content Diversity", score: 1.8, maxScore: 5 },
      { criteriaName: "Interaction Ratio", score: 0.8, maxScore: 5 },
    ],
  },
];

export const mockInfluencerScore = {
  username: "GallowBoob",
  score: 25,
  details: [
    { criteriaName: "Account Age", score: 5, maxScore: 5 },
    { criteriaName: "Comment Patterns", score: 1, maxScore: 5 },
    { criteriaName: "Post Frequency", score: 1.5, maxScore: 5 },
    { criteriaName: "Content Diversity", score: 4, maxScore: 5 },
    { criteriaName: "Interaction Ratio", score: 4.5, maxScore: 5 },
  ],
};

// Sentiment analysis data
export const mockSentimentAnalysis = [
  {
    title: "Why the new iPhone is overrated",
    sentimentScore: -0.6,
    details: { positive: 0.1, negative: 0.7, neutral: 0.2 },
  },
  {
    title: "This game is the best I've played all year",
    sentimentScore: 0.8,
    details: { positive: 0.8, negative: 0.1, neutral: 0.1 },
  },
  {
    title: "Today's weather forecast for the weekend",
    sentimentScore: 0.1,
    details: { positive: 0.3, negative: 0.2, neutral: 0.5 },
  },
  {
    title: "Review of the latest season - so disappointing",
    sentimentScore: -0.7,
    details: { positive: 0.1, negative: 0.8, neutral: 0.1 },
  },
  {
    title: "Just announced: New features coming next month",
    sentimentScore: 0.6,
    details: { positive: 0.6, negative: 0.0, neutral: 0.4 },
  },
  {
    title: "Discussion thread for today's events",
    sentimentScore: 0.0,
    details: { positive: 0.3, negative: 0.3, neutral: 0.4 },
  },
];

// Trend forecasting data
export const mockTrendData = [
  { date: "2023-05", value: 30, predictedValue: null },
  { date: "2023-06", value: 45, predictedValue: null },
  { date: "2023-07", value: 60, predictedValue: null },
  { date: "2023-08", value: 40, predictedValue: null },
  { date: "2023-09", value: 70, predictedValue: null },
  { date: "2023-10", value: 85, predictedValue: null },
  { date: "2023-11", value: 90, predictedValue: null },
  { date: "2023-12", value: 75, predictedValue: null },
  { date: "2024-01", value: null, predictedValue: 80 },
  { date: "2024-02", value: null, predictedValue: 95 },
  { date: "2024-03", value: null, predictedValue: 100 },
  { date: "2024-04", value: null, predictedValue: 110 },
];

export const mockSubredditActivity = [
  { date: "2023-05", posts: 120, comments: 850 },
  { date: "2023-06", posts: 145, comments: 920 },
  { date: "2023-07", posts: 160, comments: 1050 },
  { date: "2023-08", posts: 140, comments: 890 },
  { date: "2023-09", posts: 170, comments: 1150 },
  { date: "2023-10", posts: 185, comments: 1280 },
  { date: "2023-11", posts: 210, comments: 1350 },
  { date: "2023-12", posts: 195, comments: 1200 },
];

// Dashboard overview data
export const mockDashboardStats = [
  { title: "Bot Score", value: "65%", trend: 12 },
  { title: "Sentiment Score", value: "+0.35", trend: -5 },
  { title: "Trend Growth", value: "+23%", trend: 23 },
  { title: "User Analysis", value: "42", trend: 8 },
];
