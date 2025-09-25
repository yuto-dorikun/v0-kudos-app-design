"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, Building2 } from "lucide-react"

const officeData = {
  東京本社: {
    departments: [
      {
        name: "営業部",
        color: "bg-blue-100 text-blue-800",
        sections: [
          {
            name: "第一営業課",
            members: [
              { id: "tanaka", name: "田中 太郎", avatar: "田" },
              { id: "sato", name: "佐藤 花子", avatar: "佐" },
              { id: "suzuki", name: "鈴木 一郎", avatar: "鈴" },
              { id: "takahashi", name: "高橋 美咲", avatar: "高" },
              { id: "ito", name: "伊藤 健太", avatar: "伊" },
            ],
          },
          {
            name: "第二営業課",
            members: [
              { id: "watanabe", name: "渡辺 由美", avatar: "渡" },
              { id: "yamamoto", name: "山本 大輔", avatar: "山" },
              { id: "nakamura", name: "中村 恵子", avatar: "中" },
              { id: "kobayashi", name: "小林 雄一", avatar: "小" },
              { id: "kato", name: "加藤 真理", avatar: "加" },
            ],
          },
        ],
      },
      {
        name: "開発部",
        color: "bg-green-100 text-green-800",
        sections: [
          {
            name: "フロントエンド課",
            members: [
              { id: "inoue", name: "井上 直樹", avatar: "井" },
              { id: "kimura", name: "木村 沙織", avatar: "木" },
              { id: "hayashi", name: "林 博之", avatar: "林" },
              { id: "shimizu", name: "清水 理恵", avatar: "清" },
            ],
          },
          {
            name: "バックエンド課",
            members: [
              { id: "abe", name: "阿部 正人", avatar: "阿" },
              { id: "ikeda", name: "池田 美穂", avatar: "池" },
              { id: "hashimoto", name: "橋本 誠", avatar: "橋" },
            ],
          },
        ],
      },
    ],
  },
  大阪支社: {
    departments: [
      {
        name: "営業部",
        color: "bg-blue-100 text-blue-800",
        sections: [
          {
            name: "関西営業課",
            members: [
              { id: "osaka_tanaka", name: "田中 次郎", avatar: "田" },
              { id: "osaka_yamada", name: "山田 花子", avatar: "山" },
              { id: "osaka_sato", name: "佐藤 太郎", avatar: "佐" },
            ],
          },
        ],
      },
      {
        name: "マーケティング部",
        color: "bg-purple-100 text-purple-800",
        sections: [
          {
            name: "関西マーケティング課",
            members: [
              { id: "osaka_suzuki", name: "鈴木 美咲", avatar: "鈴" },
              { id: "osaka_takahashi", name: "高橋 健一", avatar: "高" },
            ],
          },
        ],
      },
    ],
  },
  名古屋支社: {
    departments: [
      {
        name: "営業部",
        color: "bg-blue-100 text-blue-800",
        sections: [
          {
            name: "中部営業課",
            members: [
              { id: "nagoya_ito", name: "伊藤 雅子", avatar: "伊" },
              { id: "nagoya_watanabe", name: "渡辺 大介", avatar: "渡" },
            ],
          },
        ],
      },
    ],
  },
}

const kudosTypes = [
  { id: "thanks", label: "ありがとう" },
  { id: "awesome", label: "素晴らしい" },
  { id: "helpful", label: "助かった" },
  { id: "learning", label: "勉強になった" },
  { id: "teamwork", label: "チームワーク" },
  { id: "creative", label: "クリエイティブ" },
  { id: "leadership", label: "リーダーシップ" },
  { id: "problem-solving", label: "問題解決" },
]

interface QuickKudosProps {
  selectedRecipient: string | null
  setSelectedRecipient: (id: string | null) => void
  selectedKudosType: string | null
  setSelectedKudosType: (id: string | null) => void
}

export function QuickKudos({
  selectedRecipient,
  setSelectedRecipient,
  selectedKudosType,
  setSelectedKudosType,
}: QuickKudosProps) {
  const [message, setMessage] = useState("")
  const [selectedOffice, setSelectedOffice] = useState<string>("東京本社")
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([])
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const currentOfficeData = officeData[selectedOffice as keyof typeof officeData]?.departments || []

  const handleSendKudos = () => {
    if (!selectedRecipient || !selectedKudosType) {
      alert("宛先と種類を選択してください")
      return
    }

    setSelectedRecipient(null)
    setSelectedKudosType(null)
    setMessage("")

    alert("Kudosを送信しました！")
  }

  const toggleDepartment = (deptName: string) => {
    setExpandedDepartments((prev) =>
      prev.includes(deptName) ? prev.filter((d) => d !== deptName) : [...prev, deptName],
    )
  }

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionName) ? prev.filter((s) => s !== sectionName) : [...prev, sectionName],
    )
  }

  const getSelectedRecipientInfo = () => {
    for (const dept of currentOfficeData) {
      for (const section of dept.sections) {
        const member = section.members.find((m) => m.id === selectedRecipient)
        if (member) return { member, department: dept.name, section: section.name }
      }
    }
    return null
  }

  const handleOfficeChange = (office: string) => {
    setSelectedOffice(office)
    setSelectedRecipient(null)
    setExpandedDepartments([])
    setExpandedSections([])
  }

  const selectedInfo = getSelectedRecipientInfo()

  return (
    <Card className="p-6 bg-card border-border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Kudos送信</h2>
        
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground">事業所を選択</label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(officeData).map((office) => (
              <button
                key={office}
                onClick={() => handleOfficeChange(office)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200",
                  selectedOffice === office
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card hover:bg-accent text-foreground hover:border-accent-foreground/20",
                )}
              >
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">{office}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground">誰に送りますか？</label>
          {selectedInfo && (
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                  {selectedInfo.member.avatar}
                </div>
                <div>
                  <div className="font-medium text-foreground">{selectedInfo.member.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {selectedOffice} - {selectedInfo.department} - {selectedInfo.section}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRecipient(null)}
                  className="ml-auto text-xs"
                >
                  変更
                </Button>
              </div>
            </div>
          )}

          {!selectedRecipient && (
            <div className="space-y-2">
              {currentOfficeData.map((department) => (
                <div key={department.name} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleDepartment(department.name)}
                    className="w-full flex items-center justify-between p-3 bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${department.color}`}>
                        {department.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {department.sections.reduce((total, section) => total + section.members.length, 0)}名
                      </span>
                    </div>
                    {expandedDepartments.includes(department.name) ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>

                  {expandedDepartments.includes(department.name) && (
                    <div className="bg-card">
                      {department.sections.map((section) => (
                        <div key={section.name} className="border-t border-border">
                          <button
                            onClick={() => toggleSection(section.name)}
                            className="w-full flex items-center justify-between p-3 pl-6 bg-muted/25 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-foreground">{section.name}</span>
                              <span className="text-xs text-muted-foreground">{section.members.length}名</span>
                            </div>
                            {expandedSections.includes(section.name) ? (
                              <ChevronUp className="w-3 h-3 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="w-3 h-3 text-muted-foreground" />
                            )}
                          </button>

                          {expandedSections.includes(section.name) && (
                            <div className="p-3 pl-6 bg-card">
                              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                                {section.members.map((member) => (
                                  <button
                                    key={member.id}
                                    onClick={() => setSelectedRecipient(member.id)}
                                    className="flex items-center gap-2 p-2 rounded-md border border-border hover:bg-accent hover:border-accent-foreground/20 transition-all duration-200 text-left"
                                  >
                                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-muted text-muted-foreground font-semibold text-xs">
                                      {member.avatar}
                                    </div>
                                    <span className="text-sm font-medium text-foreground truncate">{member.name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground">どんなKudosを送りますか？</label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {kudosTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedKudosType(type.id)}
                className={cn(
                  "flex items-center justify-center p-4 rounded-lg border-2 transition-all duration-200",
                  selectedKudosType === type.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card hover:bg-accent text-foreground hover:border-accent-foreground/20",
                )}
              >
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground">メッセージ（任意）</label>
          <Textarea
            placeholder="感謝の気持ちを伝えましょう..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px] bg-input border-border"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" className="border-border bg-transparent">
            キャンセル
          </Button>
          <Button onClick={handleSendKudos} className="bg-primary hover:bg-primary/90">
            Kudosを送る
          </Button>
        </div>
      </div>
    </Card>
  )
}
