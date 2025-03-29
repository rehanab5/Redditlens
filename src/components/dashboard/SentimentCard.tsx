
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SentimentCardProps {
  title: string;
  sentimentScore: number;
  details?: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export function SentimentCard({ title, sentimentScore, details }: SentimentCardProps) {
  // Normalize sentiment score to be between 0 and 100
  const normalizedScore = ((sentimentScore + 1) / 2) * 100;
  
  // Determine color based on sentiment
  const getSentimentColor = (score: number) => {
    if (score > 60) return "text-green-500";
    if (score < 40) return "text-red-500";
    return "text-amber-500";
  };

  const getSentimentText = (score: number) => {
    if (score > 60) return "Positive";
    if (score < 40) return "Negative";
    return "Neutral";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm">Sentiment</span>
          <span className={`font-bold ${getSentimentColor(normalizedScore)}`}>
            {getSentimentText(normalizedScore)}
          </span>
        </div>
        
        <Progress
          value={normalizedScore}
          className={getSentimentColor(normalizedScore)}
        />
        
        {details && (
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="space-y-1 text-center">
              <div className="text-xs font-medium text-green-500">Positive</div>
              <div className="text-sm">{Math.round(details.positive * 100)}%</div>
            </div>
            <div className="space-y-1 text-center">
              <div className="text-xs font-medium text-amber-500">Neutral</div>
              <div className="text-sm">{Math.round(details.neutral * 100)}%</div>
            </div>
            <div className="space-y-1 text-center">
              <div className="text-xs font-medium text-red-500">Negative</div>
              <div className="text-sm">{Math.round(details.negative * 100)}%</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
