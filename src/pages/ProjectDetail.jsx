import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowRight, MapPin, Building, Calendar } from '../components/Icons';
import { FadeInSection } from '../components/Animation';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      setLoading(true);
      // Fetch data where ID matches
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        console.error('Project not found:', error);
        navigate('/gallery'); // Redirect if not found
      } else {
        setProject(data);
      }
      setLoading(false);
    };

    if (id) fetchProjectDetail();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-500">Memuat detail proyek...</p>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="pt-20 bg-white min-h-screen">
      
      {/* Header Project */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="mb-6">
            <Link to="/gallery" className="text-blue-300 hover:text-white flex items-center gap-2 text-sm font-semibold transition-colors">
              <ArrowRight size={16} className="rotate-180" /> Kembali ke Galeri
            </Link>
          </div>
          <FadeInSection>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-4 md:gap-6 text-blue-100 mt-6">
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full text-sm border border-slate-700">
                <MapPin size={16} /> {project.location}
              </div>
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full text-sm border border-slate-700">
                <Building size={16} /> {project.category}
              </div>
              {project.year && (
                <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full text-sm border border-slate-700">
                  <Calendar size={16} /> {project.year}
                </div>
              )}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column: Image */}
            <div className="lg:w-2/3">
               <FadeInSection>
                 <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-100">
                   <img 
                     src={project.cover_url || 'https://via.placeholder.com/800x600?text=No+Image'} 
                     alt={project.title} 
                     className="w-full h-auto object-cover" 
                   />
                 </div>
               </FadeInSection>
            </div>

            {/* Right Column: Description */}
            <div className="lg:w-1/3">
              <FadeInSection delay={200}>
                <div className="sticky top-24">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">Tentang Proyek</h2>
                  <div className="prose text-slate-600 leading-relaxed whitespace-pre-line text-justify">
                    {project.description}
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-2">Tertarik membuat proyek serupa?</h3>
                    <p className="text-sm text-slate-500 mb-4">Konsultasikan kebutuhan Anda bersama tim ahli kami.</p>
                    <Link to="/contact" className="inline-flex w-full justify-center items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                      Hubungi Kami <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </FadeInSection>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}