"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Brain,
  Settings,
  LogOut,
  Sparkles,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Stethoscope,
  Users,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

interface SidebarProps {
  user?: {
    id: string
    email?: string
    user_metadata?: {
      full_name?: string
      role?: string
    }
  }
  userRole?: "user" | "admin" | "psychiatrist"
}

export function Sidebar({ user, userRole }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [role, setRole] = useState<string | undefined>(userRole)

  // Fetch user role if not provided
  useEffect(() => {
    async function fetchRole() {
      if (!role && user) {
        const supabase = createClient()
        const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single()
        if (data) setRole(data.role)
      }
    }
    fetchRole()
  }, [user, role])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  const baseNavItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/", roles: ["user"] },
    {
      id: "routine",
      label: "My Routine",
      icon: CheckSquare,
      href: "/routine",
      roles: ["user"],
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      roles: ["user"],
    },
    {
      id: "psychology",
      label: "Psychology",
      icon: Brain,
      href: "/psychology",
      roles: ["user"],
    },
    {
      id: "psychiatrist",
      label: "Psychiatrist Dashboard",
      icon: Stethoscope,
      href: "/psychiatrist",
      roles: ["psychiatrist"],
    },
    { id: "admin", label: "Admin Panel", icon: Shield, href: "/admin", roles: ["admin"] },
    {
      id: "ai-assistant",
      label: "AI Assistant",
      icon: Sparkles,
      href: "/ai-assistant",
      roles: ["user"],
    },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings", roles: ["user", "admin", "psychiatrist"] },
  ]

  const navItems = baseNavItems.filter((item) => role && item.roles.includes(role))

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const getRoleBadge = () => {
    if (role === "admin") return { label: "Admin", color: "bg-orange-500/10 text-orange-600" }
    if (role === "psychiatrist") return { label: "Psychiatrist", color: "bg-purple-500/10 text-purple-600" }
    return null
  }

  const roleBadge = getRoleBadge()

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/25">
            <span className="text-primary-foreground font-bold text-lg">SR</span>
          </div>
          {!collapsed && (
            <span className="font-semibold text-lg tracking-tight text-sidebar-foreground">SmartRoutine</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.id}
              href={item.href}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`animate-slide-up group relative w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 active:scale-[0.98] ${active
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
            >
              {/* Active indicator */}
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-foreground/30 rounded-r-full" />
              )}
              <Icon
                className={`w-5 h-5 shrink-0 transition-transform duration-200 ${active ? "" : "group-hover:scale-110"}`}
              />
              {!collapsed && (
                <>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-primary-foreground/50 animate-pulse" />}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Collapse toggle - desktop only */}
      <div className="hidden lg:block px-3 pb-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm transition-all"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-sidebar-border space-y-2">
        <div
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-sidebar-accent transition-colors cursor-pointer"
          onClick={() => router.push("/settings")}
        >
          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0 ring-2 ring-primary/20">
            <span className="text-sm font-semibold text-primary">{initials}</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-sidebar-foreground">{displayName}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              {roleBadge && (
                <span
                  className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full ${roleBadge.color} font-medium`}
                >
                  {roleBadge.label}
                </span>
              )}
            </div>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive text-sm transition-colors disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        )}
      </div>
    </>
  )

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50 w-11 h-11 rounded-xl shadow-lg bg-card border-border"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-40 w-72 bg-sidebar border-r border-sidebar-border flex flex-col transform transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <NavContent />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex ${collapsed ? "w-20" : "w-64"} border-r border-sidebar-border bg-sidebar flex-col h-screen sticky top-0 transition-all duration-300`}
      >
        <NavContent />
      </aside>
    </>
  )
}
