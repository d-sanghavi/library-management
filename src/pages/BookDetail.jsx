import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  Calendar, 
  User, 
  MapPin, 
  Hash, 
  FileText, 
  Download,
  ArrowLeft,
  Clock,
  Heart,
  Share2
} from 'lucide-react';
import { sampleBooks } from '@/data/books';
import { toast } from 'sonner';

export const BookDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  
  const book = sampleBooks.find(b => b.id === id);

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Book Not Found</h1>
          <p className="text-muted-foreground mb-4">The book you're looking for doesn't exist.</p>
          <Link to="/catalog">
            <Button>Back to Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleBorrow = async () => {
    if (book.availability !== 'available') {
      toast.error('This book is not available for borrowing');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Book borrowed successfully! Due date: ' + new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString());
    }, 1000);
  };

  const handleReserve = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Book reserved successfully! You are #1 in the queue.');
    }, 1000);
  };

  const handleReadOnline = () => {
    if (book.pdfUrl) {
      // Navigate to reader page
      window.open(`/reader/${book.id}`, '_blank');
    } else {
      toast.error('Online reading not available for this book');
    }
  };

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
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/catalog">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Catalog
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover & Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="shadow-book">
              <CardContent className="p-6">
                {/* Book Cover */}
                <div className="aspect-[3/4] bg-gradient-book rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                  {book.coverUrl ? (
                    <img 
                      src={book.coverUrl} 
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BookOpen className="h-24 w-24 text-muted-foreground/50" />
                  )}
                </div>

                {/* Availability Status */}
                <div className="mb-6">
                  <Badge className={`w-full justify-center py-2 ${getAvailabilityColor(book.availability)}`}>
                    {book.availability.charAt(0).toUpperCase() + book.availability.slice(1)}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {book.availability === 'available' && (
                    <Button 
                      onClick={handleBorrow}
                      disabled={isLoading}
                      className="w-full gradient-primary transition-bounce hover:scale-[1.02]"
                    >
                      {isLoading ? 'Processing...' : 'Borrow Book'}
                    </Button>
                  )}
                  
                  {book.availability !== 'available' && (
                    <Button 
                      onClick={handleReserve}
                      disabled={isLoading}
                      variant="outline"
                      className="w-full"
                    >
                      {isLoading ? 'Processing...' : 'Reserve Book'}
                    </Button>
                  )}

                  {book.isFree && book.pdfUrl && (
                    <Button 
                      onClick={handleReadOnline}
                      variant="secondary"
                      className="w-full"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read Online
                    </Button>
                  )}

                  <div className="flex gap-2">
                    <Button variant="ghost" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="ghost" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Book Information */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">{book.category}</Badge>
                  {book.isFree && (
                    <Badge className="bg-secondary text-secondary-foreground">
                      Free to Read
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {book.title}
                </CardTitle>
                <p className="text-xl text-muted-foreground">
                  by {book.author}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    Description
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {book.description}
                  </p>
                </div>

                <Separator />

                {/* Book Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Book Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Author</p>
                        <p className="font-medium">{book.author}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Published</p>
                        <p className="font-medium">{book.publishedYear}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Hash className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">ISBN</p>
                        <p className="font-medium">{book.isbn}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Shelf Location</p>
                        <p className="font-medium">{book.shelf}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Pages</p>
                        <p className="font-medium">{book.pages}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-medium">{book.category}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Borrowing Information */}
                {book.availability !== 'available' && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Borrowing Information</h3>
                      {book.availability === 'borrowed' && (
                        <p className="text-muted-foreground">
                          This book is currently borrowed. You can reserve it to be notified when it becomes available.
                        </p>
                      )}
                      {book.availability === 'reserved' && (
                        <p className="text-muted-foreground">
                          This book has been reserved. There are currently 2 people in the queue.
                        </p>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};