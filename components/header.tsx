"use client"

import { Search, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-transparent flex items-center justify-between px-4 md:px-8 py-4">
      <div className="flex items-center gap-3 md:gap-6">{/* Office selection removed */}</div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="検索..." className="pl-10 w-60 lg:w-80 bg-input border-border" />
        </div>

        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Send className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline">Kudosを送る</span>
        </Button>
      </div>
    </header>
  )
}
