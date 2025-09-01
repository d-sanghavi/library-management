import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  DollarSign, 
  RotateCcw, 
  Eye,
  AlertCircle,
  CheckCircle2,
  User,
  Mail,
  CreditCard
} from 'lucide-react';
import { sampleBooks, sampleLoans, sampleReservations, sampleUsers } from '@/data/books';
import { toast } from 'sonner';

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock user data - in real app this would come from auth context
  const currentUser = sampleUsers[0];
  
  // Get current loans for the user
  const userLoans = sampleLoans.filter(loan => loan.userId === currentUser.id && !loan.returnDate);
  const loanedBooks = userLoans.map(loan => ({
    loan,
    book: sampleBooks.find(book => book.id === loan.bookId)
  })).filter(item => item.book);

  // Get current reservations
  const userReservations = sampleReservations.filter(res => res.userId === currentUser.id && res.isActive);
  const reservedBooks = userReservations.map(reservation => ({
    reservation,
    book: sampleBooks.find(book => book.id === reservation.bookId)
  })).filter(item => item.book);

  // Mock fine data
  const fines = [
    { id: '1', bookTitle: 'The Great Gatsby', amount: 2.50, status: 'paid', date: new Date('2024-01-10') },
    { id: '2', bookTitle: '1984', amount: 1.00, status: 'pending', date: new Date('2024-01-05') }
  ];

  const handleRenewBook = async (loanId) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Book renewed successfully! New due date extended by 14 days.');
    }, 1000);
  };

  const handleReturnBook = async (loanId) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Book returned successfully!');
    }, 1000);
  };

  const handleCancelReservation = async (reservationId) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Reservation cancelled successfully!');
    }, 1000);
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueBadgeColor = (daysUntilDue) => {
    if (daysUntilDue < 0) return 'bg-red-100 text-red-800 border-red-200';
    if (daysUntilDue <= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center">
            <User className="h-10 w-10 text-primary mr-4" />
            My Library Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Welcome back, {currentUser.name}! Manage your books and account.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{loanedBooks.length}</div>
              <div className="text-sm text-muted-foreground">Borrowed Books</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{reservedBooks.length}</div>
              <div className="text-sm text-muted-foreground">Reservations</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-12 w-12 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                ${fines.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0).toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Outstanding Fines</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <Calendar className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {currentUser.membershipNumber}
              </div>
              <div className="text-sm text-muted-foreground">Member ID</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Loans */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                Current Loans ({loanedBooks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loanedBooks.length > 0 ? (
                <div className="space-y-4">
                  {loanedBooks.map(({ loan, book }) => {
                    const daysUntilDue = getDaysUntilDue(loan.dueDate);
                    return (
                      <div key={loan.id} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-foreground">{book.title}</h4>
                            <p className="text-sm text-muted-foreground">by {book.author}</p>
                          </div>
                          <Badge className={getDueBadgeColor(daysUntilDue)}>
                            {daysUntilDue < 0 
                              ? `${Math.abs(daysUntilDue)} days overdue`
                              : daysUntilDue === 0 
                                ? 'Due today'
                                : `${daysUntilDue} days left`
                            }
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground mb-3">
                          <p>Borrowed: {loan.borrowDate.toLocaleDateString()}</p>
                          <p>Due: {loan.dueDate.toLocaleDateString()}</p>
                          <p>Renewals: {loan.renewalCount}/3</p>
                        </div>

                        <div className="flex gap-2">
                          {loan.renewalCount < 3 && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRenewBook(loan.id)}
                              disabled={isLoading}
                            >
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Renew
                            </Button>
                          )}
                          <Button
                            size="sm"
                            onClick={() => handleReturnBook(loan.id)}
                            disabled={isLoading}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Return
                          </Button>
                          <Link to={`/book/${book.id}`}>
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">You don't have any borrowed books</p>
                  <Link to="/catalog">
                    <Button>Browse Catalog</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reservations */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Reservations ({reservedBooks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reservedBooks.length > 0 ? (
                <div className="space-y-4">
                  {reservedBooks.map(({ reservation, book }) => (
                    <div key={reservation.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{book.title}</h4>
                          <p className="text-sm text-muted-foreground">by {book.author}</p>
                        </div>
                        <Badge variant="outline">
                          Position #{reservation.position}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-3">
                        <p>Reserved: {reservation.reservationDate.toLocaleDateString()}</p>
                        <p>Status: Waiting for availability</p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCancelReservation(reservation.id)}
                          disabled={isLoading}
                        >
                          Cancel Reservation
                        </Button>
                        <Link to={`/book/${book.id}`}>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">You don't have any reservations</p>
                  <Link to="/catalog">
                    <Button>Browse Books</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Fine History */}
        <Card className="shadow-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-primary" />
              Fine History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {fines.length > 0 ? (
              <div className="space-y-3">
                {fines.map((fine) => (
                  <div key={fine.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center space-x-3">
                      {fine.status === 'pending' ? (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                      <div>
                        <p className="font-medium text-foreground">{fine.bookTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          {fine.date.toLocaleDateString()} • Late return fee
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">${fine.amount.toFixed(2)}</p>
                      <Badge variant={fine.status === 'pending' ? 'destructive' : 'default'}>
                        {fine.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <p className="text-muted-foreground">No fines! You're up to date with all returns.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="shadow-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{currentUser.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="font-medium">{currentUser.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Membership Number</p>
                    <p className="font-medium">{currentUser.membershipNumber}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">{currentUser.joinDate.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};