'use client';

import { useState } from 'react';
import { Search, Menu, User, Heart, Bell, Plane, Car, MapPin, Camera, CarTaxiFront, Globe, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('stays');
  const { theme, toggleTheme } = useTheme();

  const categories = [
    { id: 'stays', label: 'Stays', icon: Search },
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'car-rentals', label: 'Car rentals', icon: Car },
    { id: 'attractions', label: 'Attractions', icon: Camera },
    { id: 'airport-taxis', label: 'Airport taxis', icon: CarTaxiFront },
  ];

  return (
    <header className="bg-[#0071C2] dark:bg-[#003580] text-white sticky top-0 z-50 shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold cursor-pointer hover:opacity-90 transition-opacity">
              Booking<span className="text-yellow-400">.</span><span className="text-yellow-400">com</span>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleTheme}
              className="text-white hover:text-yellow-400 hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400 hover:bg-blue-700 dark:hover:bg-blue-600 hidden sm:flex">
              <Globe className="h-4 w-4 mr-2" />
              USD
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400 hover:bg-blue-700 dark:hover:bg-blue-600 hidden sm:flex">
              <Heart className="h-4 w-4 mr-2" />
              Saved
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400 hover:bg-blue-700 dark:hover:bg-blue-600 hidden sm:flex">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400 hover:bg-blue-700 dark:hover:bg-blue-600">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Sign in</DropdownMenuItem>
                <DropdownMenuItem>Register</DropdownMenuItem>
                <DropdownMenuItem>Manage account</DropdownMenuItem>
                <DropdownMenuItem>Your bookings</DropdownMenuItem>
                <DropdownMenuItem>Rewards & Wallet</DropdownMenuItem>
                <DropdownMenuItem>Reviews</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Categories */}
        <div className="border-t border-blue-700 dark:border-blue-600">
          <nav className="flex items-center space-x-0 overflow-x-auto scrollbar-hide">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                    activeCategory === category.id
                      ? 'text-white border-white bg-blue-700 dark:bg-blue-600'
                      : 'text-blue-200 border-transparent hover:text-white hover:bg-blue-700 dark:hover:bg-blue-600'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-700 dark:border-blue-600">
            <div className="flex flex-col space-y-2 mb-4">
              <Button 
                variant="ghost" 
                onClick={toggleTheme}
                className="justify-start text-white hover:text-yellow-400 hover:bg-blue-700 dark:hover:bg-blue-600"
              >
                {theme === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                {theme === 'light' ? 'Dark mode' : 'Light mode'}
              </Button>
              <Button variant="ghost" className="justify-start text-white hover:text-yellow-400 hover:bg-blue-700 dark:hover:bg-blue-600">
                <Globe className="h-4 w-4 mr-2" />
                USD
              </Button>
              <Button variant="ghost" className="justify-start text-white hover:text-yellow-400 hover:bg-blue-700 dark:hover:bg-blue-600">
                <Heart className="h-4 w-4 mr-2" />
                Saved
              </Button>
              <Button variant="ghost" className="justify-start text-white hover:text-yellow-400 hover:bg-blue-700 dark:hover:bg-blue-600">
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </Button>
            </div>
            <nav className="grid grid-cols-2 gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? 'text-white bg-blue-700 dark:bg-blue-600'
                        : 'text-blue-200 hover:text-white hover:bg-blue-700 dark:hover:bg-blue-600'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}