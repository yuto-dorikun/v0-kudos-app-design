"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CalendarDays, Heart, Send, TrendingUp, Award, Clock } from "lucide-react"

export default function PersonalActivityPage() {
  // モックデータ
  const recentKudos = [
    {
      id: 1,
      type: "received",
      from: "佐藤 花子",
      message: "プロジェクトの進行管理が素晴らしかったです！",
      category: "リーダーシップ",
      date: "2024-01-15",
      time: "14:30",
    },
    {
      id: 2,
      type: "sent",
      to: "田中 一郎",
      message: "新しいアイデアの提案、とても参考になりました。",
      category: "創造性",
      date: "2024-01-14",
      time: "10:15",
    },
    {
      id: 3,
      type: "received",
      from: "鈴木 次郎",
      message: "チームワークを大切にする姿勢が素晴らしいです。",
      category: "協調性",
      date: "2024-01-13",
      time: "16:45",
    },
  ]

  const monthlyStats = {
    sent: 12,
    received: 18,
    categories: ["リーダーシップ", "創造性", "協調性", "問題解決"],
    streak: 7,
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* ヘッダー */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">個人アクティビティ</h1>
            <p className="text-muted-foreground">あなたのKudos活動履歴と最近の動向を確認できます</p>
          </div>

          {/* 統計カード */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">今月送信</CardTitle>
                <Send className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monthlyStats.sent}</div>
                <p className="text-xs text-muted-foreground">前月比 +20%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">今月受信</CardTitle>
                <Heart className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monthlyStats.received}</div>
                <p className="text-xs text-muted-foreground">前月比 +15%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">連続活動日数</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monthlyStats.streak}日</div>
                <p className="text-xs text-muted-foreground">素晴らしい継続力！</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">獲得カテゴリ</CardTitle>
                <Award className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monthlyStats.categories.length}</div>
                <p className="text-xs text-muted-foreground">多様な強みを発揮</p>
              </CardContent>
            </Card>
          </div>

          {/* 最近のアクティビティ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                最近のアクティビティ
              </CardTitle>
              <CardDescription>直近のKudos送受信履歴</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentKudos.map((kudos) => (
                  <div key={kudos.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {kudos.type === "received" ? kudos.from.charAt(0) : kudos.to?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={kudos.type === "received" ? "default" : "secondary"}>
                          {kudos.type === "received" ? "受信" : "送信"}
                        </Badge>
                        <Badge variant="outline">{kudos.category}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {kudos.date} {kudos.time}
                        </span>
                      </div>

                      <p className="text-sm">
                        {kudos.type === "received" ? (
                          <>
                            <strong>{kudos.from}</strong>さんから: {kudos.message}
                          </>
                        ) : (
                          <>
                            <strong>{kudos.to}</strong>さんへ: {kudos.message}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  すべての履歴を見る
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
