"use client"

import { Checkbox } from "./ui/checkbox"
import { Card } from "./ui/card"
import { BookOpen, Dumbbell, Coffee, Briefcase, Home, Heart, Edit, Trash2, Plus, Calendar } from "lucide-react"
import { useState, useTransition } from "react"
import { toggleRoutineCompletion, type Routine, deleteRoutine } from "@/lib/actions/routines"
import { Button } from "./ui/button"
import { RoutineDialog } from "./routine-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"

const iconMap = {
  BookOpen,
  Dumbbell,
  Coffee,
  Briefcase,
  Home,
  Heart,
}

interface TodaysScheduleClientProps {
  routines: Routine[]
  userId: string
}

export function TodaysScheduleClient({ routines, userId }: TodaysScheduleClientProps) {
  const [isPending, startTransition] = useTransition()
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null)
  const [deletingRoutine, setDeletingRoutine] = useState<Routine | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const handleToggleComplete = (routine: Routine) => {
    startTransition(async () => {
      await toggleRoutineCompletion(routine.id, !routine.completed)
    })
  }

  const handleDelete = async () => {
    if (!deletingRoutine) return
    startTransition(async () => {
      await deleteRoutine(deletingRoutine.id)
      setDeletingRoutine(null)
    })
  }

  const completedCount = routines.filter((r) => r.completed).length
  const totalCount = routines.length
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <>
      <Card className="p-6 col-span-1 lg:col-span-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Today's Schedule</h2>
              {totalCount > 0 && (
                <p className="text-xs text-muted-foreground">
                  {completedCount}/{totalCount} completed ({completionPercent}%)
                </p>
              )}
            </div>
          </div>
          <Button onClick={() => setIsCreating(true)} size="sm" className="gap-2 shadow-sm">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        {totalCount > 0 && (
          <div className="mb-4">
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out rounded-full"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
        )}

        {routines.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">No routines yet</h3>
            <p className="text-xs text-muted-foreground mb-4">Create your first routine to get started</p>
            <Button onClick={() => setIsCreating(true)} size="sm" className="shadow-sm">
              Create Routine
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {routines.map((routine, index) => {
              const Icon = iconMap[routine.icon as keyof typeof iconMap] || BookOpen
              return (
                <div
                  key={routine.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`animate-slide-up group flex items-center gap-3 p-3 rounded-xl transition-all ${
                    routine.completed
                      ? "bg-muted/50"
                      : "bg-gradient-to-r from-transparent to-transparent hover:from-muted/50 hover:to-muted/30"
                  } hover:shadow-md`}
                >
                  <Checkbox
                    checked={routine.completed}
                    onCheckedChange={() => handleToggleComplete(routine)}
                    disabled={isPending}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      routine.completed ? "bg-muted" : ""
                    }`}
                    style={{
                      backgroundColor: routine.completed ? undefined : routine.color + "15",
                      color: routine.color,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium transition-colors ${
                        routine.completed ? "line-through text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      {routine.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{routine.time}</p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap hidden sm:block transition-opacity ${
                      routine.completed ? "opacity-50" : ""
                    }`}
                    style={{
                      backgroundColor: routine.color + "15",
                      color: routine.color,
                    }}
                  >
                    {routine.category}
                  </span>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingRoutine(routine)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => setDeletingRoutine(routine)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Card>

      {/* Create Dialog */}
      <RoutineDialog open={isCreating} onOpenChange={setIsCreating} userId={userId} />

      {/* Edit Dialog */}
      <RoutineDialog
        open={!!editingRoutine}
        onOpenChange={(open) => !open && setEditingRoutine(null)}
        routine={editingRoutine || undefined}
        userId={userId}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingRoutine} onOpenChange={(open) => !open && setDeletingRoutine(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Routine</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingRoutine?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
