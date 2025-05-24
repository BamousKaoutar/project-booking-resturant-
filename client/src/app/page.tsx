import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, MapPin, Phone, Utensils } from "lucide-react"
import MenuHighlights from "@/components/menu-highlights"
import TestimonialCarousel from "@/components/testimonial-carousel"
import ReservationCta from "@/components/reservation-cta"
import imageRest from "@/public/restaurant.jpg"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-50">
      <header className="bg-white shadow-sm">
        <div className="w-[85%] mx-auto py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-orange-500">DEV OPS</span>
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
          <div className="flex gap-3">
            <Link to="/reservation">
              <Button className="bg-orange-500 hover:bg-orange-600">Book a Table</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageRest})` }}
        />
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">La Belle Cuisine</h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Experience fine dining in a cozy atmosphere with our award-winning cuisine
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
                <Link to="/reservation" className="flex items-center">
                  Reserve a Table <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
            </div>
          </div>
        </div>

        {/* Floating info card */}
        <div className="hidden md:block absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg z-20 max-w-xs">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-5 w-5 text-amber-600" />
            <span className="font-medium">Open Hours</span>
          </div>
          <p className="mb-4 text-sm">
            Mon-Thu: 11am - 10pm
            <br />
            Fri-Sat: 11am - 11pm
            <br />
            Sunday: 10am - 9pm
          </p>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-amber-600" />
            <span className="font-medium">(123) 456-7890</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-stone-800">Our Story</h2>
              <p className="text-lg mb-6 text-stone-600 leading-relaxed">
                Founded in 2010, La Belle Cuisine has been serving exquisite dishes made with locally-sourced
                ingredients. Our chef brings over 20 years of culinary expertise from around the world.
              </p>
              <p className="text-lg mb-8 text-stone-600 leading-relaxed">
                We believe in creating memorable dining experiences through exceptional food, attentive service, and a
                warm, inviting atmosphere.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-amber-600">12+</span>
                  <span className="text-sm text-stone-500">Years of Excellence</span>
                </div>
                <div className="w-px h-12 bg-stone-300"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-amber-600">4.8</span>
                  <span className="text-sm text-stone-500">Customer Rating</span>
                </div>
                <div className="w-px h-12 bg-stone-300"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-amber-600">30+</span>
                  <span className="text-sm text-stone-500">Signature Dishes</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img src="/placeholder.svg?height=600&width=800" alt="Restaurant interior" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-amber-600 text-white p-4 rounded-lg shadow-lg">
                <Utensils className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-stone-800">Menu Highlights</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Discover our chef's selection of signature dishes, crafted with passion and the finest ingredients
            </p>
          </div>
          <MenuHighlights />
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-amber-600 text-amber-600 hover:bg-amber-50">
              <Link to="/menu">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>

  

      {/* Location & Contact */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-stone-800">Find Us</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[400px]">
                {/* This would be a map in a real implementation */}
                <div className="w-full h-full bg-stone-200 flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-stone-400" />
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-stone-800">Contact Us</h2>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-amber-600" /> Address
                  </h3>
                  <p className="text-stone-600">
                    123 Gourmet Avenue
                    <br />
                    Culinary District
                    <br />
                    Foodie City, FC 12345
                  </p>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-amber-600" /> Reservations
                  </h3>
                  <p className="text-stone-600">
                    Phone: (123) 456-7890
                    <br />
                    Email: reservations@labellecuisine.com
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-amber-600" /> Hours
                  </h3>
                  <p className="text-stone-600">
                    Monday - Thursday: 11:00 AM - 10:00 PM
                    <br />
                    Friday - Saturday: 11:00 AM - 11:00 PM
                    <br />
                    Sunday: 10:00 AM - 9:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-12 px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">La Belle Cuisine</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-stone-400">(123) 456-7890</li>
                <li className="text-stone-400">info@labellecuisine.com</li>
                <li className="text-stone-400">123 Gourmet Avenue</li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-stone-400 mb-4">Subscribe to receive updates on special events and promotions</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md focus:outline-none text-stone-900 w-full"
                />
                <Button className="rounded-l-none bg-amber-600 hover:bg-amber-700">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </footer>


    </div>
  )
 
}
