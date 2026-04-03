import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, TrendingUp, Building, CheckCircle, ArrowRight } from '../../components/Icons';
import { FadeInSection } from '../../components/Animation';

export default function History() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <FadeInSection>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Perjalanan Kami</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Dedikasi lebih dari 25 tahun dalam industri kaca dan aluminium di Jawa Tengah.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Garis Vertikal Tengah (Background) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-100 transform -translate-x-1/2 hidden md:block"></div>

        <div className="container mx-auto px-6 relative z-10">
          
          {/* Milestone 1: 1996 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-20">
            <div className="md:w-1/2 md:text-right order-2 md:order-1">
              <FadeInSection>
                <div className="inline-block p-3 bg-blue-50 rounded-full mb-4 md:hidden">
                   <Calendar className="text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-blue-900 mb-2">Tahun 1996</h3>
                <h4 className="text-xl font-semibold text-slate-800 mb-4">Awal Berdiri</h4>
                <p className="text-slate-600 leading-relaxed">
                  <strong>PT. MANDIRIJAYA MULTI PERKASA</strong> resmi berdiri. 
                  Pada awal perjalanannya, kami bergerak fokus dalam bidang penyaluran (distributor) produk kaca lembaran merk <strong>Asahimas</strong>.
                </p>
                <p className="text-slate-600 mt-2">
                  Kami menyalurkan produk berkualitas ini ke toko-toko kaca di seluruh wilayah Jawa Tengah, membangun jaringan distribusi yang kuat dan terpercaya.
                </p>
              </FadeInSection>
            </div>
            
            {/* Dot Tengah */}
            <div className="hidden md:flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full border-4 border-white shadow-xl z-10 order-1 md:order-2 shrink-0">
               <Calendar className="text-white" size={20} />
            </div>

            <div className="md:w-1/2 order-3">
               {/* Spacer untuk desktop agar seimbang */}
            </div>
          </div>

          {/* Milestone 2: 2003 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-20">
            <div className="md:w-1/2 order-3 md:order-1">
               {/* Spacer */}
            </div>

            {/* Dot Tengah */}
            <div className="hidden md:flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full border-4 border-white shadow-xl z-10 order-1 md:order-2 shrink-0">
               <TrendingUp className="text-white" size={20} />
            </div>

            <div className="md:w-1/2 order-2 md:order-3">
              <FadeInSection delay={200}>
                <div className="inline-block p-3 bg-blue-50 rounded-full mb-4 md:hidden">
                   <TrendingUp className="text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-blue-900 mb-2">Tahun 2003</h3>
                <h4 className="text-xl font-semibold text-slate-800 mb-4">Ekspansi & Transformasi</h4>
                <p className="text-slate-600 leading-relaxed">
                  Seiring perkembangan waktu dan kebutuhan pasar yang semakin kompleks, kami melakukan langkah strategis untuk melebarkan usaha.
                </p>
                <p className="text-slate-600 mt-2">
                  PT. MANDIRIJAYA MULTI PERKASA bertransformasi menjadi spesialis <strong>pemasangan / aplikator Kaca dan Aluminium</strong>. Kami mulai menangani proyek konstruksi secara langsung dengan tim teknis yang ahli.
                </p>
              </FadeInSection>
            </div>
          </div>

          {/* Milestone 3: Saat Ini */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="md:w-1/2 md:text-right order-2 md:order-1">
              <FadeInSection delay={400}>
                 <div className="inline-block p-3 bg-blue-50 rounded-full mb-4 md:hidden">
                   <Building className="text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-blue-900 mb-2">Masa Kini</h3>
                <h4 className="text-xl font-semibold text-slate-800 mb-4">Mitra Konstruksi Terpercaya</h4>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Kini, kami dikenal sebagai salah satu kontraktor spesialis kaca dan aluminium terdepan. Didukung oleh legalitas perusahaan yang lengkap dan keanggotaan aktif asosiasi.
                </p>
                <ul className="inline-block text-left space-y-2">
                   <li className="flex items-center gap-2 text-slate-700 font-medium">
                     <CheckCircle size={16} className="text-blue-600"/> Pengerjaan High-Rise Building
                   </li>
                   <li className="flex items-center gap-2 text-slate-700 font-medium">
                     <CheckCircle size={16} className="text-blue-600"/> Proyek Komersial & Residensial
                   </li>
                </ul>
              </FadeInSection>
            </div>

            {/* Dot Tengah */}
            <div className="hidden md:flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full border-4 border-white shadow-xl z-10 order-1 md:order-2 shrink-0">
               <Building className="text-white" size={20} />
            </div>

            <div className="md:w-1/2 order-3">
               {/* Spacer */}
            </div>
          </div>

        </div>
      </section>

      {/* CTA to Gallery (Sesuai request "Daftar Proyek-proyek") */}
      <section className="py-16 bg-blue-50 border-t border-blue-100">
        <div className="container mx-auto px-6 text-center">
          <FadeInSection>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Bukti Kualitas Kami</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8">
              Lihat daftar proyek-proyek yang telah dan sedang kami kerjakan sebagai bukti komitmen kami terhadap kualitas.
            </p>
            <Link to="/gallery" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30">
              Lihat Daftar Proyek <ArrowRight size={20} />
            </Link>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}