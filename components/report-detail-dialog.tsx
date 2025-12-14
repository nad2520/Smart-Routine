"use client"

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Clock, Calendar } from "lucide-react"
import ReactMarkdown from "react-markdown"

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

interface ReportDetailDialogProps {
  report: Report | null
  onClose: () => void
}

const categoryColors: Record<string, string> = {
  "Productivity & Stress": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Habit Formation": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "Mental Health": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "Sleep & Recovery": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  "Work-Life Balance": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
}

export function ReportDetailDialog({ report, onClose }: ReportDetailDialogProps) {
  if (!report) return null

  return (
    <Dialog open={!!report} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <ScrollArea className="h-[90vh]">
          <div className="p-6 space-y-6">
            {/* Header */}
            <DialogHeader>
              <Badge className={`w-fit ${categoryColors[report.category] || "bg-gray-100"} mb-3`}>
                {report.category}
              </Badge>
              <h2 className="text-2xl font-bold text-foreground text-balance">{report.title}</h2>
            </DialogHeader>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{report.author}</p>
                  <p className="text-sm text-muted-foreground">{report.author_credentials}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground ml-auto">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{report.read_time} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(report.published_date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{report.content}</ReactMarkdown>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
