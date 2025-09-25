"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Building2, Users, Edit3, Save, X } from "lucide-react"

const userStats = [
  { label: "送信したKudos", value: "47", color: "text-blue-600" },
  { label: "受信したKudos", value: "32", color: "text-green-600" },
  { label: "今月の送信", value: "8", color: "text-purple-600" },
  { label: "今月の受信", value: "12", color: "text-orange-600" },
]

const recentActivity = [
  {
    id: 1,
    type: "received",
    from: "田中 太郎",
    kudosType: "ありがとう",
    message: "プロジェクトの資料作成、本当にありがとうございました！",
    timestamp: "2時間前",
  },
  {
    id: 2,
    type: "sent",
    to: "佐藤 花子",
    kudosType: "素晴らしい",
    message: "新機能のUIデザイン、とても使いやすくて素晴らしいです！",
    timestamp: "5時間前",
  },
  {
    id: 3,
    type: "received",
    from: "鈴木 一郎",
    kudosType: "チームワーク",
    message: "昨日のミーティングでのサポート、ありがとうございました。",
    timestamp: "1日前",
  },
]

export default function ProfilePage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "山田 太郎",
    email: "yamada.taro@company.com",
    department: "営業部",
    section: "第一営業課",
    position: "マネージャー",
    bio: "チームワークを大切にし、常に前向きに取り組んでいます。新しいことにチャレンジするのが好きです。",
  })

  const handleSave = () => {
    setIsEditing(false)
    // ここで実際の保存処理を行う
  }

  const handleCancel = () => {
    setIsEditing(false)
    // 元のデータに戻す処理
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />
      <div className="flex-1 md:ml-64">
        <Header onMobileMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">個人アカウント</h1>
              <p className="text-sm md:text-base text-muted-foreground">プロフィール情報とアクティビティを管理</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* プロフィール情報 */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg md:text-xl font-semibold text-foreground">プロフィール情報</h2>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                        <Edit3 className="w-4 h-4 mr-2" />
                        編集
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button onClick={handleSave} size="sm">
                          <Save className="w-4 h-4 mr-2" />
                          保存
                        </Button>
                        <Button onClick={handleCancel} variant="outline" size="sm">
                          <X className="w-4 h-4 mr-2" />
                          キャンセル
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary text-primary-foreground font-bold text-xl md:text-2xl">
                      YT
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground">{profileData.name}</h3>
                      <p className="text-sm md:text-base text-muted-foreground">
                        {profileData.department} - {profileData.section}
                      </p>
                      <p className="text-sm text-muted-foreground">{profileData.position}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">氏名</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="mt-1"
                        />
                      ) : (
                        <div className="flex items-center gap-2 mt-1 p-2 bg-muted rounded-md">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{profileData.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">メールアドレス</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="mt-1"
                        />
                      ) : (
                        <div className="flex items-center gap-2 mt-1 p-2 bg-muted rounded-md">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{profileData.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="department">部署</Label>
                      {isEditing ? (
                        <Select
                          value={profileData.department}
                          onValueChange={(value) => setProfileData({ ...profileData, department: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="営業部">営業部</SelectItem>
                            <SelectItem value="開発部">開発部</SelectItem>
                            <SelectItem value="マーケティング部">マーケティング部</SelectItem>
                            <SelectItem value="人事部">人事部</SelectItem>
                            <SelectItem value="総務部">総務部</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex items-center gap-2 mt-1 p-2 bg-muted rounded-md">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{profileData.department}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="section">課・チーム</Label>
                      {isEditing ? (
                        <Input
                          id="section"
                          value={profileData.section}
                          onChange={(e) => setProfileData({ ...profileData, section: e.target.value })}
                          className="mt-1"
                        />
                      ) : (
                        <div className="flex items-center gap-2 mt-1 p-2 bg-muted rounded-md">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{profileData.section}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="bio">自己紹介</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="mt-1"
                        rows={3}
                      />
                    ) : (
                      <div className="mt-1 p-2 bg-muted rounded-md">
                        <p className="text-sm">{profileData.bio}</p>
                      </div>
                    )}
                  </div>
                </Card>

                {/* 最近のアクティビティ */}
                <Card className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">最近のアクティビティ</h2>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${activity.type === "received" ? "bg-green-500" : "bg-blue-500"}`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-xs">
                              {activity.kudosType}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {activity.type === "received" ? `${activity.from}から受信` : `${activity.to}に送信`}
                            </span>
                          </div>
                          <p className="text-sm text-foreground mb-1">{activity.message}</p>
                          <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* 統計情報 */}
              <div className="space-y-6">
                <Card className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">統計情報</h2>
                  <div className="space-y-4">
                    {userStats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                        <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-4 md:p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">今月の目標</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Kudos送信</span>
                      <span className="text-sm font-medium">8/10</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "80%" }} />
                    </div>
                  </div>
                </Card>
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
