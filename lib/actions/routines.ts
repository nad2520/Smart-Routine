"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export interface Routine {
  id: string
  user_id: string
  title: string
  description: string | null
  time: string
  category: string
  icon: string
  color: string
  completed: boolean
  created_at: string
  updated_at: string
}

export async function getRoutines(userId: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("routines")
      .select("*")
      .eq("user_id", userId)
      .order("time", { ascending: true })

    if (error) {
      console.error("Error fetching routines:", error)
      return []
    }
    return data as Routine[]
  } catch (error) {
    console.error("Error in getRoutines:", error)
    return []
  }
}

export async function createRoutine(formData: {
  title: string
  description: string
  time: string
  category: string
  icon: string
  color: string
  userId: string
}) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("routines")
    .insert({
      user_id: formData.userId,
      title: formData.title,
      description: formData.description,
      time: formData.time,
      category: formData.category,
      icon: formData.icon,
      color: formData.color,
      completed: false,
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath("/")
  revalidatePath("/routine")
  return data as Routine
}

export async function updateRoutine(id: string, formData: Partial<Routine>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("routines")
    .update({ ...formData, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error

  revalidatePath("/")
  revalidatePath("/routine")
  return data as Routine
}

export async function deleteRoutine(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("routines").delete().eq("id", id)

  if (error) throw error

  revalidatePath("/")
  revalidatePath("/routine")
}

export async function toggleRoutineCompletion(id: string, completed: boolean) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("routines")
    .update({ completed, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error

  revalidatePath("/")
  revalidatePath("/routine")
  return data as Routine
}
