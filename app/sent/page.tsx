"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

const sentMessages = [
  {
    id: 1,
    to: "高橋 美咲",
    department: "営業部 - 第一営業課",
    avatar: "高",
    type: "助かった",
    message: "資料の準備、本当に助かりました！",
    timestamp: "3時間前",
    isRead: true,
  },
  {
    id: 2,
    to: "井上 直樹",
    department: "開発部 - フロントエンド課",
    avatar: "井",
    type: "素晴らしい",
    message: "コードレビューありがとうございました。とても勉強になりました。",
    timestamp: "1日前",
    isRead: true,
  },
  {
    id: 3,
    to: "石田 光一",
    department: "マーケティング部 - デジタルマーケティング課",
    avatar: "石",
    type: "クリエイティブ",
    message: "新しいキャンペーンのアイデア、とてもクリエイティブでした！",
    timestamp: "2日前",
    isRead: false,
  },
]

export default function SentPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />
      <div className="flex-1 md:ml-64">
        <Header onMobileMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">送信済み</h1>
              <p className="text-sm md:text-base text-muted-foreground">送信したKudosの履歴を確認できます</p>
            </div>

            <div className="space-y-4">
              {sentMessages.map((message) => (
                <Card key={message.id} className="p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted text-muted-foreground font-semibold text-sm md:text-base">
                      {message.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="font-semibold text-foreground text-sm md:text-base">{message.to}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs">
                            {message.type}
                          </Badge>
                          <span className="text-xs md:text-sm text-muted-foreground hidden sm:inline">
                            {message.department}
                          </span>
                          <div className="flex items-center gap-1">
                            <Eye
                              className={`w-3 h-3 md:w-4 md:h-4 ${message.isRead ? "text-green-500" : "text-muted-foreground"}`}
                            />
                            <span className="text-xs text-muted-foreground">{message.isRead ? "既読" : "未読"}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground block sm:hidden mb-2">{message.department}</span>
                      <p className="text-foreground mb-3 text-sm md:text-base">{message.message}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="text-xs md:text-sm text-muted-foreground">{message.timestamp}</span>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Button variant="ghost" size="sm" className="text-xs md:text-sm">
                            詳細を見る
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>

      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
      )}
    </div>
  )
}
