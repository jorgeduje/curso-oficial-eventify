import { TrendingUp } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const EventsLinearChart = ({
  chartData,
}: {
  chartData: { month: string; eventos: number }[];
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <CardHeader title="Tendencias de eventos" />
      <Divider />
      <CardContent>
        <Box sx={{ height: 300 }}>
          {chartData.length > 0 ? (
            <ResponsiveContainer>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#006989" />
                <XAxis
                  dataKey="month"
                  tickMargin={10}
                  style={{ fontSize: "0.8rem" }}
                  stroke="#005C78"
                />
                <YAxis allowDecimals={false} stroke="#005C78" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="eventos"
                  stroke="#005C78"
                  strokeWidth={3}
                  dot={{ r: 6, strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flexDirection: "column",
              }}
            >
              <TrendingUp
                sx={{ fontSize: 48, color: "text.disabled", mb: 2 }}
              />
              <Typography>No hay suficientes datos para mostrar</Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventsLinearChart;
