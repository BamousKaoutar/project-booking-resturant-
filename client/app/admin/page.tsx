import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminLayout } from "@/components/admin-layout"
import { CalendarRange, ChefHat, Table, Users } from "lucide-react"

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-orange-950">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-orange-950">Total Reservations</CardTitle>
              <CalendarRange className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-950">128</div>
              <p className="text-xs text-orange-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-orange-950">Available Tables</CardTitle>
              <Table className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-950">15</div>
              <p className="text-xs text-orange-600">Out of 20 total tables</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-orange-950">Menu Items</CardTitle>
              <ChefHat className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-950">42</div>
              <p className="text-xs text-orange-600">Across 6 categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-orange-950">Today's Guests</CardTitle>
              <Users className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-950">86</div>
              <p className="text-xs text-orange-600">24 reservations</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-950">Upcoming Reservations</CardTitle>
              <CardDescription>Today's scheduled bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between items-center border-b border-orange-100 pb-3">
                    <div>
                      <p className="font-medium text-orange-950">Guest {i}</p>
                      <p className="text-sm text-orange-600">
                        {4 + i} people • Table {i + 10}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-orange-950">{6 + i}:00 PM</p>
                      <p className="text-sm text-orange-600">Today</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-orange-950">Popular Menu Items</CardTitle>
              <CardDescription>Most ordered dishes this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Truffle Pasta", orders: 42, category: "Main Course" },
                  { name: "Seafood Risotto", orders: 38, category: "Main Course" },
                  { name: "Chocolate Soufflé", orders: 35, category: "Dessert" },
                  { name: "Beef Wellington", orders: 31, category: "Main Course" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-orange-100 pb-3">
                    <div>
                      <p className="font-medium text-orange-950">{item.name}</p>
                      <p className="text-sm text-orange-600">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-orange-950">{item.orders} orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
