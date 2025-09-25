"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  TrendingUp,
  Award,
  Users,
  Target,
  Brain,
  Star,
  ChevronRight,
  BarChart3,
  Lightbulb,
  Heart,
  Zap,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// モックデータ：各ユーザーの強み分析結果
const usersStrengthsData = [
  {
    id: "tanaka",
    name: "田中 太郎",
    department: "営業部",
    section: "第一営業課",
    avatar: "田",
    totalKudosReceived: 47,
    totalKudosSent: 32,
    aiAnalysis: {
      primaryStrengths: ["コミュニケーション", "チームワーク", "問題解決"],
      strengthsScore: 92,
      topCategories: [
        { category: "ありがとう", count: 15, percentage: 32 },
        { category: "チームワーク", count: 12, percentage: 26 },
        { category: "問題解決", count: 10, percentage: 21 },
        { category: "リーダーシップ", count: 6, percentage: 13 },
        { category: "助かった", count: 4, percentage: 8 },
      ],
      radarData: [
        { skill: "コミュニケーション", score: 95 },
        { skill: "チームワーク", score: 88 },
        { skill: "問題解決", score: 85 },
        { skill: "リーダーシップ", score: 75 },
        { skill: "クリエイティブ", score: 65 },
        { skill: "技術力", score: 70 },
      ],
      insights: [
        "チーム内でのコミュニケーション能力が特に高く評価されています",
        "問題解決において積極的にサポートを提供する姿勢が評価されています",
        "リーダーシップの発揮により、チーム全体のモチベーション向上に貢献しています",
      ],
      recommendations: [
        "メンタリング役として新人指導に参加することを推奨します",
        "プロジェクトリーダーとしての経験を積むことで更なる成長が期待できます",
      ],
    },
  },
  {
    id: "sato",
    name: "佐藤 花子",
    department: "開発部",
    section: "フロントエンド課",
    avatar: "佐",
    totalKudosReceived: 38,
    totalKudosSent: 45,
    aiAnalysis: {
      primaryStrengths: ["クリエイティブ", "技術力", "学習意欲"],
      strengthsScore: 89,
      topCategories: [
        { category: "素晴らしい", count: 14, percentage: 37 },
        { category: "クリエイティブ", count: 11, percentage: 29 },
        { category: "勉強になった", count: 8, percentage: 21 },
        { category: "助かった", count: 3, percentage: 8 },
        { category: "ありがとう", count: 2, percentage: 5 },
      ],
      radarData: [
        { skill: "クリエイティブ", score: 92 },
        { skill: "技術力", score: 90 },
        { skill: "学習意欲", score: 88 },
        { skill: "問題解決", score: 80 },
        { skill: "コミュニケーション", score: 75 },
        { skill: "チームワーク", score: 78 },
      ],
      insights: [
        "技術的な創造性と革新的なアイデアで高く評価されています",
        "新しい技術の習得と共有において積極的な姿勢を示しています",
        "UI/UXデザインにおける優れたセンスが認められています",
      ],
      recommendations: [
        "技術勉強会の講師として知識共有を行うことを推奨します",
        "新技術の導入プロジェクトでリードを取ることで更なる成長が期待できます",
      ],
    },
  },
  {
    id: "suzuki",
    name: "鈴木 一郎",
    department: "営業部",
    section: "第二営業課",
    avatar: "鈴",
    totalKudosReceived: 29,
    totalKudosSent: 41,
    aiAnalysis: {
      primaryStrengths: ["サポート力", "信頼性", "継続性"],
      strengthsScore: 85,
      topCategories: [
        { category: "助かった", count: 12, percentage: 41 },
        { category: "ありがとう", count: 9, percentage: 31 },
        { category: "チームワーク", count: 5, percentage: 17 },
        { category: "問題解決", count: 2, percentage: 7 },
        { category: "素晴らしい", count: 1, percentage: 4 },
      ],
      radarData: [
        { skill: "サポート力", score: 90 },
        { skill: "信頼性", score: 88 },
        { skill: "継続性", score: 85 },
        { skill: "チームワーク", score: 80 },
        { skill: "コミュニケーション", score: 75 },
        { skill: "問題解決", score: 70 },
      ],
      insights: [
        "チームメンバーへの継続的なサポートが高く評価されています",
        "困った時に頼りになる存在として信頼を得ています",
        "地道な作業を継続する力が組織の安定に貢献しています",
      ],
      recommendations: [
        "新人のバディ制度でサポート役を担うことを推奨します",
        "プロセス改善の提案により更なる貢献が期待できます",
      ],
    },
  },
]

export default function StrengthsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const filteredUsers = usersStrengthsData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || user.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const selectedUserData = selectedUser ? usersStrengthsData.find((u) => u.id === selectedUser) : null

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />
      <div className="flex-1 md:ml-64">
        <Header onMobileMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">強み分析</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Kudos情報をAIが分析した各メンバーの強みと成長ポイント
              </p>
            </div>

            {/* 検索・フィルター */}
            <Card className="p-4 md:p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="名前や部署で検索..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
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
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* ユーザー一覧 */}
              <div className="lg:col-span-1">
                <Card className="p-4 md:p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    メンバー一覧
                  </h2>
                  <div className="space-y-3">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => setSelectedUser(user.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedUser === user.id ? "border-primary bg-primary/10" : "border-border hover:bg-accent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                            {user.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-foreground">{user.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {user.department} - {user.section}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                強み度: {user.aiAnalysis.strengthsScore}
                              </Badge>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* 詳細分析 */}
              <div className="lg:col-span-2">
                {selectedUserData ? (
                  <div className="space-y-6">
                    {/* ユーザー概要 */}
                    <Card className="p-4 md:p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-xl">
                          {selectedUserData.avatar}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-foreground">{selectedUserData.name}</h2>
                          <p className="text-muted-foreground">
                            {selectedUserData.department} - {selectedUserData.section}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <span className="text-sm">受信: {selectedUserData.totalKudosReceived}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4 text-blue-600" />
                              <span className="text-sm">送信: {selectedUserData.totalKudosSent}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 主要な強み */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-500" />
                          主要な強み
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedUserData.aiAnalysis.primaryStrengths.map((strength, index) => (
                            <Badge key={index} variant="default" className="bg-primary/10 text-primary">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">総合強み度</span>
                            <span className="text-sm font-bold text-primary">
                              {selectedUserData.aiAnalysis.strengthsScore}/100
                            </span>
                          </div>
                          <Progress value={selectedUserData.aiAnalysis.strengthsScore} className="h-2" />
                        </div>
                      </div>
                    </Card>

                    {/* Kudosカテゴリ分析 */}
                    <Card className="p-4 md:p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        受信Kudosカテゴリ分析
                      </h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={selectedUserData.aiAnalysis.topCategories}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="hsl(var(--primary))" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </Card>

                    {/* スキルレーダーチャート */}
                    <Card className="p-4 md:p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        スキル分析
                      </h3>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={selectedUserData.aiAnalysis.radarData}>
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

                    {/* AI分析インサイト */}
                    <Card className="p-4 md:p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        AI分析インサイト
                      </h3>
                      <div className="space-y-4">
                        {selectedUserData.aiAnalysis.insights.map((insight, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                            <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-foreground">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* 成長推奨事項 */}
                    <Card className="p-4 md:p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        成長推奨事項
                      </h3>
                      <div className="space-y-3">
                        {selectedUserData.aiAnalysis.recommendations.map((recommendation, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                            <Award className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-foreground">{recommendation}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">メンバーを選択してください</h3>
                    <p className="text-muted-foreground">
                      左側のリストからメンバーを選択すると、AI分析による詳細な強み分析が表示されます。
                    </p>
                  </Card>
                )}
              </div>
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
