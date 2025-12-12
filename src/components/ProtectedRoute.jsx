import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();

  // 1. Jika masih loading mengecek status user, tampilkan layar kosong/loading
  // Jangan langsung redirect!
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Memuat data...</div>;
  }

  // 2. Jika loading selesai TAPI session kosong (belum login), tendang ke login
  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  // 3. Jika aman, tampilkan halaman admin
  return children;
}