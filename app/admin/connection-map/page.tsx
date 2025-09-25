"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Network, Users, Filter, Search, Zap, Building2 } from "lucide-react"
import { useState } from "react"

export default function AdminConnectionMapPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  // モックデータ - 組織全体のユーザー間のつながり
  const connections = [
    { from: "佐藤 花子", to: "田中 一郎", strength: 8, department: "開発部", kudosCount: 12 },
    { from: "田中 一郎", to: "鈴木 次郎", strength: 6, department: "開発部", kudosCount: 8 },
    { from: "佐藤 花子", to: "山田 三郎", strength: 9, department: "営業部", kudosCount: 15 },
    { from: "鈴木 次郎", to: "高橋 四郎", strength: 7, department: "マーケティング部", kudosCount: 10 },
    { from: "山田 三郎", to: "高橋 四郎", strength: 5, department: "マーケティング部", kudosCount: 6 },
    { from: "伊藤 五郎", to: "佐藤 花子", strength: 7, department: "人事部", kudosCount: 9 },
    { from: "渡辺 六郎", to: "田中 一郎", strength: 6, department: "財務部", kudosCount: 7 },
  ]

  const users = [
    { name: "佐藤 花子", department: "開発部", position: { x: 200, y: 150 }, connections: 3, totalKudos: 35 },
    { name: "田中 一郎", department: "開発部", position: { x: 400, y: 100 }, connections: 3, totalKudos: 27 },
    { name: "鈴木 次郎", department: "開発部", position: { x: 350, y: 250 }, connections: 2, totalKudos: 18 },
    { name: "山田 三郎", department: "営業部", position: { x: 150, y: 300 }, connections: 2, totalKudos: 21 },
    { name: "高橋 四郎", department: "マーケティング部", position: { x: 500, y: 200 }, connections: 2, totalKudos: 16 },
    { name: "伊藤 五郎", department: "人事部", position: { x: 100, y: 100 }, connections: 1, totalKudos: 9 },
    { name: "渡辺 六郎", department: "財務部", position: { x: 450, y: 350 }, connections: 1, totalKudos: 7 },
  ]

  const departmentColors = {
    開発部: "#3b82f6",
    営業部: "#10b981",
    マーケティング部: "#f59e0b",
    人事部: "#8b5cf6",
    財務部: "#ef4444",
  }

  const getConnectionStrengthColor = (strength: number) => {
    if (strength >= 8) return "#ef4444" // 強いつながり - 赤
    if (strength >= 6) return "#f59e0b" // 中程度のつながり - オレンジ
    return "#6b7280" // 弱いつながり - グレー
  }

  const getConnectionWidth = (strength: number) => {
    return Math.max(1, strength / 2)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* ヘッダー */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Building2 className="h-8 w-8" />
              管理者つながりマップ
            </h1>
            <p className="text-muted-foreground">組織全体のKudosネットワークを管理者視点で分析・監視できます</p>
          </div>

          {/* フィルター */}
          <div className="flex gap-4 mb-8">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="部署を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての部署</SelectItem>
                <SelectItem value="開発部">開発部</SelectItem>
                <SelectItem value="営業部">営業部</SelectItem>
                <SelectItem value="マーケティング部">マーケティング部</SelectItem>
                <SelectItem value="人事部">人事部</SelectItem>
                <SelectItem value="財務部">財務部</SelectItem>
              </SelectContent>
            </Select>

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

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              詳細フィルター
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ネットワークマップ */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    組織全体つながりネットワーク
                  </CardTitle>
                  <CardDescription>
                    全従業員間のKudosのやり取りを可視化。線の太さはつながりの強さを表します
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <svg width="600" height="400" className="border rounded-lg bg-slate-50">
                      {/* 接続線を描画 */}
                      {connections.map((connection, index) => {
                        const fromUser = users.find((u) => u.name === connection.from)
                        const toUser = users.find((u) => u.name === connection.to)

                        if (!fromUser || !toUser) return null

                        return (
                          <line
                            key={index}
                            x1={fromUser.position.x}
                            y1={fromUser.position.y}
                            x2={toUser.position.x}
                            y2={toUser.position.y}
                            stroke={getConnectionStrengthColor(connection.strength)}
                            strokeWidth={getConnectionWidth(connection.strength)}
                            opacity={0.7}
                          />
                        )
                      })}

                      {/* ユーザーノードを描画 */}
                      {users.map((user, index) => (
                        <g key={index}>
                          <circle
                            cx={user.position.x}
                            cy={user.position.y}
                            r={Math.max(20, user.totalKudos / 2)}
                            fill={departmentColors[user.department as keyof typeof departmentColors]}
                            opacity={0.8}
                            className="cursor-pointer hover:opacity-100"
                          />
                          <text
                            x={user.position.x}
                            y={user.position.y + 35}
                            textAnchor="middle"
                            className="text-xs font-medium fill-current"
                          >
                            {user.name}
                          </text>
                          <text
                            x={user.position.x}
                            y={user.position.y + 48}
                            textAnchor="middle"
                            className="text-xs fill-muted-foreground"
                          >
                            {user.department}
                          </text>
                        </g>
                      ))}
                    </svg>

                    {/* 凡例 */}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <span>開発部</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <span>営業部</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                        <span>マーケティング部</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                        <span>人事部</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-500"></div>
                        <span>財務部</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* サイドパネル */}
            <div className="space-y-6">
              {/* 組織つながり統計 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    組織つながり統計
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">総つながり数</span>
                    <span className="font-semibold">{connections.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">アクティブユーザー</span>
                    <span className="font-semibold">{users.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">部署間連携</span>
                    <span className="font-semibold">5部署</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">平均つながり強度</span>
                    <span className="font-semibold">
                      {(connections.reduce((sum, c) => sum + c.strength, 0) / connections.length).toFixed(1)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* 部署別活動状況 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    部署別活動状況
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(departmentColors).map(([dept, color]) => {
                      const deptUsers = users.filter((u) => u.department === dept)
                      const totalKudos = deptUsers.reduce((sum, u) => sum + u.totalKudos, 0)
                      return (
                        <div key={dept} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                            <span className="text-sm font-medium">{dept}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold">{totalKudos} Kudos</div>
                            <div className="text-xs text-muted-foreground">{deptUsers.length}人</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* 管理者アクション */}
              <Card>
                <CardHeader>
                  <CardTitle>管理者機能</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    詳細分析レポート
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Network className="h-4 w-4 mr-2" />
                    組織ネットワーク分析
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    チーム連携促進提案
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
