import axios from "axios"

export interface Place {
  id: number | null
  libelle: string
  description: string
}

export interface RestaurantTable {
  id: number | null
  numero: number
  disponible: boolean
  nom: string
  capacite: number
  min: number
  max: number
  placeId: number
}

const API_BASE = "http://localhost:9090"

export const PlaceProvider = {
  async getPlaces(): Promise<Place[]> {
    const res = await axios.get(`${API_BASE}/api/places`)
    if (res.status === 200) return res.data
    throw new Error("Erreur lors du chargement des places")
  },

  async getTables(): Promise<RestaurantTable[]> {
    const res = await axios.get(`${API_BASE}/api/restaurant-tables`)
    console.log("tables : ",res.data)
    if (res.status === 200) return res.data
    throw new Error("Erreur lors du chargement des tables")
  },

  async addPlace(data: Omit<Place, "id">): Promise<Place> {
    const res = await axios.post(`${API_BASE}/api/places`, data)
    if (res.status === 201 || res.status === 200) return res.data
    throw new Error("Erreur lors de l’ajout de la place")
  },

  async deletePlace(id: number | null): Promise<void> {
    const res = await axios.delete(`${API_BASE}/api/places/${id}`)
    if (res.status !== 204 && res.status !== 200) {
      throw new Error("Erreur lors de la suppression de la place")
    }
  },

  async addTable(data: Omit<RestaurantTable, "id">): Promise<RestaurantTable> {
    const res = await axios.post(`${API_BASE}/api/restaurant-tables`, data)
    if (res.status === 201 || res.status === 200) return res.data
    throw new Error("Erreur lors de l’ajout de la table")
  },

  async toggleTableAvailability(id: number): Promise<RestaurantTable> {
    
    const res = await axios.patch(`${API_BASE}/api/restaurant-tables/${id}/toggle-availability`)
    console.log('id is : ',res)
    if (res.status === 200) return res.data
    
    throw new Error("Erreur lors du changement de disponibilité de la table")
  },

  async deleteTable(id: number | null): Promise<void> {
    const res = await axios.delete(`${API_BASE}/api/restaurant-tables/${id}`)
    if (res.status !== 204 && res.status !== 200) {
      throw new Error("Erreur lors de la suppression de la table")
    }
  }
}
