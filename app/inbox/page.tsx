"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle } from "lucide-react"

const inboxMessages = [
  {
    id: 1,
    from: "田中 太郎",
    department: "営業部 - 第一営業課",
    avatar: "田",
    type: "ありがとう",
    message: "プロジェクトの資料作成、本当にありがとうございました！おかげで提案がスムーズに進みました。",
    timestamp: "2時間前",
    isRead: false,
  },
  {
    id: 2,
    from: "佐藤 花子",
    department: "開発部 - フロントエンド課",
    avatar: "佐",
    type: "素晴らしい",
    message: "新機能のUIデザイン、とても使いやすくて素晴らしいです！",
    timestamp: "5時間前",
    isRead: false,
  },
  {
    id: 3,
    from: "鈴木 一郎",
    department: "マーケティング部 - デジタルマーケティング課",
    avatar: "鈴",
    type: "チームワーク",
    message: "昨日のミーティングでのサポート、ありがとうございました。",
    timestamp: "1日前",
    isRead: true,
  },
]

export default function InboxPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />
      <div className="flex-1 md:ml-64">
        <Header onMobileMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">受信箱</h1>
              <p className="text-sm md:text-base text-muted-foreground">受け取ったKudosを確認しましょう</p>
            </div>

            <div className="space-y-4">
              {inboxMessages.map((message) => (
                <Card
                  key={message.id}
                  className={`p-4 md:p-6 ${!message.isRead ? "border-primary/50 bg-primary/5" : ""}`}
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground font-semibold text-sm md:text-base">
                      {message.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="font-semibold text-foreground text-sm md:text-base">{message.from}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs">
                            {message.type}
                          </Badge>
                          <span className="text-xs md:text-sm text-muted-foreground hidden sm:inline">
                            {message.department}
                          </span>
                          {!message.isRead && (
                            <Badge variant="destructive" className="text-xs">
                              新着
                            </Badge>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground block sm:hidden mb-2">{message.department}</span>
                      <p className="text-foreground mb-3 text-sm md:text-base">{message.message}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="text-xs md:text-sm text-muted-foreground">{message.timestamp}</span>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-xs md:text-sm">
                            <Heart className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            返信
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs md:text-sm">
                            <MessageCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            コメント
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
