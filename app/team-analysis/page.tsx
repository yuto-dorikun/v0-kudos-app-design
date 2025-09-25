"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  TrendingUp,
  Award,
  Target,
  Brain,
  BarChart3,
  Lightbulb,
  Heart,
  Zap,
  Network,
  Activity,
  UserCheck,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// モックデータ：チーム分析結果
const teamAnalysisData = {
  overview: {
    totalMembers: 24,
    activeMembers: 22,
    totalKudos: 156,
    teamEngagement: 87,
    collaborationScore: 92,
  },
  departments: [
    {
      name: "営業部",
      members: 8,
      kudosGiven: 45,
      kudosReceived: 52,
      engagement: 89,
      topStrengths: ["コミュニケーション", "チームワーク", "問題解決"],
      color: "#3b82f6",
    },
    {
      name: "開発部",
      members: 10,
      kudosGiven: 38,
      kudosReceived: 41,
      engagement: 85,
      topStrengths: ["技術力", "クリエイティブ", "学習意欲"],
      color: "#10b981",
    },
    {
      name: "マーケティング部",
      members: 6,
      kudosGiven: 32,
      kudosReceived: 28,
      engagement: 88,
      topStrengths: ["企画力", "分析力", "プレゼン"],
      color: "#f59e0b",
    },
  ],
  monthlyTrend: [
    { month: "1月", kudos: 98, engagement: 82 },
    { month: "2月", kudos: 112, engagement: 85 },
    { month: "3月", kudos: 134, engagement: 88 },
    { month: "4月", kudos: 156, engagement: 87 },
  ],
  collaborationMatrix: [
    { from: "営業部", to: "開発部", connections: 15 },
    { from: "営業部", to: "マーケティング部", connections: 12 },
    { from: "開発部", to: "マーケティング部", connections: 8 },
    { from: "開発部", to: "営業部", connections: 13 },
    { from: "マーケティング部", to: "営業部", connections: 10 },
    { from: "マーケティング部", to: "開発部", connections: 9 },
  ],
  teamRadarData: [
    { skill: "コミュニケーション", score: 88 },
    { skill: "チームワーク", score: 92 },
    { skill: "問題解決", score: 85 },
    { skill: "クリエイティブ", score: 78 },
    { skill: "リーダーシップ", score: 82 },
    { skill: "技術力", score: 86 },
  ],
  insights: [
    "営業部と開発部間のコラボレーションが特に活発で、プロジェクトの成功に大きく貢献しています",
    "チーム全体のエンゲージメントが高く、特にチームワークの評価が優秀です",
    "マーケティング部の企画力と分析力が他部署からも高く評価されています",
    "月次でのKudos送信数が継続的に増加しており、組織文化の浸透が見られます",
  ],
  recommendations: [
    "部署間のコラボレーションをさらに促進するため、定期的な合同プロジェクトの実施を推奨します",
    "技術力向上のための勉強会やワークショップの開催を検討してください",
    "新人メンバーのオンボーディングプロセスにKudos文化の説明を組み込むことを推奨します",
  ],
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export default function TeamAnalysisPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")

  const filteredDepartments =
    selectedDepartment === "all"
      ? teamAnalysisData.departments
      : teamAnalysisData.departments.filter((dept) => dept.name === selectedDepartment)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />
      <div className="flex-1 md:ml-64">
        <Header onMobileMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">チーム分析</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                チーム全体のKudos活動とコラボレーション状況をAIが分析
              </p>
            </div>

            {/* フィルター */}
            <Card className="p-4 md:p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="部署を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべての部署</SelectItem>
                    <SelectItem value="営業部">営業部</SelectItem>
                    <SelectItem value="開発部">開発部</SelectItem>
                    <SelectItem value="マーケティング部">マーケティング部</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="期間を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">今週</SelectItem>
                    <SelectItem value="month">今月</SelectItem>
                    <SelectItem value="quarter">四半期</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* 概要統計 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">総メンバー数</p>
                    <p className="text-2xl font-bold text-foreground">{teamAnalysisData.overview.totalMembers}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UserCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">アクティブ</p>
                    <p className="text-2xl font-bold text-foreground">{teamAnalysisData.overview.activeMembers}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Heart className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">総Kudos数</p>
                    <p className="text-2xl font-bold text-foreground">{teamAnalysisData.overview.totalKudos}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Activity className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">エンゲージメント</p>
                    <p className="text-2xl font-bold text-foreground">{teamAnalysisData.overview.teamEngagement}%</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Network className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">コラボ度</p>
                    <p className="text-2xl font-bold text-foreground">
                      {teamAnalysisData.overview.collaborationScore}%
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* 月次トレンド */}
              <Card className="p-4 md:p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  月次トレンド
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={teamAnalysisData.monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="kudos" stroke="#3b82f6" strokeWidth={2} name="Kudos数" />
                      <Line
                        type="monotone"
                        dataKey="engagement"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="エンゲージメント%"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* チーム全体スキル */}
              <Card className="p-4 md:p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  チーム全体スキル
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={teamAnalysisData.teamRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="スキル"
                        dataKey="score"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* 部署別分析 */}
            <Card className="p-4 md:p-6 mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                部署別分析
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDepartments.map((dept, index) => (
                  <Card key={dept.name} className="p-4 border-l-4" style={{ borderLeftColor: dept.color }}>
                    <div className="mb-3">
                      <h4 className="font-semibold text-foreground">{dept.name}</h4>
                      <p className="text-sm text-muted-foreground">{dept.members}名</p>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>送信Kudos</span>
                        <span className="font-medium">{dept.kudosGiven}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>受信Kudos</span>
                        <span className="font-medium">{dept.kudosReceived}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>エンゲージメント</span>
                        <span className="font-medium">{dept.engagement}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">主要な強み</p>
                      <div className="flex flex-wrap gap-1">
                        {dept.topStrengths.map((strength, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* AI分析インサイト */}
            <Card className="p-4 md:p-6 mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI分析インサイト
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamAnalysisData.insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground">{insight}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* 改善推奨事項 */}
            <Card className="p-4 md:p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                改善推奨事項
              </h3>
              <div className="space-y-3">
                {teamAnalysisData.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <Award className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground">{recommendation}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>

      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
      )}
    </div>
  )
}
