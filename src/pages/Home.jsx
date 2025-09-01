import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookCard } from '@/components/BookCard';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, Clock, Star, Search, ArrowRight } from 'lucide-react';
import { sampleBooks } from '@/data/books';

export const Home = () => {
  const featuredBooks = sampleBooks.slice(0, 4);
  
  const stats = [
    { icon: BookOpen, label: 'Total Books', value: '15,000+', color: 'text-primary' },
    { icon: Users, label: 'Active Members', value: '2,500+', color: 'text-secondary' },
    { icon: Clock, label: 'Books Borrowed', value: '50,000+', color: 'text-green-600' },
    { icon: Star, label: 'Average Rating', value: '4.8/5', color: 'text-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-24 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Welcome to Your
            <span className="block gradient-secondary bg-clip-text text-transparent">
              Digital Library
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Discover thousands of books, manage your reading journey, and explore knowledge 
            from the comfort of your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 transition-bounce hover:scale-105">
                <Search className="mr-2 h-5 w-5" />
                Browse Catalog
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-bounce hover:scale-105">
                Join Library
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-elevated transition-smooth">
                <CardContent className="p-6">
                  <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Books
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our curated selection of popular and recommended books
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/catalog">
              <Button size="lg" variant="outline" className="transition-bounce hover:scale-105">
                View All Books
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Library Features
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need for your reading journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-card hover:shadow-elevated transition-smooth">
              <CardContent className="p-8">
                <BookOpen className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4">Digital Reading</h3>
                <p className="text-muted-foreground">
                  Read books online with our built-in PDF viewer. No downloads needed.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card hover:shadow-elevated transition-smooth">
              <CardContent className="p-8">
                <Clock className="h-16 w-16 text-secondary mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4">Easy Borrowing</h3>
                <p className="text-muted-foreground">
                  Borrow, renew, and return books with just a few clicks. Track due dates effortlessly.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card hover:shadow-elevated transition-smooth">
              <CardContent className="p-8">
                <Search className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4">Smart Search</h3>
                <p className="text-muted-foreground">
                  Find books by title, author, category, or ISBN. Advanced filters available.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};