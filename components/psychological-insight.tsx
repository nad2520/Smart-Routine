import { createClient } from "@/lib/supabase/server"
import { PsychologicalInsightClient } from "./psychological-insight-client"
import { Button } from "./ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface PsychologicalInsightProps {
  userId: string
}

export async function PsychologicalInsight({ userId }: PsychologicalInsightProps) {
  const supabase = await createClient()

  let moods = []
  try {
    const { data } = await supabase
      .from("mood_logs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(7)

    moods = data || []
  } catch (error) {
    console.error("Error fetching moods:", error)
    moods = []
  }

  return (
    <div className="col-span-1 space-y-4">
      <PsychologicalInsightClient userId={userId} recentMoods={moods} />

      <Button asChild variant="outline" className="w-full bg-transparent hover:bg-accent/50 transition-colors">
        <Link href="/psychology" className="gap-2">
          View Psychology Center
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  )
}
