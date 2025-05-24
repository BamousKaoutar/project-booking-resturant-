
import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Check, Clock, Users, X } from "lucide-react"
import { Reservation, ReservationProvider } from "@/providers/reservation-provider"

export default function ReservationsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [statutFilter, setstatutFilter] = useState<string>("all")
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedReservation,setSelectedReservation] = useState<Reservation | null>()

  // Charger les réservations au chargement du composant
  useEffect(() => {
    setLoading(true)
    ReservationProvider.getReservations()
      .then((data) => {
        setReservations(data)
        setError(null)
        console.log("data : ",data)
      })
      .catch((e) => {
        setError(e.message || "Erreur lors du chargement des réservations")
      })
      .finally(() => setLoading(false))
  }, [])

  // Fonction pour mettre à jour le statut
  const updateReservationstatut = async (id: number, statut: string) => {
    try {
      const updated = await ReservationProvider.toggleReservationStatus(id, statut)
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? updated : r))
      )
    } catch (e) {
      alert("Erreur lors du changement de statut")
    }
  }

  // Filtrer par date
  const getReservationsByDate = (date: Date | undefined) => {
    if (!date) return []
    return reservations.filter((r) => {
      const reservationDate = new Date(r.date)
      return reservationDate.toDateString() === date.toDateString()
    })
  }

  // Filtrer par statut
  const filterReservationsBystatut = (list: Reservation[]) => {
    if (statutFilter === "all") return list
    return list.filter((r) => r.statut === statutFilter)
  }

  const filteredReservations = filterReservationsBystatut(getReservationsByDate(date))

  const sortedReservations = [...filteredReservations].sort((a, b) =>
    a.heureDebut.localeCompare(b.heureDebut)
  )

  const upcomingReservations = reservations
    .filter((r) => {
      const reservationDate = new Date(r.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return reservationDate >= today && r.statut !== "cancelled"
    })
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA.getTime() !== dateB.getTime()
        ? dateA.getTime() - dateB.getTime()
        : a.heureDebut.localeCompare(b.heureDebut)
    })

  if (loading) return <div>Chargement des réservations...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-orange-950">Reservations</h1>
        </div>

        <Tabs defaultValue="calendar">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Reservations</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-orange-950">Select Date</CardTitle>
                  <CardDescription>View reservations for a specific date</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Reservations:</span>
                      <span className="font-medium">{filteredReservations.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Confirmed:</span>
                      <span className="font-medium">
                        {filteredReservations.filter((r) => r.statut === "confirmed").length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending:</span>
                      <span className="font-medium">
                        {filteredReservations.filter((r) => r.statut === "pending").length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cancelled:</span>
                      <span className="font-medium">
                        {filteredReservations.filter((r) => r.statut === "cancelled").length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-orange-950">
                        Reservations for{" "}
                        {date?.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardTitle>
                      <CardDescription>Manage your restaurant bookings</CardDescription>
                    </div>
                    <Select value={statutFilter} onValueChange={setstatutFilter}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Filter by statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statutes</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  {sortedReservations.length > 0 ? (
                    <div className="space-y-4">
                      {sortedReservations.map((reservation) => (
                        <div
                          key={reservation.id}
                          className={`p-4 rounded-lg border ${
                            reservation.statut === "confirmed"
                              ? "border-green-500 bg-green-50"
                              : reservation.statut === "pending"
                              ? "border-yellow-500 bg-yellow-50"
                              : "border-red-500 bg-red-50"
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h3 className="font-medium">{reservation.nom}</h3>
                              <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{reservation.heureDebut}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  <span>{reservation.nombrePersonnes} guests</span>
                                </div>
                                <div>Table #{reservation.tableId}</div>
                              </div>
                              {/* Si tu as une propriété notes dans Reservation, adapte ici */}
                            </div>

                            <div className="flex items-center gap-2">
                              {reservation.statut !== "confirmed" && (
                                <Button
                                  size="sm"
                                  className="bg-green-500 hover:bg-green-600"
                                  onClick={() => updateReservationstatut(reservation.id!, "confirmed")}
                                >
                                  <Check className="mr-1 h-4 w-4" />
                                  Confirm
                                </Button>
                              )}
                              {reservation.statut !== "cancelled" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-red-500 text-red-500 hover:bg-red-50"
                                  onClick={() => updateReservationstatut(reservation.id!, "cancelled")}
                                >
                                  <X className="mr-1 h-4 w-4" />
                                  Cancel
                                </Button>
                              )}
                              <Button size="sm" variant="outline" onClick={() => setSelectedReservation(reservation)}>
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No reservations for this date and filter.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-950">Upcoming Reservations</CardTitle>
                <CardDescription>Next confirmed reservations</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingReservations.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingReservations.map((reservation) => (
                      <div
                        key={reservation.id}
                        className="p-4 rounded-lg border border-gray-300"
                      >
                        <h3 className="font-medium">{reservation.nom}</h3>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <div>
                            Date: {new Date(reservation.date).toLocaleDateString()}
                          </div>
                          <div>Time: {reservation.heureDebut}</div>
                          <div>Guests: {reservation.nombrePersonnes}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No upcoming reservations.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>


        <Dialog open={!!selectedReservation} onOpenChange={() => setSelectedReservation(null)}>
            <DialogContent className="bg-green-50 border-green-200 shadow-lg rounded-lg">
              <DialogHeader>
                <DialogTitle>Reservation Details</DialogTitle>
                <DialogDescription>
                  Detailed information about the reservation.
                </DialogDescription>
              </DialogHeader>

              {selectedReservation && (
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {selectedReservation.nom}</p>
                  <p><strong>Date:</strong> {new Date(selectedReservation.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {selectedReservation.heureDebut}</p>
                  <p><strong>Guests:</strong> {selectedReservation.nombrePersonnes}</p>
                  <p><strong>Table:</strong> #{selectedReservation.tableId}</p>
                  <p><strong>Status:</strong> {selectedReservation.statut}</p>
               
                </div>
              )}

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>


      </div>
    </AdminLayout>
  )
}
