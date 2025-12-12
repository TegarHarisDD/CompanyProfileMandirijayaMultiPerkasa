import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from '../../components/Icons';
import { FadeInSection } from '../../components/Animation';

export default function AluminiumService() {
  return (
    <div className="pt-20">
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1621258672535-645391d4e08b?auto=format&fit=crop&w=1920&q=80" alt="Aluminium Construction" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <FadeInSection>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Konstruksi Aluminium</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">Material ringan, kuat, dan tahan cuaca untuk bangunan modern.</p>
          </FadeInSection>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <FadeInSection delay={200}>
               <div className="relative">
                 <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-600 rounded-br-3xl"></div>
                 <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80" className="relative rounded-lg shadow-xl w-full" alt="Aluminium Window" />
               </div>
            </FadeInSection>

            <FadeInSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Solusi Aluminium Terintegrasi</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Aluminium adalah pilihan utama untuk bangunan modern karena sifatnya yang anti-karat, ringan, namun sangat kuat. Kami menyediakan fabrikasi dan instalasi presisi.
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
                <h4 className="font-bold text-lg text-blue-900 mb-2">Mengapa Aluminium?</h4>
                <p className="text-sm text-slate-500">Tahan terhadap perubahan cuaca ekstrem, minim perawatan, dan memberikan tampilan sleek/minimalis pada bangunan.</p>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-4">Produk & Layanan:</h3>
              <ul className="grid grid-cols-1 gap-3">
                {['Kusen Aluminium (3 inch / 4 inch)', 'Jendela (Casement, Sliding, Pivot)', 'Pintu Aluminium (Lipat/Sliding)', 'ACP (Aluminium Composite Panel) untuk Fasad', 'Louver / Kisi-kisi Aluminium'].map((item, i) => (
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
          </div>
        </div>
      </section>
    </div>
  );
}