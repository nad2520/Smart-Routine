"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from "recharts"
import { TrendingUp, Users, Activity } from "lucide-react"

interface AdminAnalyticsClientProps {
  routinesData: Array<{ user_id: string; completed: boolean; created_at: string }>
  moodData: Array<{ mood: string; created_at: string }>
  analyticsData: Array<{ date: string; planned_hours: number; completed_hours: number }>
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]
const MOOD_COLORS: Record<string, string> = {
  Happy: "#22c55e",
  Great: "#16a34a",
  Excellent: "#15803d",
  Neutral: "#eab308",
  Sad: "#ef4444",
  Bad: "#dc2626",
  Terrible: "#b91c1c",
}

export function AdminAnalyticsClient({ routinesData, moodData, analyticsData }: AdminAnalyticsClientProps) {
  const routineStats = useMemo(() => {
    const totalRoutines = routinesData.length
    const completedRoutines = routinesData.filter((r) => r.completed).length
    const completionRate = totalRoutines > 0 ? (completedRoutines / totalRoutines) * 100 : 0

    // Group by week
    const weeklyData = routinesData.reduce(
      (acc, routine) => {
        const date = new Date(routine.created_at)
        const week = `Week ${Math.ceil(date.getDate() / 7)}`
        if (!acc[week]) acc[week] = { total: 0, completed: 0 }
        acc[week].total++
        if (routine.completed) acc[week].completed++
        return acc
      },
      {} as Record<string, { total: number; completed: number }>,
    )

    const chartData = Object.entries(weeklyData).map(([week, data]) => ({
      week,
      total: data.total,
      completed: data.completed,
      rate: ((data.completed / data.total) * 100).toFixed(1),
    }))

    return { totalRoutines, completedRoutines, completionRate: completionRate.toFixed(1), chartData }
  }, [routinesData])

  const moodStats = useMemo(() => {
    const moodCounts = moodData.reduce(
      (acc, log) => {
        acc[log.mood] = (acc[log.mood] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const chartData = Object.entries(moodCounts)
      .map(([mood, count]) => ({
        mood,
        count,
        fill: MOOD_COLORS[mood] || "#8884d8",
      }))
      .sort((a, b) => b.count - a.count)

    return { chartData }
  }, [moodData])

  const performanceData = useMemo(() => {
    // Group by week and calculate averages
    const weeklyPerformance = analyticsData.reduce(
      (acc, entry) => {
        const date = new Date(entry.date)
        const week = `${date.getMonth() + 1}/${Math.ceil(date.getDate() / 7)}`
        if (!acc[week]) {
          acc[week] = { planned: 0, completed: 0, count: 0 }
        }
        acc[week].planned += Number(entry.planned_hours)
        acc[week].completed += Number(entry.completed_hours)
        acc[week].count++
        return acc
      },
      {} as Record<string, { planned: number; completed: number; count: number }>,
    )

    const chartData = Object.entries(weeklyPerformance).map(([week, data]) => ({
      week,
      planned: Number((data.planned / data.count).toFixed(1)),
      completed: Number((data.completed / data.count).toFixed(1)),
    }))

    return chartData
  }, [analyticsData])

  return (
    <div className="space-y-6">
      {/* Routine Completion Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="group hover:shadow-md transition-all duration-300 border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Routines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{routineStats.totalRoutines}</div>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 text-blue-600" />
              <span>Created across platform</span>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-md transition-all duration-300 border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{routineStats.completionRate}%</div>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <Activity className="w-3 h-3 text-green-600" />
              <span>Global average</span>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-md transition-all duration-300 border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Reflections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">{moodData.length}</div>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <Users className="w-3 h-3 text-purple-600" />
              <span>Total mood entries</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Routine Completion Chart */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>System Activity</CardTitle>
            <CardDescription>Routine creation vs completion volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={routineStats.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="week" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "0.5rem",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    cursor={{ fill: "rgba(0,0,0,0.05)" }}
                  />
                  <Legend />
                  <Bar dataKey="total" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Total Created" maxBarSize={50} />
                  <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} name="Completed" maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Mood Distribution */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Emotional Health Overview</CardTitle>
            <CardDescription>Distribution of user mood entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moodStats.chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="count"
                    nameKey="mood"
                  >
                    {moodStats.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "0.5rem",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trend */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Productivity Trends</CardTitle>
          <CardDescription>Average planned vs completed hours across system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="week" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "0.5rem",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="planned"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPlanned)"
                  name="Avg. Planned Hours"
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCompleted)"
                  name="Avg. Completed Hours"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
