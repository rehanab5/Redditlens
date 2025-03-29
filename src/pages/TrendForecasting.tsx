
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnalysisForm } from "@/components/dashboard/AnalysisForm";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { mockSubredditActivity, mockTrendData } from "@/services/mockData";
import { toast } from "sonner";
import { ArrowUpRight, Download, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TrendForecasting() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    trendData: typeof mockTrendData;
    activityData: typeof mockSubredditActivity;
    subreddit: string;
    growthRate: number;
    peakTime: string;
    prediction: string;
  } | null>(null);

  const analyzeTrends = async (subreddit: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResults({
        trendData: mockTrendData,
        activityData: mockSubredditActivity,
        subreddit,
        growthRate: 23.5,
        peakTime: "Weekends, 6-8 PM EST",
        prediction: "Continued growth expected with seasonal fluctuations. Peak activity predicted in March 2024."
      });
      
      toast.success(`Trend analysis complete for r/${subreddit}`);
    } catch (error) {
      toast.error("Error analyzing trends");
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = () => {
    if (!results) return;
    
    // Create CSV content
    const headers = "Date,Actual Value,Predicted Value\n";
    const rows = results.trendData.map(point => 
      `${point.date},${point.value || ""},${point.predictedValue || ""}`
    ).join("\n");
    
    const csv = headers + rows;
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `trends_${results.subreddit}_${new Date().toISOString().split('T')[0]}.csv`);
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
          Predict future activity and trends for subreddits using historical data.
        </p>

        <AnalysisForm
          title="Forecast Subreddit Trends"
          placeholder="Enter a subreddit name (without r/)"
          buttonText="Analyze Trends"
          onSubmit={analyzeTrends}
          isLoading={isLoading}
          description="Predict future activity patterns for a subreddit"
        />
        
        {results && (
          <div className="mt-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Trend Analysis for r/{results.subreddit}</h2>
              <Button onClick={exportData} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <StatsCard
                title="Growth Rate"
                value={`+${results.growthRate}%`}
                description="Projected annual growth"
                icon={TrendingUp}
                iconColor="text-green-500"
              />
              <StatsCard
                title="Peak Activity Time"
                value={results.peakTime}
                description="Highest engagement periods"
                icon={ArrowUpRight}
                iconColor="text-blue-500"
              />
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Prediction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{results.prediction}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <LineChart
                title="Activity Trend & Forecast"
                data={results.trendData}
                xDataKey="date"
                series={[
                  { dataKey: "value", name: "Historical", color: "#8884d8" },
                  { dataKey: "predictedValue", name: "Forecast", color: "#82ca9d" }
                ]}
              />
              <BarChart
                title="Subreddit Activity"
                data={results.activityData}
                xDataKey="date"
                series={[
                  { dataKey: "posts", name: "Posts", color: "#8884d8" },
                  { dataKey: "comments", name: "Comments", color: "#82ca9d" }
                ]}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
