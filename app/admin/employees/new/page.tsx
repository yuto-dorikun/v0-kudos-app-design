"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, UserPlus } from "lucide-react"
import Link from "next/link"

const organizationData = [
  {
    id: 1,
    name: "東京本社",
    departments: [
      {
        id: 1,
        name: "営業部",
        sections: [
          { id: 1, name: "第一営業課" },
          { id: 2, name: "第二営業課" },
          { id: 3, name: "営業企画課" },
        ],
      },
      {
        id: 2,
        name: "開発部",
        sections: [
          { id: 4, name: "フロントエンド課" },
          { id: 5, name: "バックエンド課" },
          { id: 6, name: "インフラ課" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "大阪支社",
    departments: [
      {
        id: 3,
        name: "営業部",
        sections: [
          { id: 7, name: "関西営業課" },
          { id: 8, name: "営業サポート課" },
        ],
      },
      {
        id: 4,
        name: "人事部",
        sections: [
          { id: 9, name: "採用課" },
          { id: 10, name: "労務課" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "名古屋支社",
    departments: [
      {
        id: 5,
        name: "営業部",
        sections: [{ id: 11, name: "中部営業課" }],
      },
    ],
  },
]

const roles = [
  { id: 1, name: "一般社員" },
  { id: 2, name: "主任" },
  { id: 3, name: "係長" },
  { id: 4, name: "課長" },
  { id: 5, name: "部長" },
  { id: 6, name: "管理者" },
]

export default function NewEmployeePage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    employeeId: "",
    office: "",
    department: "",
    section: "",
    role: "",
    startDate: "",
    notes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === "office") {
      setFormData((prev) => ({ ...prev, department: "", section: "" }))
    }
    // 部署が変更されたら課をリセット
    if (field === "department") {
      setFormData((prev) => ({ ...prev, section: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 従業員作成のAPI呼び出し
    console.log("新規従業員データ:", formData)
    // 成功後は管理者画面にリダイレクト
  }

  const selectedOffice = organizationData.find((office) => office.name === formData.office)
  const availableDepartments = selectedOffice ? selectedOffice.departments : []

  // 選択された部署に基づいて課を絞り込み
  const selectedDepartment = availableDepartments.find((dept) => dept.name === formData.department)
  const availableSections = selectedDepartment ? selectedDepartment.sections : []

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />
      <div className="flex-1 md:ml-64">
        <Header onMobileMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    管理者画面に戻る
                  </Button>
                </Link>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">新規従業員登録</h1>
              <p className="text-sm md:text-base text-muted-foreground">新しい従業員の情報を入力してください</p>
            </div>

            <form onSubmit={handleSubmit}>
              <Card className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="lastName">姓 *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="山田"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="firstName">名 *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="太郎"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">メールアドレス *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="yamada.taro@company.com"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="employeeId">社員番号 *</Label>
                    <Input
                      id="employeeId"
                      value={formData.employeeId}
                      onChange={(e) => handleInputChange("employeeId", e.target.value)}
                      placeholder="EMP001"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="office">事業所 *</Label>
                    <Select onValueChange={(value) => handleInputChange("office", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="事業所を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {organizationData.map((office) => (
                          <SelectItem key={office.id} value={office.name}>
                            {office.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="department">部署 *</Label>
                    <Select
                      onValueChange={(value) => handleInputChange("department", value)}
                      disabled={!formData.office}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={formData.office ? "部署を選択" : "先に事業所を選択してください"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDepartments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.name}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="section">課 *</Label>
                    <Select
                      onValueChange={(value) => handleInputChange("section", value)}
                      disabled={!formData.department}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={formData.department ? "課を選択" : "先に部署を選択してください"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSections.map((section) => (
                          <SelectItem key={section.id} value={section.name}>
                            {section.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="role">役職 *</Label>
                    <Select onValueChange={(value) => handleInputChange("role", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="役職を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.name}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="startDate">入社日 *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <Label htmlFor="notes">備考</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="その他の情報があれば入力してください"
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div className="flex gap-4 mt-8">
                  <Button type="submit" className="flex-1">
                    <UserPlus className="w-4 h-4 mr-2" />
                    従業員を登録
                  </Button>
                  <Link href="/admin" className="flex-1">
                    <Button type="button" variant="outline" className="w-full bg-transparent">
                      キャンセル
                    </Button>
                  </Link>
                </div>
              </Card>
            </form>
          </div>
        </main>
      </div>

      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
      )}
    </div>
  )
}
