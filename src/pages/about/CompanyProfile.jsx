import React from 'react';
import { Link } from 'react-router-dom';
import { Building, CheckCircle, ArrowRight } from '../../components/Icons';
import { FadeInSection } from '../../components/Animation';

export default function CompanyProfile() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <FadeInSection>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Profil Perusahaan</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">Mengenal lebih dekat PT. Mandirijaya Multi Perkasa.</p>
          </FadeInSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start gap-12">
            
            {/* Image Side */}
            <div className="md:w-1/2 sticky top-24">
              <FadeInSection>
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Office Building" 
                    className="w-full h-auto object-cover" 
                  />
                  <div className="absolute bottom-0 left-0 bg-blue-900/90 text-white p-6 backdrop-blur-sm w-full">
                    <p className="font-bold text-xl mb-1">Berbasis di Semarang</p>
                    <p className="text-sm text-blue-200">Melayani Jawa Tengah & Sekitarnya</p>
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Text Side */}
            <div className="md:w-1/2">
              <FadeInSection delay={200}>
                <h2 className="text-3xl font-bold text-slate-900 mb-6 border-l-4 border-blue-600 pl-4">Tentang Kami</h2>
                
                <div className="prose text-slate-600 leading-relaxed space-y-6 text-justify">
                  <p>
                    <strong>PT. MANDIRIJAYA MULTI PERKASA</strong> adalah perusahaan konstruksi yang berspesialisasi dalam pengadaan dan pemasangan kaca serta aluminium. Berdiri dengan komitmen kuat terhadap kualitas, kami telah tumbuh menjadi mitra terpercaya bagi berbagai proyek komersial, residensial, dan fasilitas publik di Kota Semarang dan sekitarnya.
                  </p>
                  <p>
                    Kami memahami bahwa fasad dan interior adalah elemen krusial dari estetika bangunan. Oleh karena itu, kami memadukan keahlian teknis dengan material terbaik untuk menghasilkan karya yang tidak hanya indah dipandang tetapi juga kokoh dan aman.
                  </p>
                </div>

                <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="flex items-center gap-2 font-bold text-xl text-blue-900 mb-4">
                    <CheckCircle className="text-blue-600" /> Legalitas & Sertifikasi
                  </h3>
                  <p className="text-slate-700 mb-4">
                    Kepercayaan klien adalah aset terbesar kami. Perusahaan kami beroperasi secara legal dan profesional:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
                      <span className="text-slate-700">Terdaftar resmi sebagai Badan Hukum (PT).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
                      <span className="text-slate-700">Anggota aktif <strong>APAKSINDO</strong> (Asosiasi Pengusaha Aluminium & Kaca Indonesia).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
                      <span className="text-slate-700">Memiliki Ijin Usaha Jasa Konstruksi (IUJK) yang berlaku.</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <Link to="/contact" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors">
                    Hubungi Tim Kami <ArrowRight size={20} />
                  </Link>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}