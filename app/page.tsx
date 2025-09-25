"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { QuickKudos } from "@/components/quick-kudos"
import { ActivityFeed } from "@/components/activity-feed"

export default function Dashboard() {
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null)
  const [selectedKudosType, setSelectedKudosType] = useState<string | null>(null)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-4 md:p-8 space-y-6 md:space-y-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">ダッシュボード</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              チームのKudosアクティビティを確認し、感謝の気持ちを送りましょう
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <QuickKudos
              selectedRecipient={selectedRecipient}
              setSelectedRecipient={setSelectedRecipient}
              selectedKudosType={selectedKudosType}
              setSelectedKudosType={setSelectedKudosType}
            />
            <ActivityFeed />
          </div>
        </main>
      </div>
    </div>
  )
}
