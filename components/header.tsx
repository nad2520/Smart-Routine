"use client"

import { Bell, Search, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface HeaderProps {
  user?: {
    user_metadata?: {
      full_name?: string
    }
    email?: string
  }
  title?: string
}

export function Header({ user, title }: HeaderProps) {
  const { toast } = useToast()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"

  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "there"

  const displayTitle = title || `${greeting}, ${firstName}`
  const showSubtitle = !title

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        {/* Title/Greeting */}
        <div className="pl-14 lg:pl-0 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground truncate">{displayTitle}</h1>
            {!title && <Sparkles className="w-5 h-5 text-primary animate-pulse hidden sm:block" />}
          </div>
          {showSubtitle && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 hidden sm:block">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · Ready to
              build momentum?
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search - hidden on mobile */}
          <div className="hidden md:flex relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search..."
              className="pl-9 w-48 lg:w-56 h-10 rounded-xl bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-card transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  toast({
                    title: "Search",
                    description: "Search functionality will be available soon.",
                  })
                }
              }}
            />
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative w-10 h-10 rounded-xl hover:bg-muted"
            onClick={() => {
              toast({
                title: "No new notifications",
                description: "You're all caught up!",
              })
            }}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-card" />
          </Button>

          {/* Mental Energy Score */}
          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">Mental Energy</p>
              <p className="text-base sm:text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
                85%
              </p>
            </div>
            <span className="sm:hidden text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              85%
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
