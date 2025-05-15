"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
//import { motion, AnimatePresence } from "framer-motion"

interface Testimonial {
  id: string
  name: string
  role: string
  comment: string
  rating: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Johnson",
    role: "Food Critic",
    comment:
      "La Belle Cuisine offers an exceptional dining experience with impeccable service and exquisite flavors that transport you to culinary heaven.",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "t2",
    name: "Michael Chen",
    role: "Regular Customer",
    comment:
      "I've been coming here for years and the quality has never wavered. The filet mignon is consistently perfect and the staff remembers my preferences.",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "t3",
    name: "Emily Rodriguez",
    role: "First-time Visitor",
    comment:
      "What a delightful surprise! The ambiance was romantic, the wine selection impressive, and every dish was a work of art. Can't wait to return!",
    rating: 4,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "t4",
    name: "David Thompson",
    role: "Anniversary Celebration",
    comment:
      "We celebrated our 10th anniversary here and the staff went above and beyond to make it special. The chef even prepared a custom dessert for us.",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <div className="relative max-w-4xl mx-auto">
      
          <Card className="bg-stone-800 border-stone-700">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mx-auto">
                    <img
                      src={testimonials[current].image || "/placeholder.svg"}
                      alt={testimonials[current].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-2">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                    {[...Array(5 - testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-stone-600" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl italic mb-4">"{testimonials[current].comment}"</p>
                  <div>
                    <h4 className="font-semibold text-lg">{testimonials[current].name}</h4>
                    <p className="text-stone-400">{testimonials[current].role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

      <div className="flex justify-center mt-6 gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-stone-800 border-stone-700 text-white hover:bg-stone-700"
          onClick={prev}
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-stone-800 border-stone-700 text-white hover:bg-stone-700"
          onClick={next}
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex justify-center mt-4 gap-1">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === current ? "bg-amber-600" : "bg-stone-600"} transition-colors`}
            onClick={() => {
              setCurrent(index)
              setAutoplay(false)
              setTimeout(() => setAutoplay(true), 5000)
            }}
          />
        ))}
      </div>
    </div>
  )
}
