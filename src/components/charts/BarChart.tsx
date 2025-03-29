
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface BarChartProps {
  data: Array<Record<string, any>>;
  xDataKey: string;
  series: {
    dataKey: string;
    name: string;
    color: string;
  }[];
  title: string;
  height?: number;
}

export function BarChart({
  data,
  xDataKey,
  series,
  title,
  height = 300,
}: BarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey={xDataKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {series.map((s, i) => (
                <Bar key={i} dataKey={s.dataKey} name={s.name} fill={s.color} />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
