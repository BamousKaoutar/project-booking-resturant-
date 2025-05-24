import axios from "axios"

export interface Reservation {
  id: number | null
  date: string // format ISO : "2025-05-24"
  heureDebut: string // format ISO : "14:30:00"
  nombrePersonnes: number
  phone: string
  email: string
  nom: string
  tableId: number
  statut?: string
}

const API_BASE = "http://localhost:9090"

export const ReservationProvider = {
  async getReservations(): Promise<Reservation[]> {
    const res = await axios.get(`${API_BASE}/api/reservations`)
    if (res.status === 200) return res.data
    throw new Error("Erreur lors du chargement des réservations")
  },

  async addReservation(data: Omit<Reservation, "id">): Promise<Reservation> {
    data.statut = "pending";
    console.log("yes : ",data)
    const res = await axios.post(`${API_BASE}/api/reservations`, data)
    if (res.status === 201 || res.status === 200) return res.data
    throw new Error("Erreur lors de l’ajout de la réservation")
  },

  async deleteReservation(id: number): Promise<void> {
    const res = await axios.delete(`${API_BASE}/api/reservations/${id}`)
    if (res.status !== 204 && res.status !== 200) {
      throw new Error("Erreur lors de la suppression de la réservation")
    }
  },

  async getReservationById(id: number): Promise<Reservation> {
    const res = await axios.get(`${API_BASE}/api/reservations/${id}`)
    if (res.status === 200) return res.data
    throw new Error("Réservation non trouvée")
  },
  
    async toggleReservationStatus(id: number, status: string): Promise<Reservation> {
    const res = await axios.patch(`${API_BASE}/api/reservations/${id}/${status}`)
    if (res.status === 200) return res.data
    throw new Error("Erreur lors du changement de statut de la réservation")
   }


}
