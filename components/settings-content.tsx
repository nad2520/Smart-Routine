"use client"

import { Settings, User, Bell, Shield, Palette, Mail, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface SettingsContentProps {
  user: any
  profile: any
  userRole: string | null
}

export function SettingsContent({ user, profile, userRole }: SettingsContentProps) {
  const [fullName, setFullName] = useState(profile?.full_name || "")
  const { toast } = useToast()

  const getRoleBadge = () => {
    if (userRole === "admin") {
      return (
        <Badge className="bg-orange-100 text-orange-700 border-orange-200">
          <Shield className="w-3 h-3 mr-1" />
          Administrator
        </Badge>
      )
    }
    if (userRole === "psychiatrist") {
      return (
        <Badge className="bg-purple-100 text-purple-700 border-purple-200">
          <Settings className="w-3 h-3 mr-1" />
          Licensed Psychiatrist
        </Badge>
      )
    }
    return (
      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
        <User className="w-3 h-3 mr-1" />
        User
      </Badge>
    )
  }

  const handleSaveProfile = () => {
    // TODO: Implement profile update
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    })
  }

  const initials = (profile?.full_name || user?.email || "U")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Profile Information
          </CardTitle>
          <CardDescription>Update your personal details and account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center ring-4 ring-primary/10">
              <span className="text-2xl font-semibold text-primary">{initials}</span>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-lg font-medium">{profile?.full_name || "User"}</p>
                {getRoleBadge()}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {user?.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Joined {new Date(profile?.created_at || Date.now()).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" value={user?.email || ""} disabled className="bg-muted" />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>

            <Button onClick={handleSaveProfile} className="w-full sm:w-auto">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notifications
          </CardTitle>
          <CardDescription>Manage how you receive updates and alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              label: "Daily routine reminders",
              description: "Get reminded about your scheduled routines",
              enabled: true,
            },
            {
              label: "Weekly progress reports",
              description: "Receive weekly summaries of your activity",
              enabled: true,
            },
            {
              label: "Psychology insights",
              description: "Get notified about new psychological reports",
              enabled: false,
            },
            {
              label: "Mood tracking reminders",
              description: "Daily prompts to log your mood and mental state",
              enabled: true,
            },
          ].map((setting) => (
            <div
              key={setting.label}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">{setting.label}</p>
                <p className="text-xs text-muted-foreground">{setting.description}</p>
              </div>
              <Switch defaultChecked={setting.enabled} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            Appearance
          </CardTitle>
          <CardDescription>Customize how SmartRoutine looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex-1">
              <p className="text-sm font-medium">Dark mode</p>
              <p className="text-xs text-muted-foreground">Use dark theme across the application</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex-1">
              <p className="text-sm font-medium">Compact view</p>
              <p className="text-xs text-muted-foreground">Reduce spacing and show more content</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Privacy & Security
          </CardTitle>
          <CardDescription>Control your data and account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex-1">
              <p className="text-sm font-medium">Anonymous analytics</p>
              <p className="text-xs text-muted-foreground">Share anonymous usage data to improve the platform</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="pt-4 border-t space-y-3">
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-transparent"
              onClick={() => {
                toast({
                  title: "Export started",
                  description: "We'll email you a copy of your data shortly.",
                })
              }}
            >
              Export My Data
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-transparent"
              onClick={() => {
                toast({
                  title: "Password Change",
                  description: "Please use the 'Forgot Password' flow to reset your password for now.",
                })
              }}
            >
              Change Password
            </Button>
            <Button
              variant="destructive"
              className="w-full sm:w-auto"
              onClick={() => {
                toast({
                  variant: "destructive",
                  title: "Action Restricted",
                  description: "Account deletion is disabled in demo mode.",
                })
              }}
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
