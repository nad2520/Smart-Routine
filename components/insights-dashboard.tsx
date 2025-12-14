"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, TrendingUp, Brain, AlertCircle, Heart } from "lucide-react"

interface MoodLog {
  id: string
  mood: string
  created_at: string
}

interface InsightsDashboardProps {
  userId: string
  moodLogs: MoodLog[]
}

export function InsightsDashboard({ userId, moodLogs }: InsightsDashboardProps) {
  // Calculate mood trends
  const moodCounts = moodLogs.reduce(
    (acc, log) => {
      acc[log.mood] = (acc[log.mood] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const dominantMood = Object.entries(moodCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "neutral"

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Lightbulb className="w-5 h-5 text-primary" />
          Key Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 hover:bg-green-500/15 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-500" />
            <span className="text-sm font-semibold text-green-700 dark:text-green-400">Positive Pattern</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your mood improves significantly on days when you complete your morning routine before 8 AM.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Personalized Recommendation</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Based on your recent {dominantMood} mood trend, consider adding a 10-minute mindfulness session during your
            afternoon energy dip around 3 PM.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/15 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />
            <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">Gentle Reminder</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your stress levels tend to spike mid-week. Try scheduling buffer time between meetings on Wednesdays to
            maintain balance.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/15 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-blue-600 dark:text-blue-500" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">Sleep Connection</span>
          </div>
          <p className="text-sm text-muted-foreground">
            You log more positive moods after nights with 7+ hours of sleep. Prioritize your evening wind-down routine.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
