"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Network, Users, Heart, Send, User } from "lucide-react"
import { useState } from "react"

export default function PersonalConnectionMapPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [viewType, setViewType] = useState("all") // all, sent, received

  // モックデータ - 個人を中心としたつながり
  const currentUser = "佐藤 花子"

  const personalConnections = [
    { person: "田中 一郎", relationship: "both", sentKudos: 8, receivedKudos: 4, department: "開発部", strength: 8 },
    { person: "山田 三郎", relationship: "both", sentKudos: 9, receivedKudos: 6, department: "営業部", strength: 9 },
    { person: "鈴木 次郎", relationship: "sent", sentKudos: 3, receivedKudos: 0, department: "開発部", strength: 3 },
    {
      person: "高橋 四郎",
      relationship: "received",
      sentKudos: 0,
      receivedKudos: 5,
      department: "マーケティング部",
      strength: 5,
    },
    { person: "伊藤 五郎", relationship: "both", sentKudos: 2, receivedKudos: 7, department: "人事部", strength: 7 },
  ]

  const centerPosition = { x: 300, y: 200 }
  const radius = 120

  const getPersonPosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total
    return {
      x: centerPosition.x + radius * Math.cos(angle),
      y: centerPosition.y + radius * Math.sin(angle),
    }
  }

  const departmentColors = {
    開発部: "#3b82f6",
    営業部: "#10b981",
    マーケティング部: "#f59e0b",
    人事部: "#8b5cf6",
  }

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case "both":
        return "#ef4444" // 双方向 - 赤
      case "sent":
        return "#3b82f6" // 送信のみ - 青
      case "received":
        return "#10b981" // 受信のみ - 緑
      default:
        return "#6b7280"
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* ヘッダー */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
              <User className="h-8 w-8" />
              個人つながりマップ
            </h1>
            <p className="text-muted-foreground">
              あなたを中心としたKudosネットワークを可視化して、人間関係を確認できます
            </p>
          </div>

          {/* フィルター */}
          <div className="flex gap-4 mb-8">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="期間を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">今週</SelectItem>
                <SelectItem value="month">今月</SelectItem>
                <SelectItem value="quarter">今四半期</SelectItem>
                <SelectItem value="year">今年</SelectItem>
              </SelectContent>
            </Select>

            <Select value={viewType} onValueChange={setViewType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="表示タイプ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのつながり</SelectItem>
                <SelectItem value="sent">送信したKudos</SelectItem>
                <SelectItem value="received">受信したKudos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 個人ネットワークマップ */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    あなたのつながりネットワーク
                  </CardTitle>
                  <CardDescription>あなたを中心としたKudosのやり取りを可視化。色は関係性を表します</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <svg width="600" height="400" className="border rounded-lg bg-slate-50">
                      {/* 接続線を描画 */}
                      {personalConnections.map((connection, index) => {
                        const personPosition = getPersonPosition(index, personalConnections.length)

                        return (
                          <line
                            key={index}
                            x1={centerPosition.x}
                            y1={centerPosition.y}
                            x2={personPosition.x}
                            y2={personPosition.y}
                            stroke={getRelationshipColor(connection.relationship)}
                            strokeWidth={Math.max(2, connection.strength / 2)}
                            opacity={0.7}
                          />
                        )
                      })}

                      {/* 中央の自分を描画 */}
                      <g>
                        <circle
                          cx={centerPosition.x}
                          cy={centerPosition.y}
                          r={30}
                          fill="#6366f1"
                          opacity={0.9}
                          className="cursor-pointer"
                        />
                        <text
                          x={centerPosition.x}
                          y={centerPosition.y + 5}
                          textAnchor="middle"
                          className="text-sm font-bold fill-white"
                        >
                          あなた
                        </text>
                        <text
                          x={centerPosition.x}
                          y={centerPosition.y + 45}
                          textAnchor="middle"
                          className="text-xs font-medium fill-current"
                        >
                          {currentUser}
                        </text>
                      </g>

                      {/* つながりのある人を描画 */}
                      {personalConnections.map((connection, index) => {
                        const position = getPersonPosition(index, personalConnections.length)
                        return (
                          <g key={index}>
                            <circle
                              cx={position.x}
                              cy={position.y}
                              r={Math.max(15, connection.strength * 2)}
                              fill={departmentColors[connection.department as keyof typeof departmentColors]}
                              opacity={0.8}
                              className="cursor-pointer hover:opacity-100"
                            />
                            <text
                              x={position.x}
                              y={position.y + 35}
                              textAnchor="middle"
                              className="text-xs font-medium fill-current"
                            >
                              {connection.person}
                            </text>
                            <text
                              x={position.x}
                              y={position.y + 48}
                              textAnchor="middle"
                              className="text-xs fill-muted-foreground"
                            >
                              {connection.department}
                            </text>
                          </g>
                        )
                      })}
                    </svg>

                    {/* 凡例 */}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-1 bg-red-500"></div>
                        <span>双方向のやり取り</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-1 bg-blue-500"></div>
                        <span>送信のみ</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-1 bg-green-500"></div>
                        <span>受信のみ</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* サイドパネル */}
            <div className="space-y-6">
              {/* 個人つながり統計 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    あなたのつながり統計
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">つながり人数</span>
                    <span className="font-semibold">{personalConnections.length}人</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">送信したKudos</span>
                    <span className="font-semibold">
                      {personalConnections.reduce((sum, c) => sum + c.sentKudos, 0)}回
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">受信したKudos</span>
                    <span className="font-semibold">
                      {personalConnections.reduce((sum, c) => sum + c.receivedKudos, 0)}回
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">双方向関係</span>
                    <span className="font-semibold">
                      {personalConnections.filter((c) => c.relationship === "both").length}人
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* 強いつながりランキング */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    強いつながりTOP3
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {personalConnections
                      .sort((a, b) => b.strength - a.strength)
                      .slice(0, 3)
                      .map((connection, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              #{index + 1}
                            </Badge>
                            <div className="text-sm">
                              <div className="font-medium">{connection.person}</div>
                              <div className="text-muted-foreground text-xs">{connection.department}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-sm">{connection.strength}/10</div>
                            <div className="text-xs text-muted-foreground">
                              {connection.sentKudos + connection.receivedKudos}回
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* 個人アクション */}
              <Card>
                <CardHeader>
                  <CardTitle>つながりを深める</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Send className="h-4 w-4 mr-2" />
                    新しいKudosを送る
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    つながり提案を見る
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
