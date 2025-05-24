import axios from "axios"

export interface MenuItem {
  id: number | null 
  nom: string
  description: string
  prix: number
  categorieId: number

}

export interface Category {
  id: number
  name: string
}

const API_BASE = "http://localhost:9090"

export const MenuProvider = {
  async getMenuItems(): Promise<MenuItem[]> {
    const res = await axios.get(`${API_BASE}/produits/list`)
    if (res.status === 200) return res.data
    throw new Error("Erreur lors du chargement des plats")
  },

  async getCategories(): Promise<Category[]> {
    const res = await axios.get(`${API_BASE}/categories`)
    if (res.status === 200) return res.data
    throw new Error("Erreur lors du chargement des catégories")
  },

  async addMenuItem(data: Omit<MenuItem, "id">): Promise<MenuItem> {
    const res = await axios.post(`${API_BASE}/produits/create`, data)
    if (res.status === 201 || res.status === 200) return res.data
    throw new Error("Erreur lors de l’ajout du plat")
  },

  async deleteMenuItem(id: number | null): Promise<void> {
    const res = await axios.delete(`${API_BASE}/menu-items/${id}`)
    if (res.status !== 204 && res.status !== 200) {
      throw new Error("Erreur lors de la suppression du plat")
    }
  },

  async addCategory(data: Omit<Category, "id">): Promise<Category> {
    const res = await axios.post(`${API_BASE}/categories/create`, data)
    if (res.status === 201 || res.status === 200) return res.data
    throw new Error("Erreur lors de l’ajout de la catégorie")
  }
}
