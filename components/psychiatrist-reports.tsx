"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { UserReport } from "@/lib/actions/user-reports"
import Link from "next/link"
import { Eye, Calendar } from "lucide-react"

interface PsychiatristReportsProps {
  reports: UserReport[]
}

export function PsychiatristReports({ reports }: PsychiatristReportsProps) {
  if (reports.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No reports created yet</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Session Date</TableHead>
            <TableHead>Follow-up</TableHead>
            <TableHead>Privacy</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id} className="hover:bg-muted/50 transition-colors">
              <TableCell className="font-medium">{report.user_name || report.user_email}</TableCell>
              <TableCell>{report.title}</TableCell>
              <TableCell>{new Date(report.session_date).toLocaleDateString()}</TableCell>
              <TableCell>
                {report.follow_up_date ? (
                  <div className="flex items-center gap-1.5 text-xs">
                    <Calendar className="w-3 h-3" />
                    {new Date(report.follow_up_date).toLocaleDateString()}
                  </div>
                ) : (
                  <span className="text-muted-foreground text-xs">N/A</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant={report.is_private ? "secondary" : "outline"}>
                  {report.is_private ? "Private" : "Shared"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" asChild>
                  <Link href={`/psychiatrist/reports/${report.id}`}>
                    <Eye className="w-4 h-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
