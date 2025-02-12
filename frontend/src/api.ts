import axios from 'axios';
import { Book, Borrowing, Analytics } from './types';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const addBook = async (book: Omit<Book, 'id'>) => {
  const response = await api.post('/books/', book);
  return response.data;
};

export const createBorrowing = async (borrowing: Omit<Borrowing, 'id'>) => {
  const response = await api.post('/borrowings/', borrowing);
  return response.data;
};

export const getAnalytics = async (): Promise<Analytics> => {
  const response = await api.get('/analytics/');
  return response.data;
};