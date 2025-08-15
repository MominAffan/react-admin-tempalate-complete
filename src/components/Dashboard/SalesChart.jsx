"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, IconButton, Menu, MenuItem } from "@mui/material"
import { MoreVert } from "@mui/icons-material"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const SalesChart = ({ timeRange }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    // Generate sample data based on time range
    const generateData = () => {
      const days = timeRange === "24h" ? 24 : timeRange === "7d" ? 7 : 30
      const labels = []
      const salesData = []
      const revenueData = []

      for (let i = days - 1; i >= 0; i--) {
        if (timeRange === "24h") {
          labels.push(`${23 - i}:00`)
        } else {
          const date = new Date()
          date.setDate(date.getDate() - i)
          labels.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }))
        }

        salesData.push(Math.floor(Math.random() * 1000) + 500)
        revenueData.push(Math.floor(Math.random() * 5000) + 2000)
      }

      return {
        labels,
        datasets: [
          {
            label: "Sales",
            data: salesData,
            borderColor: "#1976d2",
            backgroundColor: "rgba(25, 118, 210, 0.1)",
            fill: true,
            tension: 0.4,
          },
          {
            label: "Revenue ($)",
            data: revenueData,
            borderColor: "#dc004e",
            backgroundColor: "rgba(220, 0, 78, 0.1)",
            fill: true,
            tension: 0.4,
            yAxisID: "y1",
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
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card sx={{ height: 400 }}>
      <CardHeader
        title="Sales & Revenue Overview"
        subheader="Track your sales performance and revenue trends"
        action={
          <IconButton onClick={handleMenuClick}>
            <MoreVert />
          </IconButton>
        }
      />
      <CardContent sx={{ height: "calc(100% - 80px)" }}>
        {chartData && <Line data={chartData} options={options} />}
      </CardContent>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Export Chart</MenuItem>
        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
        <MenuItem onClick={handleMenuClose}>Share</MenuItem>
      </Menu>
    </Card>
  )
}

export default SalesChart
