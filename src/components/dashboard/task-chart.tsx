import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    total: 2,
  },
  {
    name: "Feb",
    total: 3,
  },
  {
    name: "Mar",
    total: 4,
  },
  {
    name: "Apr",
    total: 3,
  },
  {
    name: "May",
    total: 5,
  },
  {
    name: "Jun",
    total: 4,
  },
  {
    name: "Jul",
    total: 6,
  },
  {
    name: "Aug",
    total: 5,
  },
  {
    name: "Sep",
    total: 7,
  },
  {
    name: "Oct",
    total: 8,
  },
  {
    name: "Nov",
    total: 9,
  },
  {
    name: "Dec",
    total: 12,
  },
];

export function TaskChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Task Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
