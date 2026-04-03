import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight } from './Icons';
import { useCompany } from '../context/CompanyContext'; // Import Context

export default function Footer() {
  const { companyInfo, loading } = useCompany(); // Ambil Data

  // Tahun otomatis
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-300 border-t border-slate-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* 1. Informasi Perusahaan */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide uppercase">
                {companyInfo.name || 'PT. MANDIRIJAYA MULTI PERKASA'}
              </h3>
            </div>
            
            <p className="leading-relaxed text-slate-400 text-sm max-w-sm">
              Mitra konstruksi profesional di Semarang dengan spesialisasi pemasangan kaca, aluminium, dan kontraktor umum terpercaya.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                <span className="text-sm whitespace-pre-line leading-relaxed">
                  {loading ? 'Memuat alamat...' : (companyInfo.address || 'Alamat belum diatur')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-blue-500 flex-shrink-0" size={18} />
                <span className="text-sm font-medium">
                  {loading ? '...' : (companyInfo.phone || 'Telepon belum diatur')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-blue-500 flex-shrink-0" size={18} />
                <span className="text-sm">
                  {loading ? '...' : (companyInfo.email || 'Email belum diatur')}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Navigasi Umum */}
          <div className="lg:pl-10">
            <h4 className="text-lg font-bold text-white mb-6 border-b border-slate-700 pb-2 inline-block">Menu Utama</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-50 group-hover:translate-x-1 transition-transform" /> Beranda
                </Link>
              </li>
              <li>
                <Link to="/about/profile" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-50 group-hover:translate-x-1 transition-transform" /> Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-50 group-hover:translate-x-1 transition-transform" /> Galeri Proyek
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-50 group-hover:translate-x-1 transition-transform" /> Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Layanan Spesialis */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 border-b border-slate-700 pb-2 inline-block">Layanan Spesialis</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/services/glass" className="group flex items-start gap-3 hover:text-white transition-colors">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-blue-300 transition-colors"></div>
                  <span className="text-slate-400 group-hover:text-blue-200">Pemasangan Kaca & Curtain Wall</span>
                </Link>
              </li>
              <li>
                <Link to="/services/aluminium" className="group flex items-start gap-3 hover:text-white transition-colors">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-blue-300 transition-colors"></div>
                  <span className="text-slate-400 group-hover:text-blue-200">Konstruksi Kusen & Jendela Aluminium</span>
                </Link>
              </li>
              <li>
                <Link to="/services/general" className="group flex items-start gap-3 hover:text-white transition-colors">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-blue-300 transition-colors"></div>
                  <span className="text-slate-400 group-hover:text-blue-200">Kontraktor Umum & Renovasi</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-slate-950 py-6 border-t border-slate-900">
        <div className="container mx-auto px-6 text-center text-sm text-slate-500">
          <p>© {currentYear} {companyInfo.name || 'PT. MANDIRIJAYA MULTI PERKASA'}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}