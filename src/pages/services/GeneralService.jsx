import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight } from '../../components/Icons';
import { FadeInSection } from '../../components/Animation';

export default function GeneralService() {
  return (
    <div className="pt-20">
      <section className="relative py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <FadeInSection>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">General Contractor</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">Mitra strategis untuk proyek skala besar dan menengah.</p>
          </FadeInSection>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
           <div className="max-w-4xl mx-auto">
             <FadeInSection>
               <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Mitra Sub-Kontraktor Terpercaya</h2>
               <p className="text-slate-600 mb-10 text-center text-lg">
                 Kami berpengalaman bekerja sama dengan kontraktor utama (Main Contractor) dalam menangani paket pekerjaan spesialis maupun pengerjaan renovasi komersial secara mandiri.
               </p>

               <div className="grid md:grid-cols-3 gap-6">
                 <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="text-blue-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Gedung Bertingkat</h3>
                    <p className="text-sm text-slate-500">Pengerjaan fasad dan interior untuk perkantoran dan apartemen.</p>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="text-blue-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Komersial & Retail</h3>
                    <p className="text-sm text-slate-500">Renovasi mall, ruko, showroom, dan hotel.</p>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="text-blue-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Manajemen Proyek</h3>
                    <p className="text-sm text-slate-500">Pengawasan ketat terhadap timeline dan budget.</p>
                 </div>
               </div>

               <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-white text-center">
                 <h3 className="text-2xl font-bold mb-4">Mencari Sub-Kontraktor Spesialis?</h3>
                 <p className="mb-6 text-blue-100">Diskusikan kebutuhan proyek Anda bersama tim teknis kami.</p>
                 <Link to="/contact" className="inline-block bg-white text-blue-900 px-8 py-3 rounded font-bold hover:bg-gray-100 transition-colors">
                   Hubungi Kami
                 </Link>
               </div>
             </FadeInSection>
           </div>
        </div>
      </section>
    </div>
  );
}