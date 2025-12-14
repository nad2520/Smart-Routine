"use client"

import { AlertCircle, CheckCircle, Sparkles, TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { useToast } from "@/hooks/use-toast"

export function SmartAnalysisCard() {
  const { toast } = useToast()
  const isBalanced = false

  return (
    <Card className="col-span-1 lg:col-span-2 overflow-hidden relative">
      <div
        className={`absolute inset-0 ${isBalanced
          ? "bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent"
          : "bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent"
          }`}
      />

      {/* Decorative element */}
      <div
        className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl ${isBalanced ? "bg-emerald-500/20" : "bg-amber-500/20"
          }`}
      />

      <div className="relative p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-1">
            {isBalanced ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Status</span>
                    <h2 className="text-lg font-semibold text-foreground">Schedule Balanced</h2>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Your routine is well-distributed across the week. Great job maintaining focus and avoiding overload!
                </p>
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                  <TrendingUp className="w-4 h-4" />
                  <span>Productivity up 12% this week</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">Alert</span>
                    <h2 className="text-lg font-semibold text-foreground">High Risk of Overload</h2>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  We detected a concentration of tasks on Tuesday. Consider redistributing work to prevent burnout and
                  maintain consistent energy.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Tuesday Overload", "4+ hrs focused work", "No breaks scheduled"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <Button
            className="gap-2 shrink-0 shadow-lg shadow-primary/20 sm:self-start"
            onClick={() => {
              toast({
                title: "Optimizing Routine",
                description: "AI is analyzing your schedule for improvements...",
              })
              setTimeout(() => {
                toast({
                  title: "Optimization Complete",
                  description: "Your routine has been updated for better balance.",
                  variant: "default",
                })
              }, 2000)
            }}
          >
            <Sparkles className="w-4 h-4" />
            Optimize Routine
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
