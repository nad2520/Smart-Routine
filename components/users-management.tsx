"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateUserRole, type UserProfile, type UserRole } from "@/lib/actions/roles"
import { useToast } from "@/hooks/use-toast"
import { Shield, User, Stethoscope } from "lucide-react"

interface UsersManagementProps {
  users: UserProfile[]
}

export function UsersManagement({ users: initialUsers }: UsersManagementProps) {
  const [users, setUsers] = useState(initialUsers)
  const [updating, setUpdating] = useState<string | null>(null)
  const { toast } = useToast()

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setUpdating(userId)
    try {
      await updateUserRole(userId, newRole)
      setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)))
      toast({
        title: "Role updated",
        description: "User role has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user role. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUpdating(null)
    }
  }

  const getRoleBadge = (role: UserRole) => {
    const config = {
      admin: { icon: Shield, color: "bg-orange-100 text-orange-700 hover:bg-orange-200" },
      psychiatrist: { icon: Stethoscope, color: "bg-purple-100 text-purple-700 hover:bg-purple-200" },
      user: { icon: User, color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
    }

    const { icon: Icon, color } = config[role]

    return (
      <Badge variant="secondary" className={`${color} gap-1.5`}>
        <Icon className="w-3 h-3" />
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/50">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-muted/50 transition-colors">
              <TableCell className="font-medium">{user.full_name || "N/A"}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{getRoleBadge(user.role)}</TableCell>
              <TableCell className="text-muted-foreground">{new Date(user.created_at).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Select
                  value={user.role}
                  onValueChange={(value) => handleRoleChange(user.id, value as UserRole)}
                  disabled={updating === user.id}
                >
                  <SelectTrigger className="w-36 ml-auto">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="psychiatrist">Psychiatrist</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
