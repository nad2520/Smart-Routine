import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AIContentGenerator } from "@/components/ai-content-generator"
import { AIAnalysisFeatures } from "@/components/ai-analysis-features"
import { Sparkles, MessageSquare, Zap, History } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const recentGenerations = [
  { type: "Sleep", title: "Weekly Sleep Report", time: "2 hours ago" },
  { type: "Schedule", title: "Optimized Tomorrow", time: "Yesterday" },
  { type: "Nutrition", title: "Protein Intake Analysis", time: "2 days ago" },
]

export default async function AIAssistantPage() {
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
        <Header user={user} title="AI Assistant" />
        <div className="flex-1 overflow-auto p-6 space-y-8">
          <AIAnalysisFeatures />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main AI Generator - Takes 2 columns */}
            <div className="lg:col-span-2">
              <AIContentGenerator />
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Zap className="w-4 h-4 text-primary" />
                    AI Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Analyses today</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total this month</span>
                    <span className="font-medium">148</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Saved insights</span>
                    <span className="font-medium">23</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Generations */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <History className="w-4 h-4 text-primary" />
                    Recent Analyses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {recentGenerations.map((gen, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{gen.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {gen.type} · {gen.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
