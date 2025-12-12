import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash, Upload, X, Calendar, MapPin } from '../../components/Icons';

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '', year: '', category: '', location: '', description: '', cover_url: ''
  });
  const [imageFile, setImageFile] = useState(null);

  // --- FETCH PROJECTS ---
  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // --- UPLOAD IMAGE ---
  const handleImageUpload = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('project-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  // --- SUBMIT (CREATE/UPDATE) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let finalCoverUrl = formData.cover_url;

      if (imageFile) {
        finalCoverUrl = await handleImageUpload(imageFile);
      }

      const payload = { ...formData, cover_url: finalCoverUrl };

      if (editingProject) {
        // UPDATE
        const { error } = await supabase.from('projects').update(payload).eq('id', editingProject.id);
        if (error) throw error;
      } else {
        // CREATE
        const { error } = await supabase.from('projects').insert([payload]);
        if (error) throw error;
      }

      setIsModalOpen(false);
      fetchProjects();
    } catch (error) {
      alert('Gagal menyimpan: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // --- DELETE ---
  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus proyek ini? Data tidak bisa dikembalikan.')) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) alert('Gagal menghapus');
      else fetchProjects();
    }
  };

  // Helper Modal
  const openModal = (project = null) => {
    setEditingProject(project);
    setImageFile(null);
    if (project) {
      setFormData({
        title: project.title, year: project.year, category: project.category,
        location: project.location, description: project.description, cover_url: project.cover_url
      });
    } else {
      setFormData({ title: '', year: '', category: '', location: '', description: '', cover_url: '' });
    }
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Proyek</h1>
          <p className="text-slate-500 text-sm">Tambah, edit, atau hapus portofolio proyek.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold shadow-lg shadow-blue-500/30 transition-all"
        >
          <Plus size={20} /> Tambah Proyek
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-500">Memuat data proyek...</div>
        ) : projects.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            Belum ada proyek. Silakan klik tombol Tambah Proyek.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Cover</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Judul & Kategori</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Lokasi</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Tahun</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 w-24">
                      <div className="w-16 h-12 rounded overflow-hidden bg-gray-200">
                        <img src={item.cover_url || 'https://via.placeholder.com/150'} alt="cover" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-slate-800">{item.title}</p>
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded mt-1 inline-block font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1"><MapPin size={14}/> {item.location}</div>
                    </td>
                    <td className="p-4 text-center text-sm font-bold text-slate-700">
                      {item.year}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => openModal(item)} className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors" title="Edit">
                          <Edit size={18}/>
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Hapus">
                          <Trash size={18}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-slate-800">
                {editingProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-1">Nama Proyek</label>
                   <input required type="text" className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                     value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-1">Tahun</label>
                   <input required type="text" className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                     value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="2023" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-1">Kategori</label>
                   <select className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none bg-white" 
                     value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                     <option value="">-- Pilih Kategori --</option>
                     <option value="Hotel & Apartemen">Hotel & Apartemen</option>
                     <option value="Office & Banking">Office & Banking</option>
                     <option value="Commercial Area">Commercial Area</option>
                     <option value="Hospitality">Hospitality</option>
                     <option value="Residential">Residential</option>
                     <option value="Fasad Gedung">Fasad Gedung</option>
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-1">Lokasi</label>
                   <input required type="text" className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                     value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>
              </div>

              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1">Deskripsi Proyek</label>
                 <textarea required rows="4" className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                   value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Gambar Sampul</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors relative group">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-blue-50 rounded-full text-blue-500 group-hover:bg-blue-100 transition-colors">
                      <Upload size={24} />
                    </div>
                    <span className="text-sm font-medium text-slate-600">
                      {imageFile ? imageFile.name : "Klik atau seret gambar ke sini"}
                    </span>
                    <span className="text-xs text-slate-400">JPG, PNG, WEBP (Max 2MB)</span>
                  </div>
                </div>
                
                {/* Image Preview */}
                {(imageFile || formData.cover_url) && (
                   <div className="mt-4 p-2 border border-slate-200 rounded-lg inline-block bg-slate-50">
                     <p className="text-xs text-slate-500 mb-2 font-bold px-1">Preview:</p>
                     <img src={imageFile ? URL.createObjectURL(imageFile) : formData.cover_url} alt="Preview" className="h-32 w-auto object-cover rounded shadow-sm" />
                   </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-bold transition-colors">Batal</button>
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  {uploading ? 'Menyimpan...' : 'Simpan Proyek'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}