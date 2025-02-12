import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { BookPlus, BookOpen, TrendingUp, Library } from 'lucide-react';
import AddBook from './components/AddBook';
import BorrowBook from './components/BorrowBook';
import Analytics from './components/Analytics';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Library className="w-8 h-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Library System</span>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/add-book"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  <BookPlus className="w-4 h-4 mr-1" />
                  Add Book
                </Link>
                <Link
                  to="/borrow"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  <BookOpen className="w-4 h-4 mr-1" />
                  Borrow
                </Link>
                <Link
                  to="/analytics"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Analytics
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="py-8">
          <Routes>
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/borrow" element={<BorrowBook />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/" element={<AddBook />} />
          </Routes>
        </main>

        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;