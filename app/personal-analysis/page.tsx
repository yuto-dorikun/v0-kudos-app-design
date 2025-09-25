"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Brain, TrendingUp, Award, Target, Lightbulb, Users } from "lucide-react"

export default function PersonalAnalysisPage() {
  // モックデータ
  const strengthsData = [
    { name: "リーダーシップ", value: 85, count: 12 },
    { name: "創造性", value: 78, count: 9 },
    { name: "協調性", value: 92, count: 15 },
    { name: "問題解決", value: 73, count: 8 },
    { name: "コミュニケーション", value: 88, count: 11 },
  ]

  const monthlyTrend = [
    { month: "10月", received: 8, sent: 6 },
    { month: "11月", received: 12, sent: 9 },
    { month: "12月", received: 15, sent: 11 },
    { month: "1月", received: 18, sent: 12 },
  ]

  const categoryDistribution = [
    { name: "協調性", value: 30, color: "#8884d8" },
    { name: "リーダーシップ", value: 25, color: "#82ca9d" },
    { name: "コミュニケーション", value: 20, color: "#ffc658" },
    { name: "創造性", value: 15, color: "#ff7300" },
    { name: "問題解決", value: 10, color: "#00ff88" },
  ]

  const aiInsights = [
    {
      type: "strength",
      title: "協調性が最大の強み",
      description: "チームメンバーとの連携において特に高い評価を受けています。",
      icon: Users,
      color: "text-green-600",
    },
    {
      type: "growth",
      title: "問題解決スキルの向上機会",
      description: "技術的な課題解決でより多くの貢献ができる可能性があります。",
      icon: Lightbulb,
      color: "text-blue-600",
    },
    {
      type: "trend",
      title: "継続的な成長傾向",
      description: "過去4ヶ月間で受信Kudos数が125%増加しています。",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* ヘッダー */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">個人分析</h1>
            <p className="text-muted-foreground">AIによるあなたの強みと成長ポイントの詳細分析</p>
          </div>

          {/* AI分析結果 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {aiInsights.map((insight, index) => {
              const Icon = insight.icon
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className={`h-5 w-5 ${insight.color}`} />
                      {insight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* 強みスコア */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  強みスコア分析
                </CardTitle>
                <CardDescription>受信したKudosから算出された各分野のスコア</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {strengthsData.map((strength) => (
                  <div key={strength.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{strength.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{strength.count}件</Badge>
                        <span className="text-sm font-bold">{strength.value}%</span>
                      </div>
                    </div>
                    <Progress value={strength.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* カテゴリ分布 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Kudosカテゴリ分布
                </CardTitle>
                <CardDescription>受信したKudosのカテゴリ別割合</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name} ${value}%`}
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* 月次トレンド */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                月次アクティビティトレンド
              </CardTitle>
              <CardDescription>過去4ヶ月間のKudos送受信の推移</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="received" stroke="#8884d8" strokeWidth={2} name="受信" />
                  <Line type="monotone" dataKey="sent" stroke="#82ca9d" strokeWidth={2} name="送信" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
