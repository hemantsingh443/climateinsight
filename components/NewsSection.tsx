
 // components/NewsSection.tsx

import { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Next Image
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  urlToImage: string | null; // Make urlToImage nullable
  source: {
    name: string;
  };
}

interface NewsSectionProps {
  darkMode: boolean;
}

export default function NewsSection({ darkMode }: NewsSectionProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

    if (!apiKey) {
      console.error("News API key not found. Check your Vercel environment variables.");
      setError("News API key missing.");
      setIsLoading(false);
      return;
    }

    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://newsapi.org/v2/everything?q=climate+change&language=en&sortBy=publishedAt&pageSize=15',
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        setArticles(data.articles);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    if (articles.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex + 3 >= articles.length ? 0 : prevIndex + 3
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [articles.length]);

  // Template literal error fix
  const gradientClass = `text-5xl font-bold mb-8 font-serif text-center ${
    darkMode 
      ? 'bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent' 
      : 'text-black'
  }`;

  const cardClass = (darkMode: boolean) => `${
    darkMode ? 'bg-gray-800 text-white' : 'bg-white'
  } h-full flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:scale-105`;

  const paginationClass = (idx: number, currentIndex: number) => 
    `w-3 h-3 rounded-full transition-all duration-300 ${
      Math.floor(currentIndex / 3) === idx 
        ? 'bg-green-500 scale-125' 
        : 'bg-gray-300 hover:bg-gray-400'
    }`;

  if (isLoading) {
    return (
      <section className="w-full px-4 mb-12">
        <div className="max-w-[1600px] mx-auto">
          <h2 className={gradientClass}>
            Climate News
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-4 mb-12">
        <div className="max-w-[1600px] mx-auto">
          <h2 className={gradientClass}>
            Climate News
          </h2>
          <Card className="bg-red-50 dark:bg-red-900">
            <CardContent className="pt-6">
              <p className="text-red-600 dark:text-red-200">Error loading news: {error}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const visibleArticles = articles.slice(currentIndex, currentIndex + 3);

  return (
    <section className="w-full px-4 mb-12 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <h2 className={gradientClass}>
          Climate News
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {visibleArticles.map((article, index) => (
              <motion.div
                key={currentIndex + index}
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -50, rotate: 5 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: index * 0.2 }}
                className="w-full"
              >
                <Card className={cardClass(darkMode)}>
                  <div className="relative h-52 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={article.urlToImage || '/api/placeholder/400/300'}
                      alt={article.title}
                      fill
                      className="object-cover transform hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <p className="absolute bottom-2 left-2 text-white text-sm font-medium bg-green-500 px-2 py-1 rounded-full">
                      {article.source.name}
                    </p>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-xl font-serif leading-tight line-clamp-2 hover:text-green-500 transition-colors duration-200">
                      {article.title}
                    </CardTitle>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {new Date(article.publishedAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-grow p-4 pt-0">
                    <p className="text-base leading-relaxed line-clamp-3 mb-4 font-sans">
                      {article.description}
                    </p>
                    <a 
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-600 dark:text-green-400 
                               hover:underline font-medium transition-colors duration-200"
                    >
                      Read full story
                      <svg className="w-4 h-4 ml-1 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.ceil(articles.length / 3) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx * 3)}
              className={paginationClass(idx, currentIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
