import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useCompany } from '../../context/CompanyContext';
import { Phone, Mail, MapPin, Building } from '../../components/Icons';

export default function ContactManager() {
  const { companyInfo, refreshCompanyInfo } = useCompany();
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', map_url: ''
  });
  const [saving, setSaving] = useState(false);

  // Sync data context ke form state
  useEffect(() => {
    if (companyInfo) {
      setFormData({
        name: companyInfo.name || '',
        phone: companyInfo.phone || '',
        email: companyInfo.email || '',
        address: companyInfo.address || '',
        map_url: companyInfo.map_url || ''
      });
    }
  }, [companyInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('company_info')
        .update(formData)
        .eq('id', companyInfo.id);

      if (error) throw error;

      await refreshCompanyInfo(); // Update data di seluruh aplikasi
      alert('Data kontak berhasil diperbarui!');
    } catch (err) {
      alert('Gagal menyimpan: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Edit Informasi Kontak</h1>
        <p className="text-slate-500 text-sm">Data ini akan tampil di Footer dan Halaman Kontak.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Nama Perusahaan */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Building size={16} className="text-blue-600" /> Nama Perusahaan
            </label>
            <input 
              type="text" required 
              className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Kontak Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Phone size={16} className="text-blue-600" /> Nomor Telepon
              </label>
              <input 
                type="text" required 
                className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Mail size={16} className="text-blue-600" /> Email
              </label>
              <input 
                type="email" required 
                className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <MapPin size={16} className="text-blue-600" /> Alamat Lengkap
            </label>
            <textarea 
              rows="3" required
              className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
            />
          </div>

          {/* Google Maps URL */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Google Maps Embed URL (src iframe)
            </label>
            <input 
              type="text"
              className="w-full border border-slate-300 rounded-lg p-3 text-sm font-mono text-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.map_url}
              onChange={e => setFormData({...formData, map_url: e.target.value})}
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              <strong>Cara mendapatkan:</strong> Buka Google Maps {'>'} Cari lokasi kantor {'>'} Klik tombol "Bagikan" (Share) {'>'} Pilih tab "Sematkan Peta" (Embed a map) {'>'} Salin link yang ada di dalam tanda kutip <code>src="..."</code>.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-blue-500/30"
            >
              {saving ? 'Menyimpan Perubahan...' : 'Simpan Informasi Kontak'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}