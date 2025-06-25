'use client';

import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function HeroSearch() {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });

  const handleSearch = () => {
    // Handle search logic here
    console.log('Searching...', { destination, checkIn, checkOut, guests });
  };

  return (
    <div className="bg-gradient-to-br from-[#0071C2] to-[#004A8B] dark:from-[#003580] dark:to-[#002147] text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find your next stay
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Search low prices on hotels, homes and much more...
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 max-w-5xl mx-auto transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Destination */}
            <div className="space-y-2">
              <Label htmlFor="destination" className="text-gray-700 dark:text-gray-300 font-semibold">
                Destination
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="destination"
                  placeholder="Where are you going?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Check-in */}
            <div className="space-y-2">
              <Label htmlFor="checkin" className="text-gray-700 dark:text-gray-300 font-semibold">
                Check-in
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="checkin"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="pl-10 h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="space-y-2">
              <Label htmlFor="checkout" className="text-gray-700 dark:text-gray-300 font-semibold">
                Check-out
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="checkout"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="pl-10 h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300 font-semibold">Guests</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-12 justify-start text-left font-normal border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <Users className="mr-2 h-4 w-4 text-gray-400" />
                    {guests.adults + guests.children} guests, {guests.rooms} room
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 dark:bg-gray-800 dark:border-gray-700">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium dark:text-white">Adults</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuests(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                          className="dark:border-gray-600 dark:text-gray-300"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center dark:text-white">{guests.adults}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuests(prev => ({ ...prev, adults: prev.adults + 1 }))}
                          className="dark:border-gray-600 dark:text-gray-300"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium dark:text-white">Children</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuests(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                          className="dark:border-gray-600 dark:text-gray-300"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center dark:text-white">{guests.children}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuests(prev => ({ ...prev, children: prev.children + 1 }))}
                          className="dark:border-gray-600 dark:text-gray-300"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium dark:text-white">Rooms</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuests(prev => ({ ...prev, rooms: Math.max(1, prev.rooms - 1) }))}
                          className="dark:border-gray-600 dark:text-gray-300"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center dark:text-white">{guests.rooms}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuests(prev => ({ ...prev, rooms: prev.rooms + 1 }))}
                          className="dark:border-gray-600 dark:text-gray-300"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleSearch}
              className="bg-[#0071C2] hover:bg-[#004A8B] text-white px-12 py-3 text-lg font-semibold rounded-md transition-colors"
            >
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}