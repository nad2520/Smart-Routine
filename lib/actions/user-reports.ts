"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { checkIsPsychiatrist } from "./roles"

export interface UserReport {
  id: string
  user_id: string
  psychiatrist_id: string
  title: string
  content: string
  diagnosis: string | null
  recommendations: string | null
  session_date: string
  follow_up_date: string | null
  is_private: boolean
  created_at: string
  updated_at: string
  user_email?: string
  user_name?: string
  psychiatrist_email?: string
  psychiatrist_name?: string
}

export async function createUserReport(formData: {
  user_id: string
  title: string
  content: string
  diagnosis?: string
  recommendations?: string
  session_date: string
  follow_up_date?: string
  is_private?: boolean
}) {
  const supabase = await createClient()
  const isPsychiatrist = await checkIsPsychiatrist()

  if (!isPsychiatrist) {
    throw new Error("Unauthorized: Psychiatrist access required")
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("User not authenticated")

  const { data, error } = await supabase
    .from("user_reports")
    .insert({
      ...formData,
      psychiatrist_id: user.id,
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath("/psychiatrist")
  revalidatePath("/psychiatrist/reports")
  return data
}

export async function updateUserReport(reportId: string, updates: Partial<UserReport>) {
  const supabase = await createClient()
  const isPsychiatrist = await checkIsPsychiatrist()

  if (!isPsychiatrist) {
    throw new Error("Unauthorized: Psychiatrist access required")
  }

  const { data, error } = await supabase
    .from("user_reports")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", reportId)
    .select()
    .single()

  if (error) throw error

  revalidatePath("/psychiatrist")
  revalidatePath("/psychiatrist/reports")
  return data
}

export async function deleteUserReport(reportId: string) {
  const supabase = await createClient()
  const isPsychiatrist = await checkIsPsychiatrist()

  if (!isPsychiatrist) {
    throw new Error("Unauthorized: Psychiatrist access required")
  }

  const { error } = await supabase.from("user_reports").delete().eq("id", reportId)

  if (error) throw error

  revalidatePath("/psychiatrist")
  revalidatePath("/psychiatrist/reports")
}

export async function getReportsForUser(userId: string): Promise<UserReport[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("user_reports")
    .select("*")
    .eq("user_id", userId)
    .order("session_date", { ascending: false })

  if (error) throw error
  if (!data || data.length === 0) return []

  // Fetch profiles separately
  const psychiatristIds = [...new Set(data.map((report) => report.psychiatrist_id))]
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, email, full_name")
    .in("id", [...psychiatristIds, userId])

  const profileMap = new Map(profiles?.map((p) => [p.id, p]) || [])

  return data.map((report: any) => {
    const userProfile = profileMap.get(report.user_id)
    const psychiatristProfile = profileMap.get(report.psychiatrist_id)
    return {
      ...report,
      user_email: userProfile?.email,
      user_name: userProfile?.full_name,
      psychiatrist_email: psychiatristProfile?.email,
      psychiatrist_name: psychiatristProfile?.full_name,
    }
  })
}

export async function getReportsByPsychiatrist(): Promise<UserReport[]> {
  const supabase = await createClient()
  const isPsychiatrist = await checkIsPsychiatrist()

  if (!isPsychiatrist) {
    throw new Error("Unauthorized: Psychiatrist access required")
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("User not authenticated")

  const { data, error } = await supabase
    .from("user_reports")
    .select("*")
    .eq("psychiatrist_id", user.id)
    .order("session_date", { ascending: false })

  if (error) throw error

  // Fetch user profiles separately to avoid foreign key relationship issues
  if (!data || data.length === 0) return []

  const userIds = [...new Set(data.map((report) => report.user_id))]
  const { data: profiles } = await supabase.from("profiles").select("id, email, full_name").in("id", userIds)

  const profileMap = new Map(profiles?.map((p) => [p.id, p]) || [])

  return data.map((report: any) => {
    const userProfile = profileMap.get(report.user_id)
    return {
      ...report,
      user_email: userProfile?.email,
      user_name: userProfile?.full_name,
    }
  })
}

export async function getAllReports(): Promise<UserReport[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("user_reports")
    .select("*")
    .order("session_date", { ascending: false })

  if (error) throw error
  if (!data || data.length === 0) return []

  // Fetch all relevant profiles
  const userIds = [...new Set(data.map((report) => report.user_id))]
  const psychiatristIds = [...new Set(data.map((report) => report.psychiatrist_id))]
  const allIds = [...new Set([...userIds, ...psychiatristIds])]

  const { data: profiles } = await supabase.from("profiles").select("id, email, full_name").in("id", allIds)

  const profileMap = new Map(profiles?.map((p) => [p.id, p]) || [])

  return data.map((report: any) => {
    const userProfile = profileMap.get(report.user_id)
    const psychiatristProfile = profileMap.get(report.psychiatrist_id)
    return {
      ...report,
      user_email: userProfile?.email,
      user_name: userProfile?.full_name,
      psychiatrist_email: psychiatristProfile?.email,
      psychiatrist_name: psychiatristProfile?.full_name,
    }
  })
}

export async function getReportById(reportId: string): Promise<UserReport | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("user_reports").select("*").eq("id", reportId).single()

  if (error) {
    console.error("Error fetching report:", error)
    return null
  }

  if (!data) return null

  // Fetch profiles
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, email, full_name")
    .in("id", [data.user_id, data.psychiatrist_id])

  const profileMap = new Map(profiles?.map((p) => [p.id, p]) || [])
  const userProfile = profileMap.get(data.user_id)
  const psychiatristProfile = profileMap.get(data.psychiatrist_id)

  return {
    ...data,
    user_email: userProfile?.email,
    user_name: userProfile?.full_name,
    psychiatrist_email: psychiatristProfile?.email,
    psychiatrist_name: psychiatristProfile?.full_name,
  }
}
