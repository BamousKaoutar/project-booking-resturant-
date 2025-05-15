"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
//import { motion } from "framer-motion"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  dietary?: string[]
}

const menuHighlights: MenuItem[] = [
  {
    id: "h1",
    name: "Filet Mignon",
    description: "8oz center-cut filet with red wine reduction, served with roasted potatoes and seasonal vegetables",
    price: 34.95,
    image: "/placeholder.svg?height=400&width=600",
    category: "Main Course",
    dietary: ["gluten-free"],
  },
  {
    id: "h2",
    name: "Lobster Risotto",
    description: "Creamy Arborio rice with fresh Maine lobster, finished with butter and parmesan",
    price: 32.95,
    image: "/placeholder.svg?height=400&width=600",
    category: "Pasta & Risotto",
  },
  {
    id: "h3",
    name: "Truffle Mushroom Pasta",
    description: "Handmade pappardelle with wild mushrooms, truffle oil, and aged parmesan",
    price: 26.95,
    image: "/placeholder.svg?height=400&width=600",
    category: "Pasta & Risotto",
    dietary: ["vegetarian"],
  },
  {
    id: "h4",
    name: "Seared Scallops",
    description: "Pan-seared sea scallops with cauliflower puree, crispy pancetta, and herb oil",
    price: 28.95,
    image: "/placeholder.svg?height=400&width=600",
    category: "Seafood",
    dietary: ["gluten-free"],
  },
]

export default function MenuHighlights() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {menuHighlights.map((item) => (
          <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg">
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500"
                style={{
                  transform: hoveredItem === item.id ? "scale(1.05)" : "scale(1)",
                }}
              />
              <div className="absolute top-2 left-2">
                <Badge className="bg-amber-600">{item.category}</Badge>
              </div>
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <span className="font-semibold text-amber-600">${item.price.toFixed(2)}</span>
              </div>
              <p className="text-stone-600 text-sm mb-3">{item.description}</p>
              {item.dietary && (
                <div className="flex gap-1 mt-2">
                  {item.dietary.map((diet) => (
                    <Badge key={diet} variant="outline" className="text-xs">
                      {diet}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        
      ))}
    </div>
  )
}
