
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Check, ChevronRight, Clock, Utensils, Users, Table } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Link } from "react-router-dom"
import { PlaceProvider, RestaurantTable } from "@/providers/table-provider"
import { ReservationProvider } from "@/providers/reservation-provider"


export default function NewReservationPage() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>("")
  const [guests, setGuests] = useState<string>("2")
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [step, setStep] = useState<number>(1)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  // Available time slots
  const timeSlots = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]
  const [availableTables, setAvailableTables] = useState<RestaurantTable[]>([])
  const [selectedTableId, setSelectedTableId] = useState<string>("")

  const handleGuestChange = async (value: string) => {
    setGuests(value)
    const numberOfGuests = parseInt(value)
    try {
      const allTables = await PlaceProvider.getTables()
      const filteredTables = allTables.filter(
        (table) => table.disponible && table.min <= numberOfGuests && numberOfGuests <= table.max
      )
      setAvailableTables(filteredTables)
    } catch (error) {
      console.error("Erreur lors du chargement des tables :", error)
    }
  }
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !time || !selectedTableId) {
      alert("Please fill all required fields including table selection.")
      return
    }

    setIsSubmitting(true)
    setIsSuccess(false)

    try {
      // Construire la date au format ISO "YYYY-MM-DD"
      const dateISO = date.toISOString().split("T")[0] // "2025-05-24"
      // L'heure doit être au format "HH:mm:ss", ici on ajoute ":00" pour secondes
      const heureDebut = time.length === 5 ? `${time}:00` : time

      // Préparer les données pour l'API (sans id)
      const reservationData = {
        date: dateISO,
        heureDebut,
        nombrePersonnes: parseInt(guests, 10),
        phone,
        email,
        nom: name,
        tableId: parseInt(selectedTableId, 10),
      }

      // Appeler l'API pour ajouter la réservation
      await ReservationProvider.addReservation(reservationData)

      setIsSuccess(true)
    } catch (error) {
      console.error("Erreur lors de la soumission de la réservation :", error)
      alert("Une erreur est survenue lors de la réservation. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Next step
  const nextStep = () => {
    setStep(step + 1)
  }

  // Previous step
  const prevStep = () => {
    setStep(step - 1)
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
            <Link to="/" className="text-orange-950 hover:text-orange-500 font-medium">
              Home
            </Link>
            <Link to="/menu" className="text-orange-950 hover:text-orange-500 font-medium">
              Menu
            </Link>
            <Link to="/about" className="text-orange-950 hover:text-orange-500 font-medium">
              About
            </Link>
            <Link to="/contact" className="text-orange-950 hover:text-orange-500 font-medium">
              Contact
            </Link>
          </nav>
          <div>
            <Link to="/reservations/new">
              <Button className="bg-orange-500 hover:bg-orange-600">Book a Table</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="w-[85%] max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-orange-950 mb-2">Reserve Your Table</h1>
            <p className="text-orange-900">Book your dining experience at Savoria and enjoy our exquisite cuisine.</p>
          </div>

          {!isSuccess ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-orange-950">
                      {step === 1 ? "Select Date & Time" : "Your Information"}
                    </CardTitle>
                    <CardDescription>
                      {step === 1 ? "Choose when you'd like to dine with us" : "Complete your reservation details"}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${step === 1 ? "bg-orange-500" : "bg-orange-300"}`}></div>
                    <div className={`w-3 h-3 rounded-full ${step === 2 ? "bg-orange-500" : "bg-orange-300"}`}></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  {step === 1 ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="date">Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                disabled={(date) => {
                                  // Disable dates in the past
                                  const today = new Date()
                                  today.setHours(0, 0, 0, 0)
                                  return date < today
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="time">Time</Label>
                          <Select value={time} onValueChange={setTime}>
                            <SelectTrigger id="time">
                              <SelectValue placeholder="Select time">
                                {time ? (
                                  <div className="flex items-center">
                                    <Clock className="mr-2 h-4 w-4" />
                                    {time}
                                  </div>
                                ) : (
                                  "Select time"
                                )}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                  {slot}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="guests">Number of Guests</Label>
                        <Select value={guests} onValueChange={handleGuestChange}>
                                <SelectTrigger id="guests">
                                  <SelectValue placeholder="Sélectionner le nombre de personnes">
                                    <div className="flex items-center">
                                      <Users className="mr-2 h-4 w-4" />
                                      {guests} {parseInt(guests) === 1 ? "Personne" : "Personnes"}
                                    </div>
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                                    <SelectItem key={num} value={num.toString()}>
                                      {num} {num === 1 ? "Personne" : "Personnes"}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              {/* Select table disponible */}
                              {availableTables.length > 0 && (
                                <Select value={selectedTableId} onValueChange={setSelectedTableId}>
                                  <SelectTrigger id="tables">
                                    <SelectValue placeholder="Choisir une table">
                                      <div className="flex items-center">
                                        <Table className="mr-2 h-4 w-4" />
                                        {selectedTableId ? `Table ${selectedTableId}` : "Choisir une table"}
                                      </div>
                                    </SelectValue>
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableTables.map((table) => (
                                      <SelectItem key={table.id} value={table.id?.toString() || ""}>
                                        Table {table.numero} — Capacité: {table.min}-{table.max}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Smith"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(123) 456-7890"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Special Requests (Optional)</Label>
                        <Textarea
                          id="notes"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Any dietary restrictions, special occasions, or seating preferences?"
                          rows={3}
                        />
                      </div>

                      <div className="bg-orange-100 p-4 rounded-lg">
                        <h3 className="font-medium text-orange-950 mb-2">Reservation Summary</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-orange-900">Date:</div>
                          <div className="font-medium text-orange-950">
                            {date ? format(date, "PPP") : "Not selected"}
                          </div>

                          <div className="text-orange-900">Time:</div>
                          <div className="font-medium text-orange-950">{time || "Not selected"}</div>

                          <div className="text-orange-900">Guests:</div>
                          <div className="font-medium text-orange-950">
                            {guests} {Number.parseInt(guests) === 1 ? "Guest" : "Guests"}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                {step === 1 ? (
                  <>
                    <Button variant="outline" asChild>
                      <Link to="/">Cancel</Link>
                    </Button>
                    <Button
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={nextStep}
                      disabled={!date || !time || !guests}
                    >
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={handleSubmit}
                      disabled={!name || !email || !phone || isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Complete Reservation"}
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-orange-950 mb-2">Reservation Confirmed!</h2>
                <p className="text-orange-900 mb-6">
                  Thank you for choosing Savoria. We look forward to serving you on {date ? format(date, "PPP") : ""} at{" "}
                  {time}.
                </p>
                <div className="bg-orange-100 p-4 rounded-lg mb-6 max-w-md mx-auto">
                  <h3 className="font-medium text-orange-950 mb-2">Reservation Details</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-left">
                    <div className="text-orange-900">Name:</div>
                    <div className="font-medium text-orange-950">{name}</div>

                    <div className="text-orange-900">Date:</div>
                    <div className="font-medium text-orange-950">{date ? format(date, "PPP") : ""}</div>

                    <div className="text-orange-900">Time:</div>
                    <div className="font-medium text-orange-950">{time}</div>

                    <div className="text-orange-900">Guests:</div>
                    <div className="font-medium text-orange-950">
                      {guests} {Number.parseInt(guests) === 1 ? "Guest" : "Guests"}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link to="/">Return to Home</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/menu">View Menu</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <footer className="bg-orange-950 text-orange-100 py-10 mt-12">
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
                  <Link to="/" className="hover:text-orange-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/menu" className="hover:text-orange-500">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link to="/reservations/new" className="hover:text-orange-500">
                    Reservations
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-orange-500">
                    About Us
                  </Link>
                </li>
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
