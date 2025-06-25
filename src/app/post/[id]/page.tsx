'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Heart, 
  Share, 
  Star, 
  MapPin, 
  Clock, 
  Eye, 
  User, 
  Calendar,
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Twitter,
  Facebook,
  Link as LinkIcon
} from 'lucide-react';

const postData = {
  '1': {
    id: '1',
    title: 'Top 10 Luxury Hotels in Dubai for 2024',
    content: `
      <p>Dubai continues to set the standard for luxury hospitality worldwide, and 2024 brings even more spectacular accommodations to this glittering metropolis. From underwater suites to sky-high penthouses, these hotels redefine opulence.</p>
      
      <h2>1. Burj Al Arab Jumeirah</h2>
      <p>The iconic sail-shaped hotel remains the epitome of luxury. With its gold-plated interiors, personal butler service, and helicopter transfers, it's truly a seven-star experience.</p>
      
      <h2>2. Atlantis The Palm</h2>
      <p>This underwater-themed resort offers unique experiences like sleeping with sharks in the Neptune Suite and dining in the world's largest aquarium restaurant.</p>
      
      <h2>3. Four Seasons Resort Dubai at Jumeirah Beach</h2>
      <p>Combining contemporary elegance with traditional Arabian hospitality, this beachfront resort offers unparalleled views of the Persian Gulf.</p>
      
      <h2>4. The Ritz-Carlton, Dubai</h2>
      <p>Located in the heart of DIFC, this hotel seamlessly blends modern luxury with Middle Eastern charm, featuring a stunning rooftop pool and world-class spa.</p>
      
      <h2>5. Armani Hotel Dubai</h2>
      <p>Designed by Giorgio Armani himself, this hotel in the Burj Khalifa offers minimalist luxury with breathtaking city views from the world's tallest building.</p>
      
      <p>Each of these properties offers unique experiences that justify their premium pricing, from private beach access to Michelin-starred dining and world-class spa facilities.</p>
    `,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'luxury',
    author: 'Sarah Johnson',
    authorImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    views: 2847,
    likes: 156,
    rating: 4.8,
    location: 'Dubai, UAE',
    tags: ['luxury', 'dubai', 'hotels', 'travel', 'middle-east'],
    relatedPosts: ['2', '4', '5']
  },
  // Add more post data as needed
};

const categories = [
  { id: 'luxury', name: 'Luxury Hotels', color: 'bg-purple-500' },
  { id: 'budget', name: 'Budget Friendly', color: 'bg-green-500' },
  { id: 'business', name: 'Business Travel', color: 'bg-blue-500' },
  { id: 'family', name: 'Family Resorts', color: 'bg-orange-500' },
  { id: 'romantic', name: 'Romantic Getaways', color: 'bg-pink-500' },
  { id: 'adventure', name: 'Adventure Hotels', color: 'bg-red-500' },
];

// Required function for static export
export async function generateStaticParams() {
  return Object.keys(postData).map((id) => ({
    id: id,
  }));
}

export default function PostDetail() {
  const params = useParams();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const postId = params.id as string;
  const post = postData[postId as keyof typeof postData];

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h1>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go back
          </Button>
        </div>
      </div>
    );
  }

  const category = categories.find(c => c.id === post.category);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to posts
        </Button>

        {/* Hero Image */}
        <div className="relative mb-8 rounded-xl overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center space-x-2 mb-4">
              <Badge className={`${category?.color} text-white`}>
                {category?.name}
              </Badge>
              <div className="flex items-center space-x-1 text-white">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{post.location}</span>
              </div>
              <div className="flex items-center space-x-1 text-white">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{post.rating}</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Meta */}
            <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={post.authorImage}
                      alt={post.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{post.author}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsLiked(!isLiked)}
                      className={`${isLiked ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800' : 'dark:border-gray-600 dark:text-gray-300'}`}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      {post.likes + (isLiked ? 1 : 0)}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsSaved(!isSaved)}
                      className={`${isSaved ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800' : 'dark:border-gray-600 dark:text-gray-300'}`}
                    >
                      <Bookmark className={`h-4 w-4 mr-2 ${isSaved ? 'fill-blue-500 text-blue-500' : ''}`} />
                      {isSaved ? 'Saved' : 'Save'}
                    </Button>
                    <div className="relative">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="dark:border-gray-600 dark:text-gray-300"
                      >
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      {showShareMenu && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-10">
                          <div className="p-2">
                            <button
                              onClick={() => handleShare('twitter')}
                              className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <Twitter className="h-4 w-4 text-blue-400" />
                              <span className="dark:text-gray-300">Share on Twitter</span>
                            </button>
                            <button
                              onClick={() => handleShare('facebook')}
                              className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <Facebook className="h-4 w-4 text-blue-600" />
                              <span className="dark:text-gray-300">Share on Facebook</span>
                            </button>
                            <button
                              onClick={() => handleShare('copy')}
                              className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <LinkIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                              <span className="dark:text-gray-300">Copy link</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Article Content */}
            <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-8">
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Info */}
            <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="text-center">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{post.author}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Travel writer and luxury hotel expert with over 10 years of experience exploring the world's finest accommodations.
                  </p>
                  <Button variant="outline" size="sm" className="w-full dark:border-gray-600 dark:text-gray-300">
                    <User className="h-4 w-4 mr-2" />
                    Follow Author
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Article Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Views</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{post.views}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Likes</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{post.likes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Read time</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Stay Updated</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Get the latest travel tips and hotel reviews delivered to your inbox.
                </p>
                <Button className="w-full bg-[#0071C2] hover:bg-[#004A8B]">
                  Subscribe to Newsletter
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}