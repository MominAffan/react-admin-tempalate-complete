"use client"

import { Card, CardContent, CardHeader, Grid, Typography, Box, LinearProgress } from "@mui/material"
import { Radar } from "react-chartjs-2"
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js"

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const ProductAnalytics = () => {
  const radarData = {
    labels: ["Electronics", "Clothing", "Books", "Home & Garden", "Sports", "Beauty"],
    datasets: [
      {
        label: "Sales Performance",
        data: [85, 72, 60, 45, 78, 65],
        backgroundColor: "rgba(25, 118, 210, 0.2)",
        borderColor: "rgba(25, 118, 210, 1)",
        borderWidth: 2,
      },
    ],
  }

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
      },
    },
  }

  const categoryPerformance = [
    { name: "Electronics", sales: 245, revenue: "$24,500", growth: 15.2 },
    { name: "Clothing", sales: 189, revenue: "$18,900", growth: 8.7 },
    { name: "Books", sales: 156, revenue: "$7,800", growth: -2.3 },
    { name: "Home & Garden", sales: 134, revenue: "$13,400", growth: 12.1 },
    { name: "Sports", sales: 98, revenue: "$9,800", growth: 5.4 },
  ]

  return (
    <Card>
      <CardHeader title="Product Analytics" subheader="Category performance and product insights" />
      <CardContent>
      <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    gap: 3,
  }}
>
  {/* Radar Chart */}
  <Box sx={{ flex: "1 1 500px", minWidth: "300px" }}>
    <Box sx={{ height: 300 }}>
      <Radar data={radarData} options={radarOptions} />
    </Box>
  </Box>

  {/* Category Performance */}
  <Box sx={{ flex: "1 1 500px", minWidth: "300px" }}>
    <Typography variant="h6" gutterBottom>
      Category Performance
    </Typography>
    {categoryPerformance.map((category) => (
      <Box key={category.name} sx={{ mb: 2 }}>
        {/* Name + Revenue */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="subtitle2">{category.name}</Typography>
          <Typography variant="body2" color="primary">
            {category.revenue}
          </Typography>
        </Box>

        {/* Sales + Growth */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            {category.sales} sales
          </Typography>
          <Typography
            variant="caption"
            color={category.growth > 0 ? "success.main" : "error.main"}
            sx={{ fontWeight: 600 }}
          >
            {category.growth > 0 ? "+" : ""}
            {category.growth}%
          </Typography>
        </Box>

        {/* Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={(category.sales / 245) * 100}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: "grey.200",
            "& .MuiLinearProgress-bar": {
              borderRadius: 3,
            },
          }}
        />
      </Box>
    ))}
  </Box>
</Box>

      </CardContent>
    </Card>
  )
}

export default ProductAnalytics
