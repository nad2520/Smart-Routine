import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { SmartAnalysisCard } from "@/components/smart-analysis-card"
import { TodaysSchedule } from "@/components/todays-schedule"
import { PsychologicalInsight } from "@/components/psychological-insight"
import { WeeklyProgress } from "@/components/weekly-progress"
import { DailyCheckin } from "@/components/daily-checkin"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  let userRole: "user" | "admin" | "psychiatrist" = "user"
  try {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (profile?.role) {
      userRole = profile.role as "user" | "admin" | "psychiatrist"
    }
  } catch {
    // Default to user role if profile fetch fails
    userRole = "user"
  }

  // Redirect psychiatrists to their dedicated dashboard
  if (userRole === "psychiatrist") {
    redirect("/psychiatrist")
  }

  // Redirect admins to admin dashboard (if you have one)
  // if (userRole === "admin") {
  //   redirect("/admin")
  // }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user} userRole={userRole} />

      <main className="flex-1 flex flex-col min-w-0">
        <Header user={user} />

        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 lg:space-y-8 max-w-7xl mx-auto">
            {/* Smart Analysis - full width on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <SmartAnalysisCard />
            </div>

            {/* Daily Check-in */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <DailyCheckin />
            </div>

            {/* Schedule & Insights - stack on mobile, side by side on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <TodaysSchedule userId={user.id} />
              <PsychologicalInsight userId={user.id} />
            </div>

            {/* Weekly Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <WeeklyProgress userId={user.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
