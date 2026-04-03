import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

// 1. Buat Context
const CompanyContext = createContext();

// 2. Buat Provider Component
export const CompanyProvider = ({ children }) => {
  // State default dengan placeholder agar tidak error "undefined" saat render awal
  const [companyInfo, setCompanyInfo] = useState({
    name: 'PT. MANDIRIJAYA MULTI PERKASA',
    phone: '',
    email: '',
    address: '',
    map_url: ''
  });
  const [loading, setLoading] = useState(true);

  // Fungsi Fetch Data dari Database
  const fetchCompanyInfo = async () => {
    setLoading(true);
    try {
      // Ambil 1 baris data pertama dari tabel company_info
      const { data, error } = await supabase
        .from('company_info')
        .select('*')
        .limit(1)
        .single();

      if (error) {
        // Jika tabel kosong atau belum dibuat, error ini wajar.
        // Kita biarkan pakai default state di atas.
        console.warn('Gagal mengambil info perusahaan (Mungkin data kosong):', error.message);
      } else if (data) {
        setCompanyInfo(data);
      }
    } catch (err) {
      console.error('Unexpected error fetching company info:', err);
    } finally {
      setLoading(false);
    }
  };

  // Jalankan fetch saat aplikasi dimulai
  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const value = {
    companyInfo,
    loading,
    refreshCompanyInfo: fetchCompanyInfo // Fungsi ini dipakai di Admin Panel setelah Edit Data
  };

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
};

// 3. Custom Hook untuk menggunakan Company Info
export const useCompany = () => {
  return useContext(CompanyContext);
};