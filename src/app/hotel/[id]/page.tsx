'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MapPin, Wifi, Car, Coffee, Waves, Utensils, Dumbbell, Space as Spa, ArrowLeft, Heart, Share, ChevronLeft, ChevronRight, Phone, Mail, Clock, Users, Bed, Bath, Maximize, CheckCircle, XCircle, Calendar, CreditCard, Shield, Award, ThumbsUp, MessageSquare } from 'lucide-react';

// Consolidated hotel data
const allHotelsData = {
  '1': {
    id: '1',
    name: 'Grand Plaza Hotel',
    location: 'Downtown, New York',
    address: '123 Broadway Street, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'info@grandplazahotel.com',
    rating: 4.5,
    reviewCount: 1247,
    price: 189,
    originalPrice: 249,
    checkIn: '15:00',
    checkOut: '11:00',
    images: [
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    amenities: [
      { name: 'Free WiFi', icon: Wifi, available: true },
      { name: 'Free parking', icon: Car, available: true },
      { name: 'Restaurant', icon: Utensils, available: true },
      { name: 'Swimming pool', icon: Waves, available: true },
      { name: 'Fitness center', icon: Dumbbell, available: true },
      { name: 'Spa', icon: Spa, available: true },
      { name: 'Room service', icon: Coffee, available: true },
    ],
    rooms: [
      {
        id: '1',
        name: 'Standard Room',
        price: 189,
        originalPrice: 249,
        size: '25 m²',
        beds: '1 Queen bed',
        guests: 2,
        bathrooms: 1,
        features: ['City view', 'Air conditioning', 'Flat-screen TV', 'Private bathroom', 'Mini-fridge', 'Safe'],
        available: 3,
        images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600'],
      },
      {
        id: '2',
        name: 'Deluxe Room',
        price: 259,
        originalPrice: 319,
        size: '35 m²',
        beds: '1 King bed',
        guests: 2,
        bathrooms: 1,
        features: ['City view', 'Air conditioning', 'Flat-screen TV', 'Private bathroom', 'Mini-bar', 'Balcony'],
        available: 2,
        images: ['https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600'],
      },
      {
        id: '3',
        name: 'Executive Suite',
        price: 459,
        originalPrice: 559,
        size: '65 m²',
        beds: '1 King bed + Living area',
        guests: 4,
        bathrooms: 2,
        features: ['Panoramic city view', 'Separate living area', 'Executive lounge access', 'Premium amenities', 'Kitchenette', 'Work desk'],
        available: 1,
        images: ['https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=600'],
      },
    ],
    description: 'Experience luxury in the heart of New York City at Grand Plaza Hotel. Our iconic property offers stunning city views, world-class dining, and unparalleled service. Located just steps from Times Square, Broadway theaters, and major shopping destinations.',
    highlights: [
      'Prime downtown location',
      'Award-winning restaurant',
      'Rooftop pool with city views',
      '24/7 concierge service',
      'Business center',
      'Valet parking available'
    ],
    policies: {
      checkIn: 'Check-in from 15:00',
      checkOut: 'Check-out until 11:00',
      cancellation: 'Free cancellation until 24 hours before arrival',
      pets: 'Pets not allowed',
      smoking: 'Non-smoking property',
      ageRestriction: 'Minimum age for check-in: 18'
    },
    reviews: [
      {
        id: '1',
        author: 'Sarah Johnson',
        rating: 5,
        date: '2024-01-15',
        title: 'Exceptional stay!',
        content: 'The Grand Plaza exceeded all expectations. The room was spacious, clean, and beautifully appointed. The staff was incredibly helpful and the location is perfect for exploring the city.',
        helpful: 12
      },
      {
        id: '2',
        author: 'Michael Chen',
        rating: 4,
        date: '2024-01-10',
        title: 'Great location, excellent service',
        content: 'Fantastic hotel in the heart of downtown. The concierge team went above and beyond to help us with restaurant reservations and show tickets. Only minor complaint is the elevator wait times during peak hours.',
        helpful: 8
      },
      {
        id: '3',
        author: 'Emma Rodriguez',
        rating: 5,
        date: '2024-01-05',
        title: 'Perfect for business travel',
        content: 'Stayed here for a business conference and it was perfect. Fast WiFi, comfortable workspace in the room, and the business center had everything I needed. Will definitely stay again.',
        helpful: 15
      }
    ]
  },
  '2': {
    id: '2',
    name: 'Oceanview Resort',
    location: 'Miami Beach, Florida',
    address: '456 Ocean Drive, Miami Beach, FL 33139',
    phone: '+1 (555) 234-5678',
    email: 'info@oceanviewresort.com',
    rating: 4.3,
    reviewCount: 892,
    price: 299,
    originalPrice: 399,
    checkIn: '16:00',
    checkOut: '11:00',
    images: [
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    amenities: [
      { name: 'Free WiFi', icon: Wifi, available: true },
      { name: 'Beach access', icon: Waves, available: true },
      { name: 'Restaurant', icon: Utensils, available: true },
      { name: 'Swimming pool', icon: Waves, available: true },
      { name: 'Fitness center', icon: Dumbbell, available: true },
      { name: 'Spa', icon: Spa, available: true },
    ],
    rooms: [
      {
        id: '1',
        name: 'Ocean View Room',
        price: 299,
        originalPrice: 399,
        size: '30 m²',
        beds: '1 King bed',
        guests: 2,
        bathrooms: 1,
        features: ['Ocean view', 'Air conditioning', 'Flat-screen TV', 'Private bathroom', 'Mini-bar', 'Balcony'],
        available: 5,
        images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600'],
      },
    ],
    description: 'Relax and unwind at our beautiful oceanfront resort in Miami Beach. Enjoy pristine beaches, world-class amenities, and stunning ocean views from every room.',
    highlights: [
      'Direct beach access',
      'Ocean view from all rooms',
      'Award-winning spa',
      'Multiple dining options',
      'Water sports available'
    ],
    policies: {
      checkIn: 'Check-in from 16:00',
      checkOut: 'Check-out until 11:00',
      cancellation: 'Free cancellation until 48 hours before arrival',
      pets: 'Pets allowed with fee',
      smoking: 'Designated smoking areas',
      ageRestriction: 'Minimum age for check-in: 21'
    },
    reviews: [
      {
        id: '1',
        author: 'Jennifer Smith',
        rating: 5,
        date: '2024-01-20',
        title: 'Perfect beach getaway!',
        content: 'Amazing location right on the beach. The room was beautiful with an incredible ocean view. Staff was friendly and helpful throughout our stay.',
        helpful: 18
      }
    ]
  },
  '3': {
    id: '3',
    name: 'Mountain Lodge Retreat',
    location: 'Aspen, Colorado',
    address: '789 Mountain View Road, Aspen, CO 81611',
    phone: '+1 (555) 345-6789',
    email: 'info@mountainlodge.com',
    rating: 4.7,
    reviewCount: 654,
    price: 459,
    originalPrice: 599,
    checkIn: '15:00',
    checkOut: '12:00',
    images: [
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    amenities: [
      { name: 'Free WiFi', icon: Wifi, available: true },
      { name: 'Ski storage', icon: Car, available: true },
      { name: 'Restaurant', icon: Utensils, available: true },
      { name: 'Hot tub', icon: Waves, available: true },
      { name: 'Fitness center', icon: Dumbbell, available: true },
      { name: 'Spa', icon: Spa, available: true },
    ],
    rooms: [
      {
        id: '1',
        name: 'Mountain View Suite',
        price: 459,
        originalPrice: 599,
        size: '45 m²',
        beds: '1 King bed + Sofa bed',
        guests: 4,
        bathrooms: 2,
        features: ['Mountain view', 'Fireplace', 'Kitchenette', 'Private bathroom', 'Balcony', 'Ski storage'],
        available: 2,
        images: ['https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600'],
      },
    ],
    description: 'Escape to our cozy mountain lodge nestled in the heart of Aspen. Perfect for ski enthusiasts and nature lovers, offering breathtaking mountain views and rustic luxury.',
    highlights: [
      'Ski-in/ski-out access',
      'Mountain views',
      'Cozy fireplace',
      'Rustic luxury design',
      'Close to hiking trails'
    ],
    policies: {
      checkIn: 'Check-in from 15:00',
      checkOut: 'Check-out until 12:00',
      cancellation: 'Free cancellation until 72 hours before arrival',
      pets: 'Pets not allowed',
      smoking: 'Non-smoking property',
      ageRestriction: 'Minimum age for check-in: 18'
    },
    reviews: [
      {
        id: '1',
        author: 'David Wilson',
        rating: 5,
        date: '2024-01-12',
        title: 'Perfect ski vacation!',
        content: 'The lodge exceeded our expectations. Great location for skiing, cozy rooms with amazing mountain views, and excellent service. Will definitely return!',
        helpful: 22
      }
    ]
  }
};

export default function HotelDetail() {
  const params = useParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Get hotel data based on the ID from params
  const hotelData = allHotelsData[params.id as string];

  // If hotel not found, show error
  if (!hotelData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Hotel not found</h1>
            <Button onClick={() => router.push('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to search
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotelData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotelData.images.length) % hotelData.images.length);
  };

  const handleBooking = () => {
    if (selectedRoom) {
      // Navigate to booking page or show booking modal
      console.log('Booking room:', selectedRoom);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to results
        </Button>

        {/* Hotel Header */}
        <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{hotelData.name}</h1>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">{hotelData.address}</span>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                      {hotelData.rating}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">Excellent</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{hotelData.reviewCount} reviews</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="h-4 w-4" />
                    <span>{hotelData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="h-4 w-4" />
                    <span>{hotelData.email}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSaved(!isSaved)}
                  className={`${isSaved ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800' : 'dark:border-gray-600 dark:text-gray-300'}`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
              <div className="relative">
                <img
                  src={hotelData.images[currentImageIndex]}
                  alt={hotelData.name}
                  className="w-full h-96 object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {hotelData.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-white scale-110' : 'bg-white/60 hover:bg-white/80'
                        }`}
                    />
                  ))}
                </div>
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {hotelData.images.length}
                </div>
              </div>
            </Card>

            {/* Tabs for different sections */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 dark:bg-gray-800">
                <TabsTrigger value="overview" className="dark:data-[state=active]:bg-gray-700">Overview</TabsTrigger>
                <TabsTrigger value="amenities" className="dark:data-[state=active]:bg-gray-700">Amenities</TabsTrigger>
                <TabsTrigger value="reviews" className="dark:data-[state=active]:bg-gray-700">Reviews</TabsTrigger>
                <TabsTrigger value="policies" className="dark:data-[state=active]:bg-gray-700">Policies</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">About this hotel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{hotelData.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Highlights</h4>
                        <ul className="space-y-1">
                          {hotelData.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Check-in/Check-out</h4>
                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>Check-in: {hotelData.checkIn}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>Check-out: {hotelData.checkOut}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="amenities" className="space-y-6">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Hotel Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {hotelData.amenities.map((amenity) => {
                        const IconComponent = amenity.icon;
                        return (
                          <div key={amenity.name} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{amenity.name}</span>
                            {amenity.available ? (
                              <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500 ml-auto" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between dark:text-white">
                      <span>Guest Reviews</span>
                      <div className="flex items-center space-x-2">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                          {hotelData.rating}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">({hotelData.reviewCount} reviews)</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {hotelData.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{review.author}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex">
                                  {Array.from({ length: review.rating }).map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">{review.title}</h5>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">{review.content}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <ThumbsUp className="h-4 w-4" />
                            <span>Helpful ({review.helpful})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="policies" className="space-y-6">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Hotel Policies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(hotelData.policies).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">{value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Room Selection */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Choose your room</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {hotelData.rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedRoom === room.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-sm'
                      }`}
                    onClick={() => setSelectedRoom(room.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{room.name}</h3>
                      {room.originalPrice && (
                        <Badge className="bg-red-500 text-white text-xs">
                          -{Math.round(((room.originalPrice - room.price) / room.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <Maximize className="h-3 w-3" />
                        <span>{room.size}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{room.guests} guests</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Bath className="h-3 w-3" />
                        <span>{room.bathrooms} bath</span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <Bed className="h-4 w-4 inline mr-1" />
                      {room.beds}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {room.features.slice(0, 3).map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-300">
                          {feature}
                        </Badge>
                      ))}
                      {room.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-300">
                          +{room.features.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        {room.originalPrice && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            ${room.originalPrice}
                          </div>
                        )}
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          ${room.price}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">per night</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {room.available} left
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">at this price</div>
                      </div>
                    </div>
                  </div>
                ))}

                <Separator className="my-6 dark:bg-gray-700" />

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Free cancellation</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <CreditCard className="h-4 w-4 text-blue-500" />
                    <span>No payment today</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span>Best price guarantee</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#0071C2] hover:bg-[#004A8B] text-white py-3 text-lg font-semibold"
                  disabled={!selectedRoom}
                  onClick={handleBooking}
                >
                  Reserve now
                </Button>

                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                  You can cancel later, so lock in this great price today!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}