"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type UserRole = "user" | "admin" | "psychiatrist"

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  created_at: string
}

export async function getUserRole(): Promise<UserRole | null> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile, error } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (error || !profile) {
      return "user"
    }

    return (profile.role as UserRole) || "user"
  } catch {
    return "user"
  }
}

export async function checkIsAdmin(): Promise<boolean> {
  try {
    const role = await getUserRole()
    return role === "admin"
  } catch {
    return false
  }
}

export async function checkIsPsychiatrist(): Promise<boolean> {
  try {
    const role = await getUserRole()
    return role === "psychiatrist" || role === "admin"
  } catch {
    return false
  }
}

export async function getAllUsers(): Promise<UserProfile[]> {
  try {
    const supabase = await createClient()
    const isAdmin = await checkIsAdmin()

    if (!isAdmin) {
      throw new Error("Unauthorized: Admin access required")
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, role, created_at")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

export async function updateUserRole(userId: string, newRole: UserRole) {
  const supabase = await createClient()
  const isAdmin = await checkIsAdmin()

  if (!isAdmin) {
    throw new Error("Unauthorized: Admin access required")
  }

  const { error } = await supabase.from("profiles").update({ role: newRole }).eq("id", userId)

  if (error) throw error

  revalidatePath("/admin")
  revalidatePath("/admin/users")
}

export async function getUsersForPsychiatrist(): Promise<UserProfile[]> {
  try {
    const supabase = await createClient()
    const isPsychiatrist = await checkIsPsychiatrist()

    if (!isPsychiatrist) {
      throw new Error("Unauthorized: Psychiatrist access required")
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return []

    // Fetch assigned patients from the join table
    const { data: assignments, error: assignmentError } = await supabase
      .from("psychiatrist_patients")
      .select("patient_id")
      .eq("psychiatrist_id", user.id)

    if (assignmentError) {
      console.warn("Could not fetch patient assignments. Table might not exist yet.", assignmentError)
      return []
    }

    if (!assignments || assignments.length === 0) {
      return []
    }

    const patientIds = assignments.map((a) => a.patient_id)

    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, role, created_at")
      .in("id", patientIds)
      .order("full_name", { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching users for psychiatrist:", error)
    return []
  }
}
