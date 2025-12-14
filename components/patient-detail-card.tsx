"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import type { UserDetailedData } from "@/lib/actions/user-data"
import {
    User,
    Calendar,
    Activity,
    Brain,
    TrendingUp,
    FileText,
    Clock,
    CheckCircle2,
    Smile,
    Meh,
    Frown,
    Plus,
} from "lucide-react"
import { CreateReportDialog } from "./create-report-dialog"
import type { UserProfile } from "@/lib/actions/roles"

interface PatientDetailCardProps {
    patient: UserDetailedData
}

export function PatientDetailCard({ patient }: PatientDetailCardProps) {
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)

    const getMoodIcon = (mood: string) => {
        const moodLower = mood.toLowerCase()
        if (moodLower.includes("happy") || moodLower.includes("great") || moodLower.includes("excellent"))
            return <Smile className="w-4 h-4 text-green-600" />
        if (moodLower.includes("sad") || moodLower.includes("bad") || moodLower.includes("terrible"))
            return <Frown className="w-4 h-4 text-red-600" />
        return <Meh className="w-4 h-4 text-yellow-600" />
    }

    const getMoodColor = (mood: string) => {
        const moodLower = mood.toLowerCase()
        if (moodLower.includes("happy") || moodLower.includes("great") || moodLower.includes("excellent"))
            return "bg-green-100 text-green-700 border-green-200"
        if (moodLower.includes("sad") || moodLower.includes("bad") || moodLower.includes("terrible"))
            return "bg-red-100 text-red-700 border-red-200"
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
    }

    const userProfile: UserProfile = {
        id: patient.id,
        email: patient.email,
        full_name: patient.full_name,
        role: "user",
        created_at: patient.created_at,
    }

    return (
        <>
            <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">{patient.full_name || "Unnamed Patient"}</CardTitle>
                                <CardDescription className="flex items-center gap-2 mt-1">
                                    {patient.email}
                                </CardDescription>
                            </div>
                        </div>
                        <Button onClick={() => setIsReportDialogOpen(true)} className="gap-2">
                            <Plus className="w-4 h-4" />
                            Create Report
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="activity">Activity</TabsTrigger>
                            <TabsTrigger value="mood">Mood</TabsTrigger>
                            <TabsTrigger value="reports">Reports</TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-xs font-medium">Joined</span>
                                    </div>
                                    <p className="text-sm font-semibold text-blue-900">
                                        {new Date(patient.created_at).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                                    <div className="flex items-center gap-2 text-purple-600 mb-1">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span className="text-xs font-medium">Routines</span>
                                    </div>
                                    <p className="text-sm font-semibold text-purple-900">
                                        {patient.completed_routines}/{patient.total_routines}
                                    </p>
                                </div>

                                <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                    <div className="flex items-center gap-2 text-green-600 mb-1">
                                        <Brain className="w-4 h-4" />
                                        <span className="text-xs font-medium">Mood Logs</span>
                                    </div>
                                    <p className="text-sm font-semibold text-green-900">{patient.total_mood_logs}</p>
                                </div>

                                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                                    <div className="flex items-center gap-2 text-orange-600 mb-1">
                                        <FileText className="w-4 h-4" />
                                        <span className="text-xs font-medium">Reports</span>
                                    </div>
                                    <p className="text-sm font-semibold text-orange-900">{patient.total_reports}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Productivity Rate</span>
                                    <span className="font-semibold">{patient.productivity_rate}%</span>
                                </div>
                                <Progress value={patient.productivity_rate} className="h-2" />
                                <p className="text-xs text-muted-foreground">
                                    {patient.total_completed_hours}h completed of {patient.total_planned_hours}h planned
                                </p>
                            </div>

                            {patient.last_session_date && (
                                <div className="bg-muted/50 p-3 rounded-lg">
                                    <p className="text-sm text-muted-foreground">Last Session</p>
                                    <p className="font-semibold">{new Date(patient.last_session_date).toLocaleDateString()}</p>
                                </div>
                            )}
                        </TabsContent>

                        {/* Activity Tab */}
                        <TabsContent value="activity" className="space-y-4 mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                                            <Activity className="w-4 h-4" />
                                            Routine Completion
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Completed</span>
                                                <span className="font-semibold">{patient.completed_routines}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Total</span>
                                                <span className="font-semibold">{patient.total_routines}</span>
                                            </div>
                                            <Progress
                                                value={
                                                    patient.total_routines > 0 ? (patient.completed_routines / patient.total_routines) * 100 : 0
                                                }
                                                className="h-2 mt-2"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            Time Tracking
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Planned Hours</span>
                                                <span className="font-semibold">{patient.total_planned_hours}h</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Completed Hours</span>
                                                <span className="font-semibold">{patient.total_completed_hours}h</span>
                                            </div>
                                            <div className="flex justify-between text-sm mt-2 pt-2 border-t">
                                                <span className="text-muted-foreground">Efficiency</span>
                                                <span className="font-semibold text-primary">{patient.productivity_rate}%</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Mood Tab */}
                        <TabsContent value="mood" className="space-y-3 mt-4">
                            {patient.recent_moods.length > 0 ? (
                                <div className="space-y-2">
                                    {patient.recent_moods.map((mood, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="mt-0.5">{getMoodIcon(mood.mood)}</div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Badge variant="outline" className={getMoodColor(mood.mood)}>
                                                        {mood.mood}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(mood.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                {mood.note && <p className="text-sm text-muted-foreground">{mood.note}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Brain className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p>No mood logs recorded yet</p>
                                </div>
                            )}
                        </TabsContent>

                        {/* Reports Tab */}
                        <TabsContent value="reports" className="space-y-3 mt-4">
                            <div className="bg-muted/30 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold">Session History</h4>
                                    <Badge variant="secondary">{patient.total_reports} reports</Badge>
                                </div>
                                {patient.last_session_date ? (
                                    <p className="text-sm text-muted-foreground">
                                        Last session: {new Date(patient.last_session_date).toLocaleDateString()}
                                    </p>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No sessions recorded yet</p>
                                )}
                            </div>
                            <Button onClick={() => setIsReportDialogOpen(true)} className="w-full gap-2">
                                <Plus className="w-4 h-4" />
                                Create New Report
                            </Button>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <CreateReportDialog patient={userProfile} open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen} />
        </>
    )
}
