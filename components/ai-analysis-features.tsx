"use client"

import { useState } from "react"
import {
  Moon,
  Utensils,
  Calendar,
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Lightbulb,
  Target,
} from "lucide-react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type AnalysisType = "sleep" | "nutrition" | "schedule"

interface AnalysisResult {
  score: number
  status: "excellent" | "good" | "needs-attention"
  insights: string[]
  recommendations: string[]
  metrics: { label: string; value: string; trend: "up" | "down" | "neutral" }[]
}

const mockResults: Record<AnalysisType, AnalysisResult> = {
  sleep: {
    score: 78,
    status: "good",
    insights: [
      "Your average sleep duration this week is 6.8 hours, slightly below the recommended 7-8 hours.",
      "Sleep quality peaks on weekends when you maintain a consistent bedtime.",
      "Late-night screen time correlates with 23% longer time to fall asleep.",
    ],
    recommendations: [
      "Try a 10pm digital sunset to improve sleep onset by ~15 minutes",
      "Consider a consistent wake time, even on weekends, to regulate your circadian rhythm",
      "Your room temperature of 72°F may be too warm - optimal is 65-68°F",
    ],
    metrics: [
      { label: "Avg Duration", value: "6.8 hrs", trend: "down" },
      { label: "Sleep Quality", value: "78%", trend: "up" },
      { label: "Deep Sleep", value: "1.2 hrs", trend: "neutral" },
    ],
  },
  nutrition: {
    score: 85,
    status: "excellent",
    insights: [
      "Protein intake averages 95g daily, meeting your 90g goal consistently.",
      "Hydration has improved 40% since adding morning water reminders.",
      "Evening snacking decreased by 60% this month.",
    ],
    recommendations: [
      "Add more leafy greens to boost micronutrient intake",
      "Consider spacing meals 4-5 hours apart for optimal energy",
      "Your caffeine cutoff at 2pm is working well - maintain this habit",
    ],
    metrics: [
      { label: "Avg Calories", value: "2,150", trend: "neutral" },
      { label: "Protein Goal", value: "106%", trend: "up" },
      { label: "Water Intake", value: "2.8L", trend: "up" },
    ],
  },
  schedule: {
    score: 72,
    status: "needs-attention",
    insights: [
      "You're most productive between 9-11am - currently underutilized for deep work.",
      "Meeting density on Tuesdays causes 45% productivity drop on Wednesdays.",
      "Task switching frequency is 3x higher in afternoons.",
    ],
    recommendations: [
      "Block 9-11am for focused deep work on high-priority tasks",
      "Batch meetings on Monday/Thursday to protect creative days",
      "Add 15-min buffers between meetings to reduce context switching",
      "Schedule low-energy tasks (emails, admin) for 2-3pm energy dip",
    ],
    metrics: [
      { label: "Focus Time", value: "3.2 hrs", trend: "down" },
      { label: "Tasks Done", value: "82%", trend: "up" },
      { label: "Meeting Load", value: "12 hrs", trend: "up" },
    ],
  },
}

const analysisConfig = {
  sleep: {
    title: "Analyze Sleep",
    description: "AI-powered sleep pattern analysis",
    icon: Moon,
    gradient: "from-indigo-500 via-purple-500 to-indigo-600",
    lightBg: "bg-indigo-50",
    accentColor: "text-indigo-600",
    ringColor: "ring-indigo-500/20",
  },
  nutrition: {
    title: "Analyze Nutrition",
    description: "Smart dietary insights & tracking",
    icon: Utensils,
    gradient: "from-emerald-500 via-teal-500 to-emerald-600",
    lightBg: "bg-emerald-50",
    accentColor: "text-emerald-600",
    ringColor: "ring-emerald-500/20",
  },
  schedule: {
    title: "Optimize Schedule",
    description: "Intelligent time management",
    icon: Calendar,
    gradient: "from-amber-500 via-orange-500 to-amber-600",
    lightBg: "bg-amber-50",
    accentColor: "text-amber-600",
    ringColor: "ring-amber-500/20",
  },
}

function StatusBadge({ status }: { status: AnalysisResult["status"] }) {
  const config = {
    excellent: {
      icon: CheckCircle2,
      text: "Excellent",
      className: "bg-emerald-100 text-emerald-700 ring-emerald-500/20",
    },
    good: { icon: TrendingUp, text: "Good", className: "bg-blue-100 text-blue-700 ring-blue-500/20" },
    "needs-attention": {
      icon: AlertCircle,
      text: "Needs Attention",
      className: "bg-amber-100 text-amber-700 ring-amber-500/20",
    },
  }
  const { icon: Icon, text, className } = config[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ring-1 ${className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {text}
    </span>
  )
}

function TrendIndicator({ trend }: { trend: "up" | "down" | "neutral" }) {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-emerald-500" />
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-500" />
  return (
    <div className="w-4 h-4 flex items-center justify-center">
      <div className="w-3 h-0.5 bg-muted-foreground/50 rounded" />
    </div>
  )
}

function AnalysisCard({ type, onAnalyze }: { type: AnalysisType; onAnalyze: () => void }) {
  const config = analysisConfig[type]
  const Icon = config.icon

  return (
    <Card
      className={`group cursor-pointer border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 active:scale-[0.98] overflow-hidden`}
      onClick={onAnalyze}
    >
      <CardContent className="p-0">
        {/* Gradient header */}
        <div className={`bg-gradient-to-br ${config.gradient} p-5 sm:p-6`}>
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 group-hover:text-white transition-all" />
          </div>
        </div>
        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="font-semibold text-base sm:text-lg mb-1">{config.title}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">{config.description}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Tap to analyze</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AnalysisResultCard({
  type,
  result,
  onClose,
}: { type: AnalysisType; result: AnalysisResult; onClose: () => void }) {
  const config = analysisConfig[type]
  const Icon = config.icon

  return (
    <Card className="border-2 border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden animate-scale-in">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-br ${config.gradient} p-4 sm:p-6`}>
        <div className="flex items-start sm:items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-xl text-white">{config.title} Results</CardTitle>
              <p className="text-xs sm:text-sm text-white/70 flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3" />
                AI-Generated Analysis
              </p>
            </div>
          </div>
          <StatusBadge status={result.status} />
        </div>
      </div>

      <CardContent className="p-4 sm:p-6 space-y-5 sm:space-y-6">
        {/* Score Circle */}
        <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-muted/50">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="42%"
                stroke="currentColor"
                strokeWidth="8%"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="50%"
                cy="50%"
                r="42%"
                stroke="currentColor"
                strokeWidth="8%"
                fill="none"
                strokeDasharray={`${result.score * 2.64} 264`}
                className="text-primary transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-bold text-2xl sm:text-3xl">{result.score}</span>
              <span className="text-[10px] text-muted-foreground">/ 100</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm sm:text-base">Overall Health Score</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Based on your recent data patterns and behavior analysis
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {result.metrics.map((metric, i) => (
            <div key={i} className="p-3 sm:p-4 rounded-xl bg-muted/30 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className="font-bold text-sm sm:text-base">{metric.value}</span>
                <TrendIndicator trend={metric.trend} />
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Insights */}
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-primary" />
            </div>
            Key Insights
          </h4>
          <ul className="space-y-2.5">
            {result.insights.map((insight, i) => (
              <li key={i} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                {insight}
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Target className="w-4 h-4 text-amber-500" />
            </div>
            AI Recommendations
          </h4>
          <ul className="space-y-2">
            {result.recommendations.map((rec, i) => (
              <li
                key={i}
                className="text-xs sm:text-sm p-3 sm:p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-2.5 leading-relaxed"
              >
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 h-11 sm:h-12 rounded-xl bg-transparent" onClick={onClose}>
            Close
          </Button>
          <Button className="flex-1 h-11 sm:h-12 rounded-xl gap-2">
            <RefreshCw className="w-4 h-4" />
            Re-analyze
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function AIAnalysisFeatures() {
  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisType | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleAnalyze = (type: AnalysisType) => {
    setActiveAnalysis(type)
    setIsAnalyzing(true)
    setResult(null)

    setTimeout(() => {
      setIsAnalyzing(false)
      setResult(mockResults[type])
    }, 2000)
  }

  const handleClose = () => {
    setActiveAnalysis(null)
    setResult(null)
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">AI Analysis Hub</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Get personalized insights powered by AI</p>
        </div>
      </div>

      {!activeAnalysis ? (
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <AnalysisCard type="sleep" onAnalyze={() => handleAnalyze("sleep")} />
          <AnalysisCard type="nutrition" onAnalyze={() => handleAnalyze("nutrition")} />
          <AnalysisCard type="schedule" onAnalyze={() => handleAnalyze("schedule")} />
        </div>
      ) : isAnalyzing ? (
        // Loading state
        <Card className="border-2 border-primary/20">
          <CardContent className="py-12 sm:py-16 flex flex-col items-center justify-center">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <div
                className={`absolute inset-3 sm:inset-4 rounded-full bg-gradient-to-br ${analysisConfig[activeAnalysis].gradient} flex items-center justify-center shadow-lg`}
              >
                {(() => {
                  const Icon = analysisConfig[activeAnalysis].icon
                  return <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                })()}
              </div>
            </div>
            <h3 className="font-semibold text-lg sm:text-xl mb-2 text-center">
              Analyzing {analysisConfig[activeAnalysis].title.split(" ")[1]}...
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-sm px-4">
              Our AI is processing your data to generate personalized insights and recommendations.
            </p>
            <div className="w-48 sm:w-64 mt-6">
              <Progress value={66} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ) : result ? (
        <AnalysisResultCard type={activeAnalysis} result={result} onClose={handleClose} />
      ) : null}
    </div>
  )
}
