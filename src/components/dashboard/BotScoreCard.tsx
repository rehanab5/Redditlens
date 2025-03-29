
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BotScoreCardProps {
  username: string;
  score: number;
  details?: {
    criteriaName: string;
    score: number;
    maxScore: number;
  }[];
}

export function BotScoreCard({ username, score, details = [] }: BotScoreCardProps) {
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score <= 30) return "text-green-500";
    if (score <= 70) return "text-amber-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score <= 30) return "bg-green-500";
    if (score <= 70) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{username}</span>
          <span className={getScoreColor(score)}>{score}%</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Bot Probability</div>
          <Progress value={score} className={getProgressColor(score)} />
        </div>

        {details.length > 0 && (
          <div className="space-y-3">
            <div className="text-sm font-medium">Criteria Breakdown</div>
            {details.map((detail, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{detail.criteriaName}</span>
                  <span>
                    {detail.score}/{detail.maxScore}
                  </span>
                </div>
                <Progress value={(detail.score / detail.maxScore) * 100} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
