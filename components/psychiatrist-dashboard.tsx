import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PsychiatristReports } from "@/components/psychiatrist-reports"
import { PatientsList } from "@/components/patients-list"
import { getUsersForPsychiatrist } from "@/lib/actions/roles"
import { getReportsByPsychiatrist } from "@/lib/actions/user-reports"
import { FileText, Users, Calendar, TrendingUp } from "lucide-react"

export async function PsychiatristDashboard() {
  const patients = await getUsersForPsychiatrist()
  console.log(patients);
  console.log("hi");
  const reports = await getReportsByPsychiatrist()

  const stats = [
    {
      title: "Total Patients",
      value: patients.length,
      icon: Users,
      description: "Active patients",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Reports Written",
      value: reports.length,
      icon: FileText,
      description: "All time",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "This Month",
      value: reports.filter((r) => new Date(r.created_at).getMonth() === new Date().getMonth()).length,
      icon: Calendar,
      description: "Reports this month",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Follow-ups",
      value: reports.filter((r) => r.follow_up_date && new Date(r.follow_up_date) >= new Date()).length,
      icon: TrendingUp,
      description: "Upcoming sessions",
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
              className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
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

      {/* Patients List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Patients</CardTitle>
          <CardDescription>Manage patient reports and sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <PatientsList patients={patients} />
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Your recently created patient reports</CardDescription>
        </CardHeader>
        <CardContent>
          <PsychiatristReports reports={reports} />
        </CardContent>
      </Card>
    </div>
  )
}
