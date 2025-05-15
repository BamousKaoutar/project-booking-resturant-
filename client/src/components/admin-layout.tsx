"use client"

import type React from "react"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-orange-50">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center">
            {!sidebarOpen && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="mr-4">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Sidebar</span>
              </Button>
            )}
            <h1 className="text-xl font-semibold text-orange-950">Admin Dashboard</h1>
          </div>
        </header>

        <main className="p-6">
          <div className="w-[85%] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
