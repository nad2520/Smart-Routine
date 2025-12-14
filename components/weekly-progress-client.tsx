"use client"

import { Card } from "./ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useState } from "react"
import { TrendingUp, BarChart3 } from "lucide-react"

interface WeeklyProgressClientProps {
  data: {
    day: string
    planned: number
    completed: number
    date: string
  }[]
}

export function WeeklyProgressClient({ data }: WeeklyProgressClientProps) {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const totalPlanned = data.reduce((sum, d) => sum + d.planned, 0)
  const totalCompleted = data.reduce((sum, d) => sum + d.completed, 0)
  const weeklyCompletionRate = totalPlanned > 0 ? Math.round((totalCompleted / totalPlanned) * 100) : 0

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const completionRate = payload[0].value > 0 ? ((payload[1].value / payload[0].value) * 100).toFixed(0) : 0
      return (
        <div className="bg-card border-2 border-primary/20 rounded-xl p-4 shadow-2xl animate-fade-in">
          <p className="font-semibold text-sm mb-3 text-foreground">{label}</p>
          <div className="space-y-2">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-xs text-muted-foreground">{entry.name}</span>
                </div>
                <span className="font-bold text-sm" style={{ color: entry.color }}>
                  {entry.value.toFixed(1)}h
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Completion Rate</span>
              <span className="font-bold text-sm text-primary">{completionRate}%</span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="p-6 col-span-1 lg:col-span-2 group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Weekly Progress</h2>
            <p className="text-xs text-muted-foreground">
              {totalCompleted.toFixed(1)}h completed of {totalPlanned.toFixed(1)}h planned
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold text-primary">{weeklyCompletionRate}%</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          onMouseMove={(state) => {
            if (state?.activeTooltipIndex !== undefined) {
              setHoveredBar(data[state.activeTooltipIndex]?.day || null)
              setHoveredIndex(state.activeTooltipIndex)
            }
          }}
          onMouseLeave={() => {
            setHoveredBar(null)
            setHoveredIndex(null)
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} vertical={false} />
          <XAxis
            dataKey="day"
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}h`}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.15, radius: 8 }} />
          <Legend
            wrapperStyle={{ paddingTop: "16px" }}
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span className="text-xs text-muted-foreground ml-1">{value}</span>}
          />
          <Bar
            dataKey="planned"
            name="Planned"
            fill="var(--chart-1)"
            radius={[6, 6, 0, 0]}
            opacity={hoveredIndex !== null && hoveredBar ? 0.4 : 0.8}
            className="transition-all duration-300"
          />
          <Bar
            dataKey="completed"
            name="Completed"
            fill="var(--chart-2)"
            radius={[6, 6, 0, 0]}
            opacity={hoveredIndex !== null && hoveredBar ? 1 : 0.9}
            className="transition-all duration-300"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
