"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, Users, Search, ChevronDown, ChevronRight, Mail, Calendar } from "lucide-react"
import Link from "next/link"

const organizationData = [
  {
    id: 1,
    name: "東京本社",
    address: "東京都渋谷区",
    totalMembers: 89,
    departments: [
      {
        id: 1,
        name: "営業部",
        manager: { name: "山田 太郎", email: "yamada@company.com", avatar: "/placeholder.svg?height=40&width=40" },
        sections: [
          {
            id: 1,
            name: "第一営業課",
            manager: { name: "田中 一郎", email: "tanaka@company.com", avatar: "/placeholder.svg?height=32&width=32" },
            members: [
              {
                id: 1,
                name: "佐藤 花子",
                email: "sato@company.com",
                position: "主任",
                joinDate: "2022-04-01",
                avatar: "/placeholder.svg?height=32&width=32",
              },
              {
                id: 2,
                name: "鈴木 次郎",
                email: "suzuki@company.com",
                position: "係長",
                joinDate: "2021-10-15",
                avatar: "/placeholder.svg?height=32&width=32",
              },
              {
                id: 3,
                name: "高橋 三郎",
                email: "takahashi@company.com",
                position: "一般",
                joinDate: "2023-01-20",
                avatar: "/placeholder.svg?height=32&width=32",
              },
              {
                id: 4,
                name: "伊藤 四郎",
                email: "ito@company.com",
                position: "一般",
                joinDate: "2023-03-10",
                avatar: "/placeholder.svg?height=32&width=32",
              },
              {
                id: 5,
                name: "渡辺 五郎",
                email: "watanabe@company.com",
                position: "一般",
                joinDate: "2022-08-01",
                avatar: "/placeholder.svg?height=32&width=32",
              },
            ],
          },
          {
            id: 2,
            name: "第二営業課",
            manager: { name: "佐藤 二郎", email: "sato2@company.com", avatar: "/placeholder.svg?height=32&width=32" },
            members: [
              {
                id: 6,
                name: "中村 六郎",
                email: "nakamura@company.com",
                position: "主任",
                joinDate: "2021-07-01",
                avatar: "/placeholder.svg?height=32&width=32",
              },
              {
                id: 7,
                name: "小林 七郎",
                email: "kobayashi@company.com",
                position: "一般",
                joinDate: "2022-12-01",
                avatar: "/placeholder.svg?height=32&width=32",
              },
              {
                id: 8,
                name: "加藤 八郎",
                email: "kato@company.com",
                position: "一般",
                joinDate: "2023-02-15",
                avatar: "/placeholder.svg?height=32&width=32",
              },
            ],
          },
          {
            id: 3,
            name: "営業企画課",
            manager: { name: "鈴木 三郎", email: "suzuki3@company.com", avatar: "/placeholder.svg?height=32&width=32" },
            members: [
              {
                id: 9,
                name: "山本 九郎",
                email: "yamamoto@company.com",
                position: "係長",
                joinDate: "2020-11-01",
                avatar: "/placeholder.svg?height=32&width=32",
              },
              {
                id: 10,
                name: "松本 十郎",
                email: "matsumoto@company.com",
                position: "一般",
                joinDate: "2022-05-20",
                avatar: "/placeholder.svg?height=32&width=32",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "開発部",
        manager: { name: "田中 花子", email: "tanaka.h@company.com", avatar: "/placeholder.svg?height=40&width=40" },
        sections: [
          {
            id: 4,
            name: "フロントエンド課",
            manager: {
              name: "高橋 四郎",
              email: "takahashi4@company.com",
              avatar: "/placeholder.svg?height=32&width=32",
            },
            members: [
              {
                id: 11,
                name: "森田 十一郎",
                email: "morita@company.com",
                position: "シニア",
                joinDate: "2019-04-01",
                avatar: "/placeholder.svg?height=32&width=32",
              },
              {
                id: 12,
                name: "清水 十二郎",
                email: "shimizu@company.com",
                position: "一般",
                joinDate: "2021-09-01",
                avatar: "/placeholder.svg?height=32&width=32",
              },
              {
                id: 13,
                name: "井上 十三郎",
                email: "inoue@company.com",
                position: "一般",
                joinDate: "2022-11-15",
                avatar: "/placeholder.svg?height=32&width=32",
              },
            ],
          },
          {
            id: 5,
            name: "バックエンド課",
            manager: { name: "伊藤 五郎", email: "ito5@company.com", avatar: "/placeholder.svg?height=32&width=32" },
            members: [
              {
                id: 14,
                name: "木村 十四郎",
                email: "kimura@company.com",
                position: "シニア",
                joinDate: "2018-06-01",
                avatar: "/placeholder.svg?height=32&width=32",
              },
              {
                id: 15,
                name: "林 十五郎",
                email: "hayashi@company.com",
                position: "一般",
                joinDate: "2020-03-01",
                avatar: "/placeholder.svg?height=32&width=32",
              },
              {
                id: 16,
                name: "斎藤 十六郎",
                email: "saito@company.com",
                position: "一般",
                joinDate: "2021-12-01",
                avatar: "/placeholder.svg?height=32&width=32",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "大阪支社",
    address: "大阪府大阪市",
    totalMembers: 45,
    departments: [
      {
        id: 3,
        name: "営業部",
        manager: { name: "中村 七郎", email: "nakamura7@company.com", avatar: "/placeholder.svg?height=40&width=40" },
        sections: [
          {
            id: 7,
            name: "関西営業課",
            manager: {
              name: "小林 八郎",
              email: "kobayashi8@company.com",
              avatar: "/placeholder.svg?height=32&width=32",
            },
            members: [
              {
                id: 17,
                name: "池田 十七郎",
                email: "ikeda@company.com",
                position: "主任",
                joinDate: "2020-08-01",
                avatar: "/placeholder.svg?height=32&width=32",
              },
              {
                id: 18,
                name: "橋本 十八郎",
                email: "hashimoto@company.com",
                position: "一般",
                joinDate: "2021-06-15",
                avatar: "/placeholder.svg?height=32&width=32",
              },
              {
                id: 19,
                name: "藤田 十九郎",
                email: "fujita@company.com",
                position: "一般",
                joinDate: "2022-09-01",
                avatar: "/placeholder.svg?height=32&width=32",
              },
            ],
          },
        ],
      },
      {
        id: 4,
        name: "人事部",
        manager: { name: "佐藤 次郎", email: "sato.j@company.com", avatar: "/placeholder.svg?height=40&width=40" },
        sections: [
          {
            id: 9,
            name: "採用課",
            manager: {
              name: "山本 十郎",
              email: "yamamoto10@company.com",
              avatar: "/placeholder.svg?height=32&width=32",
            },
            members: [
              {
                id: 20,
                name: "岡田 二十郎",
                email: "okada@company.com",
                position: "一般",
                joinDate: "2021-04-01",
                avatar: "/placeholder.svg?height=32&width=32",
              },
              {
                id: 21,
                name: "前田 二十一郎",
                email: "maeda@company.com",
                position: "一般",
                joinDate: "2022-07-01",
                avatar: "/placeholder.svg?height=32&width=32",
              },
            ],
          },
        ],
      },
    ],
  },
]

export default function UsersPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [expandedOffices, setExpandedOffices] = useState<number[]>([1])
  const [expandedDepartments, setExpandedDepartments] = useState<number[]>([1])
  const [expandedSections, setExpandedSections] = useState<number[]>([1])
  const [searchTerm, setSearchTerm] = useState("")

  const toggleOfficeExpansion = (officeId: number) => {
    setExpandedOffices((prev) => (prev.includes(officeId) ? prev.filter((id) => id !== officeId) : [...prev, officeId]))
  }

  const toggleDepartmentExpansion = (deptId: number) => {
    setExpandedDepartments((prev) => (prev.includes(deptId) ? prev.filter((id) => id !== deptId) : [...prev, deptId]))
  }

  const toggleSectionExpansion = (sectionId: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const getTotalMembers = () => {
    return organizationData.reduce((total, office) => total + office.totalMembers, 0)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />
      <div className="flex-1 md:ml-64">
        <Header onMobileMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">ユーザー一覧</h1>
              <p className="text-sm md:text-base text-muted-foreground">組織図形式でメンバーを表示</p>
            </div>

            {/* 検索とサマリー */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="名前、メール、部署で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-sm">
                  総従業員数: {getTotalMembers()}人
                </Badge>
                <Link href="/admin/employees/new">
                  <Button>
                    <Users className="w-4 h-4 mr-2" />
                    新規従業員
                  </Button>
                </Link>
              </div>
            </div>

            {/* 組織図 */}
            <div className="space-y-6">
              {organizationData.map((office) => (
                <Card key={office.id} className="overflow-hidden">
                  {/* 事業所ヘッダー */}
                  <div className="p-4 bg-blue-50 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleOfficeExpansion(office.id)}
                          className="p-1 h-auto"
                        >
                          {expandedOffices.includes(office.id) ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                        </Button>
                        <Building2 className="w-6 h-6 text-blue-600" />
                        <div>
                          <h2 className="text-xl font-bold text-foreground">{office.name}</h2>
                          <p className="text-sm text-muted-foreground">
                            {office.address} • {office.totalMembers}人 • {office.departments.length}部署
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-white">
                        {office.totalMembers}人
                      </Badge>
                    </div>
                  </div>

                  {/* 部署一覧 */}
                  {expandedOffices.includes(office.id) && (
                    <div className="p-4 space-y-4">
                      {office.departments.map((dept) => (
                        <div key={dept.id} className="border-l-4 border-blue-200 pl-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleDepartmentExpansion(dept.id)}
                                className="p-1 h-auto"
                              >
                                {expandedDepartments.includes(dept.id) ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronRight className="w-4 h-4" />
                                )}
                              </Button>
                              <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={dept.manager.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{dept.manager.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-lg font-semibold text-foreground">{dept.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    部長: {dept.manager.name} • {dept.sections.length}課
                                  </p>
                                </div>
                              </div>
                            </div>
                            <Badge variant="secondary">
                              {dept.sections.reduce((total, section) => total + section.members.length + 1, 1)}人
                            </Badge>
                          </div>

                          {/* 課一覧 */}
                          {expandedDepartments.includes(dept.id) && (
                            <div className="ml-6 space-y-3">
                              {dept.sections.map((section) => (
                                <div key={section.id} className="border rounded-lg bg-muted/30">
                                  <div className="p-3">
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center gap-3">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => toggleSectionExpansion(section.id)}
                                          className="p-1 h-auto"
                                        >
                                          {expandedSections.includes(section.id) ? (
                                            <ChevronDown className="w-4 h-4" />
                                          ) : (
                                            <ChevronRight className="w-4 h-4" />
                                          )}
                                        </Button>
                                        <div className="flex items-center gap-3">
                                          <Avatar className="w-8 h-8">
                                            <AvatarImage src={section.manager.avatar || "/placeholder.svg"} />
                                            <AvatarFallback>{section.manager.name.charAt(0)}</AvatarFallback>
                                          </Avatar>
                                          <div>
                                            <h4 className="font-medium text-foreground">{section.name}</h4>
                                            <p className="text-sm text-muted-foreground">
                                              課長: {section.manager.name}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <Badge variant="outline">{section.members.length + 1}人</Badge>
                                    </div>

                                    {/* メンバー一覧 */}
                                    {expandedSections.includes(section.id) && (
                                      <div className="ml-8 mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {section.members.map((member) => (
                                          <div key={member.id} className="p-3 bg-white rounded-lg border">
                                            <div className="flex items-center gap-3">
                                              <Avatar className="w-8 h-8">
                                                <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                              </Avatar>
                                              <div className="flex-1 min-w-0">
                                                <p className="font-medium text-foreground truncate">{member.name}</p>
                                                <p className="text-xs text-muted-foreground">{member.position}</p>
                                              </div>
                                            </div>
                                            <div className="mt-2 space-y-1">
                                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Mail className="w-3 h-3" />
                                                <span className="truncate">{member.email}</span>
                                              </div>
                                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Calendar className="w-3 h-3" />
                                                <span>入社: {member.joinDate}</span>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
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
