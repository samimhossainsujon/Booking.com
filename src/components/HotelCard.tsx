'use client';

import { Heart, Star, Wifi, Car, Coffee, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import Link from 'next/link';

interface HotelCardProps {
  hotel: {
    id: string;
    name: string;
    location: string;
    image: string;
    rating: number;
    reviewCount: number;
    price: number;
    originalPrice?: number;
    amenities: string[];
    description: string;
    distance: string;
    freeBreakfast?: boolean;
    freeCancellation?: boolean;
  };
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const amenityIcons = {
    'Free WiFi': Wifi,
    'Parking': Car,
    'Restaurant': Coffee,
    'Pool': Waves,
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group dark:border dark:border-gray-700">
      <div className="relative">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <Heart className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
        {hotel.originalPrice && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white">
            -{Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)}%
          </Badge>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <Link href={`/hotel/${hotel.id}`}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer">
              {hotel.name}
            </h3>
          </Link>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold dark:text-white">{hotel.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{hotel.location}</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{hotel.distance}</p>

        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
              {hotel.rating}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">({hotel.reviewCount} reviews)</span>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">{hotel.description}</p>

        {/* Amenities */}
        <div className="flex items-center space-x-4 mb-4">
          {hotel.amenities.slice(0, 4).map((amenity) => {
            const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons];
            return (
              <div key={amenity} className="flex items-center space-x-1">
                {IconComponent && <IconComponent className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
                <span className="text-xs text-gray-600 dark:text-gray-400">{amenity}</span>
              </div>
            );
          })}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.freeBreakfast && (
            <Badge variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-300">Free breakfast</Badge>
          )}
          {hotel.freeCancellation && (
            <Badge variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-300">Free cancellation</Badge>
          )}
        </div>

        {/* Price and Booking */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            {hotel.originalPrice && (
              <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                ${hotel.originalPrice}
              </div>
            )}
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${hotel.price}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">per night</div>
          </div>
          <Link href={`/hotel/${hotel.id}`}>
            <Button className="bg-[#0071C2] hover:bg-[#004A8B] text-white">
              See availability
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}