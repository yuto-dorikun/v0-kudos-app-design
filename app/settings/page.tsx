"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Bell, Shield, Palette, Key, Mail, Calendar, Save, Upload, Eye, EyeOff } from "lucide-react"

export default function SettingsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  // Mock user data
  const [userSettings, setUserSettings] = useState({
    // Profile settings
    name: "田中 太郎",
    email: "tanaka@company.com",
    phone: "090-1234-5678",
    department: "営業部",
    position: "課長",
    joinDate: "2020-04-01",
    bio: "営業部で新規開拓を担当しています。チームワークを大切にし、お客様第一の姿勢で取り組んでいます。",
    avatar: "/placeholder.svg?height=80&width=80",

    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    kudosReceived: true,
    kudosSent: false,
    weeklyReport: true,
    monthlyReport: true,
    teamUpdates: true,

    // Privacy settings
    profileVisibility: "company", // public, company, team, private
    showEmail: true,
    showPhone: false,
    showDepartment: true,
    allowDirectMessages: true,

    // Display settings
    theme: "system", // light, dark, system
    language: "ja",
    timezone: "Asia/Tokyo",
    dateFormat: "YYYY/MM/DD",
  })

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved:", userSettings)
  }

  const tabs = [
    { id: "profile", label: "プロフィール", icon: User },
    { id: "notifications", label: "通知設定", icon: Bell },
    { id: "privacy", label: "プライバシー", icon: Shield },
    { id: "display", label: "表示設定", icon: Palette },
    { id: "security", label: "セキュリティ", icon: Key },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />
      <div className="flex-1 md:ml-64">
        <Header onMobileMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">設定</h1>
              <p className="text-sm md:text-base text-muted-foreground">アカウント設定とプリファレンス</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Settings Navigation */}
              <div className="lg:col-span-1">
                <Card className="p-4">
                  <nav className="space-y-2">
                    {tabs.map((tab) => {
                      const Icon = tab.icon
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                            activeTab === tab.id
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{tab.label}</span>
                        </button>
                      )
                    })}
                  </nav>
                </Card>
              </div>

              {/* Settings Content */}
              <div className="lg:col-span-3">
                <Card className="p-6">
                  {activeTab === "profile" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-foreground mb-4">プロフィール設定</h2>
                        <p className="text-sm text-muted-foreground mb-6">あなたの基本情報を管理します。</p>
                      </div>

                      {/* Avatar Section */}
                      <div className="flex items-center gap-6">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={userSettings.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-lg">{userSettings.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <Button variant="outline" className="mb-2 bg-transparent">
                            <Upload className="w-4 h-4 mr-2" />
                            写真を変更
                          </Button>
                          <p className="text-xs text-muted-foreground">JPG、PNG形式、最大2MB</p>
                        </div>
                      </div>

                      <Separator />

                      {/* Basic Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">氏名</Label>
                          <Input
                            id="name"
                            value={userSettings.name}
                            onChange={(e) => setUserSettings({ ...userSettings, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">メールアドレス</Label>
                          <Input
                            id="email"
                            type="email"
                            value={userSettings.email}
                            onChange={(e) => setUserSettings({ ...userSettings, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">電話番号</Label>
                          <Input
                            id="phone"
                            value={userSettings.phone}
                            onChange={(e) => setUserSettings({ ...userSettings, phone: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">部署</Label>
                          <Input
                            id="department"
                            value={userSettings.department}
                            onChange={(e) => setUserSettings({ ...userSettings, department: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">役職</Label>
                          <Input
                            id="position"
                            value={userSettings.position}
                            onChange={(e) => setUserSettings({ ...userSettings, position: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="joinDate">入社日</Label>
                          <Input
                            id="joinDate"
                            type="date"
                            value={userSettings.joinDate}
                            onChange={(e) => setUserSettings({ ...userSettings, joinDate: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">自己紹介</Label>
                        <Textarea
                          id="bio"
                          placeholder="あなたについて簡単に紹介してください..."
                          value={userSettings.bio}
                          onChange={(e) => setUserSettings({ ...userSettings, bio: e.target.value })}
                          rows={4}
                        />
                        <p className="text-xs text-muted-foreground">{userSettings.bio.length}/500文字</p>
                      </div>
                    </div>
                  )}

                  {activeTab === "notifications" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-foreground mb-4">通知設定</h2>
                        <p className="text-sm text-muted-foreground mb-6">受け取りたい通知を選択してください。</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base font-medium">メール通知</Label>
                            <p className="text-sm text-muted-foreground">重要な更新をメールで受け取る</p>
                          </div>
                          <Switch
                            checked={userSettings.emailNotifications}
                            onCheckedChange={(checked) =>
                              setUserSettings({ ...userSettings, emailNotifications: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base font-medium">プッシュ通知</Label>
                            <p className="text-sm text-muted-foreground">ブラウザでの通知を受け取る</p>
                          </div>
                          <Switch
                            checked={userSettings.pushNotifications}
                            onCheckedChange={(checked) =>
                              setUserSettings({ ...userSettings, pushNotifications: checked })
                            }
                          />
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="font-medium text-foreground">Kudos通知</h3>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-base font-medium">Kudos受信時</Label>
                              <p className="text-sm text-muted-foreground">Kudosを受け取った時に通知</p>
                            </div>
                            <Switch
                              checked={userSettings.kudosReceived}
                              onCheckedChange={(checked) =>
                                setUserSettings({ ...userSettings, kudosReceived: checked })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-base font-medium">Kudos送信時</Label>
                              <p className="text-sm text-muted-foreground">Kudosを送信した時に通知</p>
                            </div>
                            <Switch
                              checked={userSettings.kudosSent}
                              onCheckedChange={(checked) => setUserSettings({ ...userSettings, kudosSent: checked })}
                            />
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="font-medium text-foreground">レポート通知</h3>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-base font-medium">週次レポート</Label>
                              <p className="text-sm text-muted-foreground">毎週の活動サマリーを受け取る</p>
                            </div>
                            <Switch
                              checked={userSettings.weeklyReport}
                              onCheckedChange={(checked) => setUserSettings({ ...userSettings, weeklyReport: checked })}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-base font-medium">月次レポート</Label>
                              <p className="text-sm text-muted-foreground">毎月の詳細レポートを受け取る</p>
                            </div>
                            <Switch
                              checked={userSettings.monthlyReport}
                              onCheckedChange={(checked) =>
                                setUserSettings({ ...userSettings, monthlyReport: checked })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-base font-medium">チーム更新</Label>
                              <p className="text-sm text-muted-foreground">チームの重要な更新を受け取る</p>
                            </div>
                            <Switch
                              checked={userSettings.teamUpdates}
                              onCheckedChange={(checked) => setUserSettings({ ...userSettings, teamUpdates: checked })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "privacy" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-foreground mb-4">プライバシー設定</h2>
                        <p className="text-sm text-muted-foreground mb-6">あなたの情報の公開範囲を設定します。</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>プロフィールの公開範囲</Label>
                          <Select
                            value={userSettings.profileVisibility}
                            onValueChange={(value) => setUserSettings({ ...userSettings, profileVisibility: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">全体に公開</SelectItem>
                              <SelectItem value="company">社内のみ</SelectItem>
                              <SelectItem value="team">チームのみ</SelectItem>
                              <SelectItem value="private">非公開</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="font-medium text-foreground">情報の表示設定</h3>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-base font-medium">メールアドレス</Label>
                              <p className="text-sm text-muted-foreground">プロフィールでメールアドレスを表示</p>
                            </div>
                            <Switch
                              checked={userSettings.showEmail}
                              onCheckedChange={(checked) => setUserSettings({ ...userSettings, showEmail: checked })}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-base font-medium">電話番号</Label>
                              <p className="text-sm text-muted-foreground">プロフィールで電話番号を表示</p>
                            </div>
                            <Switch
                              checked={userSettings.showPhone}
                              onCheckedChange={(checked) => setUserSettings({ ...userSettings, showPhone: checked })}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-base font-medium">部署情報</Label>
                              <p className="text-sm text-muted-foreground">プロフィールで部署情報を表示</p>
                            </div>
                            <Switch
                              checked={userSettings.showDepartment}
                              onCheckedChange={(checked) =>
                                setUserSettings({ ...userSettings, showDepartment: checked })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-base font-medium">ダイレクトメッセージ</Label>
                              <p className="text-sm text-muted-foreground">他のユーザーからのメッセージを許可</p>
                            </div>
                            <Switch
                              checked={userSettings.allowDirectMessages}
                              onCheckedChange={(checked) =>
                                setUserSettings({ ...userSettings, allowDirectMessages: checked })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "display" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-foreground mb-4">表示設定</h2>
                        <p className="text-sm text-muted-foreground mb-6">
                          アプリケーションの表示方法をカスタマイズします。
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>テーマ</Label>
                          <Select
                            value={userSettings.theme}
                            onValueChange={(value) => setUserSettings({ ...userSettings, theme: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">ライト</SelectItem>
                              <SelectItem value="dark">ダーク</SelectItem>
                              <SelectItem value="system">システム設定に従う</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>言語</Label>
                          <Select
                            value={userSettings.language}
                            onValueChange={(value) => setUserSettings({ ...userSettings, language: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ja">日本語</SelectItem>
                              <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>タイムゾーン</Label>
                          <Select
                            value={userSettings.timezone}
                            onValueChange={(value) => setUserSettings({ ...userSettings, timezone: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                              <SelectItem value="UTC">UTC</SelectItem>
                              <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>日付形式</Label>
                          <Select
                            value={userSettings.dateFormat}
                            onValueChange={(value) => setUserSettings({ ...userSettings, dateFormat: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="YYYY/MM/DD">2024/01/15</SelectItem>
                              <SelectItem value="MM/DD/YYYY">01/15/2024</SelectItem>
                              <SelectItem value="DD/MM/YYYY">15/01/2024</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "security" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-foreground mb-4">セキュリティ設定</h2>
                        <p className="text-sm text-muted-foreground mb-6">アカウントのセキュリティを管理します。</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">現在のパスワード</Label>
                          <div className="relative">
                            <Input
                              id="current-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="現在のパスワードを入力"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="new-password">新しいパスワード</Label>
                          <Input id="new-password" type="password" placeholder="新しいパスワードを入力" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">パスワード確認</Label>
                          <Input id="confirm-password" type="password" placeholder="新しいパスワードを再入力" />
                        </div>

                        <Button variant="outline" className="w-full bg-transparent">
                          パスワードを変更
                        </Button>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="font-medium text-foreground">アカウント情報</h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 border rounded-lg">
                              <Mail className="w-5 h-5 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">メールアドレス</p>
                                <p className="text-xs text-muted-foreground">{userSettings.email}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 border rounded-lg">
                              <Calendar className="w-5 h-5 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">最終ログイン</p>
                                <p className="text-xs text-muted-foreground">2024年1月15日 14:30</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="font-medium text-foreground text-red-600">危険な操作</h3>
                          <Button variant="destructive" className="w-full">
                            アカウントを削除
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            この操作は取り消すことができません。すべてのデータが永久に削除されます。
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <Separator className="my-6" />

                  <div className="flex justify-end">
                    <Button onClick={handleSave} className="px-8">
                      <Save className="w-4 h-4 mr-2" />
                      設定を保存
                    </Button>
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
