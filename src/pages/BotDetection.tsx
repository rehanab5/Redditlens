
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnalysisForm } from "@/components/dashboard/AnalysisForm";
import { BotScoreCard } from "@/components/dashboard/BotScoreCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSubredditBots, mockUserBotScore } from "@/services/mockData";
import { toast } from "sonner";

export default function BotDetection() {
  const [activeTab, setActiveTab] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  const [userResult, setUserResult] = useState<null | typeof mockUserBotScore>(null);
  const [subredditResults, setSubredditResults] = useState<typeof mockSubredditBots | null>(null);

  const analyzeUser = async (username: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUserResult(mockUserBotScore);
      toast.success(`Analysis complete for user: ${username}`);
    } catch (error) {
      toast.error("Error analyzing user");
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeSubreddit = async (subreddit: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubredditResults(mockSubredditBots);
      toast.success(`Analysis complete for subreddit: r/${subreddit}`);
    } catch (error) {
      toast.error("Error analyzing subreddit");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Bot Detection</h1>
        <p className="text-muted-foreground">
          Analyze Reddit users and subreddits to detect bot-like behavior patterns.
        </p>

        <Tabs defaultValue="user" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User Analysis</TabsTrigger>
            <TabsTrigger value="subreddit">Subreddit Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="user" className="space-y-6">
            <AnalysisForm
              title="Analyze User"
              placeholder="Enter a Reddit username"
              buttonText="Analyze User"
              onSubmit={analyzeUser}
              isLoading={isLoading}
              description="Determine if a specific Reddit user exhibits bot-like behavior"
            />
            
            {userResult && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
                <BotScoreCard
                  username={userResult.username}
                  score={userResult.score}
                  details={userResult.details}
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="subreddit" className="space-y-6">
            <AnalysisForm
              title="Analyze Subreddit"
              placeholder="Enter a subreddit name (without r/)"
              buttonText="Analyze Subreddit"
              onSubmit={analyzeSubreddit}
              isLoading={isLoading}
              description="Find potential bots within a subreddit"
            />
            
            {subredditResults && subredditResults.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Potential Bots Found</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
