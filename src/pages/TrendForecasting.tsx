
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnalysisForm } from "@/components/dashboard/AnalysisForm";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { RedditInsightAPI } from "@/backend/api";
import { TrendData, ActivityData } from "@/types/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function TrendForecasting() {
  const [isLoading, setIsLoading] = useState(false);
  const [trendData, setTrendData] = useState<TrendData[] | null>(null);
  const [activityData, setActivityData] = useState<ActivityData[] | null>(null);
  const [subredditName, setSubredditName] = useState("");

  const analyzeTrends = async (subreddit: string) => {
    setIsLoading(true);
    try {
      // Get data from the backend API
      const [trendResults, activityResults] = await Promise.all([
        RedditInsightAPI.getTrendData(subreddit),
        RedditInsightAPI.getActivityData(subreddit)
      ]);
      
      setTrendData(trendResults);
      setActivityData(activityResults);
      setSubredditName(subreddit);
      toast.success(`Trend analysis complete for r/${subreddit}`);
    } catch (error) {
      console.error("Error analyzing trends:", error);
      toast.error("Error analyzing trends");
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = () => {
    if (!trendData) return;
    
    // Create CSV content for trend data
    const headers = "Date,Actual Value,Predicted Value\n";
    const rows = trendData.map(item => 
      `${item.date},${item.value || ""},${item.predictedValue || ""}`
    ).join("\n");
    
    const csv = headers + rows;
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `trends_${subredditName}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Trend data exported successfully");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Trend Forecasting</h1>
        <p className="text-muted-foreground">
          Analyze activity trends in a subreddit and predict future growth patterns.
        </p>

        <AnalysisForm
          title="Analyze Subreddit Trends"
          placeholder="Enter a subreddit name (without r/)"
          buttonText="Analyze Trends"
          onSubmit={analyzeTrends}
          isLoading={isLoading}
          description="Track historical data and predict future activity"
        />
        
        {trendData && trendData.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Trend Analysis Results for r/{subredditName}</h2>
              <Button onClick={exportData} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2">
              <LineChart
                title="Activity Trend Forecast"
                data={trendData}
                xDataKey="date"
                series={[
                  { dataKey: "value", name: "Historical", color: "#8884d8" },
                  { dataKey: "predictedValue", name: "Forecast", color: "#82ca9d" }
                ]}
              />
              
              {activityData && activityData.length > 0 && (
                <BarChart
                  title="Historical Engagement"
                  data={activityData}
                  xDataKey="date"
                  series={[
                    { dataKey: "posts", name: "Posts", color: "#8884d8" },
                    { dataKey: "comments", name: "Comments", color: "#82ca9d" }
                  ]}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
