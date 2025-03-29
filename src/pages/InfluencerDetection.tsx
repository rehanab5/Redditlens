
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnalysisForm } from "@/components/dashboard/AnalysisForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download, User } from "lucide-react";
import { InfluencerCard } from "@/components/dashboard/InfluencerCard";

// Mock data for influencer analysis
const mockInfluencers = [
  {
    username: "tech_innovator",
    score: 87,
    followers: 125000,
    engagement: 4.2,
    topics: ["technology", "AI", "coding"],
    sentiment: 0.76,
    botProbability: 0.12,
  },
  {
    username: "data_scientist_pro",
    score: 92,
    followers: 78500,
    engagement: 6.8,
    topics: ["data science", "machine learning", "statistics"],
    sentiment: 0.82,
    botProbability: 0.08,
  },
  {
    username: "reddit_mod_official",
    score: 76,
    followers: 45200,
    engagement: 3.5,
    topics: ["community", "moderation", "reddit culture"],
    sentiment: 0.58,
    botProbability: 0.22,
  },
  {
    username: "digital_marketer",
    score: 81,
    followers: 62800,
    engagement: 5.1,
    topics: ["marketing", "SEO", "social media"],
    sentiment: 0.68,
    botProbability: 0.15,
  }
];

export default function InfluencerDetection() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<typeof mockInfluencers | null>(null);
  const [subredditName, setSubredditName] = useState("");

  const analyzeInfluencers = async (subreddit: string) => {
    setIsLoading(true);
    try {
      // Simulate API call to backend model
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResults(mockInfluencers);
      setSubredditName(subreddit);
      toast.success(`Influencer analysis complete for r/${subreddit}`);
    } catch (error) {
      toast.error("Error analyzing influencers");
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = () => {
    if (!results) return;
    
    // Create CSV content
    const headers = "Username,Influence Score,Followers,Engagement Rate,Bot Probability,Sentiment Score,Topics\n";
    const rows = results.map(influencer => 
      `${influencer.username},${influencer.score},${influencer.followers},${influencer.engagement},${influencer.botProbability},${influencer.sentiment},"${influencer.topics.join(', ')}"`
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
          Identify influential Reddit users within a subreddit based on engagement, sentiment and community impact.
        </p>

        <AnalysisForm
          title="Find Subreddit Influencers"
          placeholder="Enter a subreddit name (without r/)"
          buttonText="Analyze Influencers"
          onSubmit={analyzeInfluencers}
          isLoading={isLoading}
          description="Discover key users who shape the conversation in a subreddit"
        />
        
        {results && results.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Influencers in r/{subredditName}</h2>
              <Button onClick={exportData} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {results.map((influencer, index) => (
                <InfluencerCard
                  key={index}
                  username={influencer.username}
                  score={influencer.score}
                  followers={influencer.followers}
                  engagement={influencer.engagement}
                  topics={influencer.topics}
                  sentiment={influencer.sentiment}
                  botProbability={influencer.botProbability}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
