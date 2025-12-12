import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Building, // Icon untuk Proyek
  Phone,    // Icon untuk Kontak
  ArrowRight, 
  LayoutDashboard 
} from '../components/Icons';

export default function AdminLayout() {
  const { signOut, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Fungsi Logout
  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  // Helper untuk mengecek menu mana yang aktif
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* --- SIDEBAR (KIRI) --- */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-20 shadow-xl">
        
        {/* Header Sidebar */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard className="text-blue-500" size={24} />
            <h1 className="text-xl font-bold tracking-wide">ADMIN PANEL</h1>
          </div>
          <p className="text-xs text-slate-400">PT. Mandirijaya Multi Perkasa</p>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          
          {/* Menu 1: Manajemen Proyek */}
          <Link 
            to="/admin/projects" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
              isActive('projects') 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Building size={20} /> 
            <span>Manajemen Proyek</span>
          </Link>
          
          {/* Menu 2: Edit Kontak */}
          <Link 
            to="/admin/contact" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
              isActive('contact') 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Phone size={20} /> 
            <span>Edit Kontak & Info</span>
          </Link>

        </nav>

        {/* Footer Sidebar (User Info & Logout) */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/30">
          <div className="mb-4 px-2">
            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Login sebagai:</p>
            <p className="text-sm truncate font-medium text-slate-300" title={session?.user?.email}>
              {session?.user?.email}
            </p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600/10 text-red-400 border border-red-600/20 py-2.5 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-all text-sm font-bold"
          >
            Keluar <ArrowRight size={14} />
          </button>
        </div>
      </aside>

      {/* --- CONTENT AREA (KANAN) --- */}
      {/* ml-64 digunakan untuk memberi ruang agar konten tidak tertutup sidebar yang fixed */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-full w-full">
        {/* Outlet adalah tempat halaman (ProjectManager / ContactManager) dirender */}
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

    </div>
  );
}