"use client"

import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface SentimentChartProps {
  data: any
}

export function SentimentChart({ data }: SentimentChartProps) {
  const chartData = [
    { name: "Positive", value: data.positive_count, color: "#10b981" },
    { name: "Neutral", value: data.neutral_count, color: "#f59e0b" },
    { name: "Negative", value: data.negative_count, color: "#ef4444" },
  ]

  return (
    <Card className="p-6 gradient-border chart-neon">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Sentiment Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={105}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip wrapperStyle={{ background: 'rgba(20,22,48,0.9)', borderRadius: 8, border: '1px solid rgba(120,150,255,0.3)', color: '#fff' }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}
