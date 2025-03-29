
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User } from "lucide-react";

interface InfluencerCardProps {
  username: string;
  score: number;
  followers: number;
  engagement: number;
  topics: string[];
  sentiment: number;
  botProbability: number;
}

export function InfluencerCard({
  username,
  score,
  followers,
  engagement,
  topics,
  sentiment,
  botProbability
}: InfluencerCardProps) {
  // Format numbers for display
  const formatNumber = (num: number) => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;
  };

  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-blue-500";
    return "text-orange-500";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <span className="truncate">{username}</span>
          </div>
          <span className={getScoreColor(score)}>{score}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs text-muted-foreground">Followers</div>
            <div className="font-medium">{formatNumber(followers)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Engagement %</div>
            <div className="font-medium">{engagement}%</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs text-muted-foreground">Sentiment</div>
              <div className="font-medium">
                {sentiment >= 0.7 ? "Positive" : sentiment >= 0.4 ? "Neutral" : "Negative"}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Bot Probability</div>
              <div className="font-medium">{Math.round(botProbability * 100)}%</div>
            </div>
          </div>
          <Progress 
            value={(1 - botProbability) * 100}
            className={botProbability <= 0.3 ? "bg-green-500" : botProbability <= 0.7 ? "bg-amber-500" : "bg-red-500"}
          />
        </div>
        
        <div>
          <div className="text-xs text-muted-foreground mb-2">Topics</div>
          <div className="flex flex-wrap gap-1">
            {topics.map((topic, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
