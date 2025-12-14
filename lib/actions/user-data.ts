"use server"

import { createClient } from "@/lib/supabase/server"
import { checkIsPsychiatrist } from "./roles"

export interface UserDetailedData {
    id: string
    email: string
    full_name: string | null
    created_at: string
    // Activity stats
    total_routines: number
    completed_routines: number
    total_mood_logs: number
    recent_moods: Array<{ mood: string; note: string | null; created_at: string }>
    // Analytics
    total_planned_hours: number
    total_completed_hours: number
    productivity_rate: number
    // Reports
    total_reports: number
    last_session_date: string | null
}

export async function getUserDetailedData(userId: string): Promise<UserDetailedData | null> {
    const supabase = await createClient()
    const isPsychiatrist = await checkIsPsychiatrist()

    if (!isPsychiatrist) {
        throw new Error("Unauthorized: Psychiatrist access required")
    }

    // Get user profile
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (!profile) return null

    // Get routines stats
    const { data: routines } = await supabase.from("routines").select("id, completed").eq("user_id", userId)

    const totalRoutines = routines?.length || 0
    const completedRoutines = routines?.filter((r) => r.completed).length || 0

    // Get mood logs
    const { data: moodLogs } = await supabase
        .from("mood_logs")
        .select("mood, note, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10)

    // Get analytics data
    const { data: analytics } = await supabase.from("analytics_data").select("*").eq("user_id", userId)

    const totalPlannedHours = analytics?.reduce((sum, a) => sum + Number(a.planned_hours), 0) || 0
    const totalCompletedHours = analytics?.reduce((sum, a) => sum + Number(a.completed_hours), 0) || 0
    const productivityRate = totalPlannedHours > 0 ? (totalCompletedHours / totalPlannedHours) * 100 : 0

    // Get user reports count and last session
    const { data: reports } = await supabase
        .from("user_reports")
        .select("session_date")
        .eq("user_id", userId)
        .order("session_date", { ascending: false })

    return {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        created_at: profile.created_at,
        total_routines: totalRoutines,
        completed_routines: completedRoutines,
        total_mood_logs: moodLogs?.length || 0,
        recent_moods: moodLogs || [],
        total_planned_hours: totalPlannedHours,
        total_completed_hours: totalCompletedHours,
        productivity_rate: Math.round(productivityRate),
        total_reports: reports?.length || 0,
        last_session_date: reports?.[0]?.session_date || null,
    }
}

export async function getAllUsersWithStats(): Promise<UserDetailedData[]> {
    const supabase = await createClient()
    const isPsychiatrist = await checkIsPsychiatrist()

    if (!isPsychiatrist) {
        throw new Error("Unauthorized: Psychiatrist access required")
    }

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return []

    // Fetch assigned patients
    const { data: assignments } = await supabase
        .from("psychiatrist_patients")
        .select("patient_id")
        .eq("psychiatrist_id", user.id)

    // Handle case where table doesn't exist or no patients
    if (!assignments || assignments.length === 0) {
        return []
    }

    const patientIds = assignments.map((a) => a.patient_id)

    // Get assigned users
    const { data: profiles } = await supabase
        .from("profiles")
        .select("id, email, full_name, created_at")
        .in("id", patientIds)
        .order("full_name", { ascending: true })

    if (!profiles) return []

    // Fetch data for each user
    const usersWithStats = await Promise.all(
        profiles.map(async (profile) => {
            const data = await getUserDetailedData(profile.id)
            return data!
        }),
    )

    return usersWithStats.filter(Boolean)
}
