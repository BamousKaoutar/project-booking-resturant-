import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Utensils } from "lucide-react"
import { Link } from "react-router-dom"
import { MenuProvider, MenuItem, Category } from "@/providers/menu-provider" // adapte le chemin

export default function Menu() {
  const [categories, setCategories] = useState<Category[]>([])
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, dishes] = await Promise.all([
          MenuProvider.getCategories(),
          MenuProvider.getMenuItems()
        ])
        setCategories(cats)
        setItems(dishes)
      } catch (error) {
        console.error("Erreur lors du chargement du menu :", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="text-center py-12">Chargement du menu...</div>
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <header className="bg-white shadow-sm">
        <div className="w-[85%] mx-auto py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-orange-500">DEV OPS</span>
          </div>
          <nav className="flex gap-6">
            <Link to="/" className="text-orange-950 hover:text-orange-500 font-medium">Home</Link>
            <Link to="/menu" className="text-orange-500 font-medium">Menu</Link>
            <Link to="/about" className="text-orange-950 hover:text-orange-500 font-medium">About</Link>
            <Link to="/contact" className="text-orange-950 hover:text-orange-500 font-medium">Contact</Link>
          </nav>
          <div>
            <Link to="/reservation">
              <Button className="bg-orange-500 hover:bg-orange-600">Réserver</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="py-12 bg-gradient-to-b from-orange-100 to-orange-50">
          <div className="w-[85%] mx-auto text-center">
            <h1 className="text-4xl font-bold text-orange-950 mb-4">Notre Menu</h1>
            <p className="text-lg text-orange-900 max-w-2xl mx-auto">
              Découvrez nos plats préparés avec soin et passion.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="w-[85%] mx-auto">
            <Tabs defaultValue={categories[0]?.id.toString()}>
              <TabsList className="w-full justify-start mb-8 bg-orange-100 p-1">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id.toString()}
                    className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => {
                const categoryItems = items.filter(item => item.categorieId === category.id)

                return (
                  <TabsContent key={category.id} value={category.id.toString()} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {categoryItems.map((item) => (
                        <div key={item.id} className="flex gap-4 bg-white rounded-lg shadow-sm overflow-hidden">
                          <div className="w-1/3">
                            <img
                              src={'https://placehold.co/600x400?text=Plat'} // Remplace si tu as une image
                              alt={item.nom}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-2/3 p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-semibold text-orange-950">{item.nom}</h3>
                              <span className="font-bold text-orange-500">{item.prix.toFixed(2)} DH</span>
                            </div>
                            <p className="text-orange-900 text-sm mb-4">{item.description}</p>
                            <div className="flex justify-end">
                              <Button variant="outline" size="sm" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                                Demande spéciale
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                )
              })}
            </Tabs>
          </div>
        </section>

        <section className="py-12 bg-orange-100">
          <div className="w-[85%] mx-auto text-center">
            <h2 className="text-3xl font-bold text-orange-950 mb-4">Prêt à commander ?</h2>
            <p className="text-lg text-orange-900 max-w-2xl mx-auto mb-8">
              Réservez une table et savourez notre cuisine sur place.
            </p>
            <Link to="/reservation">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Réserver maintenant
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
