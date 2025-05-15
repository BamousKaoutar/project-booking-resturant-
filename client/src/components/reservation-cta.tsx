"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
// import { motion } from "framer-motion"

export default function ReservationCta() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>("")
  const [guests, setGuests] = useState<string>("")

  const handleReservation = () => {
    // In a real app, we would pass these values to the reservation page
    router.push("/reservation")
  }

  const availableTimes = [
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
  ]

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            
              <h2 className="text-3xl font-bold mb-4 text-stone-800">Reserve Your Table</h2>
              <p className="text-lg mb-8 text-stone-600">
                Experience our exceptional cuisine and atmosphere. Book your table now to avoid disappointment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1 text-stone-600">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-stone-600">Time</label>
                  <Select onValueChange={setTime}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-stone-600">Guests</label>
                  <Select onValueChange={setGuests}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Person</SelectItem>
                      <SelectItem value="2">2 People</SelectItem>
                      <SelectItem value="3">3 People</SelectItem>
                      <SelectItem value="4">4 People</SelectItem>
                      <SelectItem value="5">5 People</SelectItem>
                      <SelectItem value="6">6 People</SelectItem>
                      <SelectItem value="7">7 People</SelectItem>
                      <SelectItem value="8">8+ People</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleReservation}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                size="lg"
              >
                Complete Reservation
              </Button>
          </div>
          <div
            className="md:w-1/2 bg-cover bg-center h-64 md:h-auto"
            style={{ backgroundImage: "url('/placeholder.svg?height=600&width=800')" }}
          >
            <div className="h-full w-full bg-gradient-to-r from-amber-600/80 to-amber-800/80 p-8 md:p-12 flex items-center">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-4">Special Events</h3>
                <p className="mb-6">
                  Planning a special occasion? We offer private dining rooms and customized menus for your events.
                </p>
                <Button variant="outline" className="border-white text-white hover:bg-white/20">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
