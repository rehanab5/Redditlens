
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnalysisForm } from "@/components/dashboard/AnalysisForm";
import { BotScoreCard } from "@/components/dashboard/BotScoreCard";
import { RedditInsightAPI } from "@/backend/api";
import { BotScore } from "@/types/api";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function BotDetection() {
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingSubreddit, setIsLoadingSubreddit] = useState(false);
  const [userResult, setUserResult] = useState<BotScore | null>(null);
  const [subredditResults, setSubredditResults] = useState<BotScore[] | null>(null);
  const [subredditName, setSubredditName] = useState("");

  const analyzeUser = async (username: string) => {
    setIsLoadingUser(true);
    try {
      // Get data from the backend API
      const result = await RedditInsightAPI.analyzeBotUser(username);
      setUserResult(result);
      toast.success(`Bot analysis complete for u/${username}`);
    } catch (error) {
      console.error("Error analyzing user:", error);
      toast.error("Error analyzing user");
    } finally {
      setIsLoadingUser(false);
    }
  };

  const analyzeSubreddit = async (subreddit: string) => {
    setIsLoadingSubreddit(true);
    try {
      // Get data from the backend API
      const results = await RedditInsightAPI.getSubredditBots(subreddit);
      setSubredditResults(results);
      setSubredditName(subreddit);
      toast.success(`Found ${results.length} potential bots in r/${subreddit}`);
    } catch (error) {
      console.error("Error analyzing subreddit:", error);
      toast.error("Error analyzing subreddit");
    } finally {
      setIsLoadingSubreddit(false);
    }
  };

  const exportData = () => {
    if (!subredditResults) return;
    
    // Create CSV content
    const headers = "Username,Bot Score,Account Age,Comment Patterns,Post Frequency,Content Diversity,Interaction Ratio\n";
    const rows = subredditResults.map(bot => {
      const detailsMap = bot.details.reduce((acc, curr) => {
        acc[curr.criteriaName] = curr.score;
        return acc;
      }, {} as Record<string, number>);
      
      return `${bot.username},${bot.score},${detailsMap["Account Age"] || 0},${detailsMap["Comment Patterns"] || 0},${detailsMap["Post Frequency"] || 0},${detailsMap["Content Diversity"] || 0},${detailsMap["Interaction Ratio"] || 0}`;
    }).join("\n");
    
    const csv = headers + rows;
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bots_${subredditName}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Bot detection data exported successfully");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Bot Detection</h1>
        <p className="text-muted-foreground">
          Analyze Reddit users and subreddits to identify potential bot accounts based on behavior patterns.
        </p>

        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User Analysis</TabsTrigger>
            <TabsTrigger value="subreddit">Subreddit Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="user" className="mt-6">
            <AnalysisForm
              title="Analyze Reddit User"
              placeholder="Enter a Reddit username (without u/)"
              buttonText="Analyze User"
              onSubmit={analyzeUser}
              isLoading={isLoadingUser}
              description="Check if a specific user might be a bot account"
            />
            
            {userResult && (
              <div className="mt-6">
                <BotScoreCard 
                  username={userResult.username}
                  score={userResult.score} 
                  details={userResult.details}
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="subreddit" className="mt-6">
            <AnalysisForm
              title="Scan Subreddit for Bots"
              placeholder="Enter a subreddit name (without r/)"
              buttonText="Scan Subreddit"
              onSubmit={analyzeSubreddit}
              isLoading={isLoadingSubreddit}
              description="Find potential bot accounts active in a subreddit"
            />
            
            {subredditResults && subredditResults.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Potential Bots in r/{subredditName}</h2>
                  <Button onClick={exportData} variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {subredditResults.map((bot, index) => (
                    <BotScoreCard 
                      key={index}
                      username={bot.username}
                      score={bot.score} 
                      details={bot.details}
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
