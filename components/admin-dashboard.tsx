import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UsersManagement } from "@/components/users-management"
import { AdminAnalytics } from "@/components/admin-analytics"
import { Users, BarChart3, Brain, Calendar } from "lucide-react"
import { getAllUsers } from "@/lib/actions/roles"
import { Skeleton } from "@/components/ui/skeleton"

export async function AdminDashboard() {
  const users = await getAllUsers()
  const userCount = users.length
  const adminCount = users.filter((u) => u.role === "admin").length
  const psychiatristCount = users.filter((u) => u.role === "psychiatrist").length
  const regularUserCount = users.filter((u) => u.role === "user").length

  const stats = [
    {
      title: "Total Users",
      value: userCount,
      icon: Users,
      description: "Registered accounts",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Regular Users",
      value: regularUserCount,
      icon: Calendar,
      description: "Active user accounts",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Psychiatrists",
      value: psychiatristCount,
      icon: Brain,
      description: "Licensed professionals",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Administrators",
      value: adminCount,
      icon: BarChart3,
      description: "System administrators",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.title}
              className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-muted"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`${stat.bgColor} p-2.5 rounded-xl transition-transform group-hover:scale-110`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Users Management */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage user roles and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <UsersManagement users={users} />
          </Suspense>
        </CardContent>
      </Card>

      {/* Analytics Overview */}
      <Card>
        <CardHeader>
          <CardTitle>System Analytics</CardTitle>
          <CardDescription>Platform-wide activity and engagement metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <AdminAnalytics />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
