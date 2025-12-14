import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Brain, BookOpen, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoodTracker } from "@/components/mood-tracker"
import { PsychologyReports } from "@/components/psychology-reports"
import { InsightsDashboard } from "@/components/insights-dashboard"

export default async function PsychologyPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch psychology reports
  const { data: reports } = await supabase
    .from("psychology_reports")
    .select("*")
    .order("published_date", { ascending: false })

  // Fetch mood logs
  const { data: moodLogs } = await supabase
    .from("mood_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(30)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user} />

      <main className="flex-1 flex flex-col min-w-0">
        <Header user={user} />

        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-foreground flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  Psychology Center
                </h1>
                <p className="text-sm text-muted-foreground mt-1">Professional insights and mental health resources</p>
              </div>
            </div>

            {/* Mood & Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <MoodTracker userId={user.id} moodLogs={moodLogs || []} />
              <InsightsDashboard userId={user.id} moodLogs={moodLogs || []} />
            </div>

            {/* Professional Reports Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Professional Reports
                </h2>
                <div className="flex items-center gap-2">
                  <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search reports..." className="pl-9 w-64" />
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Filter className="w-4 h-4" />
                    Filter
                  </Button>
                </div>
              </div>

              <PsychologyReports reports={reports || []} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
