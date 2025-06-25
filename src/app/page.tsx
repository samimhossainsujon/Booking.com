'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import HeroSearch from '@/components/HeroSearch';
import FilterSidebar from '@/components/FilterSidebar';
import HotelList from '@/components/HotelList';
import CategoryPosts from '@/components/CategoryPosts';

export default function Home() {
  const [activeView, setActiveView] = useState<'search' | 'categories'>('search');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <HeroSearch />
      
      {/* View Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={() => setActiveView('search')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeView === 'search'
                ? 'bg-[#0071C2] text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Hotel Search
          </button>
          <button
            onClick={() => setActiveView('categories')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeView === 'categories'
                ? 'bg-[#0071C2] text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Browse Categories
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {activeView === 'search' ? (
          <div className="flex gap-8">
            <FilterSidebar />
            <HotelList />
          </div>
        ) : (
          <CategoryPosts />
        )}
      </div>
    </div>
  );
}