import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from '../../components/Icons';
import { FadeInSection } from '../../components/Animation';

export default function GlassService() {
  return (
    <div className="pt-20">
      {/* Hero Service */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           {/* Ganti URL gambar dengan foto proyek kaca yang relevan */}
          <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80" alt="Glass Facade" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <FadeInSection>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Spesialis Pemasangan Kaca</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">Solusi estetika modern dengan presisi tinggi dan keamanan terjamin.</p>
          </FadeInSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Keindahan & Durabilitas</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Kami menyediakan layanan pemasangan kaca komprehensif untuk kebutuhan eksterior dan interior. Menggunakan material kaca tempered dan laminated berkualitas tinggi yang sesuai dengan standar keamanan bangunan.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Tim kami berpengalaman menangani pemasangan di ketinggian (high-rise) maupun interior detail yang membutuhkan ketelitian ekstra.
              </p>
              
              <h3 className="text-xl font-bold text-slate-800 mb-4">Layanan Mencakup:</h3>
              <ul className="space-y-3">
                {['Curtain Wall System', 'Spider Glass System', 'Pintu Kaca Tempered (Frameless/Patch Fitting)', 'Partisi Kaca Kantor', 'Canopy Kaca', 'Railing Balkon Kaca'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle size={18} className="text-blue-600" /> {item}
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors">
                  Hubungi Kami <ArrowRight size={18} />
                </Link>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={200}>
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=60" className="rounded-lg shadow-lg w-full h-64 object-cover" alt="Office Glass" />
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=60" className="rounded-lg shadow-lg w-full h-64 object-cover mt-8" alt="Building Glass" />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>
    </div>
  );
}