"use client"

import { Lightbulb } from "lucide-react"
import { Card } from "./ui/card"
import { useState, useTransition } from "react"
import { createMoodLog } from "@/lib/actions/moods"

interface PsychologicalInsightClientProps {
  userId: string
  recentMoods: any[]
}

export function PsychologicalInsightClient({ userId, recentMoods }: PsychologicalInsightClientProps) {
  const [mood, setMood] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const moods = [
    { emoji: "😊", label: "Good", value: "good" },
    { emoji: "😐", label: "Neutral", value: "neutral" },
    { emoji: "😴", label: "Tired", value: "tired" },
    { emoji: "😤", label: "Stressed", value: "stressed" },
  ]

  const handleMoodSelect = (moodValue: string) => {
    setMood(moodValue)
    startTransition(async () => {
      await createMoodLog(userId, moodValue)
    })
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="flex items-start gap-3 mb-4">
        <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <h2 className="text-lg font-semibold text-foreground">Psychological Insight</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        We noticed you often skip tasks after 2 PM. Try taking a <span className="font-semibold">15-minute break</span>{" "}
        now to recharge and maintain momentum.
      </p>

      <div className="mb-4 p-3 rounded-lg bg-background/50 border border-border">
        <p className="text-xs text-muted-foreground italic">
          "Progress is not about perfection. Small consistent actions lead to remarkable results." - James Clear
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">How are you feeling right now?</p>
        <div className="grid grid-cols-4 gap-2">
          {moods.map((m) => (
            <button
              key={m.value}
              onClick={() => handleMoodSelect(m.value)}
              disabled={isPending}
              className={`py-2 rounded-lg transition-all text-2xl hover:scale-110 ${
                mood === m.value ? "ring-2 ring-primary bg-primary/10 scale-105" : "hover:bg-muted"
              }`}
            >
              {m.emoji}
            </button>
          ))}
        </div>
        {mood && (
          <p className="text-xs text-center text-muted-foreground animate-fade-in">
            Mood logged! Track your patterns in the Psychology Center
          </p>
        )}
      </div>
    </Card>
  )
}
