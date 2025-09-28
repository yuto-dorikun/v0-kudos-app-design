"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  Bell,
  Shield,
  Database,
  Users,
  Award,
  Mail,
  Slack,
  Download,
  Upload,
  AlertTriangle,
  Save,
  Plus,
  X,
} from "lucide-react"

export default function AdminSettingsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [kudosCategories, setKudosCategories] = useState([
    { id: 1, name: "チームワーク", color: "blue", points: 10 },
    { id: 2, name: "リーダーシップ", color: "purple", points: 15 },
    { id: 3, name: "イノベーション", color: "green", points: 20 },
    { id: 4, name: "サポート", color: "orange", points: 10 },
  ])
  const [newCategory, setNewCategory] = useState({ name: "", color: "blue", points: 10 })

  const addKudosCategory = () => {
    if (newCategory.name.trim()) {
      setKudosCategories([
        ...kudosCategories,
        {
          id: Date.now(),
          ...newCategory,
        },
      ])
      setNewCategory({ name: "", color: "blue", points: 10 })
    }
  }

  const removeKudosCategory = (id: number) => {
    setKudosCategories(kudosCategories.filter((cat) => cat.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />
      <div className="flex-1 md:ml-64">
        <Header onMobileMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">管理者設定</h1>
              <p className="text-sm md:text-base text-muted-foreground">組織とKudosシステムの設定を管理します</p>
            </div>

            <div className="space-y-6">
              {/* 組織設定 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    組織設定
                  </CardTitle>
                  <CardDescription>組織の基本情報を設定します</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="org-name">組織名</Label>
                      <Input id="org-name" defaultValue="株式会社サンプル" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org-domain">ドメイン</Label>
                      <Input id="org-domain" defaultValue="sample.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-description">組織の説明</Label>
                    <Textarea
                      id="org-description"
                      defaultValue="私たちは革新的なソリューションを提供する企業です。"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-logo">組織ロゴ</Label>
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        ロゴをアップロード
                      </Button>
                      <span className="text-sm text-muted-foreground">推奨サイズ: 200x200px</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Kudos設定 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Kudos設定
                  </CardTitle>
                  <CardDescription>Kudosの種類とポイント設定を管理します</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="daily-limit">1日の送信制限</Label>
                      <Input id="daily-limit" type="number" defaultValue="5" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthly-limit">月間送信制限</Label>
                      <Input id="monthly-limit" type="number" defaultValue="50" />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-4">Kudosカテゴリ</h4>
                    <div className="space-y-3">
                      {kudosCategories.map((category) => (
                        <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full bg-${category.color}-500`} />
                            <span className="font-medium">{category.name}</span>
                            <Badge variant="secondary">{category.points}pt</Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeKudosCategory(category.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-4 border-2 border-dashed rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Input
                          placeholder="カテゴリ名"
                          value={newCategory.name}
                          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        />
                        <Select
                          value={newCategory.color}
                          onValueChange={(value) => setNewCategory({ ...newCategory, color: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blue">青</SelectItem>
                            <SelectItem value="purple">紫</SelectItem>
                            <SelectItem value="green">緑</SelectItem>
                            <SelectItem value="orange">オレンジ</SelectItem>
                            <SelectItem value="red">赤</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="ポイント"
                            value={newCategory.points}
                            onChange={(e) =>
                              setNewCategory({ ...newCategory, points: Number.parseInt(e.target.value) || 10 })
                            }
                          />
                          <Button onClick={addKudosCategory} size="sm">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 通知設定 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    通知設定
                  </CardTitle>
                  <CardDescription>メール通知とSlack連携の設定</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">メール通知</p>
                        <p className="text-sm text-muted-foreground">Kudos受信時にメール通知を送信</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Slack className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Slack連携</p>
                        <p className="text-sm text-muted-foreground">Slackチャンネルに通知を送信</p>
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notification-frequency">通知頻度</Label>
                    <Select defaultValue="immediate">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">即座に通知</SelectItem>
                        <SelectItem value="daily">1日1回まとめて</SelectItem>
                        <SelectItem value="weekly">週1回まとめて</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* ユーザー管理設定 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    ユーザー管理設定
                  </CardTitle>
                  <CardDescription>新規ユーザーの承認と権限設定</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">新規ユーザーの承認</p>
                      <p className="text-sm text-muted-foreground">新規登録時に管理者の承認を必要とする</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">自動部署割り当て</p>
                      <p className="text-sm text-muted-foreground">メールドメインに基づいて部署を自動割り当て</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="default-role">デフォルト権限</Label>
                    <Select defaultValue="user">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">一般ユーザー</SelectItem>
                        <SelectItem value="manager">マネージャー</SelectItem>
                        <SelectItem value="admin">管理者</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* データ設定 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    データ設定
                  </CardTitle>
                  <CardDescription>データのエクスポートとバックアップ設定</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">自動バックアップ</p>
                      <p className="text-sm text-muted-foreground">毎日自動でデータをバックアップ</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="retention-period">データ保持期間</Label>
                    <Select defaultValue="2years">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1year">1年</SelectItem>
                        <SelectItem value="2years">2年</SelectItem>
                        <SelectItem value="5years">5年</SelectItem>
                        <SelectItem value="forever">無期限</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      データエクスポート
                    </Button>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      データインポート
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* セキュリティ設定 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    セキュリティ設定
                  </CardTitle>
                  <CardDescription>パスワードポリシーとセキュリティ設定</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">二要素認証</p>
                      <p className="text-sm text-muted-foreground">全ユーザーに二要素認証を必須とする</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-password-length">最小パスワード長</Label>
                      <Input id="min-password-length" type="number" defaultValue="8" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">セッションタイムアウト（分）</Label>
                      <Input id="session-timeout" type="number" defaultValue="60" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">ログイン試行制限</p>
                      <p className="text-sm text-muted-foreground">5回失敗でアカウントを一時ロック</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800">セキュリティ警告</p>
                        <p className="text-sm text-yellow-700">
                          セキュリティ設定の変更は全ユーザーに影響します。変更前に十分検討してください。
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 保存ボタン */}
              <div className="flex justify-end gap-4">
                <Button variant="outline">キャンセル</Button>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  設定を保存
                </Button>
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
