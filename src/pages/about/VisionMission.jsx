import React from 'react';
import { Star, Shield, CheckCircle } from '../../components/Icons';
import { FadeInSection } from '../../components/Animation';

export default function VisionMission() {
  return (
    <div className="pt-20">
      <section className="relative py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <FadeInSection>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Visi & Misi</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">Arah langkah dan nilai-nilai yang kami pegang teguh.</p>
          </FadeInSection>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Visi */}
            <FadeInSection>
              <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-600 h-full transform hover:-translate-y-1 transition-transform duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Star className="text-blue-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Visi Kami</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  "Menjadi perusahaan konstruksi spesialis kaca dan aluminium terdepan di Jawa Tengah, yang dikenal karena integritas, kualitas pengerjaan, dan inovasi berkelanjutan."
                </p>
              </div>
            </FadeInSection>

            {/* Misi */}
            <FadeInSection delay={200}>
              <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-slate-600 h-full transform hover:-translate-y-1 transition-transform duration-300">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <Shield className="text-slate-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Misi Kami</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                    <span className="text-slate-600">Memberikan hasil konstruksi berkualitas tinggi sesuai standar asosiasi APAKSINDO.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                    <span className="text-slate-600">Membangun hubungan jangka panjang dengan klien melalui kepercayaan dan kepuasan.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                    <span className="text-slate-600">Terus berinovasi dalam teknik pemasangan dan penggunaan material modern.</span>
                  </li>
                </ul>
              </div>
            </FadeInSection>
          </div>

          {/* Core Values */}
          <FadeInSection delay={300}>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900">Nilai Inti Perusahaan</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Integritas", desc: "Kami menjunjung tinggi kejujuran dalam setiap transaksi dan pengerjaan proyek." },
                { title: "Kualitas", desc: "Tidak ada kompromi soal bahan dan teknik pemasangan." },
                { title: "Keamanan", desc: "Mengutamakan standar keamanan kerja dan hasil konstruksi yang aman bagi pengguna." }
              ].map((val, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg border border-slate-200 hover:border-blue-400 transition-colors">
                  <h3 className="font-bold text-xl text-blue-900 mb-2">{val.title}</h3>
                  <p className="text-slate-600 text-sm">{val.desc}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}