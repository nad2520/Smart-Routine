import { getRoutines } from "@/lib/actions/routines"
import { TodaysScheduleClient } from "@/components/todays-schedule-client"

interface TodaysScheduleProps {
  userId: string
}

export async function TodaysSchedule({ userId }: TodaysScheduleProps) {
  let routines = []
  try {
    routines = await getRoutines(userId)
  } catch (error) {
    console.error("Error fetching routines:", error)
    routines = []
  }

  return <TodaysScheduleClient routines={routines} userId={userId} />
}
