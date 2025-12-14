import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { checkIsAdmin } from "@/lib/actions/roles"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const isAdmin = await checkIsAdmin()

  if (!isAdmin) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user} />

      <main className="flex-1 flex flex-col min-w-0">
        <Header user={user} title="Admin Dashboard" />

        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
            <AdminDashboard />
          </div>
        </div>
      </main>
    </div>
  )
}
