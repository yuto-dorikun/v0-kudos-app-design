import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              
              <span className="text-xl font-bold">Kudos</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  ログイン
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  無料で始める
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
              新機能: AIによる感謝分析 <span className="ml-2">詳しく見る</span>
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-balance mb-8">
              チームの感謝を
              <br />
              <span className="text-primary">見える化</span>する
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
              Kudosでチームメンバー間の感謝を共有し、組織のエンゲージメントを向上させましょう。AIが分析する詳細なインサイトで、より良いチーム作りを支援します。
            </p>
            <div className="flex justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                  無料で始める
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
