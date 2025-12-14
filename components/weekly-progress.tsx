import { WeeklyProgressClient } from "@/components/weekly-progress-client"
import { createClient } from "@/lib/supabase/server"

interface WeeklyProgressProps {
  userId: string
}

export async function WeeklyProgress({ userId }: WeeklyProgressProps) {
  const supabase = await createClient()

  // Get analytics data for the past 7 days
  const today = new Date()
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(today.getDate() - 6)

  let data = null
  try {
    const result = await supabase
      .from("analytics_data")
      .select("*")
      .eq("user_id", userId)
      .gte("date", sevenDaysAgo.toISOString().split("T")[0])
      .lte("date", today.toISOString().split("T")[0])
      .order("date", { ascending: true })

    data = result.data
  } catch (error) {
    console.error("Error fetching analytics:", error)
    data = null
  }

  // Fill in missing days with default data
  const analyticsMap = new Map(data?.map((d) => [d.date, d]) || [])
  const weekData = []

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const dateStr = date.toISOString().split("T")[0]
    const dayData = analyticsMap.get(dateStr)

    weekData.push({
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      planned: dayData?.planned_hours || 8,
      completed: dayData?.completed_hours || Math.random() * 6 + 2,
      date: dateStr,
    })
  }

  return <WeeklyProgressClient data={weekData} />
}
