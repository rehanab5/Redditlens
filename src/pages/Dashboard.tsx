
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { Bot, MessageSquare, TrendingUp, Users } from "lucide-react";
import { BotScoreCard } from "@/components/dashboard/BotScoreCard";
import { SentimentCard } from "@/components/dashboard/SentimentCard";
import { RedditInsightAPI } from "@/backend/api";
import { BotScore } from "@/backend/models/botDetection";
import { InfluencerScore } from "@/backend/models/influencerDetection";
import { SentimentResult } from "@/backend/models/sentimentAnalysis";
import { TrendData, ActivityData } from "@/backend/models/trendForecasting";
import { toast } from "sonner";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [botScore, setBotScore] = useState<BotScore | null>(null);
  const [influencerScore, setInfluencerScore] = useState<InfluencerScore | null>(null);
  const [sentimentResults, setSentimentResults] = useState<SentimentResult[] | null>(null);
  const [trendData, setTrendData] = useState<TrendData[] | null>(null);
  const [activityData, setActivityData] = useState<ActivityData[] | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        // Default subreddit to analyze
        const defaultSubreddit = "all";
        
        // Load all data in parallel
        const [
          botData,
          influencerData,
          sentimentData,
          trendData,
          activityData
        ] = await Promise.all([
          RedditInsightAPI.analyzeBotUser("AutoModerator"),
          RedditInsightAPI.analyzeInfluencer("GallowBoob"),
          RedditInsightAPI.analyzeSubredditSentiment(defaultSubreddit),
          RedditInsightAPI.getTrendData(defaultSubreddit),
          RedditInsightAPI.getActivityData(defaultSubreddit)
        ]);
        
        setBotScore(botData);
        setInfluencerScore(influencerData);
        setSentimentResults(sentimentData);
        setTrendData(trendData);
        setActivityData(activityData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast.error("Error loading some dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Bot Detection"
            value={botScore ? `${botScore.score}%` : "Loading..."}
            description="Average detection score"
            icon={Bot}
            trend={12}
            iconColor="text-purple-500"
            isLoading={isLoading}
          />
          <StatsCard
            title="Sentiment Analysis"
            value={sentimentResults ? 
              `${sentimentResults.reduce((sum, item) => sum + item.sentimentScore, 0) / sentimentResults.length > 0 ? "+" : ""}${(sentimentResults.reduce((sum, item) => sum + item.sentimentScore, 0) / sentimentResults.length).toFixed(2)}` 
              : "Loading..."}
            description="Overall sentiment"
            icon={MessageSquare}
            trend={-5}
            iconColor="text-blue-500"
            isLoading={isLoading}
          />
          <StatsCard
            title="Trend Forecasting"
            value={trendData && trendData.length > 0 ? 
              `+${Math.round((trendData[trendData.length - 1].predictedValue || 0) / (trendData[trendData.length - 5].value || 1) * 100 - 100)}%` 
              : "Loading..."}
            description="Activity increase"
            icon={TrendingUp}
            trend={23}
            iconColor="text-green-500"
            isLoading={isLoading}
          />
          <StatsCard
            title="User Analysis"
            value={activityData ? `${activityData.length}` : "Loading..."}
            description="Users analyzed"
            icon={Users}
            trend={8}
            iconColor="text-orange-500"
            isLoading={isLoading}
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          {trendData && (
            <LineChart
              title="Trend Forecast"
              data={trendData}
              xDataKey="date"
              series={[
                { dataKey: "value", name: "Actual", color: "#8884d8" },
                { dataKey: "predictedValue", name: "Predicted", color: "#82ca9d" }
              ]}
            />
          )}
          
          {activityData && (
            <BarChart
              title="Subreddit Activity"
              data={activityData}
              xDataKey="date"
              series={[
                { dataKey: "posts", name: "Posts", color: "#8884d8" },
                { dataKey: "comments", name: "Comments", color: "#82ca9d" }
              ]}
            />
          )}
        </div>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {botScore && (
            <BotScoreCard
              username={botScore.username}
              score={botScore.score}
              details={botScore.details}
            />
          )}
          
          {sentimentResults && sentimentResults.slice(0, 3).map((result, index) => (
            <SentimentCard
              key={index}
              title={result.title}
              sentimentScore={result.sentimentScore}
              details={result.details}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
