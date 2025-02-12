import React, { useState } from 'react';
import { createBorrowing } from '../api';
import { Borrowing } from '../types';
import toast from 'react-hot-toast';
import { BookOpen, Mail, User, Calendar, Library } from 'lucide-react';

export default function BorrowBook() {
  const [borrowing, setBorrowing] = useState<Omit<Borrowing, 'id'>>({
    book_id: 0,
    borrower_name: '',
    borrower_email: '',
    borrow_date: new Date().toISOString().split('T')[0],
    return_date: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBorrowing(borrowing);
      toast.success('Book borrowed successfully!');
      setBorrowing({
        book_id: 0,
        borrower_name: '',
        borrower_email: '',
        borrow_date: new Date().toISOString().split('T')[0],
        return_date: '',
      });
    } catch (error) {
      toast.error('Failed to borrow book');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-2 rounded-lg">
            <BookOpen className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Borrow a Book</h1>
            <p className="text-gray-600">Check out books from our collection</p>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 -z-10 w-72 h-72 bg-purple-50 rounded-full blur-3xl opacity-30"></div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Library className="w-4 h-4 text-purple-600" />
            Book ID
          </label>
          <input
            type="number"
            required
            min="1"
            value={borrowing.book_id || ''}
            onChange={(e) => setBorrowing({ ...borrowing, book_id: parseInt(e.target.value) })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            placeholder="Enter book ID"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <User className="w-4 h-4 text-purple-600" />
              Borrower Name
            </label>
            <input
              type="text"
              required
              value={borrowing.borrower_name}
              onChange={(e) => setBorrowing({ ...borrowing, borrower_name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Mail className="w-4 h-4 text-purple-600" />
              Borrower Email
            </label>
            <input
              type="email"
              required
              value={borrowing.borrower_email}
              onChange={(e) => setBorrowing({ ...borrowing, borrower_email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4 text-purple-600" />
            Return Date
          </label>
          <input
            type="date"
            required
            min={new Date().toISOString().split('T')[0]}
            value={borrowing.return_date}
            onChange={(e) => setBorrowing({ ...borrowing, return_date: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium rounded-lg shadow-sm hover:from-purple-700 hover:to-purple-600 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
        >
          <div className="flex items-center justify-center gap-2">
            <BookOpen className="w-5 h-5" />
            Borrow Book
          </div>
        </button>
      </form>
    </div>
  );
}