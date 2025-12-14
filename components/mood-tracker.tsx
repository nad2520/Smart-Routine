"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { useState, useTransition } from "react"
import { createMoodLog } from "@/lib/actions/moods"

interface MoodLog {
  id: string
  mood: string
  created_at: string
  note: string | null
}

interface MoodTrackerProps {
  userId: string
  moodLogs: MoodLog[]
}

const moodOptions = [
  { value: "great", emoji: "😊", label: "Great", color: "text-green-500" },
  { value: "good", emoji: "🙂", label: "Good", color: "text-blue-500" },
  { value: "okay", emoji: "😐", label: "Okay", color: "text-yellow-500" },
  { value: "tired", emoji: "😴", label: "Tired", color: "text-orange-500" },
  { value: "stressed", emoji: "😤", label: "Stressed", color: "text-red-500" },
]

export function MoodTracker({ userId, moodLogs }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleMoodSelect = (moodValue: string) => {
    setSelectedMood(moodValue)
    startTransition(async () => {
      await createMoodLog(userId, moodValue)
    })
  }

  const getMoodEmoji = (mood: string) => {
    return moodOptions.find((m) => m.value === mood)?.emoji || "😐"
  }

  const recentMoods = moodLogs.slice(0, 7)

  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Heart className="w-5 h-5 text-primary" />
          Mood Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-3">How are you feeling today?</p>
          <div className="grid grid-cols-5 gap-2">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                onClick={() => handleMoodSelect(mood.value)}
                disabled={isPending}
                className={`py-3 rounded-xl transition-all text-3xl hover:scale-110 hover:bg-muted ${
                  selectedMood === mood.value ? "ring-2 ring-primary bg-primary/10 scale-105" : ""
                }`}
                title={mood.label}
              >
                {mood.emoji}
              </button>
            ))}
          </div>
          {selectedMood && (
            <p className="text-xs text-center text-muted-foreground mt-2 animate-fade-in">Mood logged successfully!</p>
          )}
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm font-medium mb-3">Recent Mood History</p>
          <div className="space-y-2">
            {recentMoods.map((log) => (
              <div key={log.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                <span className="text-2xl">{getMoodEmoji(log.mood)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium capitalize">{log.mood}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(log.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {recentMoods.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No mood logs yet. Start tracking your mood today!
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
