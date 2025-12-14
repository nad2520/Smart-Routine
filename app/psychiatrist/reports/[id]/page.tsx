
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { checkIsPsychiatrist } from "@/lib/actions/roles"
import { getReportById } from "@/lib/actions/user-reports"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, User, FileText, ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function ReportPage(props: PageProps) {
    const params = await props.params;
    const { id } = params

    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/auth/login")
    }

    const isPsychiatrist = await checkIsPsychiatrist()

    if (!isPsychiatrist) {
        redirect("/")
    }

    const report = await getReportById(id)

    if (!report) {
        notFound()
    }

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar user={user} userRole="psychiatrist" />

            <main className="flex-1 flex flex-col min-w-0">
                <Header user={user} title="Report Details" />

                <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
                    <div className="mb-6">
                        <Link href="/psychiatrist">
                            <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:underline">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>

                    <Card className="mb-6">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-2xl">{report.title}</CardTitle>
                                    <CardDescription className="flex items-center gap-4 mt-2">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4" />
                                            Session: {new Date(report.session_date).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <User className="w-4 h-4" />
                                            Patient: {report.user_name || report.user_email}
                                        </span>
                                    </CardDescription>
                                </div>
                                <Badge variant={report.is_private ? "secondary" : "default"}>
                                    {report.is_private ? "Private" : "Shared"}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Session Content
                                </h3>
                                <div className="bg-muted/30 p-4 rounded-lg text-sm whitespace-pre-wrap">
                                    {report.content}
                                </div>
                            </div>

                            {report.diagnosis && (
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Diagnosis</h3>
                                    <div className="bg-blue-50/50 p-4 rounded-lg text-sm whitespace-pre-wrap border border-blue-100">
                                        {report.diagnosis}
                                    </div>
                                </div>
                            )}

                            {report.recommendations && (
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Recommendations</h3>
                                    <div className="bg-green-50/50 p-4 rounded-lg text-sm whitespace-pre-wrap border border-green-100">
                                        {report.recommendations}
                                    </div>
                                </div>
                            )}

                            {report.follow_up_date && (
                                <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 p-3 rounded-lg border border-orange-100 w-fit">
                                    <Clock className="w-4 h-4" />
                                    <strong>Follow-up scheduled:</strong> {new Date(report.follow_up_date).toLocaleDateString()}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
