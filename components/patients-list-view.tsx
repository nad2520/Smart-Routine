"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PatientDetailCard } from "@/components/patient-detail-card"
import type { UserDetailedData } from "@/lib/actions/user-data"
import { Search, Users, TrendingUp, Brain, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PatientsListViewProps {
    patients: UserDetailedData[]
}

export function PatientsListView({ patients }: PatientsListViewProps) {
    const [searchQuery, setSearchQuery] = useState("")

    // Filter patients based on search
    const filteredPatients = patients.filter(
        (patient) =>
            patient.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    // Calculate aggregate stats
    const totalPatients = patients.length
    const totalReports = patients.reduce((sum, p) => sum + p.total_reports, 0)
    const avgProductivity = patients.length > 0
        ? Math.round(patients.reduce((sum, p) => sum + p.productivity_rate, 0) / patients.length)
        : 0
    const totalMoodLogs = patients.reduce((sum, p) => sum + p.total_mood_logs, 0)

    return (
        <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
                        <div className="bg-blue-100 p-2.5 rounded-xl">
                            <Users className="w-4 h-4 text-blue-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{totalPatients}</div>
                        <p className="text-xs text-muted-foreground mt-1">Active patients</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Reports</CardTitle>
                        <div className="bg-purple-100 p-2.5 rounded-xl">
                            <FileText className="w-4 h-4 text-purple-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{totalReports}</div>
                        <p className="text-xs text-muted-foreground mt-1">All reports written</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Avg Productivity</CardTitle>
                        <div className="bg-green-100 p-2.5 rounded-xl">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{avgProductivity}%</div>
                        <p className="text-xs text-muted-foreground mt-1">Across all patients</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Mood Entries</CardTitle>
                        <div className="bg-orange-100 p-2.5 rounded-xl">
                            <Brain className="w-4 h-4 text-orange-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{totalMoodLogs}</div>
                        <p className="text-xs text-muted-foreground mt-1">Total mood logs</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filter */}
            <Card>
                <CardHeader>
                    <CardTitle>Patient Directory</CardTitle>
                    <CardDescription>
                        View detailed patient information including activity, mood tracking, and session history
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    {searchQuery && (
                        <div className="mt-2 flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Found {filteredPatients.length} patients</span>
                            {searchQuery && (
                                <Badge variant="secondary" className="gap-1">
                                    {searchQuery}
                                    <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-destructive">
                                        ×
                                    </button>
                                </Badge>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Patient Cards */}
            <div className="space-y-4">
                {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => <PatientDetailCard key={patient.id} patient={patient} />)
                ) : (
                    <Card>
                        <CardContent className="text-center py-12">
                            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                {searchQuery ? "No patients found" : "No Patients Yet"}
                            </h3>
                            <p className="text-muted-foreground">
                                {searchQuery
                                    ? "Try adjusting your search query"
                                    : "Patients will appear here once they register in the system"}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
