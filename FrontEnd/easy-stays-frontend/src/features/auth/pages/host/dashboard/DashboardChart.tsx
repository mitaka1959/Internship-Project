import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, Typography } from "antd";

const { Title } = Typography;

type ChartData = {
  name: string;
  visitors: number;
};

type DashboardChartProps = {
  monthlyStats: ChartData[];
};

const DashboardChart: React.FC<DashboardChartProps> = ({ monthlyStats }) => {
  return (
    <Card style={{ marginBottom: "2rem", backgroundColor: "#ffffff" }}>
      <Title level={4} style={{ color: "#023047", marginBottom: 0 }}>
        Visitor Statistics
      </Title>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={monthlyStats}>
          <defs>
            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FB8500" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FB8500" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="#FB8500"
            strokeWidth={3}
            fill="url(#colorVisitors)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default DashboardChart;
