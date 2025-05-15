"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Plus, Trash2 } from "lucide-react"
import { FileUpload } from "@/components/ui/file-upload"

// Define types for our data
interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
}

interface Category {
  id: string
  name: string
}

export default function MenuPage() {
  // Sample data for categories
  const [categories, setCategories] = useState<Category[]>([
    { id: "c1", name: "Appetizers" },
    { id: "c2", name: "Main Courses" },
    { id: "c3", name: "Desserts" },
    { id: "c4", name: "Beverages" },
  ])

  // Sample data for menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "m1",
      name: "Bruschetta",
      description: "Toasted bread topped with tomatoes, garlic, and fresh basil",
      price: 8.99,
      category: "c1",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "m2",
      name: "Caprese Salad",
      description: "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze",
      price: 10.99,
      category: "c1",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "m3",
      name: "Filet Mignon",
      description: "8oz filet served with garlic mashed potatoes and seasonal vegetables",
      price: 32.99,
      category: "c2",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "m4",
      name: "Seafood Risotto",
      description: "Creamy risotto with shrimp, scallops, and calamari",
      price: 28.99,
      category: "c2",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "m5",
      name: "Tiramisu",
      description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
      price: 9.99,
      category: "c3",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "m6",
      name: "Craft Cocktail",
      description: "Seasonal craft cocktail made with premium spirits",
      price: 12.99,
      category: "c4",
      image: "/placeholder.svg?height=200&width=300",
    },
  ])

  // State for new menu item form
  const [newMenuItem, setNewMenuItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    description: "",
    price: 0,
    category: categories[0].id,
    image: "",
  })

  // State for new category form
  const [newCategory, setNewCategory] = useState<Omit<Category, "id">>({
    name: "",
  })

  // Function to add a new menu item
  const addMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.description || newMenuItem.price <= 0) return
    const id = `m${menuItems.length + 1}`
    setMenuItems([...menuItems, { id, ...newMenuItem }])
    setNewMenuItem({
      name: "",
      description: "",
      price: 0,
      category: categories[0].id,
      image: "",
    })
  }

  // Function to add a new category
  const addCategory = () => {
    if (!newCategory.name) return
    const id = `c${categories.length + 1}`
    setCategories([...categories, { id, ...newCategory }])
    setNewCategory({ name: "" })
  }

  // Function to delete a menu item
  const deleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  // Get menu items for a specific category
  const getMenuItemsByCategory = (categoryId: string) => {
    return menuItems.filter((item) => item.category === categoryId)
  }

  // Get category name by id
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.name : "Unknown"
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-orange-950">Menu Management</h1>
        </div>

        <Tabs defaultValue="items">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="items">Menu Items</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-950">Add New Menu Item</CardTitle>
                <CardDescription>Create a new dish for your restaurant menu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="item-name">Item Name</Label>
                      <Input
                        id="item-name"
                        value={newMenuItem.name}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                        placeholder="e.g., Spaghetti Carbonara"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="item-description">Description</Label>
                      <Textarea
                        id="item-description"
                        value={newMenuItem.description}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                        placeholder="Describe the dish..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="item-price">Price ($)</Label>
                        <Input
                          id="item-price"
                          type="number"
                          step="0.01"
                          value={newMenuItem.price}
                          onChange={(e) => setNewMenuItem({ ...newMenuItem, price: Number.parseFloat(e.target.value) })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="item-category">Category</Label>
                        <Select
                          value={newMenuItem.category}
                          onValueChange={(value) => setNewMenuItem({ ...newMenuItem, category: value })}
                        >
                          <SelectTrigger id="item-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FileUpload
                      id="item-image"
                      label="Item Image"
                      onChange={(file, preview) => {
                        if (preview) {
                          setNewMenuItem({ ...newMenuItem, image: preview })
                        }
                      }}
                    />

                    <div className="aspect-video bg-orange-100 rounded-md overflow-hidden">
                      <img
                        src={newMenuItem.image || "/placeholder.svg?height=200&width=300"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <Button className="mt-6 bg-orange-500 hover:bg-orange-600" onClick={addMenuItem}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Menu Item
                </Button>
              </CardContent>
            </Card>

            {categories.map((category) => (
              <div key={category.id} className="space-y-4">
                <h2 className="text-2xl font-semibold text-orange-950">{category.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getMenuItemsByCategory(category.id).map((item) => (
                    <Card key={item.id}>
                      <div className="aspect-video bg-orange-100">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-orange-950">{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <p className="font-bold text-orange-950">${item.price.toFixed(2)}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700"
                            onClick={() => deleteMenuItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                {getMenuItemsByCategory(category.id).length === 0 && (
                  <p className="text-center text-orange-600 py-4">No items in this category yet</p>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-950">Add New Category</CardTitle>
                <CardDescription>Create a new category for menu items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      placeholder="e.g., Pasta Dishes"
                    />
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600" onClick={addCategory}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <CardTitle className="text-orange-950">{category.name}</CardTitle>
                    <CardDescription>{getMenuItemsByCategory(category.id).length} items</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {getMenuItemsByCategory(category.id)
                        .slice(0, 3)
                        .map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <p className="text-sm truncate max-w-[70%]">{item.name}</p>
                            <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                          </div>
                        ))}
                      {getMenuItemsByCategory(category.id).length > 3 && (
                        <p className="text-xs text-orange-600">
                          +{getMenuItemsByCategory(category.id).length - 3} more items
                        </p>
                      )}
                      {getMenuItemsByCategory(category.id).length === 0 && (
                        <p className="text-sm text-orange-600">No items in this category</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-50">
                      Edit Category
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
