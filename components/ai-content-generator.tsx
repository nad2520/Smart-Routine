"use client"

import { useState } from "react"
import { Sparkles, Loader2, Copy, Check, RefreshCw, Lightbulb, Target, Calendar, Brain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type ContentType = "motivation" | "goals" | "schedule" | "insight"

interface GeneratedContent {
  type: ContentType
  title: string
  content: string
  timestamp: Date
}

const contentTypes = [
  { id: "motivation" as ContentType, label: "Daily Motivation", icon: Lightbulb },
  { id: "goals" as ContentType, label: "Goal Suggestions", icon: Target },
  { id: "schedule" as ContentType, label: "Schedule Optimization", icon: Calendar },
  { id: "insight" as ContentType, label: "Personal Insight", icon: Brain },
]

const mockGenerations: Record<ContentType, { title: string; content: string }[]> = {
  motivation: [
    {
      title: "Morning Momentum",
      content:
        "Start your day with intention. Research shows that people who establish morning routines are 33% more productive throughout the day. Your current streak of 5 consecutive check-ins demonstrates growing self-awareness - build on this momentum today.",
    },
    {
      title: "Progress Over Perfection",
      content:
        "You've shown remarkable consistency this week. Remember: small daily improvements compound into remarkable results. Your 78% task completion rate is above average - focus on maintaining this sustainable pace.",
    },
  ],
  goals: [
    {
      title: "Weekly Focus Areas",
      content:
        "Based on your patterns, consider prioritizing: 1) Deep work sessions before 11 AM when your energy peaks, 2) Physical activity during your 3 PM energy dip, 3) Creative tasks after lunch when your mind is relaxed but alert.",
    },
    {
      title: "Skill Development Path",
      content:
        "Your analytics show strong consistency in routine tasks but room for growth in creative pursuits. Consider adding one 30-minute learning block daily - this aligns with your peak cognitive hours.",
    },
  ],
  schedule: [
    {
      title: "Optimized Tomorrow",
      content:
        "Based on your sleep data and productivity patterns, here's an optimized schedule: Wake 6:30 AM → Morning routine 7:00-7:45 → Deep work 8:00-11:00 → Meetings 11:00-12:30 → Lunch & rest 12:30-1:30 → Collaborative work 1:30-4:00 → Exercise 4:00-5:00 → Wind down 5:00+.",
    },
    {
      title: "Energy-Aligned Blocks",
      content:
        "Your data suggests peak performance during morning hours. Consider batching challenging tasks between 9-11 AM. Your afternoon energy dips at 3 PM - schedule low-stakes tasks or movement during this window.",
    },
  ],
  insight: [
    {
      title: "Sleep-Performance Correlation",
      content:
        "Analysis of your last 30 days shows a clear pattern: on days following 7+ hours of sleep, your task completion rate increases by 23% and your self-reported mood averages 4.2/5 vs 3.1/5 on sleep-deprived days.",
    },
    {
      title: "Stress Trigger Patterns",
      content:
        "Your check-in data reveals elevated stress on Mondays and Thursdays, correlating with meeting-heavy schedules. Consider implementing 10-minute buffer periods between meetings to reduce cognitive overload.",
    },
  ],
}

export function AIContentGenerator() {
  const [selectedType, setSelectedType] = useState<ContentType>("motivation")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const options = mockGenerations[selectedType]
    const randomContent = options[Math.floor(Math.random() * options.length)]

    setGeneratedContent({
      type: selectedType,
      title: randomContent.title,
      content: randomContent.content,
      timestamp: new Date(),
    })
    setIsGenerating(false)
  }

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          AI Content Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Content Type Selection */}
        <div className="grid grid-cols-2 gap-2">
          {contentTypes.map((type) => {
            const Icon = type.icon
            const isSelected = selectedType === type.id
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                  isSelected
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-muted/30 border-border/50 text-muted-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {type.label}
              </button>
            )
          })}
        </div>

        {/* Generate Button */}
        <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-primary hover:bg-primary/90">
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate {contentTypes.find((t) => t.id === selectedType)?.label}
            </>
          )}
        </Button>

        {/* Generated Content Display */}
        {generatedContent && (
          <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-foreground">{generatedContent.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    Generated {generatedContent.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{generatedContent.content}</p>
            </div>

            {/* AI Disclaimer */}
            <p className="text-xs text-muted-foreground text-center">
              Content generated based on your routine data and preferences
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
