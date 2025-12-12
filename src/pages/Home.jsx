import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // Import Supabase
import { ArrowRight, CheckCircle, Star, Shield, Building, Users } from '../components/Icons';
import { FadeInSection } from '../components/Animation';

export default function Home() {
  const [latestProjects, setLatestProjects] = useState([]);

  // Fetch 4 Proyek Terbaru
  useEffect(() => {
    const fetchLatest = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false }) // Urutkan dari yang paling baru
        .limit(4); // Ambil cuma 4
      
      if (data) setLatestProjects(data);
    };
    fetchLatest();
  }, []);

  return (
    <>
      {/* --- 1. HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Glass Building Construction" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/80 to-slate-900/40"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center md:text-left mt-16">
          <FadeInSection>
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm">
              Mitra Konstruksi Terpercaya di Semarang
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Solusi Konstruksi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Kaca & Aluminium
              </span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
              Mewujudkan visi arsitektur Anda dengan standar profesional APAKSINDO. 
              Spesialisasi fasad gedung, interior kantor, dan hunian modern.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                Konsultasi Gratis <ArrowRight size={20} />
              </Link>
              <Link 
                to="/gallery" 
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded hover:bg-white hover:text-blue-900 transition-all flex items-center justify-center"
              >
                Lihat Portfolio
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* --- 2. SERVICES SNAPSHOT --- */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <FadeInSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Layanan Unggulan</h2>
              <p className="text-slate-600">
                Kami menawarkan solusi lengkap mulai dari perencanaan hingga pemasangan untuk kebutuhan komersial dan residensial.
              </p>
            </FadeInSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeInSection delay={0}>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 h-full group">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Building className="text-blue-600 group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Pemasangan Kaca</h3>
                <p className="text-slate-600 mb-6">Instalasi Curtain Wall, Spider Glass, pintu kaca tempered, dan partisi kantor dengan presisi tinggi.</p>
                <Link to="/services/glass" className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1">
                  Selengkapnya <ArrowRight size={16} />
                </Link>
              </div>
            </FadeInSection>
            {/* ... Card Aluminium & General (Sama seperti sebelumnya) ... */}
            <FadeInSection delay={150}>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 h-full group">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Shield className="text-blue-600 group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Konstruksi Aluminium</h3>
                <p className="text-slate-600 mb-6">Pembuatan kusen, jendela, pintu, dan ACP (Aluminium Composite Panel) yang tahan cuaca dan estetis.</p>
                <Link to="/services/aluminium" className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1">
                  Selengkapnya <ArrowRight size={16} />
                </Link>
              </div>
            </FadeInSection>
            <FadeInSection delay={300}>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 h-full group">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Users className="text-blue-600 group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Kontraktor Umum</h3>
                <p className="text-slate-600 mb-6">Mitra sub-kontraktor terpercaya untuk proyek gedung bertingkat, mall, hotel, dan perumahan.</p>
                <Link to="/services/general" className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1">
                  Selengkapnya <ArrowRight size={16} />
                </Link>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* --- 3. ADVANTAGES SECTION --- */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative z-10">
              <FadeInSection>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                  Mengapa Memilih <br/> <span className="text-blue-400">Mandirijaya?</span>
                </h2>
                <p className="text-slate-300 mb-10 text-lg">
                  Kualitas dan kepuasan klien adalah prioritas utama kami.
                </p>
                <div className="space-y-6">
                   {/* Points (Sama seperti sebelumnya) */}
                   <div className="flex items-start gap-4">
                    <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0"><CheckCircle size={24} className="text-white" /></div>
                    <div><h4 className="font-bold text-xl mb-1">Anggota Resmi APAKSINDO</h4><p className="text-slate-400">Kami bekerja sesuai standar asosiasi.</p></div>
                  </div>
                   <div className="flex items-start gap-4">
                    <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0"><Star size={24} className="text-white" /></div>
                    <div><h4 className="font-bold text-xl mb-1">Berpengalaman & Terpercaya</h4><p className="text-slate-400">Track record solid di Indonesia.</p></div>
                  </div>
                </div>
              </FadeInSection>
            </div>
            <div className="lg:w-1/2 w-full">
               <FadeInSection delay={200}>
                 <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Office" className="rounded-lg shadow-2xl border-4 border-slate-700 w-full" />
               </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. FEATURED PROJECTS (DYNAMIC SUPABASE) --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <FadeInSection>
              <h2 className="text-3xl font-bold text-slate-900">Proyek Terbaru</h2>
              <div className="h-1 w-20 bg-blue-600 mt-4 rounded"></div>
            </FadeInSection>
            <FadeInSection delay={100}>
              <Link to="/gallery" className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                Lihat Semua Proyek <ArrowRight size={20} />
              </Link>
            </FadeInSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {latestProjects.length > 0 ? (
               latestProjects.map((project, idx) => (
                 <FadeInSection key={project.id} delay={idx * 100}>
                   <Link to={`/gallery/${project.id}`} className="block relative overflow-hidden rounded-lg shadow-lg aspect-[4/5] cursor-pointer group">
                     <img 
                       src={project.cover_url || 'https://via.placeholder.com/400x500?text=No+Image'} 
                       alt={project.title} 
                       className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                     />
                     <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-white font-bold text-sm truncate">{project.title}</p>
                        <p className="text-blue-200 text-xs">{project.category}</p>
                     </div>
                   </Link>
                 </FadeInSection>
               ))
             ) : (
               <p className="text-slate-500 col-span-4 text-center">Memuat proyek...</p>
             )}
          </div>

          <div className="mt-8 text-center md:hidden">
             <Link to="/gallery" className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                Lihat Semua Proyek <ArrowRight size={20} />
             </Link>
          </div>
        </div>
      </section>

      {/* --- 5. CTA SECTION --- */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Siap Mewujudkan Proyek Anda?</h2>
            <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
              Hubungi kami untuk konsultasi gratis mengenai kebutuhan kaca dan aluminium bangunan Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-white text-blue-900 font-bold rounded shadow-xl hover:bg-slate-100 transition-colors">
                Hubungi Kami Sekarang
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}