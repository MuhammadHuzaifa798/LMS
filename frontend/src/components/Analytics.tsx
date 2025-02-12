import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../api';
import { Analytics as AnalyticsType } from '../types';
import { BarChart, BookMarked, TrendingUp, Library, BookOpen, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (error) {
        toast.error('Failed to load analytics data');
        if (error instanceof Error) {
          console.error('Analytics error:', error.message);
        } else {
          console.error('Analytics error:', String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <Library className="w-5 h-5 text-red-600" />
          <p className="text-red-800">Unable to load analytics data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <TrendingUp className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Library Analytics</h1>
            <p className="text-gray-600">Track your library's performance and trends</p>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 -z-10 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl shadow-sm border border-indigo-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <BookMarked className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Total Books</h2>
              <p className="text-sm text-gray-600">Available in library</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900">{analytics.total_books}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-sm border border-purple-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Total Borrowings</h2>
              <p className="text-sm text-gray-600">Books checked out</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900">{analytics.total_borrowings}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100 lg:col-span-1 md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Active Users</h2>
              <p className="text-sm text-gray-600">This month</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900">{analytics.monthly_borrowings[0]?.count || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Popular Books</h2>
          <div className="space-y-4">
            {analytics.popular_books.map((book, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-indigo-600">{index + 1}</span>
                  </div>
                  <span className="text-gray-800 font-medium">{book.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span className="text-indigo-600 font-semibold">{book.borrow_count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Monthly Trends</h2>
          <div className="space-y-4">
            {analytics.monthly_borrowings.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-800 font-medium">{item.month}</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 bg-indigo-100 rounded-full w-24">
                    <div 
                      className="h-full bg-indigo-600 rounded-full" 
                      style={{ 
                        width: `${(item.count / Math.max(...analytics.monthly_borrowings.map(m => m.count))) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-indigo-600 font-semibold">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}