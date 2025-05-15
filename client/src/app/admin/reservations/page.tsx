"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Check, Clock, Users, X } from "lucide-react"

// Define types for our data
interface Reservation {
  id: string
  name: string
  email: string
  phone: string
  date: Date
  time: string
  guests: number
  tableId: string
  status: "confirmed" | "pending" | "cancelled"
  notes?: string
}

export default function ReservationsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Sample data for reservations
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "r1",
      name: "John Smith",
      email: "john@example.com",
      phone: "555-123-4567",
      date: new Date(),
      time: "19:00",
      guests: 4,
      tableId: "t3",
      status: "confirmed",
      notes: "Anniversary dinner",
    },
    {
      id: "r2",
      name: "Emily Johnson",
      email: "emily@example.com",
      phone: "555-987-6543",
      date: new Date(),
      time: "20:00",
      guests: 2,
      tableId: "t1",
      status: "confirmed",
    },
    {
      id: "r3",
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "555-456-7890",
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: "18:30",
      guests: 6,
      tableId: "t6",
      status: "pending",
    },
    {
      id: "r4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "555-789-0123",
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: "19:30",
      guests: 3,
      tableId: "t2",
      status: "confirmed",
    },
    {
      id: "r5",
      name: "David Lee",
      email: "david@example.com",
      phone: "555-321-6547",
      date: new Date(Date.now() - 86400000), // Yesterday
      time: "20:00",
      guests: 2,
      tableId: "t4",
      status: "cancelled",
      notes: "Called to cancel due to illness",
    },
  ])

  // Function to update reservation status
  const updateReservationStatus = (id: string, status: "confirmed" | "pending" | "cancelled") => {
    setReservations(
      reservations.map((reservation) => (reservation.id === id ? { ...reservation, status } : reservation)),
    )
  }

  // Filter reservations by date
  const getReservationsByDate = (date: Date | undefined) => {
    if (!date) return []

    return reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.date)
      return reservationDate.toDateString() === date.toDateString()
    })
  }

  // Filter reservations by status
  const filterReservationsByStatus = (reservations: Reservation[]) => {
    if (statusFilter === "all") return reservations
    return reservations.filter((reservation) => reservation.status === statusFilter)
  }

  // Get filtered reservations
  const filteredReservations = filterReservationsByStatus(getReservationsByDate(date))

  // Sort reservations by time
  const sortedReservations = [...filteredReservations].sort((a, b) => {
    return a.time.localeCompare(b.time)
  })

  // Get upcoming reservations (today and future)
  const upcomingReservations = reservations
    .filter((reservation) => {
      const reservationDate = new Date(reservation.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return reservationDate >= today && reservation.status !== "cancelled"
    })
    .sort((a, b) => {
      // Sort by date first, then by time
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime()
      }
      return a.time.localeCompare(b.time)
    })

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-orange-950">Reservations</h1>
          <Button className="bg-orange-500 hover:bg-orange-600">New Reservation</Button>
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
                  <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Reservations:</span>
                      <span className="font-medium">{filteredReservations.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Confirmed:</span>
                      <span className="font-medium">
                        {filteredReservations.filter((r) => r.status === "confirmed").length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pending:</span>
                      <span className="font-medium">
                        {filteredReservations.filter((r) => r.status === "pending").length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cancelled:</span>
                      <span className="font-medium">
                        {filteredReservations.filter((r) => r.status === "cancelled").length}
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
                        {date?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                      </CardTitle>
                      <CardDescription>Manage your restaurant bookings</CardDescription>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
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
                            reservation.status === "confirmed"
                              ? "border-green-500 bg-green-50"
                              : reservation.status === "pending"
                                ? "border-yellow-500 bg-yellow-50"
                                : "border-red-500 bg-red-50"
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h3 className="font-medium">{reservation.name}</h3>
                              <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{reservation.time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  <span>{reservation.guests} guests</span>
                                </div>
                                <div>Table #{reservation.tableId.replace("t", "")}</div>
                              </div>
                              {reservation.notes && <p className="text-xs italic mt-1">{reservation.notes}</p>}
                            </div>

                            <div className="flex items-center gap-2">
                              {reservation.status !== "confirmed" && (
                                <Button
                                  size="sm"
                                  className="bg-green-500 hover:bg-green-600"
                                  onClick={() => updateReservationStatus(reservation.id, "confirmed")}
                                >
                                  <Check className="mr-1 h-4 w-4" />
                                  Confirm
                                </Button>
                              )}
                              {reservation.status !== "cancelled" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-red-500 text-red-500 hover:bg-red-50"
                                  onClick={() => updateReservationStatus(reservation.id, "cancelled")}
                                >
                                  <X className="mr-1 h-4 w-4" />
                                  Cancel
                                </Button>
                              )}
                              <Button size="sm" variant="outline">
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CalendarDays className="mx-auto h-12 w-12 text-orange-300" />
                      <h3 className="mt-2 text-lg font-medium text-orange-950">No Reservations</h3>
                      <p className="text-orange-600">There are no reservations for this date.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-950">Upcoming Reservations</CardTitle>
                <CardDescription>All future bookings at your restaurant</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingReservations.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingReservations.map((reservation) => (
                      <div
                        key={reservation.id}
                        className={`p-4 rounded-lg border ${
                          reservation.status === "confirmed"
                            ? "border-green-500 bg-green-50"
                            : "border-yellow-500 bg-yellow-50"
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-medium">{reservation.name}</h3>
                            <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <CalendarDays className="h-3 w-3" />
                                <span>
                                  {reservation.date.toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{reservation.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{reservation.guests} guests</span>
                              </div>
                              <div>Table #{reservation.tableId.replace("t", "")}</div>
                            </div>
                            {reservation.notes && <p className="text-xs italic mt-1">{reservation.notes}</p>}
                          </div>

                          <div className="flex items-center gap-2">
                            {reservation.status !== "confirmed" && (
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600"
                                onClick={() => updateReservationStatus(reservation.id, "confirmed")}
                              >
                                <Check className="mr-1 h-4 w-4" />
                                Confirm
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-500 text-red-500 hover:bg-red-50"
                              onClick={() => updateReservationStatus(reservation.id, "cancelled")}
                            >
                              <X className="mr-1 h-4 w-4" />
                              Cancel
                            </Button>
                            <Button size="sm" variant="outline">
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarDays className="mx-auto h-12 w-12 text-orange-300" />
                    <h3 className="mt-2 text-lg font-medium text-orange-950">No Upcoming Reservations</h3>
                    <p className="text-orange-600">There are no upcoming reservations at this time.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
