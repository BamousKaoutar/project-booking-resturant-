"use client"

import { CalendarRange, ChevronLeft, Home, LayoutDashboard, Menu, Settings, Table, Utensils } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from "react-router-dom"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  //const pathname = usePathname()
  const pathname = "/"
  const routes = [
    {
      name: "Dashboard",
      to: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Menu",
      to: "/admin/menu",
      icon: Menu,
    }, 
    {
      name: "Tables",
      to: "/admin/tables",
      icon: Table,
    },
    {
      name: "Reservations",
      to: "/admin/reservations",
      icon: CalendarRange,
    },
 /*   {
      name: "Settings",
      to: "/admin/settings",
      icon: Settings,
    }, */
  ]

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-orange-950 text-orange-100 transition-all duration-300",
        isOpen ? "w-64" : "w-20",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-orange-900">
        <div className={cn("flex items-center gap-2", !isOpen && "justify-center w-full")}>
          <Utensils className="h-6 w-6 text-orange-500" />
          {isOpen && <span className="text-xl font-bold text-orange-500">Savoria</span>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn("text-orange-100 hover:bg-orange-900 hover:text-orange-100", !isOpen && "hidden")}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="py-4">
          <div className="px-3 mb-2">
            <Link to="/" className="flex items-center gap-2 p-2 rounded-md hover:bg-orange-900">
              <Home className="h-5 w-5 text-orange-500" />
              {isOpen && <span>Back to Website</span>}
            </Link>
          </div>

          <nav className="space-y-1 px-3">
            {routes.map((route) => (
              <Link
                key={route.to}
                to={route.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  pathname === route.to
                    ? "bg-orange-900 text-orange-100"
                    : "hover:bg-orange-900/50 text-orange-100/80 hover:text-orange-100",
                )}
              >
                <route.icon
                  className={cn("h-5 w-5", pathname === route.to ? "text-orange-500" : "text-orange-500/80")}
                />
                {isOpen && <span>{route.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-orange-900">
        <div className={cn("flex items-center gap-3", !isOpen && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium">
            A
          </div>
          {isOpen && (
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-orange-300">admin@savoria.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
