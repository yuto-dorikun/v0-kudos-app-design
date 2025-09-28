"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Send,
  Inbox,
  SendHorizontal,
  User,
  Settings,
  TrendingUp,
  Brain,
  Users,
  Cog,
  Network,
  Building2,
} from "lucide-react"

const personalNavigation = [
  { name: "ダッシュボード", icon: BarChart3, current: true, href: "/dashboard" },
  { name: "Kudosを送る", icon: Send, current: false, href: "/send" },
  { name: "受信箱", icon: Inbox, current: false, badge: 3, href: "/inbox" },
  { name: "送信済み", icon: SendHorizontal, current: false, href: "/sent" },
  { name: "個人アクティビティ", icon: User, current: false, href: "/personal-activity" },
  { name: "個人分析", icon: Brain, current: false, href: "/personal-analysis", premium: true },
  { name: "つながりマップ", icon: Network, current: false, href: "/personal-connection-map", premium: true },
  { name: "設定", icon: Cog, current: false, href: "/settings" },
]

const adminNavigation = [
  { name: "統計", icon: TrendingUp, current: false, href: "/admin/stats" },
  { name: "強み分析", icon: Brain, current: false, href: "/strengths", premium: true },
  { name: "チーム分析", icon: Users, current: false, href: "/team-analysis", premium: true },
  { name: "つながりマップ", icon: Building2, current: false, href: "/admin/connection-map", premium: true },
  { name: "ユーザー管理", icon: Settings, current: false, href: "/admin" },
  { name: "設定", icon: Cog, current: false, href: "/admin/settings" },
]

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("ダッシュボード")

  const renderNavigationItems = (items: typeof personalNavigation) => {
    return items.map((item) => {
      const Icon = item.icon
      return (
        <a
          key={item.name}
          href={item.href}
          onClick={() => setActiveItem(item.name)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
            activeItem === item.name
              ? "bg-sidebar-accent text-sidebar-primary"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
          )}
        >
          <Icon className="w-5 h-5" />
          <span className="flex-1 text-left">{item.name}</span>
          {item.premium && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
              Pro
            </span>
          )}
          {item.badge && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-destructive text-destructive-foreground rounded-full">
              {item.badge}
            </span>
          )}
        </a>
      )
    })
  }

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center px-6 py-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-sidebar-foreground">Kudos</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 scrollbar-thin overflow-y-auto">
        <div className="space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
            個人
          </div>
          {renderNavigationItems(personalNavigation)}
        </div>

        <div className="my-6 border-t border-sidebar-border"></div>

        <div className="space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
            管理者
          </div>
          {renderNavigationItems(adminNavigation)}
        </div>
      </nav>

      {/* User Profile */}
    </div>
  )
}
