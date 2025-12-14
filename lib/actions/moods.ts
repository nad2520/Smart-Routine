"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createMoodLog(userId: string, mood: string, note?: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("mood_logs")
    .insert({
      user_id: userId,
      mood,
      note: note || null,
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath("/")
  revalidatePath("/psychology")
  return data
}

export async function getMoodLogs(userId: string, limit = 30) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("mood_logs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}
