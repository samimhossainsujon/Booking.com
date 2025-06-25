'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, Wifi, Car, Coffee, Waves, Utensils, Dumbbell, Space as Spa } from 'lucide-react';

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);

  const amenities = [
    { id: 'wifi', label: 'Free WiFi', icon: Wifi },
    { id: 'parking', label: 'Free parking', icon: Car },
    { id: 'breakfast', label: 'Free breakfast', icon: Coffee },
    { id: 'pool', label: 'Swimming pool', icon: Waves },
    { id: 'restaurant', label: 'Restaurant', icon: Utensils },
    { id: 'gym', label: 'Fitness center', icon: Dumbbell },
    { id: 'spa', label: 'Spa', icon: Spa },
  ];

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(id => id !== amenityId));
    }
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      setSelectedRating([...selectedRating, rating]);
    } else {
      setSelectedRating(selectedRating.filter(r => r !== rating));
    }
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-fit sticky top-24 transition-colors dark:border dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filter by</h3>
        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          Clear all
        </Button>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 block">
          Price per night
        </Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={500}
            min={0}
            step={10}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator className="my-6 dark:bg-gray-700" />

      {/* Star Rating */}
      <div className="mb-8">
        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 block">
          Star rating
        </Label>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-3">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRating.includes(rating)}
                onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
              />
              <Label htmlFor={`rating-${rating}`} className="flex items-center space-x-1 cursor-pointer">
                <div className="flex">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{rating} star{rating !== 1 ? 's' : ''}</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-6 dark:bg-gray-700" />

      {/* Amenities */}
      <div className="mb-8">
        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 block">
          Amenities
        </Label>
        <div className="space-y-3">
          {amenities.map((amenity) => {
            const IconComponent = amenity.icon;
            return (
              <div key={amenity.id} className="flex items-center space-x-3">
                <Checkbox
                  id={amenity.id}
                  checked={selectedAmenities.includes(amenity.id)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                />
                <Label htmlFor={amenity.id} className="flex items-center space-x-2 cursor-pointer">
                  <IconComponent className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{amenity.label}</span>
                </Label>
              </div>
            );
          })}
        </div>
      </div>

      <Separator className="my-6 dark:bg-gray-700" />

      {/* Property Type */}
      <div className="mb-8">
        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 block">
          Property type
        </Label>
        <div className="space-y-3">
          {['Hotels', 'Apartments', 'Resorts', 'Villas', 'Hostels', 'Guest houses'].map((type) => (
            <div key={type} className="flex items-center space-x-3">
              <Checkbox id={type.toLowerCase()} />
              <Label htmlFor={type.toLowerCase()} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <Button className="w-full bg-[#0071C2] hover:bg-[#004A8B] text-white">
        Apply filters
      </Button>
    </div>
  );
}