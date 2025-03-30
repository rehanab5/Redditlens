
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnalysisForm } from "@/components/dashboard/AnalysisForm";
import { InfluencerCard } from "@/components/dashboard/InfluencerCard";
import { RedditInsightAPI } from "@/backend/api";
import { Influencer } from "@/types/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function InfluencerDetection() {
  const [isLoading, setIsLoading] = useState(false);
  const [influencers, setInfluencers] = useState<Influencer[] | null>(null);
  const [subredditName, setSubredditName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const detectInfluencers = async (subreddit: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(`Requesting influencers for r/${subreddit}...`);
      // Get data from the backend API
      const results = await RedditInsightAPI.getSubredditInfluencers(subreddit);
      console.log(`Received ${results.length} influencers for r/${subreddit}`);
      
      setInfluencers(results);
      setSubredditName(subreddit);
      
      if (results.length > 0) {
        toast.success(`Found ${results.length} influencers in r/${subreddit}`);
      } else {
        setError("No influencers found in this subreddit. Please try another one.");
        toast.warning("No influencers found. Try another subreddit.");
      }
    } catch (error) {
      console.error("Error detecting influencers:", error);
      setError("Error connecting to Reddit API. Please try again later.");
      toast.error("Error detecting influencers");
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = () => {
    if (!influencers) return;
    
    // Create CSV content
    const headers = "Username,Score,Followers,Engagement(%),Topics,Sentiment,Bot Probability\n";
    const rows = influencers.map(inf => 
      `${inf.username},${inf.score},${inf.followers},${inf.engagement},"${inf.topics.join(', ')}",${inf.sentiment},${inf.botProbability}`
    ).join("\n");
    
    const csv = headers + rows;
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `influencers_${subredditName}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Influencer data exported successfully");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Influencer Detection</h1>
        <p className="text-muted-foreground">
          Identify influential users in a subreddit based on engagement, follower count, and content impact.
        </p>

        <AnalysisForm
          title="Find Subreddit Influencers"
          placeholder="Enter a subreddit name (without r/)"
          buttonText="Detect Influencers"
          onSubmit={detectInfluencers}
          isLoading={isLoading}
          description="Discover the most influential users in a community"
        />
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        {isLoading && (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
        
        {influencers && influencers.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Influencers in r/{subredditName}</h2>
              <Button onClick={exportData} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {influencers.map((influencer, index) => (
                <InfluencerCard key={index} {...influencer} />
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
