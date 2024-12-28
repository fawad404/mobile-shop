'use client'
import { Truck, CheckCircle, Headphones, CreditCard } from 'lucide-react'
import {Card , CardContent} from '../ui/card'

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping for orders over £150"
  },
  {
    icon: CheckCircle,
    title: "Money Guarantee",
    description: "30 Day Money Back"
  },
  {
    icon: Headphones,
    title: "Online Support 24/7",
    description: "Technical Support 24/7"
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "All Cards Accepted"
  }
]

const services = [
  {
    title: "New & Used\nMobile Phones",
    description: "Browse new & used phones. Find your perfect device today!",
    buttonText: "Shop Now!",
    bgColor: "bg-orange-500",
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    title: "Get Your\nMobile Accessories",
    description: "Browse All types of Mobile Accessories. Find everything you need.",
    buttonText: "Shop Now!",
    bgColor: "bg-black",
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    title: "Book\nMobile Repair",
    description: "Restore your phone's former glory with quick, hassle-free repairs on the go!",
    buttonText: "Book Now!",
    bgColor: "bg-red-500",
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    title: "Make\nMobile Trade",
    description: "Trade on-the-go with the best rates available on our online shop",
    buttonText: "Trade Now!",
    bgColor: "bg-purple-500",
    image: "/placeholder.svg?height=200&width=200"
  }
]

export default function FeaturesSection() {
  return (
    <div className="space-y-12 py-12 px-4 md:px-6">
      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-amber-100">
                <Icon className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 palce-items-center">
        {services.map((service, index) => (
          <Card key={index} className={`${service.bgColor} text-white overflow-hidden`}>
            <CardContent className="p-6 space-y-4">
              <div className="relative h-40">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute right-0 top-0 w-32 h-32 object-contain transform rotate-12"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold whitespace-pre-line">{service.title}</h3>
                <p className="text-sm mt-2 opacity-90">{service.description}</p>
                <button className="mt-4 px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-sm font-semibold">
                  {service.buttonText}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

