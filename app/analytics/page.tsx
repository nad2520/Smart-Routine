import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { BarChart3, TrendingUp, TrendingDown, Calendar, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { label: "Tasks Completed", value: "156", change: "+12%", trend: "up" },
  { label: "Average Focus Time", value: "4.2h", change: "+8%", trend: "up" },
  { label: "Streak Days", value: "12", change: "+3", trend: "up" },
  { label: "Missed Tasks", value: "8", change: "-23%", trend: "down" },
]

const weeklyData = [
  { day: "Mon", completed: 8, total: 10 },
  { day: "Tue", completed: 7, total: 9 },
  { day: "Wed", completed: 9, total: 10 },
  { day: "Thu", completed: 6, total: 8 },
  { day: "Fri", completed: 8, total: 10 },
  { day: "Sat", completed: 5, total: 6 },
  { day: "Sun", completed: 4, total: 5 },
]

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar user={user} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} title="Analytics" />
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-border/50">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-semibold">{stat.value}</span>
                    <div
                      className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"
                        }`}
                    >
                      {stat.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {stat.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Weekly Chart */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="w-4 h-4 text-primary" />
                Weekly Task Completion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-2 h-48">
                {weeklyData.map((day) => {
                  const percentage = (day.completed / day.total) * 100
                  return (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full h-36 bg-muted/30 rounded-lg relative overflow-hidden">
                        <div
                          className="absolute bottom-0 w-full bg-primary/80 rounded-lg transition-all"
                          style={{ height: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{day.day}</span>
                      <span className="text-xs font-medium">
                        {day.completed}/{day.total}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Goals Progress */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="w-4 h-4 text-primary" />
                Monthly Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Complete 200 tasks", progress: 78, current: 156, target: 200 },
                { name: "Maintain 10+ day streak", progress: 100, current: 12, target: 10 },
                { name: "Average 5h focus time", progress: 84, current: 4.2, target: 5 },
              ].map((goal) => (
                <div key={goal.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{goal.name}</span>
                    <span className="text-muted-foreground">
                      {goal.current}/{goal.target}
                    </span>
                  </div>
                  <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${Math.min(goal.progress, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
