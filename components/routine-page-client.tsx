"use client"

import { CheckSquare, Plus, Edit, Trash2, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useTransition } from "react"
import { toggleRoutineCompletion, deleteRoutine, type Routine } from "@/lib/actions/routines"
import { RoutineDialog } from "@/components/routine-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface RoutinePageClientProps {
  routines: Routine[]
  userId: string
}

export function RoutinePageClient({ routines, userId }: RoutinePageClientProps) {
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

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-primary" />
              </div>
              My Routine
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              You have <span className="font-medium text-foreground">{routines.length} routines</span> ·{" "}
              <span className="font-medium text-foreground">{completedCount} completed</span> today
            </p>
          </div>
          <Button onClick={() => setIsCreating(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            New Routine
          </Button>
        </div>

        {/* Routines Grid */}
        {routines.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <CheckSquare className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No routines yet</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Create your first routine to start building better habits
            </p>
            <Button onClick={() => setIsCreating(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Your First Routine
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4">
            {routines.map((routine) => (
              <Card
                key={routine.id}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.01] border-border/50"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium flex items-center gap-3">
                      <Checkbox
                        checked={routine.completed}
                        onCheckedChange={() => handleToggleComplete(routine)}
                        disabled={isPending}
                        className="h-5 w-5"
                      />
                      <span className={routine.completed ? "line-through text-muted-foreground" : ""}>
                        {routine.title}
                      </span>
                    </CardTitle>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setEditingRoutine(routine)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => setDeletingRoutine(routine)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{routine.time}</span>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: routine.color + "20",
                        color: routine.color,
                      }}
                    >
                      {routine.category}
                    </span>
                  </div>
                  {routine.description && <p className="text-sm text-muted-foreground mt-3">{routine.description}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

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
        <AlertDialogContent>
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
