import React, { useState } from 'react';
import { addBook } from '../api';
import { Book } from '../types';
import toast from 'react-hot-toast';
import { BookPlus, Library, BookOpen, User, Calendar } from 'lucide-react';

export default function AddBook() {
  const [book, setBook] = useState<Omit<Book, 'id'>>({
    title: '',
    author: '',
    isbn: '',
    quantity: 1,
    published_year: new Date().getFullYear(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook(book);
      toast.success('Book added successfully!');
      setBook({
        title: '',
        author: '',
        isbn: '',
        quantity: 1,
        published_year: new Date().getFullYear(),
      });
    } catch (error) {
      toast.error('Failed to add book');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-emerald-100 p-2 rounded-lg">
            <BookPlus className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Book</h1>
            <p className="text-gray-600">Expand your library collection</p>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 -z-10 w-72 h-72 bg-emerald-50 rounded-full blur-3xl opacity-30"></div>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              Title
            </label>
            <input
              type="text"
              required
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="Enter book title"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <User className="w-4 h-4 text-emerald-600" />
              Author
            </label>
            <input
              type="text"
              required
              value={book.author}
              onChange={(e) => setBook({ ...book, author: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="Enter author name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Library className="w-4 h-4 text-emerald-600" />
            ISBN
          </label>
          <input
            type="text"
            required
            value={book.isbn}
            onChange={(e) => setBook({ ...book, isbn: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Enter ISBN number"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              Quantity
            </label>
            <input
              type="number"
              required
              min="1"
              value={book.quantity}
              onChange={(e) => setBook({ ...book, quantity: parseInt(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4 text-emerald-600" />
              Published Year
            </label>
            <input
              type="number"
              required
              min="1800"
              max={new Date().getFullYear()}
              value={book.published_year}
              onChange={(e) => setBook({ ...book, published_year: parseInt(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium rounded-lg shadow-sm hover:from-emerald-700 hover:to-emerald-600 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
        >
          <div className="flex items-center justify-center gap-2">
            <BookPlus className="w-5 h-5" />
            Add Book to Library
          </div>
        </button>
      </form>
    </div>
  );
}