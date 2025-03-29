
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: number;
  className?: string;
  iconColor?: string;
  isLoading?: boolean;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  iconColor = "text-primary",
  isLoading = false,
}: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && (
          <Icon className={cn("h-4 w-4", iconColor)} />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? (
            <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
          ) : (
            value
          )}
        </div>
        {description && (
          <CardDescription className="mt-1">
            {isLoading ? (
              <div className="h-4 w-32 animate-pulse rounded bg-muted"></div>
            ) : (
              description
            )}
          </CardDescription>
        )}
        {typeof trend === "number" && !isLoading && (
          <p
            className={cn(
              "mt-2 flex items-center text-xs",
              trend > 0 ? "text-green-500" : "text-red-500"
            )}
          >
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </p>
        )}
        {typeof trend === "number" && isLoading && (
          <div className="mt-2 h-4 w-16 animate-pulse rounded bg-muted"></div>
        )}
      </CardContent>
    </Card>
  );
}
