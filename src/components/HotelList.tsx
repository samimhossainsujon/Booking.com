'use client';

import { useState } from 'react';
import HotelCard from './HotelCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const sampleHotels = [
  {
    id: '1',
    name: 'Grand Plaza Hotel',
    location: 'Downtown, New York',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    reviewCount: 1247,
    price: 189,
    originalPrice: 249,
    amenities: ['Free WiFi', 'Parking', 'Restaurant', 'Pool'],
    description: 'Luxury hotel in the heart of downtown with stunning city views and world-class amenities.',
    distance: '0.5 km from city center',
    freeBreakfast: true,
    freeCancellation: true,
  },
  {
    id: '2',
    name: 'Seaside Resort & Spa',
    location: 'Beachfront, Miami',
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviewCount: 892,
    price: 324,
    amenities: ['Free WiFi', 'Pool', 'Restaurant'],
    description: 'Beachfront resort with private beach access, spa services, and multiple dining options.',
    distance: '0.1 km from beach',
    freeBreakfast: false,
    freeCancellation: true,
  },
  {
    id: '3',
    name: 'Mountain View Lodge',
    location: 'Aspen, Colorado',
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.3,
    reviewCount: 567,
    price: 156,
    originalPrice: 195,
    amenities: ['Free WiFi', 'Parking', 'Restaurant'],
    description: 'Cozy mountain lodge with breathtaking views and access to hiking trails.',
    distance: '2.1 km from ski resort',
    freeBreakfast: true,
    freeCancellation: false,
  },
  {
    id: '4',
    name: 'Urban Boutique Hotel',
    location: 'SoHo, New York',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviewCount: 734,
    price: 278,
    amenities: ['Free WiFi', 'Restaurant'],
    description: 'Modern boutique hotel with contemporary design and personalized service.',
    distance: '0.8 km from city center',
    freeBreakfast: false,
    freeCancellation: true,
  },
  {
    id: '5',
    name: 'Historic Heritage Inn',
    location: 'Old Town, Boston',
    image: 'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.2,
    reviewCount: 423,
    price: 134,
    amenities: ['Free WiFi', 'Parking'],
    description: 'Historic inn with period charm and modern amenities in the heart of Old Town.',
    distance: '0.3 km from historic district',
    freeBreakfast: true,
    freeCancellation: true,
  },
  {
    id: '6',
    name: 'Luxury Sky Tower',
    location: 'Midtown, Chicago',
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviewCount: 1089,
    price: 456,
    amenities: ['Free WiFi', 'Pool', 'Restaurant'],
    description: 'Premium high-rise hotel with panoramic city views and luxury amenities.',
    distance: '0.2 km from business district',
    freeBreakfast: false,
    freeCancellation: true,
  },
];

export default function HotelList() {
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 5;

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = sampleHotels.slice(indexOfFirstHotel, indexOfLastHotel);
  const totalPages = Math.ceil(sampleHotels.length / hotelsPerPage);

  return (
    <div className="flex-1">
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {sampleHotels.length} properties found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Compare prices from hundreds of travel sites</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Guest Rating</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Hotel Cards */}
      <div className="space-y-6">
        {currentHotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-8">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="dark:border-gray-600 dark:text-gray-300"
        >
          Previous
        </Button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            className={currentPage === page ? 'bg-[#0071C2] hover:bg-[#004A8B]' : 'dark:border-gray-600 dark:text-gray-300'}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="dark:border-gray-600 dark:text-gray-300"
        >
          Next
        </Button>
      </div>
    </div>
  );
}