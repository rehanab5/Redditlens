
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { Bot, MessageSquare, TrendingUp, Users } from "lucide-react";
import { mockDashboardStats, mockInfluencerScore, mockSubredditActivity, mockTrendData } from "@/services/mockData";
import { BotScoreCard } from "@/components/dashboard/BotScoreCard";
import { SentimentCard } from "@/components/dashboard/SentimentCard";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Bot Detection"
            value="65%"
            description="Average detection score"
            icon={Bot}
            trend={12}
            iconColor="text-purple-500"
          />
          <StatsCard
            title="Sentiment Analysis"
            value="+0.35"
            description="Overall sentiment"
            icon={MessageSquare}
            trend={-5}
            iconColor="text-blue-500"
          />
          <StatsCard
            title="Trend Forecasting"
            value="+23%"
            description="Activity increase"
            icon={TrendingUp}
            trend={23}
            iconColor="text-green-500"
          />
          <StatsCard
            title="User Analysis"
            value="42"
            description="Users analyzed"
            icon={Users}
            trend={8}
            iconColor="text-orange-500"
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <LineChart
            title="Trend Forecast"
            data={mockTrendData}
            xDataKey="date"
            series={[
              { dataKey: "value", name: "Actual", color: "#8884d8" },
              { dataKey: "predictedValue", name: "Predicted", color: "#82ca9d" }
            ]}
          />
          <BarChart
            title="Subreddit Activity"
            data={mockSubredditActivity}
            xDataKey="date"
            series={[
              { dataKey: "posts", name: "Posts", color: "#8884d8" },
              { dataKey: "comments", name: "Comments", color: "#82ca9d" }
            ]}
          />
        </div>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <BotScoreCard
            username={mockInfluencerScore.username}
            score={mockInfluencerScore.score}
            details={mockInfluencerScore.details}
          />
          {[...Array(3)].map((_, index) => (
            <SentimentCard
              key={index}
              title={`Top Post ${index + 1}`}
              sentimentScore={[0.75, -0.4, 0.2][index]}
              details={{
                positive: [0.8, 0.2, 0.4][index],
                negative: [0.1, 0.6, 0.2][index],
                neutral: [0.1, 0.2, 0.4][index],
              }}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
