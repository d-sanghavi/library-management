// Book interface structure:
// {
//   id: string,
//   title: string,
//   author: string,
//   category: string,
//   isbn: string,
//   description: string,
//   coverUrl: string,
//   availability: 'available' | 'borrowed' | 'reserved',
//   shelf: string,
//   publishedYear: number,
//   pages: number,
//   isFree?: boolean,
//   pdfUrl?: string
// }

// Loan interface structure:
// {
//   id: string,
//   bookId: string,
//   userId: string,
//   borrowDate: Date,
//   dueDate: Date,
//   returnDate?: Date,
//   renewalCount: number,
//   fine?: number
// }

// Reservation interface structure:
// {
//   id: string,
//   bookId: string,
//   userId: string,
//   reservationDate: Date,
//   position: number,
//   isActive: boolean
// }

// User interface structure:
// {
//   id: string,
//   name: string,
//   email: string,
//   membershipNumber: string,
//   joinDate: Date,
//   isActive: boolean
// }

// Sample book data
export const sampleBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic Literature",
    isbn: "978-0-7432-7356-5",
    description: "A classic American novel depicting the Jazz Age and the American Dream through the eyes of narrator Nick Carraway.",
    coverUrl: "/images/great-gatsby.jpg",
    availability: "available",
    shelf: "A-12",
    publishedYear: 1925,
    pages: 180,
    isFree: true,
    pdfUrl: "/pdfs/great-gatsby.pdf"
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Classic Literature",
    isbn: "978-0-06-112008-4",
    description: "A gripping tale of racial injustice and childhood innocence in the American South.",
    coverUrl: "/images/mockingbird.jpg",
    availability: "borrowed",
    shelf: "A-15",
    publishedYear: 1960,
    pages: 376
  },
  {
    id: "3",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "Coming of Age",
    isbn: "978-0-316-76948-0",
    description: "The story of teenager Holden Caulfield's experiences in New York City.",
    coverUrl: "/images/catcher-rye.jpg",
    availability: "available",
    shelf: "B-03",
    publishedYear: 1951,
    pages: 234
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Romance",
    isbn: "978-0-14-143951-8",
    description: "A romantic novel of manners written by Jane Austen in 1813.",
    coverUrl: "/images/pride-prejudice.jpg",
    availability: "reserved",
    shelf: "C-07",
    publishedYear: 1813,
    pages: 279
  },
  {
    id: "5",
    title: "1984",
    author: "George Orwell",
    category: "Dystopian Fiction",
    isbn: "978-0-452-28423-4",
    description: "A dystopian social science fiction novel and cautionary tale about totalitarianism.",
    coverUrl: "/images/1984.jpg",
    availability: "available",
    shelf: "D-21",
    publishedYear: 1949,
    pages: 328,
    isFree: true,
    pdfUrl: "/pdfs/1984.pdf"
  },
  {
    id: "6",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    isbn: "978-0-544-00341-5",
    description: "An epic high fantasy novel about the quest to destroy the One Ring.",
    coverUrl: "/images/lotr.jpg",
    availability: "borrowed",
    shelf: "F-12",
    publishedYear: 1954,
    pages: 1216
  }
];

// Sample user data
export const sampleUsers = [
  {
    id: "user1",
    name: "John Doe",
    email: "john.doe@email.com",
    membershipNumber: "LIB001",
    joinDate: new Date("2023-01-15"),
    isActive: true
  }
];

// Sample loans
export const sampleLoans = [
  {
    id: "loan1",
    bookId: "2",
    userId: "user1",
    borrowDate: new Date("2024-01-15"),
    dueDate: new Date("2024-02-15"),
    renewalCount: 0,
    fine: 0
  }
];

// Sample reservations
export const sampleReservations = [
  {
    id: "res1",
    bookId: "4",
    userId: "user1",
    reservationDate: new Date("2024-01-20"),
    position: 1,
    isActive: true
  }
];