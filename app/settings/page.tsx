

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { SettingsContent } from "@/components/settings-content"
import { getUserRole } from "@/lib/actions/roles"

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const userRole = await getUserRole()

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user} userRole={userRole || undefined} />

      <main className="flex-1 flex flex-col min-w-0">
        <Header user={user} title="Settings" />

        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
            <SettingsContent user={user} profile={profile} userRole={userRole} />
          </div>
        </div>
      </main>
    </div>
  )
}
