import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, User, MapPin } from 'lucide-react';

export const BookCard = ({ book }) => {
  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'borrowed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="group hover:shadow-elevated transition-smooth border-border/50 hover:border-primary/20">
      <CardContent className="p-0">
        {/* Book Cover */}
        <div className="relative overflow-hidden rounded-t-lg bg-gradient-book">
          <div className="aspect-[3/4] bg-muted flex items-center justify-center">
            <BookOpen className="h-16 w-16 text-muted-foreground/50" />
          </div>
          
          {/* Availability Badge */}
          <Badge 
            className={`absolute top-2 right-2 ${getAvailabilityColor(book.availability)}`}
          >
            {book.availability}
          </Badge>
          
          {/* Free Badge */}
          {book.isFree && (
            <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
              Free Read
            </Badge>
          )}
        </div>

        {/* Book Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2 text-foreground group-hover:text-primary transition-smooth">
            {book.title}
          </h3>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{book.author}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{book.publishedYear}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Shelf {book.shelf}</span>
            </div>
          </div>

          <div className="mt-3">
            <Badge variant="outline" className="text-xs">
              {book.category}
            </Badge>
          </div>

          {book.description && (
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
              {book.description}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link to={`/book/${book.id}`} className="w-full">
          <Button 
            className="w-full transition-bounce hover:scale-[1.02]" 
            variant={book.availability === 'available' ? 'default' : 'outline'}
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};