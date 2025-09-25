"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { QuickKudos } from "@/components/quick-kudos"

export default function SendPage() {
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null)
  const [selectedKudosType, setSelectedKudosType] = useState<string | null>(null)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />
      <div className="flex-1 md:ml-64">
        <Header onMobileMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Kudosを送る</h1>
              <p className="text-sm md:text-base text-muted-foreground">チームメンバーに感謝の気持ちを伝えましょう</p>
            </div>

            <QuickKudos
              selectedRecipient={selectedRecipient}
              setSelectedRecipient={setSelectedRecipient}
              selectedKudosType={selectedKudosType}
              setSelectedKudosType={setSelectedKudosType}
            />
          </div>
        </main>
      </div>

      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
      )}
    </div>
  )
}
