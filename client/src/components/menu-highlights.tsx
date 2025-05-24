import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Category, MenuItem, MenuProvider } from "@/providers/menu-provider"
 // mettez le bon chemin
// import { motion } from "framer-motion"

const DEFAULT_IMAGE = 'https://placehold.co/600x400?text=Plat'

export default function MenuHighlights() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [items, cats] = await Promise.all([
          MenuProvider.getMenuItems(),
          MenuProvider.getCategories()
        ])
        console.log("menu : ",items)
        setMenuItems(items)
        setCategories(cats)
      } catch (error) {
        console.error("Erreur:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getCategoryName = (id: number) =>
    categories.find((c) => c.id === id)?.name || "Inconnu"

  if (loading) return <p className="text-center text-stone-500">Chargement du menu...</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {menuItems.slice(0, 4).map((item)  => (
        <Card
          key={item.id}
          className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg"
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={DEFAULT_IMAGE}
              alt={item.nom}
              className="w-full h-full object-cover transition-transform duration-500"
              style={{
                transform: hoveredItem === item.id ? "scale(1.05)" : "scale(1)",
              }}
            />
            <div className="absolute top-2 left-2">
              <Badge className="bg-amber-600">
                {getCategoryName(item.categorieId)}
              </Badge>
            </div>
          </div>
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{item.nom}</h3>
              <span className="font-semibold text-amber-600">
                ${item.prix.toFixed(2)}
              </span>
            </div>
            <p className="text-stone-600 text-sm mb-3">{item.description}</p>
            {/* Vous pouvez ajouter un champ "dietary" plus tard si l’API le supporte */}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
