"use client"

import type React from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useTransition } from "react"
import { createRoutine, updateRoutine, type Routine } from "@/lib/actions/routines"
import { BookOpen, Dumbbell, Coffee, Briefcase, Home, Heart } from "lucide-react"

const icons = [
  { value: "BookOpen", label: "Study", Icon: BookOpen },
  { value: "Dumbbell", label: "Exercise", Icon: Dumbbell },
  { value: "Coffee", label: "Break", Icon: Coffee },
  { value: "Briefcase", label: "Work", Icon: Briefcase },
  { value: "Home", label: "Home", Icon: Home },
  { value: "Heart", label: "Wellness", Icon: Heart },
]

const categories = ["Study", "Exercise", "Work", "Break", "Wellness", "Personal"]

const colors = [
  { value: "#3b82f6", label: "Blue" },
  { value: "#10b981", label: "Green" },
  { value: "#f59e0b", label: "Orange" },
  { value: "#ef4444", label: "Red" },
  { value: "#8b5cf6", label: "Purple" },
  { value: "#06b6d4", label: "Cyan" },
]

interface RoutineDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  routine?: Routine
  userId: string
}

export function RoutineDialog({ open, onOpenChange, routine, userId }: RoutineDialogProps) {
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    title: routine?.title || "",
    description: routine?.description || "",
    time: routine?.time || "",
    category: routine?.category || "Study",
    icon: routine?.icon || "BookOpen",
    color: routine?.color || "#3b82f6",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      if (routine) {
        await updateRoutine(routine.id, formData)
      } else {
        await createRoutine({ ...formData, userId })
      }
      onOpenChange(false)
      // Reset form
      setFormData({
        title: "",
        description: "",
        time: "",
        category: "Study",
        icon: "BookOpen",
        color: "#3b82f6",
      })
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{routine ? "Edit Routine" : "Create New Routine"}</DialogTitle>
          <DialogDescription>
            {routine ? "Update your routine details below" : "Add a new routine to your schedule"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Morning Planning Session"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Review goals and plan the day ahead"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Icon</Label>
            <div className="grid grid-cols-6 gap-2">
              {icons.map(({ value, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: value })}
                  className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                    formData.icon === value ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                  }`}
                >
                  <Icon className="w-5 h-5 mx-auto" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="grid grid-cols-6 gap-2">
              {colors.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: value })}
                  className={`h-10 rounded-lg border-2 transition-all hover:scale-105 ${
                    formData.color === value
                      ? "border-foreground ring-2 ring-offset-2 ring-foreground/20"
                      : "border-border"
                  }`}
                  style={{ backgroundColor: value }}
                  title={label}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="flex-1">
              {isPending ? "Saving..." : routine ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
