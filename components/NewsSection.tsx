 // components/NewsSection.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  urlToImage: string;
  source: {
    name: string;
  };
}

interface NewsSectionProps {
  darkMode: boolean;
}

export default function NewsSection({ darkMode }: NewsSectionProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY; // Make sure to use NEXT_PUBLIC_ prefix

    if (!apiKey) {
      console.error("News API key not found. Check your Vercel environment variables.");
      setError("News API key missing.");
      setIsLoading(false);
      return; // Stop the effect if the key is missing
    }

    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=climate+change&language=en&sortBy=publishedAt&pageSize=9`,
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

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-4xl font-bold mb-8 font-serif">Climate News</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-300 rounded-t-lg mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-4xl font-bold mb-8 font-serif">Climate News</h2>
        <Card className="bg-red-50 dark:bg-red-900">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-200">Error loading news: {error}</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  const visibleArticles = articles.slice(currentIndex, currentIndex + 3);

  return (
    <section className="container mx-auto px-4 mb-12">
      <h2 className="text-4xl font-bold mb-8 font-serif">Climate News</h2>
      <div className="grid gap-12 md:grid-cols-3 relative min-h-[600px]">
        <AnimatePresence mode="wait">
          {visibleArticles.map((article, index) => (
            <motion.div
              key={currentIndex + index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex"
            >
              <Card 
                className={`${
                  darkMode ? 'bg-gray-800 text-white' : 'bg-white'
                } h-full flex flex-col w-full hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <img
                    src={article.urlToImage || '/api/placeholder/400/300'}
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-serif leading-tight line-clamp-2">
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
                <CardContent className="flex-grow">
                  <p className="text-base leading-relaxed line-clamp-3 mb-4 font-sans">
                    {article.description}
                  </p>
                  <a 
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 
                             hover:underline font-medium transition-colors duration-200"
                  >
                    Read full story
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex justify-center mt-8 gap-3">
        {Array.from({ length: Math.ceil(articles.length / 3) }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx * 3)}
            className={`w-3 h-3 rounded-full transition-colors ${
              Math.floor(currentIndex / 3) === idx 
                ? 'bg-blue-600' 
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
