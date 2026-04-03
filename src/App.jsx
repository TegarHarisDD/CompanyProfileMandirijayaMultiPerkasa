import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';

// --- LAYOUTS ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './layouts/AdminLayout';

// --- CONTEXT & AUTH ---
import { AuthProvider } from './context/AuthContext';
import { CompanyProvider } from './context/CompanyContext';
import ProtectedRoute from './components/ProtectedRoute';

// --- PUBLIC PAGES ---
import Home from './pages/Home';
// About Pages
import CompanyProfile from './pages/about/CompanyProfile';
import VisionMission from './pages/about/VisionMission';
import History from './pages/about/History';
// Service Pages
import GlassService from './pages/services/GlassService';
import AluminiumService from './pages/services/AluminiumService';
import GeneralService from './pages/services/GeneralService';
// Portfolio & Contact
import Gallery from './pages/Gallery';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';

// --- ADMIN PAGES ---
import Login from './pages/admin/Login';
import ProjectManager from './pages/admin/ProjectManager';
import ContactManager from './pages/admin/ContactManager';

// Komponen: Scroll otomatis ke atas saat pindah halaman
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout: Halaman Publik (User Biasa)
// Menggabungkan Navbar, Konten Halaman (Outlet), dan Footer
const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CompanyProvider>
        <Router>
          <ScrollToTop />
          <div className="font-sans text-slate-800 bg-gray-50 overflow-x-hidden flex flex-col min-h-screen">
            
            <Routes>
              {/* =========================================
                  1. ADMIN ROUTES
                  (Tanpa Navbar/Footer Public, Pakai Sidebar)
                 ========================================= */}
              
              {/* Halaman Login */}
              <Route path="/admin/login" element={<Login />} />

              {/* Area Admin Terproteksi */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                {/* Redirect jika buka /admin atau /admin/dashboard langsung ke projects */}
                <Route index element={<Navigate to="projects" replace />} />
                <Route path="dashboard" element={<Navigate to="projects" replace />} />
                
                {/* Modul Admin */}
                <Route path="projects" element={<ProjectManager />} />
                <Route path="contact" element={<ContactManager />} />
              </Route>


              {/* =========================================
                  2. PUBLIC ROUTES
                  (Pakai Navbar & Footer)
                 ========================================= */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                
                {/* About Routes */}
                <Route path="/about" element={<Navigate to="/about/profile" replace />} />
                <Route path="/about/profile" element={<CompanyProfile />} />
                <Route path="/about/history" element={<History />} />
                <Route path="/about/vision-mission" element={<VisionMission />} />

                {/* Services Routes */}
                <Route path="/services" element={<Navigate to="/services/glass" replace />} />
                <Route path="/services/glass" element={<GlassService />} />
                <Route path="/services/aluminium" element={<AluminiumService />} />
                <Route path="/services/general" element={<GeneralService />} />

                {/* Gallery Routes */}
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/gallery/:id" element={<ProjectDetail />} />

                {/* Contact Route */}
                <Route path="/contact" element={<Contact />} />
              </Route>

              {/* Fallback: Jika URL salah, kembali ke Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
              
            </Routes>

          </div>
        </Router>
      </CompanyProvider>
    </AuthProvider>
  );
}