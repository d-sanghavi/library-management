import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  BookOpen, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Download, 
  Bookmark,
  Settings,
  Maximize,
  Minimize
} from 'lucide-react';
import { sampleBooks } from '@/data/books';
import { toast } from 'sonner';

export const Reader = () => {
  const { id } = useParams();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  
  const book = sampleBooks.find(b => b.id === id);

  useEffect(() => {
    // Add fullscreen event listeners
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Book Not Found</h1>
          <p className="text-muted-foreground mb-4">The book you're trying to read doesn't exist.</p>
          <Link to="/catalog">
            <Button>Back to Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!book.isFree || !book.pdfUrl) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Book Not Available</h1>
          <p className="text-muted-foreground mb-4">This book is not available for online reading.</p>
          <Link to={`/book/${book.id}`}>
            <Button>View Book Details</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      toast.error('Fullscreen not supported');
    }
  };

  const handleDownload = () => {
    // In a real app, this would initiate a download of the PDF
    toast.success('Download started');
  };

  const handleBookmark = () => {
    // In a real app, this would save the current page as a bookmark
    toast.success(`Page ${currentPage} bookmarked`);
  };

  return (
    <div className={`min-h-screen bg-background ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Reader Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Book info */}
            <div className="flex items-center space-x-4">
              <Link to={`/book/${book.id}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="font-semibold text-foreground truncate max-w-xs">{book.title}</h1>
                <p className="text-sm text-muted-foreground">by {book.author}</p>
              </div>
            </div>

            {/* Right side - Controls */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleZoomOut} disabled={zoomLevel <= 50}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground min-w-[60px] text-center">
                {zoomLevel}%
              </span>
              <Button variant="ghost" size="sm" onClick={handleZoomIn} disabled={zoomLevel >= 200}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" onClick={handleBookmark}>
                <Bookmark className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" onClick={handleFullscreen}>
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reader Content */}
      <div className="flex-1 bg-muted/30">
        <div className="max-w-5xl mx-auto p-4">
          {/* PDF Viewer Container */}
          <Card className="shadow-elevated min-h-[80vh]">
            <CardContent className="p-0">
              <div 
                className="w-full bg-white rounded-lg overflow-hidden"
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              >
                {/* Simulated PDF Viewer */}
                <div className="bg-white p-8 min-h-[600px] border border-border">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
                    <h2 className="text-xl text-gray-600 mb-8">by {book.author}</h2>
                  </div>
                  
                  {/* Sample content */}
                  <div className="prose prose-lg max-w-none">
                    <p className="text-justify leading-relaxed mb-4">
                      {book.description}
                    </p>
                    
                    <p className="text-justify leading-relaxed mb-4">
                      This is a demonstration of the PDF reader functionality. In a real implementation, 
                      this would display the actual PDF content using a library like PDF.js or react-pdf.
                    </p>
                    
                    <p className="text-justify leading-relaxed mb-4">
                      The reader supports zoom functionality, fullscreen mode, bookmarking, and download 
                      capabilities. Users can navigate through pages and adjust the viewing experience 
                      to their preference.
                    </p>
                    
                    <p className="text-justify leading-relaxed mb-4">
                      Published in {book.publishedYear}, this {book.pages}-page book belongs to the 
                      {book.category} category and can be found on shelf {book.shelf} in our library.
                    </p>

                    <div className="bg-gray-50 p-6 rounded-lg mt-8">
                      <h3 className="text-lg font-semibold mb-2">Chapter 1</h3>
                      <p className="text-justify leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>

                    <p className="text-center mt-8 text-gray-500">
                      Page {currentPage} of {Math.ceil(book.pages / 10)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-4 space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous Page
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {Math.ceil(book.pages / 10)}
            </span>
            <Button 
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(book.pages / 10)))}
              disabled={currentPage === Math.ceil(book.pages / 10)}
            >
              Next Page
            </Button>
          </div>
        </div>
      </div>

      {/* Reading Progress Indicator */}
      <div className="fixed bottom-4 right-4">
        <Card className="shadow-lg">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2 text-sm">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                {Math.round((currentPage / Math.ceil(book.pages / 10)) * 100)}% complete
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};