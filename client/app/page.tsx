import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, ChevronRight, Clock, Utensils } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-50">
      <header className="bg-white shadow-sm">
        <div className="w-[85%] mx-auto py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-orange-500">Savoria</span>
          </div>
          <nav className="flex gap-6">
            <Link href="/" className="text-orange-950 hover:text-orange-500 font-medium">
              Home
            </Link>
            <Link href="/menu" className="text-orange-950 hover:text-orange-500 font-medium">
              Menu
            </Link>
            <Link href="/about" className="text-orange-950 hover:text-orange-500 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-orange-950 hover:text-orange-500 font-medium">
              Contact
            </Link>
          </nav>
          <div className="flex gap-3">
            <Link href="/reservations/new">
              <Button className="bg-orange-500 hover:bg-orange-600">Book a Table</Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
  /*
  return (
    <div className="min-h-screen bg-orange-50">
      <header className="bg-white shadow-sm">
        <div className="w-[85%] mx-auto py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-orange-500">Savoria</span>
          </div>
          <nav className="flex gap-6">
            <Link href="/" className="text-orange-950 hover:text-orange-500 font-medium">
              Home
            </Link>
            <Link href="/menu" className="text-orange-950 hover:text-orange-500 font-medium">
              Menu
            </Link>
            <Link href="/about" className="text-orange-950 hover:text-orange-500 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-orange-950 hover:text-orange-500 font-medium">
              Contact
            </Link>
          </nav>
          <div className="flex gap-3">
            <Link href="/reservations/new">
              <Button className="bg-orange-500 hover:bg-orange-600">Book a Table</Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </header>
  
      <main>
        
      
        <section className="py-20 bg-gradient-to-b from-orange-100 to-orange-50">
          <div className="w-[85%] mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
              <h1 className="text-5xl font-bold text-orange-950">Exquisite Dining Experience</h1>
              <p className="text-lg text-orange-900">
                Indulge in a culinary journey at Savoria, where every dish tells a story and every visit creates a
                memory.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/reservations/new">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                    Book a Table
                  </Button>
                </Link>
                <Link href="/menu">
                  <Button size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                    View Menu
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Restaurant interior"
                className="rounded-lg shadow-lg object-cover h-[400px] w-full"
              />
            </div>
          </div>
        </section>


        <section className="py-16 bg-white">
          <div className="w-[85%] mx-auto">
            <h2 className="text-3xl font-bold text-center text-orange-950 mb-12">Why Choose Savoria</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-orange-50 p-6 rounded-lg shadow-sm">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Utensils className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-orange-950 mb-2">Exquisite Cuisine</h3>
                <p className="text-orange-900">
                  Our chef crafts each dish with passion, using only the finest ingredients to create unforgettable
                  flavors.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg shadow-sm">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <CalendarDays className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-orange-950 mb-2">Easy Reservations</h3>
                <p className="text-orange-900">
                  Book your table in seconds with our intuitive reservation system, ensuring a seamless dining
                  experience.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg shadow-sm">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-orange-950 mb-2">Perfect Ambiance</h3>
                <p className="text-orange-900">
                  Immerse yourself in our carefully designed atmosphere that complements your dining experience
                  perfectly.
                </p>
              </div>
            </div>
          </div>
        </section>


        <section className="py-16 bg-orange-100">
          <div className="w-[85%] mx-auto text-center">
            <h2 className="text-3xl font-bold text-orange-950 mb-4">Ready to Experience Savoria?</h2>
            <p className="text-lg text-orange-900 mb-8 max-w-2xl mx-auto">
              Book your table now and embark on a culinary journey that will delight your senses.
            </p>
            <Link href="/reservations/new">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Reserve Your Table
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-orange-950 text-orange-100 py-10">
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
                  <Link href="/" className="hover:text-orange-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="hover:text-orange-500">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="/reservations/new" className="hover:text-orange-500">
                    Reservations
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-orange-500">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>123 Culinary Street</li>
                <li>Foodie City, FC 12345</li>
                <li>Phone: (123) 456-7890</li>
                <li>Email: info@savoria.com</li>
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
  */
}
