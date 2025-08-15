"use client";

import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueAnalytics = () => {
  const data = {
    labels: ["Q1 2023", "Q2 2023", "Q3 2023", "Q4 2023", "Q1 2024", "Q2 2024"],
    datasets: [
      {
        label: "Revenue",
        data: [45000, 52000, 48000, 61000, 55000, 67000],
        borderColor: "rgba(25, 118, 210, 1)",
        backgroundColor: "rgba(25, 118, 210, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Profit",
        data: [12000, 15600, 14400, 18300, 16500, 20100],
        borderColor: "rgba(76, 175, 80, 1)",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue & Profit Trends",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => "$" + value.toLocaleString(),
        },
      },
    },
  };

  const metrics = [
    {
      label: "Total Revenue",
      value: "$328,000",
      change: "+12.5%",
      positive: true,
    },
    {
      label: "Total Profit",
      value: "$97,000",
      change: "+15.2%",
      positive: true,
    },
    { label: "Profit Margin", value: "29.6%", change: "+2.1%", positive: true },
    { label: "Growth Rate", value: "18.3%", change: "+3.4%", positive: true },
  ];

  return (
    <Card>
      <CardHeader
        title="Revenue Analytics"
        subheader="Financial performance and growth metrics"
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {/* Chart */}
          <Box sx={{ flex: "1 1 600px", minWidth: "300px" }}>
            <Box sx={{ height: 300 }}>
              <Line data={data} options={options} />
            </Box>
          </Box>

          {/* Metrics */}
          <Box
            sx={{
              flex: "1 1 300px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: "250px",
            }}
          >
            {metrics.map((metric) => (
              <Box
                key={metric.label}
                sx={{
                  p: 2,
                  bgcolor: "background.paper",
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {metric.label}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {metric.value}
                </Typography>
                <Typography
                  variant="caption"
                  color={metric.positive ? "success.main" : "error.main"}
                  sx={{ fontWeight: 600 }}
                >
                  {metric.change}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RevenueAnalytics;
