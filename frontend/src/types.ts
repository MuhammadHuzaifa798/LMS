export interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  published_year: number;
}

export interface Borrowing {
  id?: number;
  book_id: number;
  borrower_name: string;
  borrower_email: string;
  borrow_date: string;
  return_date: string;
}

export interface Analytics {
  total_books: number;
  total_borrowings: number;
  popular_books: {
    title: string;
    borrow_count: number;
  }[];
  monthly_borrowings: {
    month: string;
    count: number;
  }[];
}