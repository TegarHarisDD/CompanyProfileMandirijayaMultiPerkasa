import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { FadeInSection } from '../components/Animation';
import { ArrowRight, MapPin, Calendar, ChevronDown, TrendingUp, X, Filter } from '../components/Icons';

export default function Gallery() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // State Filter & Sort
  const [selectedYear, setSelectedYear] = useState('Semua');
  const [sortOrder, setSortOrder] = useState('desc'); 

  // 1. Fetch Data
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setProjects(data);
      if (error) console.error(error);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  // 2. Extract Years
  const availableYears = useMemo(() => {
    if (projects.length === 0) return ['Semua'];
    const years = projects.map(p => p.year);
    return ['Semua', ...new Set(years)].sort().reverse(); 
  }, [projects]);

  // 3. Logic Display
  const displayedProjects = useMemo(() => {
    let filtered = selectedYear === 'Semua' 
      ? projects 
      : projects.filter(project => project.year === selectedYear);

    return [...filtered].sort((a, b) => {
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      return sortOrder === 'desc' ? yearB - yearA : yearA - yearB;
    });
  }, [projects, selectedYear, sortOrder]);

  const handleReset = () => {
    setSelectedYear('Semua');
    setSortOrder('desc');
  };

  const isFiltering = selectedYear !== 'Semua';

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <FadeInSection>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Galeri Proyek</h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Portofolio pengerjaan kami di berbagai sektor, mulai dari gedung bertingkat, perhotelan, hingga area komersial.
            </p>
          </FadeInSection>
        </div>

        {/* Toolbar UI */}
        <FadeInSection delay={100}>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="text-slate-500 font-medium text-sm order-2 md:order-1">
              Menampilkan <span className="text-blue-900 font-bold">{displayedProjects.length}</span> Proyek
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto order-1 md:order-2">
              {/* Filter Tahun */}
              <div className="relative group w-full sm:w-48">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  disabled={loading}
                  className="w-full bg-slate-50 hover:bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 pr-10 py-2.5 outline-none transition-all cursor-pointer font-medium appearance-none"
                >
                  {availableYears.map((year) => (
                    <option key={year} value={year}>{year === 'Semua' ? 'Semua Tahun' : `Tahun ${year}`}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><ChevronDown size={16} className="text-slate-400" /></div>
              </div>

              {/* Sort Order */}
              <div className="relative group w-full sm:w-48">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TrendingUp size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  disabled={loading}
                  className="w-full bg-slate-50 hover:bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 pr-10 py-2.5 outline-none transition-all cursor-pointer font-medium appearance-none"
                >
                  <option value="desc">Terbaru</option>
                  <option value="asc">Terlama</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><ChevronDown size={16} className="text-slate-400" /></div>
              </div>

              {/* Reset Button */}
              {isFiltering && (
                <button onClick={handleReset} className="w-full sm:w-auto px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2 border border-transparent font-medium">
                  <X size={16} /> Reset
                </button>
              )}
            </div>
          </div>
        </FadeInSection>
        
        {/* Grid Projects */}
        {loading ? (
          <div className="text-center py-20">
             <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
             <p className="mt-4 text-slate-500">Memuat galeri...</p>
          </div>
        ) : displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProjects.map((project, index) => (
                <FadeInSection key={project.id} delay={index * 100}>
                  <Link to={`/gallery/${project.id}`} className="group block h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
                    <div className="relative h-64 overflow-hidden bg-gray-200">
                      <img 
                        src={project.cover_url || 'https://via.placeholder.com/400x300?text=No+Image'} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      {project.year && (
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5 border border-slate-100">
                          <Calendar size={12} className="text-blue-600" /> {project.year}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                         <div className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">{project.category}</div>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">{project.title}</h3>
                      <div className="flex items-center gap-2 text-slate-500 text-sm mb-5 line-clamp-1">
                        <MapPin size={14} className="flex-shrink-0" /> {project.location}
                      </div>
                      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                         <span className="text-xs text-slate-400 font-medium">Lihat Detail</span>
                         <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"><ArrowRight size={14} /></div>
                      </div>
                    </div>
                  </Link>
                </FadeInSection>
              ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <h3 className="text-lg font-bold text-slate-700">Tidak ada proyek ditemukan</h3>
            <button onClick={handleReset} className="mt-4 px-6 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">Hapus Filter</button>
          </div>
        )}
      </div>
    </div>
  );
}