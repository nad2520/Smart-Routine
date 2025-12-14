"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { UserProfile } from "@/lib/actions/roles"
import { Plus } from "lucide-react"
import { CreateReportDialog } from "@/components/create-report-dialog"

interface PatientsListProps {
  patients: UserProfile[]
}

export function PatientsList({ patients }: PatientsListProps) {
  const [selectedPatient, setSelectedPatient] = useState<UserProfile | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateReport = (patient: UserProfile) => {
    setSelectedPatient(patient)
    setIsDialogOpen(true)
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium">{patient.full_name || "N/A"}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(patient.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" onClick={() => handleCreateReport(patient)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Report
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedPatient && (
        <CreateReportDialog patient={selectedPatient} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      )}
    </>
  )
}
