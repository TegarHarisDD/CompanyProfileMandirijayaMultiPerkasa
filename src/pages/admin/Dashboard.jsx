import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Building, Phone, ArrowRight, LayoutDashboard } from '../../components/Icons';

export default function Dashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Hitung jumlah proyek untuk statistik sederhana
  useEffect(() => {
    const fetchStats = async () => {
      const { count } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true }); // head: true artinya cuma hitung jumlah, tidak ambil data
      
      setProjectCount(count || 0);
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <LayoutDashboard size={28} className="text-blue-600"/> Dashboard Overview
        </h1>
        <p className="text-slate-500 text-sm mt-1">Selamat datang di panel admin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Projects */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <Building size={24} />
            </div>
            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">
              Total
            </span>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">
            {loading ? '...' : projectCount}
          </h3>
          <p className="text-slate-500 text-sm mb-4">Proyek Terdaftar</p>
          <Link to="/admin/projects" className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            Kelola Proyek <ArrowRight size={14} />
          </Link>
        </div>

        {/* Card 2: Contact */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
              <Phone size={24} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">
            Info Kontak
          </h3>
          <p className="text-slate-500 text-sm mb-4">Edit nomor telepon, email, & alamat.</p>
          <Link to="/admin/contact" className="text-green-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            Edit Informasi <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}