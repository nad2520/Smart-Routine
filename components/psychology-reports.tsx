"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, User, Calendar, ChevronRight } from "lucide-react"
import { useState } from "react"
import { ReportDetailDialog } from "@/components/report-detail-dialog"

interface Report {
  id: string
  title: string
  author: string
  author_credentials: string
  category: string
  content: string
  summary: string
  read_time: number
  published_date: string
  image_url: string | null
}

interface PsychologyReportsProps {
  reports: Report[]
}

const categoryColors: Record<string, string> = {
  "Productivity & Stress": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Habit Formation": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "Mental Health": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "Sleep & Recovery": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  "Work-Life Balance": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
}

export function PsychologyReports({ reports }: PsychologyReportsProps) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card
            key={report.id}
            className="overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-border/50"
            onClick={() => setSelectedReport(report)}
          >
            {/* Report Image */}
            <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
              {report.image_url ? (
                <img
                  src={report.image_url || "/placeholder.svg"}
                  alt={report.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-6xl opacity-20">📚</div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge className={`absolute top-3 left-3 ${categoryColors[report.category] || "bg-gray-100"}`}>
                {report.category}
              </Badge>
            </div>

            {/* Report Content */}
            <div className="p-5 space-y-3">
              <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {report.title}
              </h3>

              <p className="text-sm text-muted-foreground line-clamp-2">{report.summary}</p>

              {/* Author Info */}
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{report.author}</p>
                  <p className="text-xs text-muted-foreground truncate">{report.author_credentials}</p>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{report.read_time} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(report.published_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </span>
                </div>
              </div>

              {/* Read More */}
              <Button variant="ghost" className="w-full gap-2 group-hover:bg-primary/10" size="sm">
                Read Full Report
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Report Detail Dialog */}
      <ReportDetailDialog report={selectedReport} onClose={() => setSelectedReport(null)} />
    </>
  )
}
