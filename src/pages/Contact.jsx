import React from 'react';
import { Phone, Mail, MapPin } from '../components/Icons';
import { useCompany } from '../context/CompanyContext'; // Import Context

export default function Contact() {
  const { companyInfo, loading } = useCompany();

  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-12 text-center">Hubungi Kami</h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info Card */}
          <div className="bg-slate-50 p-8 rounded-xl shadow-sm border border-slate-100">
             <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
             <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full"><Phone className="text-blue-600" /></div>
                  <div>
                    <p className="text-sm text-slate-500">Telepon</p>
                    <p className="font-bold text-slate-800">
                      {loading ? 'Memuat...' : companyInfo.phone || '-'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full"><Mail className="text-blue-600" /></div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-bold text-slate-800">
                      {loading ? 'Memuat...' : companyInfo.email || '-'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full"><MapPin className="text-blue-600" /></div>
                  <div>
                    <p className="text-sm text-slate-500">Alamat</p>
                    <p className="font-bold text-slate-800 whitespace-pre-line">
                      {loading ? 'Memuat...' : companyInfo.address || '-'}
                    </p>
                  </div>
                </div>
             </div>
          </div>

          {/* Full Map */}
          <div className="h-96 w-full bg-gray-200 rounded-xl overflow-hidden shadow-lg relative">
             {loading ? (
                <div className="absolute inset-0 flex items-center justify-center text-slate-500">Memuat Peta...</div>
             ) : (
                <iframe 
                  title="Lokasi Kantor"
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  src={companyInfo.map_url || "https://maps.google.com/maps?q=JL.+Gondomono+Raya+Semarang&t=&z=15&ie=UTF8&iwloc=&output=embed"}
                  className="filter grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}