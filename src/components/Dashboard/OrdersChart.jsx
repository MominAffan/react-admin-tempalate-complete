"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@mui/material"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const OrdersChart = ({ timeRange }) => {
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    // Generate sample order status data
    const generateData = () => {
      const baseData = {
        pending: 45,
        processing: 32,
        shipped: 78,
        delivered: 156,
        cancelled: 12,
      }

      const multiplier = timeRange === "30d" ? 1.5 : timeRange === "7d" ? 1 : 0.3

      return {
        labels: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        datasets: [
          {
            data: Object.values(baseData).map((val) => Math.floor(val * multiplier)),
            backgroundColor: ["#ff9800", "#2196f3", "#9c27b0", "#4caf50", "#f44336"],
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      }
    }

    setChartData(generateData())
  }, [timeRange])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || ""
            const value = context.parsed
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: ${value} (${percentage}%)`
          },
        },
      },
    },
    cutout: "60%",
  }

  return (
    <Card sx={{ height: 400 }}>
      <CardHeader title="Order Status" subheader="Current order distribution" />
      <CardContent sx={{ height: "calc(100% - 80px)" }}>
        {chartData && <Doughnut data={chartData} options={options} />}
      </CardContent>
    </Card>
  )
}

export default OrdersChart
