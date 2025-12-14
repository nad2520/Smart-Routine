"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Moon, Apple, Clock, Lightbulb, Salad, Zap, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function DailyCheckin() {
  const { toast } = useToast()
  const [hoursSlept, setHoursSlept] = useState([6])
  const [sleepQuality, setSleepQuality] = useState<string>("average")
  const [focusLevel, setFocusLevel] = useState([40])
  const [goals, setGoals] = useState([
    { id: 1, text: "Complete project proposal", checked: true },
    { id: 2, text: "Review study materials", checked: false },
    { id: 3, text: "Exercise for 30 minutes", checked: false },
  ])

  const toggleGoal = (id: number) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, checked: !goal.checked } : goal)))
  }

  const getSleepQualityColor = (hours: number) => {
    if (hours >= 7) return "text-emerald-500"
    if (hours >= 5) return "text-amber-500"
    return "text-red-500"
  }

  const getFocusColor = (level: number) => {
    if (level >= 70) return "text-emerald-500"
    if (level >= 40) return "text-amber-500"
    return "text-red-500"
  }

  return (
    <Card className="col-span-1 lg:col-span-2 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Daily Smart Check-in</CardTitle>
            <CardDescription className="text-sm">
              Tell us about your day so we can optimize your routine
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sleep" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 p-1 h-auto bg-muted/50">
            <TabsTrigger
              value="sleep"
              className="flex items-center gap-2 py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <Moon className="h-4 w-4" />
              <span className="hidden sm:inline">Sleep & Energy</span>
              <span className="sm:hidden">Sleep</span>
            </TabsTrigger>
            <TabsTrigger
              value="nutrition"
              className="flex items-center gap-2 py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <Apple className="h-4 w-4" />
              <span className="hidden sm:inline">Nutrition</span>
              <span className="sm:hidden">Food</span>
            </TabsTrigger>
            <TabsTrigger
              value="time"
              className="flex items-center gap-2 py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Time Management</span>
              <span className="sm:hidden">Time</span>
            </TabsTrigger>
          </TabsList>

          {/* Sleep & Energy Tab */}
          <TabsContent value="sleep" className="space-y-5 mt-0">
            <div className="space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Hours Slept</label>
                  <span className={`text-2xl font-bold ${getSleepQualityColor(hoursSlept[0])}`}>{hoursSlept[0]}h</span>
                </div>
                <Slider
                  value={hoursSlept}
                  onValueChange={setHoursSlept}
                  max={12}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0h</span>
                  <span className="text-emerald-500">Optimal: 7-9h</span>
                  <span>12h</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Sleep Quality</label>
                <div className="flex gap-2">
                  {[
                    {
                      value: "poor",
                      label: "Poor",
                      color:
                        "border-red-200 data-[state=active]:bg-red-50 data-[state=active]:border-red-400 data-[state=active]:text-red-700",
                    },
                    {
                      value: "average",
                      label: "Average",
                      color:
                        "border-amber-200 data-[state=active]:bg-amber-50 data-[state=active]:border-amber-400 data-[state=active]:text-amber-700",
                    },
                    {
                      value: "excellent",
                      label: "Excellent",
                      color:
                        "border-emerald-200 data-[state=active]:bg-emerald-50 data-[state=active]:border-emerald-400 data-[state=active]:text-emerald-700",
                    },
                  ].map((quality) => (
                    <Button
                      key={quality.value}
                      variant="outline"
                      size="sm"
                      data-state={sleepQuality === quality.value ? "active" : "inactive"}
                      onClick={() => setSleepQuality(quality.value)}
                      className={`flex-1 ${quality.color}`}
                    >
                      {quality.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">How do you feel this morning?</label>
                <Textarea
                  placeholder="Describe how you're feeling..."
                  className="min-h-[80px] resize-none bg-muted/30 border-0 focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>

              <Button
                className="w-full h-11"
                onClick={() => {
                  toast({
                    title: "Analysis Complete",
                    description: "Sleep data recorded. Insight generated below.",
                  })
                }}
              >
                Analyze Sleep
              </Button>

              {/* AI Insight Card */}
              <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-4 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Lightbulb className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-primary">AI Insight</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      6 hours is below your target. We have adjusted your schedule to include a 20-minute power nap at
                      2:00 PM.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="space-y-5 mt-0">
            <div className="space-y-5">
              <div className="space-y-3">
                <label className="text-sm font-medium">What did you eat for your last meal?</label>
                <Textarea
                  placeholder="Describe your meal..."
                  className="min-h-[80px] resize-none bg-muted/30 border-0 focus-visible:ring-2 focus-visible:ring-primary"
                  defaultValue="Coffee with sugar, croissant, orange juice"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Hydration Level</label>
                <Select defaultValue="good">
                  <SelectTrigger className="bg-muted/30 border-0 h-11">
                    <SelectValue placeholder="Select hydration level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (less than 1L)</SelectItem>
                    <SelectItem value="good">Good (2L)</SelectItem>
                    <SelectItem value="optimal">Optimal (3L+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full h-11"
                onClick={() => {
                  toast({
                    title: "Nutrition Logged",
                    description: "Your meal has been analyzed for nutritional value.",
                  })
                }}
              >
                Analyze Nutrition
              </Button>

              {/* AI Tip Card */}
              <div className="rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10 p-4 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                    <Salad className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-accent">Nutrition Tip</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      High sugar intake detected. This may cause an energy crash around 3 PM. Suggestion: Switch your
                      afternoon snack to nuts or fruit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Time Management Tab */}
          <TabsContent value="time" className="space-y-5 mt-0">
            <div className="space-y-5">
              <div className="space-y-3">
                <label className="text-sm font-medium">Top 3 Goals for Today</label>
                <div className="space-y-2">
                  {goals.map((goal, index) => (
                    <div
                      key={goal.id}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${goal.checked
                        ? "bg-emerald-500/10 border-2 border-emerald-500/20"
                        : "bg-muted/50 border-2 border-transparent hover:border-muted"
                        }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                        {index + 1}
                      </span>
                      <Checkbox
                        id={`goal-${goal.id}`}
                        checked={goal.checked}
                        onCheckedChange={() => toggleGoal(goal.id)}
                      />
                      <label
                        htmlFor={`goal-${goal.id}`}
                        className={`text-sm flex-1 cursor-pointer ${goal.checked ? "line-through text-muted-foreground" : "font-medium"
                          }`}
                      >
                        {goal.text}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Current Focus Level</label>
                  <span className={`text-2xl font-bold ${getFocusColor(focusLevel[0])}`}>{focusLevel[0]}%</span>
                </div>
                <Slider
                  value={focusLevel}
                  onValueChange={setFocusLevel}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span className="text-emerald-500">Good: 70%+</span>
                  <span>100%</span>
                </div>
              </div>

              <Button
                className="w-full h-11"
                onClick={() => {
                  toast({
                    title: "Schedule Optimized",
                    description: "Adjustments made based on your current focus level.",
                  })
                }}
              >
                Optimize Schedule
              </Button>

              {/* AI Adjustment Card */}
              <div className="rounded-2xl border-2 border-chart-4/30 bg-gradient-to-br from-chart-4/5 to-chart-4/10 p-4 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-chart-4/20 flex items-center justify-center shrink-0">
                    <Zap className="h-4 w-4 text-chart-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-chart-4">Schedule Adjustment</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your focus is low (40%). We have switched your difficult Math study block to a lighter Review
                      session.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
