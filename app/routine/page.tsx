import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { getRoutines } from "@/lib/actions/routines"
import { RoutinePageClient } from "@/components/routine-page-client"

export default async function RoutinePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const routines = await getRoutines(user.id)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user} />

      <main className="flex-1 flex flex-col min-w-0">
        <Header user={user} />

        <div className="flex-1 overflow-auto">
          <RoutinePageClient routines={routines} userId={user.id} />
        </div>
      </main>
    </div>
  )
}
