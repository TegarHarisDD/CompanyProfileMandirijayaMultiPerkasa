import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

// 1. Buat Context
const AuthContext = createContext();

// 2. Buat Provider Component
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // A. Cek sesi aktif saat aplikasi pertama kali dimuat (Refresh page)
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.error('Error checking auth session:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // B. Dengarkan perubahan status auth (Login, Logout, Token Refresh) secara realtime
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    // Cleanup subscription saat component unmount
    return () => subscription.unsubscribe();
  }, []);

  // Fungsi Logout Helper
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    session,
    loading,
    signOut,
    user: session?.user ?? null, // Helper akses user lebih mudah
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render anak hanya jika loading selesai */}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook untuk menggunakan Auth
export const useAuth = () => {
  return useContext(AuthContext);
};