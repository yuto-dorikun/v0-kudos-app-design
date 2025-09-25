"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"

const filters = ["すべて", "受信", "送信"]

const activities = [
  {
    id: 1,
    from: "田中 美咲",
    to: "山田 太郎",
    type: { label: "ありがとう" },
    message: "昨日のプレゼン資料の作成、本当に助かりました！締切に間に合わせることができました。",
    time: "5分前",
    likes: 12,
    liked: false,
    avatar: "TM",
  },
  {
    id: 2,
    from: "佐藤 健太",
    to: "鈴木 一郎",
    type: { label: "素晴らしい" },
    message: "新機能の実装、完璧でした！コードもきれいで、ドキュメントも充実していて素晴らしいです。",
    time: "1時間前",
    likes: 23,
    liked: true,
    avatar: "SK",
  },
  {
    id: 3,
    from: "高橋 花子",
    to: "田中 美咲",
    type: { label: "お疲れ様" },
    message: "今日の会議での司会進行、とてもスムーズでした。準備もしっかりされていて感謝です。",
    time: "3時間前",
    likes: 8,
    liked: false,
    avatar: "TH",
  },
]

export function ActivityFeed() {
  const [activeFilter, setActiveFilter] = useState("すべて")
  const [activityData, setActivityData] = useState(activities)

  const toggleLike = (id: number) => {
    setActivityData((prev) =>
      prev.map((activity) =>
        activity.id === id
          ? {
              ...activity,
              liked: !activity.liked,
              likes: activity.liked ? activity.likes - 1 : activity.likes + 1,
            }
          : activity,
      ),
    )
  }

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">最近のアクティビティ</h2>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "text-xs",
              activeFilter === filter
                ? "bg-primary text-primary-foreground"
                : "bg-transparent border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activityData.map((activity) => (
          <div key={activity.id} className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-1 text-primary-foreground font-semibold text-sm">
                {activity.avatar}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground">{activity.from}</span>
                  <span className="text-muted-foreground text-sm">さんが</span>
                  <span className="font-semibold text-foreground">{activity.to}</span>
                  <span className="text-muted-foreground text-sm">さんにKudosを送りました</span>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>

            <div className="ml-13 p-4 bg-accent rounded-lg border-l-4 border-primary">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-primary">{activity.type.label}</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{activity.message}</p>
            </div>

            <div className="ml-13 flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleLike(activity.id)}
                className={cn(
                  "text-xs",
                  activity.liked
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-transparent border-border text-muted-foreground hover:text-foreground",
                )}
              >
                <ThumbsUp className="w-3 h-3 mr-1" />
                いいね {activity.likes}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
