"use client"

import { ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface PageHeaderProps {
  title: string
  description: string
  icon: LucideIcon
  breadcrumb?: string[]
}

export function PageHeader({ title, description, icon: Icon, breadcrumb }: PageHeaderProps) {
  return (
    <div className="border-b border-border bg-card/50 px-6 py-5">
      {breadcrumb && breadcrumb.length > 0 && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
          <span>Home</span>
          {breadcrumb.map((item, index) => (
            <span key={index} className="flex items-center gap-1">
              <ChevronRight className="w-3 h-3" />
              <span className={index === breadcrumb.length - 1 ? "text-foreground" : ""}>{item}</span>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  )
}
