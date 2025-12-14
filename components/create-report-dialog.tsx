"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { createUserReport } from "@/lib/actions/user-reports"
import type { UserProfile } from "@/lib/actions/roles"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

import { useRouter } from "next/navigation"

interface CreateReportDialogProps {
  patient: UserProfile
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateReportDialog({ patient, open, onOpenChange }: CreateReportDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    try {
      await createUserReport({
        user_id: patient.id,
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        diagnosis: formData.get("diagnosis") as string,
        recommendations: formData.get("recommendations") as string,
        session_date: formData.get("session_date") as string,
        follow_up_date: formData.get("follow_up_date") as string,
        is_private: formData.get("is_private") === "on",
      })

      toast({
        title: "Report created",
        description: "Patient report has been successfully created.",
      })

      router.refresh()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Patient Report</DialogTitle>
          <DialogDescription>Create a new report for {patient.full_name || patient.email}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Report Title</Label>
            <Input id="title" name="title" required placeholder="e.g., Initial Assessment Session" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="session_date">Session Date</Label>
            <Input id="session_date" name="session_date" type="date" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Textarea id="diagnosis" name="diagnosis" placeholder="Clinical diagnosis and observations..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Session Notes</Label>
            <Textarea
              id="content"
              name="content"
              required
              placeholder="Detailed session notes, patient responses, and clinical observations..."
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recommendations">Recommendations</Label>
            <Textarea
              id="recommendations"
              name="recommendations"
              placeholder="Treatment recommendations, follow-up actions, and next steps..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="follow_up_date">Follow-up Date (Optional)</Label>
            <Input id="follow_up_date" name="follow_up_date" type="date" />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="is_private" name="is_private" defaultChecked />
            <Label htmlFor="is_private">Mark as private (visible only to patient and psychiatrist)</Label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Report
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
