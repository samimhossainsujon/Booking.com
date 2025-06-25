'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Users, Eye, Heart } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { id: 'luxury', name: 'Luxury Hotels', color: 'bg-purple-500' },
  { id: 'budget', name: 'Budget Friendly', color: 'bg-green-500' },
  { id: 'business', name: 'Business Travel', color: 'bg-blue-500' },
  { id: 'family', name: 'Family Resorts', color: 'bg-orange-500' },
  { id: 'romantic', name: 'Romantic Getaways', color: 'bg-pink-500' },
  { id: 'adventure', name: 'Adventure Hotels', color: 'bg-red-500' },
];

const posts = [
  {
    id: '1',
    title: 'Top 10 Luxury Hotels in Dubai for 2024',
    excerpt: 'Discover the most opulent accommodations in the city of gold, featuring world-class amenities and breathtaking views.',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'luxury',
    author: 'Sarah Johnson',
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    views: 2847,
    likes: 156,
    rating: 4.8,
    location: 'Dubai, UAE',
    featured: true,
  },
  {
    id: '2',
    title: 'Budget Travel: Best Hostels in Southeast Asia',
    excerpt: 'Explore amazing budget accommodations across Thailand, Vietnam, and Malaysia without breaking the bank.',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'budget',
    author: 'Mike Chen',
    publishedAt: '2024-01-12',
    readTime: '6 min read',
    views: 1923,
    likes: 89,
    rating: 4.5,
    location: 'Southeast Asia',
    featured: false,
  },
  {
    id: '3',
    title: 'Business Hotels with the Best Meeting Facilities',
    excerpt: 'Find the perfect venue for your next corporate event with state-of-the-art conference rooms and business centers.',
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'business',
    author: 'David Wilson',
    publishedAt: '2024-01-10',
    readTime: '5 min read',
    views: 1456,
    likes: 67,
    rating: 4.6,
    location: 'Global',
    featured: false,
  },
  {
    id: '4',
    title: 'Family-Friendly Resorts with Kids Clubs',
    excerpt: 'Vacation destinations where parents can relax while kids have the time of their lives with supervised activities.',
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'family',
    author: 'Emma Rodriguez',
    publishedAt: '2024-01-08',
    readTime: '7 min read',
    views: 3241,
    likes: 198,
    rating: 4.7,
    location: 'Caribbean',
    featured: true,
  },
  {
    id: '5',
    title: 'Most Romantic Hotels for Couples',
    excerpt: 'Intimate settings perfect for honeymoons, anniversaries, and romantic escapes with your special someone.',
    image: 'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'romantic',
    author: 'Lisa Park',
    publishedAt: '2024-01-05',
    readTime: '9 min read',
    views: 2156,
    likes: 234,
    rating: 4.9,
    location: 'Maldives',
    featured: false,
  },
  {
    id: '6',
    title: 'Adventure Hotels Near National Parks',
    excerpt: 'Stay close to nature with accommodations that offer easy access to hiking, wildlife viewing, and outdoor activities.',
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'adventure',
    author: 'Tom Anderson',
    publishedAt: '2024-01-03',
    readTime: '6 min read',
    views: 1789,
    likes: 112,
    rating: 4.4,
    location: 'USA National Parks',
    featured: false,
  },
];

export default function CategoryPosts() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);

  const filteredPosts = selectedCategory 
    ? posts.filter(post => post.category === selectedCategory)
    : posts;

  const featuredPosts = posts.filter(post => post.featured);

  const toggleSave = (postId: string) => {
    setSavedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Browse by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="dark:border-gray-600 dark:text-gray-300"
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="dark:border-gray-600 dark:text-gray-300"
              >
                <div className={`w-3 h-3 rounded-full ${category.color} mr-2`} />
                {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Posts */}
      {!selectedCategory && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Posts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group dark:bg-gray-800 dark:border-gray-700">
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${categories.find(c => c.id === post.category)?.color} text-white`}>
                      {categories.find(c => c.id === post.category)?.name}
                    </Badge>
                  </div>
                  <button
                    onClick={() => toggleSave(post.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    <Heart className={`h-4 w-4 ${savedPosts.includes(post.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{post.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{post.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{post.author}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Link href={`/post/${post.id}`}>
                      <Button size="sm" className="bg-[#0071C2] hover:bg-[#004A8B]">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Posts Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {selectedCategory 
            ? `${categories.find(c => c.id === selectedCategory)?.name} Posts`
            : 'Latest Posts'
          }
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group dark:bg-gray-800 dark:border-gray-700">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={`${categories.find(c => c.id === post.category)?.color} text-white text-xs`}>
                    {categories.find(c => c.id === post.category)?.name}
                  </Badge>
                </div>
                <button
                  onClick={() => toggleSave(post.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <Heart className={`h-3 w-3 ${savedPosts.includes(post.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{post.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{post.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span>{post.author}</span>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                  <Link href={`/post/${post.id}`}>
                    <Button size="sm" variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                      Read More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}