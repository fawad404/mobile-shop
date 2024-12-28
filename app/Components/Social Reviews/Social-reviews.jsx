'use client'
import { MessageCircle,FacebookIcon,InstagramIcon ,PhoneIcon as WhatsApp } from 'lucide-react'
import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"

export default function SocialReviews() {
  const reviews = [
    {
      id: 1,
      author: "Carl Mason",
      initial: "C",
      rating: 5,
      content: "Went in for a pdf print was good service with a smile. Bought 2 phones from here...",
      date: "a month ago"
    },
    {
      id: 2,
      author: "Diyari Ahmadi",
      image: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content: "Great service and friendly staff...",
      date: "a month ago"
    },
    {
      id: 3,
      author: "Lilian Wamere",
      image: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content: "Went into the shop and someone won't start up for 2 days. Gentleman put it to charge and it...",
      date: "a month ago"
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Social Media Section */}
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Let's get social</h2>
        <div className="flex justify-center gap-4">
          <a href="#" className="bg-black p-3 rounded-full hover:bg-gray-800 transition-colors">
            <FacebookIcon className="w-6 h-6 text-white" />
          </a>
          <a href="#" className="bg-black p-3 rounded-full hover:bg-gray-800 transition-colors">
            <InstagramIcon className="w-6 h-6 text-white" />
          </a>
          <a href="#" className="bg-black p-3 rounded-full hover:bg-gray-800 transition-colors">
            <MessageCircle className="w-6 h-6 text-white" />
          </a>
          <a href="#" className="bg-black p-3 rounded-full hover:bg-gray-800 transition-colors">
            <WhatsApp className="w-6 h-6 text-white" />
          </a>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          Customer Reviews
          <span role="img" aria-label="smile">😃</span>
        </h2>
        <p className="text-gray-600">See what our customers think about us</p>
      </div>

      {/* Overall Rating */}
      <div className="flex items-center justify-center gap-4 pb-6">
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-600" fill="currentColor">
            <path d="M20.555 5.312A2 2 0 0 1 22 7.242v9.516a2 2 0 0 1-1.445 1.93L12 22l-8.555-3.312A2 2 0 0 1 2 16.758V7.242a2 2 0 0 1 1.445-1.93L12 2l8.555 3.312z" />
          </svg>
        </div>
        <div>
          <div className="font-bold">Excellent</div>
          <div className="text-sm text-gray-600">Phone Base</div>
          <div className="flex items-center gap-1">
            <span className="font-bold">5.0</span>
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <div className="text-sm text-gray-600">Based on 116 reviews</div>
        </div>
      </div>

      {/* Reviews Carousel */}
      <div className="w-full relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
            breakpoints: {
              '(min-width: 768px)': {
                slidesToScroll: 1
              }
            }
          }}
          
        >
          <CarouselContent>
      
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="basis-full">
                <div className="p-1">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {review.image ? (
                          <img
                            src={review.image}
                            alt={review.author}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-600 font-semibold">{review.initial}</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-semibold">{review.author}</div>
                          <div className="text-sm text-gray-500">{review.date}</div>
                          <div className="flex gap-1 my-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-gray-600">{review.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 lg:-left-12" />
          <CarouselNext className="absolute -right-4 lg:-right-12" />
        </Carousel>
      </div>
    </div>
  )
}
