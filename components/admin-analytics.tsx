import { createClient } from "@/lib/supabase/server"
import { AdminAnalyticsClient } from "@/components/admin-analytics-client"

export async function AdminAnalytics() {
  const supabase = await createClient()

  // Fetch aggregated analytics data
  const { data: routinesData } = await supabase.from("routines").select("user_id, completed, created_at")

  const { data: moodData } = await supabase.from("mood_logs").select("mood, created_at")

  const { data: analyticsData } = await supabase.from("analytics_data").select("date, planned_hours, completed_hours")

  return (
    <AdminAnalyticsClient
      routinesData={routinesData || []}
      moodData={moodData || []}
      analyticsData={analyticsData || []}
    />
  )
}
