"use client"

import { useEffect, useState } from "react"
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
import { Category, MenuItem, MenuProvider } from "@/providers/menu-provider"



export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isupdate, setUpdate] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await MenuProvider.getMenuItems()
        setMenuItems(items)
      } catch (error) {
        console.error("Error fetching menu items:", error)
      }

      try {
        const categories = await MenuProvider.getCategories()
        const filteredCategories = categories.filter((c) => c.name != null)
        if (filteredCategories.length > 0) {
          setCategories(filteredCategories)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchData()
  }, [isupdate])

  const [newMenuItem, setNewMenuItem] = useState<Omit<MenuItem, "id">>({
    nom: "",
    description: "",
    prix: 0,
    categorieId: 0,
  })

  const [newCategory, setNewCategory] = useState<Omit<Category, "id">>({
    name: "",
  })

  const addMenuItem = async () => {
    console.log("item", newMenuItem)
    if (!newMenuItem.nom || !newMenuItem.description || newMenuItem.prix <= 0) return
    console.log("item  2  :", newMenuItem)
    const created = await MenuProvider.addMenuItem(newMenuItem)
    setMenuItems((prev) => [...prev, created])
    setNewMenuItem({
      nom: "",
      description: "",
      prix: 0,
      categorieId: categories[0]?.id || 0,
    })
    setUpdate(!isupdate)
  }

  const addCategory = async () => {
    if (!newCategory.name) return
    const created = await MenuProvider.addCategory(newCategory)
    setCategories((prev) => [...prev, created])
    setNewCategory({ name: "" })
    setUpdate(!isupdate)
  }

  const deleteMenuItem = async (id: number | null) => {
    if(id){
      await MenuProvider.deleteMenuItem(id)
      setMenuItems((prev) => prev.filter((item) => item.id !== id ))
    }
    
  }

  const getMenuItemsByCategory = (categoryId: number) => {
    return menuItems.filter((item) => item.categorieId === categoryId)
  }

  const getCategoryName = (categoryId: number) => {
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
                        value={newMenuItem.nom}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, nom: e.target.value })}
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
                        <Label htmlFor="item-prix">prix ($)</Label>
                        <Input
                          id="item-prix"
                          type="number"
                          step="0.01"
                          value={newMenuItem.prix}
                          onChange={(e) =>
                            setNewMenuItem({ ...newMenuItem, prix: Number.parseFloat(e.target.value) })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="item-category">Category</Label>
                        <Select
                          value={newMenuItem.categorieId.toString()}
                          onValueChange={(value) => setNewMenuItem({ ...newMenuItem, categorieId: parseInt(value) })}
                        >
                          <SelectTrigger id="item-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
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
                      
                      <CardHeader>
                        <CardTitle className="text-orange-950">{item.nom}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <p className="font-bold text-orange-950">${item.prix.toFixed(2)}</p>
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
                            <p className="text-sm truncate max-w-[70%]">{item.nom}</p>
                            <p className="text-sm font-medium">${item.prix.toFixed(2)}</p>
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
