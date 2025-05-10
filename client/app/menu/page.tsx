import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Utensils } from "lucide-react"

export default function MenuPage() {
  // Sample menu data
  const menuCategories = [
    { id: "appetizers", name: "Appetizers" },
    { id: "main-courses", name: "Main Courses" },
    { id: "desserts", name: "Desserts" },
    { id: "beverages", name: "Beverages" },
  ]

  const menuItems = [
    {
      id: "m1",
      name: "Bruschetta",
      description: "Toasted bread topped with tomatoes, garlic, and fresh basil",
      price: 8.99,
      category: "appetizers",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "m2",
      name: "Caprese Salad",
      description: "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze",
      price: 10.99,
      category: "appetizers",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "m3",
      name: "Calamari",
      description: "Crispy fried calamari served with marinara sauce",
      price: 12.99,
      category: "appetizers",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "m4",
      name: "Filet Mignon",
      description: "8oz filet served with garlic mashed potatoes and seasonal vegetables",
      price: 32.99,
      category: "main-courses",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "m5",
      name: "Seafood Risotto",
      description: "Creamy risotto with shrimp, scallops, and calamari",
      price: 28.99,
      category: "main-courses",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "m6",
      name: "Chicken Parmesan",
      description: "Breaded chicken breast topped with marinara and mozzarella, served with pasta",
      price: 24.99,
      category: "main-courses",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "m7",
      name: "Grilled Salmon",
      description: "Fresh salmon fillet with lemon butter sauce and asparagus",
      price: 26.99,
      category: "main-courses",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "m8",
      name: "Tiramisu",
      description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
      price: 9.99,
      category: "desserts",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "m9",
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
      price: 10.99,
      category: "desserts",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "m10",
      name: "Craft Cocktail",
      description: "Seasonal craft cocktail made with premium spirits",
      price: 12.99,
      category: "beverages",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "m11",
      name: "Wine Selection",
      description: "Curated selection of fine wines by the glass",
      price: 10.99,
      category: "beverages",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Function to get menu items by category
  const getMenuItemsByCategory = (categoryId: string) => {
    return menuItems.filter((item) => item.category === categoryId)
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <header className="bg-white shadow-sm">
        <div className="w-[85%] mx-auto py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-orange-500">Savoria</span>
          </div>
          <nav className="flex gap-6">
            <Link href="/" className="text-orange-950 hover:text-orange-500 font-medium">
              Home
            </Link>
            <Link href="/menu" className="text-orange-500 font-medium">
              Menu
            </Link>
            <Link href="/about" className="text-orange-950 hover:text-orange-500 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-orange-950 hover:text-orange-500 font-medium">
              Contact
            </Link>
          </nav>
          <div>
            <Link href="/reservations/new">
              <Button className="bg-orange-500 hover:bg-orange-600">Book a Table</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="py-12 bg-gradient-to-b from-orange-100 to-orange-50">
          <div className="w-[85%] mx-auto text-center">
            <h1 className="text-4xl font-bold text-orange-950 mb-4">Our Menu</h1>
            <p className="text-lg text-orange-900 max-w-2xl mx-auto">
              Indulge in our carefully crafted dishes made with the finest ingredients. Our menu changes seasonally to
              ensure the freshest flavors.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="w-[85%] mx-auto">
            <Tabs defaultValue={menuCategories[0].id}>
              <TabsList className="w-full justify-start mb-8 bg-orange-100 p-1">
                {menuCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {menuCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {getMenuItemsByCategory(category.id).map((item) => (
                      <div key={item.id} className="flex gap-4 bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="w-1/3">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-orange-950">{item.name}</h3>
                            <span className="font-bold text-orange-500">${item.price.toFixed(2)}</span>
                          </div>
                          <p className="text-orange-900 text-sm mb-4">{item.description}</p>
                          <div className="flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-orange-500 text-orange-500 hover:bg-orange-50"
                            >
                              Special Request
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <section className="py-12 bg-orange-100">
          <div className="w-[85%] mx-auto text-center">
            <h2 className="text-3xl font-bold text-orange-950 mb-4">Ready to Experience Our Cuisine?</h2>
            <p className="text-lg text-orange-900 max-w-2xl mx-auto mb-8">
              Book your table now and embark on a culinary journey that will delight your senses.
            </p>
            <Link href="/reservations/new">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Reserve Your Table
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-orange-950 text-orange-100 py-10">
        <div className="w-[85%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="h-6 w-6 text-orange-500" />
                <span className="text-xl font-bold text-orange-500">Savoria</span>
              </div>
              <p>Exquisite dining experience in the heart of the city.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-orange-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="hover:text-orange-500">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="/reservations/new" className="hover:text-orange-500">
                    Reservations
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-orange-500">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>123 Culinary Street</li>
                <li>Foodie City, FC 12345</li>
                <li>Phone: (123) 456-7890</li>
                <li>Email: info@savoria.com</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Hours</h3>
              <ul className="space-y-2">
                <li>Monday - Thursday: 11am - 10pm</li>
                <li>Friday - Saturday: 11am - 11pm</li>
                <li>Sunday: 10am - 9pm</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-orange-900 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Savoria Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
