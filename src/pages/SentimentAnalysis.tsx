
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnalysisForm } from "@/components/dashboard/AnalysisForm";
import { SentimentCard } from "@/components/dashboard/SentimentCard";
import { RedditInsightAPI } from "@/backend/api";
import { SentimentResult } from "@/types/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function SentimentAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SentimentResult[] | null>(null);
  const [subredditName, setSubredditName] = useState("");

  const analyzeSentiment = async (subreddit: string) => {
    setIsLoading(true);
    try {
      // Get data from the backend API
      const data = await RedditInsightAPI.analyzeSubredditSentiment(subreddit);
      setResults(data);
      setSubredditName(subreddit);
      toast.success(`Sentiment analysis complete for r/${subreddit}`);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      toast.error("Error analyzing sentiment");
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = () => {
    if (!results) return;
    
    // Create CSV content
    const headers = "Title,Sentiment Score,Positive,Negative,Neutral\n";
    const rows = results.map(post => 
      `"${post.title}",${post.sentimentScore},${post.details.positive},${post.details.negative},${post.details.neutral}`
    ).join("\n");
    
    const csv = headers + rows;
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sentiment_${subredditName}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Sentiment data exported successfully");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Sentiment Analysis</h1>
        <p className="text-muted-foreground">
          Analyze the sentiment of top posts in a subreddit to understand community feelings.
        </p>

        <AnalysisForm
          title="Analyze Subreddit Sentiment"
          placeholder="Enter a subreddit name (without r/)"
          buttonText="Analyze Sentiment"
          onSubmit={analyzeSentiment}
          isLoading={isLoading}
          description="Discover the emotional tone of top posts in a subreddit"
        />
        
        {results && results.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Sentiment Analysis Results for r/{subredditName}</h2>
              <Button onClick={exportData} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((post, index) => (
                <SentimentCard
                  key={index}
                  title={post.title}
                  sentimentScore={post.sentimentScore}
                  details={post.details}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
