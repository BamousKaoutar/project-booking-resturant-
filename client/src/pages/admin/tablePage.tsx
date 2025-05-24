/*
import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, TableIcon } from "lucide-react"
import { FileUpload } from "@/components/ui/file-upload"

// Define types for our data
interface Place {
  id: string
  name: string
  image: string
}

interface Table {
  id: string
  number: number
  minPerson: number
  maxPerson: number
  placeId: string
  available: boolean
}

export default function TablesPage() {
  // Sample data for places
  const [places, setPlaces] = useState<Place[]>([
    { id: "p1", name: "Main Dining", image: "/placeholder.svg?height=100&width=100" },
    { id: "p2", name: "Outdoor Patio", image: "/placeholder.svg?height=100&width=100" },
    { id: "p3", name: "Private Room", image: "/placeholder.svg?height=100&width=100" },
    { id: "p4", name: "Bar Area", image: "/placeholder.svg?height=100&width=100" },
  ])

  // Sample data for tables
  const [tables, setTables] = useState<Table[]>([
    { id: "t1", number: 1, minPerson: 2, maxPerson: 4, placeId: "p1", available: true },
    { id: "t2", number: 2, minPerson: 2, maxPerson: 4, placeId: "p1", available: true },
    { id: "t3", number: 3, minPerson: 4, maxPerson: 6, placeId: "p1", available: true },
    { id: "t4", number: 4, minPerson: 2, maxPerson: 4, placeId: "p2", available: true },
    { id: "t5", number: 5, minPerson: 4, maxPerson: 8, placeId: "p2", available: false },
    { id: "t6", number: 6, minPerson: 6, maxPerson: 10, placeId: "p3", available: true },
    { id: "t7", number: 7, minPerson: 2, maxPerson: 2, placeId: "p4", available: true },
    { id: "t8", number: 8, minPerson: 2, maxPerson: 2, placeId: "p4", available: true },
  ])

  // State for new table form
  const [newTable, setNewTable] = useState<Omit<Table, "id">>({
    number: tables.length + 1,
    minPerson: 2,
    maxPerson: 4,
    placeId: places[0].id,
    available: true,
  })

  // State for new place form
  const [newPlace, setNewPlace] = useState<Omit<Place, "id">>({
    name: "",
    image: "",
  })

  // Function to add a new table
  const addTable = () => {
    const id = `t${tables.length + 1}`
    setTables([...tables, { id, ...newTable }])
    setNewTable({
      number: tables.length + 2,
      minPerson: 2,
      maxPerson: 4,
      placeId: places[0].id,
      available: true,
    })
  }

  // Function to add a new place
  const addPlace = () => {
    if (!newPlace.name) return
    const id = `p${places.length + 1}`
    setPlaces([...places, { id, ...newPlace }])
    setNewPlace({
      name: "",
      image: "",
    })
  }

  // Function to toggle table availability
  const toggleTableAvailability = (tableId: string) => {
    setTables(tables.map((table) => (table.id === tableId ? { ...table, available: !table.available } : table)))
  }

  // Get tables for a specific place
  const getTablesByPlace = (placeId: string) => {
    return tables.filter((table) => table.placeId === placeId)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-orange-950">Tables Management</h1>
        </div>

        <Tabs defaultValue="tables">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="places">Places</TabsTrigger>
          </TabsList>

          <TabsContent value="tables" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-950">Add New Table</CardTitle>
                <CardDescription>Create a new table and assign it to a place</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="table-number">Table Number</Label>
                    <Input
                      id="table-number"
                      type="number"
                      value={newTable.number}
                      onChange={(e) => setNewTable({ ...newTable, number: Number.parseInt(e.target.value) })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="min-person">Min Persons</Label>
                    <Input
                      id="min-person"
                      type="number"
                      value={newTable.minPerson}
                      onChange={(e) => setNewTable({ ...newTable, minPerson: Number.parseInt(e.target.value) })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-person">Max Persons</Label>
                    <Input
                      id="max-person"
                      type="number"
                      value={newTable.maxPerson}
                      onChange={(e) => setNewTable({ ...newTable, maxPerson: Number.parseInt(e.target.value) })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="place">Place</Label>
                    <Select
                      value={newTable.placeId}
                      onValueChange={(value) => setNewTable({ ...newTable, placeId: value })}
                    >
                      <SelectTrigger id="place">
                        <SelectValue placeholder="Select place" />
                      </SelectTrigger>
                      <SelectContent>
                        {places.map((place) => (
                          <SelectItem key={place.id} value={place.id}>
                            {place.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <Switch
                    id="available"
                    checked={newTable.available}
                    onCheckedChange={(checked) => setNewTable({ ...newTable, available: checked })}
                  />
                  <Label htmlFor="available">Available</Label>
                </div>

                <Button className="mt-6 bg-orange-500 hover:bg-orange-600" onClick={addTable}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Table
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {places.map((place) => (
                <Card key={place.id}>
                  <CardHeader>
                    <CardTitle className="text-orange-950">{place.name}</CardTitle>
                    <CardDescription>Tables in this area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {getTablesByPlace(place.id).map((table) => (
                        <div
                          key={table.id}
                          className={`p-3 rounded-lg border ${table.available ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"} flex flex-col items-center justify-center text-center`}
                        >
                          <TableIcon
                            className={`h-6 w-6 ${table.available ? "text-green-500" : "text-red-500"} mb-1`}
                          />
                          <p className="font-medium">Table {table.number}</p>
                          <p className="text-xs text-gray-600">
                            {table.minPerson}-{table.maxPerson} persons
                          </p>
                          <div className="mt-2 flex items-center space-x-2">
                            <Switch
                              id={`table-${table.id}`}
                             // size="sm"
                              checked={table.available}
                              onCheckedChange={() => toggleTableAvailability(table.id)}
                            />
                            <Label htmlFor={`table-${table.id}`} className="text-xs">
                              {table.available ? "Available" : "Unavailable"}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                    {getTablesByPlace(place.id).length === 0 && (
                      <p className="text-center text-orange-600 py-4">No tables assigned to this place yet</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="places" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-950">Add New Place</CardTitle>
                <CardDescription>Create a new area for table placement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="place-name">Place Name</Label>
                    <Input
                      id="place-name"
                      value={newPlace.name}
                      onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
                      placeholder="e.g., Outdoor Terrace"
                    />
                  </div>

                  <FileUpload
                    id="place-image"
                    label="Place Image"
                    onChange={(file, preview) => {
                      if (preview) {
                        setNewPlace({ ...newPlace, image: preview })
                      }
                    }}
                  />

                  {newPlace.image && (
                    <div className="mt-2 aspect-video bg-orange-100 rounded-md overflow-hidden">
                      <img
                        src={newPlace.image || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <Button className="bg-orange-500 hover:bg-orange-600" onClick={addPlace}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Place
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((place) => (
                <Card key={place.id}>
                  <CardHeader>
                    <CardTitle className="text-orange-950">{place.name}</CardTitle>
                    <CardDescription>{getTablesByPlace(place.id).length} tables assigned</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-orange-100 rounded-md overflow-hidden mb-4">
                      <img
                        src={place.image || "/placeholder.svg"}
                        alt={place.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-orange-600">
                        {getTablesByPlace(place.id).filter((t) => t.available).length} tables available
                      </p>
                      <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
} */



import { useEffect, useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, TableIcon } from "lucide-react"
import { FileUpload } from "@/components/ui/file-upload"
import { Place, PlaceProvider, RestaurantTable } from "@/providers/table-provider"


export default function TablesPage() {
  const [places, setPlaces] = useState<Place[]>([])
  const [tables, setTables] = useState<RestaurantTable[]>([])

  const [loadingPlaces, setLoadingPlaces] = useState(true)
  const [loadingTables, setLoadingTables] = useState(true)

  // States pour formulaire nouvelle table
  const [newTable, setNewTable] = useState<Omit<RestaurantTable, "id"> | null>(null)

  // States pour formulaire nouveau lieu
  const [newPlace, setNewPlace] = useState<Omit<Place, "id">>({
    libelle: "",
    description: "",
  })

  // Charger places et tables au montage
  useEffect(() => {
    async function fetchPlaces() {
      try {
        const data = await PlaceProvider.getPlaces()
        setPlaces(data)
        setLoadingPlaces(false)
        // Initialiser newTable quand on a au moins un lieu
        if (data.length > 0) {
          setNewTable({
            numero: tables.length + 1,
            min: 2,
            max: 4,
            placeId: data[0].id ?? 0,
            disponible: true,
            nom: "",
            capacite: 0,
          })
        }
      } catch (error) {
        console.error("Erreur chargement places", error)
        setLoadingPlaces(false)
      }
    }

    async function fetchTables() {
      try {
        const data = await PlaceProvider.getTables()
        setTables(data)
        setLoadingTables(false)
      } catch (error) {
        console.error("Erreur chargement tables", error)
        setLoadingTables(false)
      }
    }

    fetchPlaces()
    fetchTables()
  }, [])

  // Fonction ajout place
  async function addPlace() {
    if (!newPlace.libelle) return
    try {
      const createdPlace = await PlaceProvider.addPlace(newPlace)
      setPlaces([...places, createdPlace])
      setNewPlace({ libelle: "", description: "" })
      // Si c’est le premier lieu, initialiser newTable
      if (!newTable && createdPlace.id) {
        setNewTable({
          numero: tables.length + 1,
          min: 2,
          max: 4,
          placeId: createdPlace.id,
          disponible: true,
          nom: "",
          capacite: 0,
        })
      }
    } catch (error) {
      console.error("Erreur ajout place", error)
    }
  }

  const toggleTableAvailability = async (tableId: number) => {
  try {
    console.log('hi')
    const updatedTable = await PlaceProvider.toggleTableAvailability(tableId)
    updatedTable.id =tableId
    console.log("Updated table:", updatedTable)
    setTables((prev) =>
      prev.map((t) => (t.id === updatedTable.id ? updatedTable : t))
    )
    
  } catch (error) {
    console.error(error)
  }
}

  // Fonction ajout table
  async function addTable() {
    if (!newTable) return
    try {
      const createdTable = await PlaceProvider.addTable(newTable)
      setTables([...tables, createdTable])
      setNewTable({
        numero: tables.length + 2,
        min: 2,
        max: 4,
        placeId: newTable.placeId,
        disponible: true,
        nom: "",
        capacite: 0,
      })
    } catch (error) {
      console.error("Erreur ajout table", error)
    }
  }

  // Fonction toggle disponibilité table
 /* async function toggleTableAvailability(tableId: number) {
    const table = tables.find(t => t.id === tableId)
    if (!table) return
    try {
      // Mise à jour locale optimiste
      const updatedTable = { ...table, disponible: !table.disponible }
      setTables(tables.map(t => (t.id === tableId ? updatedTable : t)))

      // Ici tu pourrais faire un appel API pour update la table, par exemple avec une méthode updateTable (à créer)
      // await PlaceProvider.updateTable(updatedTable)
    } catch (error) {
      console.error("Erreur mise à jour disponibilité", error)
    }
  }  */

  // Filtrer tables par placeId
  function getTablesByPlace(placeId: number | null) {
    return tables.filter(table => table.placeId === placeId)
  }

  if (loadingPlaces || loadingTables) return <p>Loading...</p>

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-orange-950">Tables Management</h1>
        </div>

        <Tabs defaultValue="tables">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="places">Places</TabsTrigger>
          </TabsList>

          <TabsContent value="tables" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-950">Add New Table</CardTitle>
                <CardDescription>Create a new table and assign it to a place</CardDescription>
              </CardHeader>
              <CardContent>
                {newTable && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="table-number">Table Number</Label>
                      <Input
                        id="table-number"
                        type="number"
                        value={newTable.numero}
                        onChange={(e) =>
                          setNewTable({ ...newTable, numero: Number(e.target.value) })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="min-person">Min Persons</Label>
                      <Input
                        id="min-person"
                        type="number"
                        value={newTable.min}
                        onChange={(e) =>
                          setNewTable({ ...newTable, min: Number(e.target.value) })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="max-person">Max Persons</Label>
                      <Input
                        id="max-person"
                        type="number"
                        value={newTable.max}
                        onChange={(e) =>
                          setNewTable({ ...newTable, max: Number(e.target.value) })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="place">Place</Label>
                      <Select
                        value={newTable.placeId?.toString() || ""}
                        onValueChange={(value) =>
                          setNewTable({ ...newTable, placeId: Number(value) })
                        }
                      >
                        <SelectTrigger id="place">
                          <SelectValue placeholder="Select place" />
                        </SelectTrigger>
                        <SelectContent>
                          {places.map((place) => (
                            <SelectItem key={place.id} value={place.id?.toString() || ""}>
                              {place.libelle}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2 mt-4">
                  <Switch
                    id="available"
                    checked={newTable?.disponible ?? false}
                    onCheckedChange={(checked) =>
                      newTable && setNewTable({ ...newTable, disponible: checked })
                    }
                  />
                  <Label htmlFor="available">Available</Label>
                </div>

                <Button className="mt-6 bg-orange-500 hover:bg-orange-600" onClick={addTable}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Table
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {places.map((place) => (
                <Card key={place.id ?? 0}>
                  <CardHeader>
                    <CardTitle className="text-orange-950">{place.libelle}</CardTitle>
                    <CardDescription>Tables in this area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                      {getTablesByPlace(place.id ?? 0).map((table) => (
                        <div
                          key={table.id ?? 0}
                          className={`p-3 rounded-lg border ${
                            table.disponible ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
                          } flex flex-col items-center justify-center text-center`}
                        >
                          <TableIcon
                            className={`h-6 w-6 ${table.disponible ? "text-green-500" : "text-red-500"} mb-1`}
                          />
                          <p className="font-medium">Table {table.numero}</p>
                          <p className="text-xs text-gray-600">
                            {table.min}-{table.max} persons
                          </p>
                          <div className="mt-2 flex items-center space-x-2">
                            <Switch
                             id={`table-${table.id}`}
                              checked={table.disponible}
                              onCheckedChange={() => toggleTableAvailability(table.id ?? 0)
                              }
                            />
                            <Label htmlFor={`table-${table.id}`} className="text-xs">
                              {table.disponible ? "Available" : "Unavailable"}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                    {getTablesByPlace(place.id ?? 0).length === 0 && (
                      <p className="text-center text-orange-600 py-4">No tables assigned to this place yet</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="places" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-950">Add New Place</CardTitle>
                <CardDescription>Create a new area for table placement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="place-name">Place Name</Label>
                    <Input
                      id="place-name"
                      value={newPlace.libelle}
                      onChange={(e) => setNewPlace({ ...newPlace, libelle: e.target.value })}
                      placeholder="e.g., Outdoor Terrace"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="place-desc">Description</Label>
                    <Input
                      id="place-desc"
                      value={newPlace.description}
                      onChange={(e) => setNewPlace({ ...newPlace, description: e.target.value })}
                      placeholder="Optional description"
                    />
                  </div>

                  <Button className="bg-orange-500 hover:bg-orange-600" onClick={addPlace}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Place
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              {places.map((place) => (
                <Card key={place.id ?? 0}>
                  <CardHeader>
                    <CardTitle className="text-orange-950">{place.libelle}</CardTitle>
                    <CardDescription>{place.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

