"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown, Users, Award, Calendar, Building2, Download } from "lucide-react"

// モックデータ
const monthlyKudosData = [
  { month: "1月", sent: 45, received: 52, active_users: 28 },
  { month: "2月", sent: 52, received: 48, active_users: 32 },
  { month: "3月", sent: 61, received: 65, active_users: 35 },
  { month: "4月", sent: 58, received: 59, active_users: 33 },
  { month: "5月", sent: 67, received: 71, active_users: 38 },
  { month: "6月", sent: 73, received: 69, active_users: 41 },
]

const departmentStats = [
  { name: "営業部", kudos: 156, members: 12, engagement: 85 },
  { name: "開発部", kudos: 142, members: 15, engagement: 78 },
  { name: "人事部", kudos: 89, members: 8, engagement: 92 },
  { name: "マーケティング部", kudos: 134, members: 10, engagement: 88 },
  { name: "総務部", kudos: 67, members: 6, engagement: 73 },
]

const categoryData = [
  { name: "チームワーク", value: 35, color: "#8884d8" },
  { name: "イノベーション", value: 28, color: "#82ca9d" },
  { name: "リーダーシップ", value: 22, color: "#ffc658" },
  { name: "サポート", value: 15, color: "#ff7c7c" },
]

const topPerformers = [
  { name: "田中太郎", sent: 23, received: 31, department: "営業部" },
  { name: "佐藤花子", sent: 19, received: 28, department: "開発部" },
  { name: "鈴木一郎", sent: 21, received: 25, department: "マーケティング部" },
  { name: "高橋美咲", sent: 18, received: 24, department: "人事部" },
  { name: "山田健太", sent: 16, received: 22, department: "開発部" },
]

export default function StatsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />
      <div className="flex-1 md:ml-64">
        <Header onMobileMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* ヘッダー */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">詳細統計</h1>
              <p className="text-sm md:text-base text-muted-foreground">組織のKudos活動の詳細分析</p>
            </div>

            {/* コントロールセクション */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-2">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1ヶ月</SelectItem>
                    <SelectItem value="3months">3ヶ月</SelectItem>
                    <SelectItem value="6months">6ヶ月</SelectItem>
                    <SelectItem value="1year">1年</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  エクスポート
                </Button>
              </div>
            </div>

            {/* 概要統計 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">総Kudos数</p>
                    <p className="text-2xl font-bold text-foreground">1,247</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +12.5% 前月比
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-yellow-600" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">アクティブユーザー</p>
                    <p className="text-2xl font-bold text-foreground">41</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +8.2% 前月比
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-green-600" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">エンゲージメント率</p>
                    <p className="text-2xl font-bold text-foreground">83.2%</p>
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      -2.1% 前月比
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">平均Kudos/人</p>
                    <p className="text-2xl font-bold text-foreground">30.4</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +5.7% 前月比
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
              </Card>
            </div>

            {/* タブコンテンツ */}
            <Tabs defaultValue="trends" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="trends">トレンド分析</TabsTrigger>
                <TabsTrigger value="departments">部署別統計</TabsTrigger>
                <TabsTrigger value="categories">カテゴリ分析</TabsTrigger>
                <TabsTrigger value="users">ユーザー分析</TabsTrigger>
              </TabsList>

              {/* トレンド分析 */}
              <TabsContent value="trends" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>月次Kudos推移</CardTitle>
                      <CardDescription>送信・受信数の時系列変化</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyKudosData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="sent" stroke="#8884d8" name="送信数" />
                          <Line type="monotone" dataKey="received" stroke="#82ca9d" name="受信数" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>アクティブユーザー推移</CardTitle>
                      <CardDescription>月次アクティブユーザー数</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyKudosData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="active_users" fill="#ffc658" name="アクティブユーザー" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* 部署別統計 */}
              <TabsContent value="departments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>部署別パフォーマンス</CardTitle>
                    <CardDescription>各部署のKudos活動状況とエンゲージメント</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {departmentStats.map((dept) => (
                        <div key={dept.name} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <Building2 className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <h3 className="font-medium">{dept.name}</h3>
                              <p className="text-sm text-muted-foreground">{dept.members}名</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-lg font-bold">{dept.kudos}</div>
                              <div className="text-xs text-muted-foreground">総Kudos</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">{Math.round(dept.kudos / dept.members)}</div>
                              <div className="text-xs text-muted-foreground">平均/人</div>
                            </div>
                            <Badge variant={dept.engagement >= 80 ? "default" : "secondary"}>{dept.engagement}%</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* カテゴリ分析 */}
              <TabsContent value="categories" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Kudosカテゴリ分布</CardTitle>
                      <CardDescription>人気のKudosカテゴリ</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>カテゴリ別詳細</CardTitle>
                      <CardDescription>各カテゴリの統計情報</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {categoryData.map((category) => (
                          <div key={category.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                              <span className="font-medium">{category.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-lg font-bold">{category.value}%</span>
                              <Badge variant="outline">{Math.round(category.value * 12.47)} Kudos</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* ユーザー分析 */}
              <TabsContent value="users" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>トップパフォーマー</CardTitle>
                    <CardDescription>Kudos送受信数上位ユーザー</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topPerformers.map((user, index) => (
                        <div key={user.name} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-medium">{user.name}</h3>
                              <p className="text-sm text-muted-foreground">{user.department}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">{user.sent}</div>
                              <div className="text-xs text-muted-foreground">送信</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-600">{user.received}</div>
                              <div className="text-xs text-muted-foreground">受信</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">{user.sent + user.received}</div>
                              <div className="text-xs text-muted-foreground">合計</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
      )}
    </div>
  )
}
