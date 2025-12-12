import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from './Icons';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // State untuk toggle dropdown di mobile
  const [isServiceOpen, setIsServiceOpen] = useState(true);
  const [isAboutOpen, setIsAboutOpen] = useState(true);

  const location = useLocation();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logic pewarnaan navbar (Transparan saat di Home paling atas, Putih saat scroll/di page lain)
  const isHome = location.pathname === '/';
  const navBackground = scrolled || !isHome ? 'bg-white shadow-md py-3' : 'bg-transparent py-5';
  const textColor = scrolled || !isHome ? 'text-blue-900' : 'text-white';
  const linkColor = scrolled || !isHome ? 'text-slate-700' : 'text-gray-200';
  const logoColor = scrolled || !isHome ? '#1e3a8a' : '#ffffff';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Data Navigasi
  const navLinks = [
    { name: 'Beranda', path: '/', type: 'link' },
    { 
      name: 'Tentang Kami', 
      type: 'dropdown',
      stateKey: 'about',
      children: [
        { name: 'Profil Perusahaan', path: '/about/profile' },
        { name: 'Sejarah Kami', path: '/about/history' },       
        { name: 'Visi & Misi', path: '/about/vision-mission' },
      ]
    },
    { 
      name: 'Layanan', 
      type: 'dropdown',
      stateKey: 'service',
      children: [
        { name: 'Pemasangan Kaca', path: '/services/glass' },
        { name: 'Konstruksi Aluminium', path: '/services/aluminium' },
        { name: 'Kontraktor Umum', path: '/services/general' },
      ]
    },
    { name: 'Galeri', path: '/gallery', type: 'link' },
    { name: 'Kontak', path: '/contact', type: 'link' },
  ];

  // Helper toggle mobile
  const toggleMobileDropdown = (key) => {
    if (key === 'service') setIsServiceOpen(!isServiceOpen);
    if (key === 'about') setIsAboutOpen(!isAboutOpen);
  };

  const getMobileDropdownState = (key) => {
    if (key === 'service') return isServiceOpen;
    if (key === 'about') return isAboutOpen;
    return false;
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBackground}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* --- LOGO & NAMA PERUSAHAAN --- */}
        <Link to="/" className="flex items-center gap-3 group">
          {/* Logo Image */}
          <img 
            src="/logo.png" 
            alt="Logo PT. Mandirijaya Multi Perkasa" 
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105" 
          />
          
          {/* Nama Company */}
          <div className={`flex flex-col ${textColor}`}>
            <span className="font-bold text-sm md:text-lg leading-tight tracking-wide uppercase">
              PT. MANDIRIJAYA MULTI PERKASA
            </span>
          </div>
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => {
            if (link.type === 'dropdown') {
              return (
                <div key={link.name} className="relative group h-full flex items-center">
                  <button 
                    className={`font-medium hover:text-blue-500 transition-colors flex items-center gap-1 py-2 ${linkColor}`}
                  >
                    {link.name} <ChevronDown size={14} />
                  </button>
                  
                  {/* Dropdown Content */}
                  <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 overflow-hidden">
                      {link.children.map((child) => (
                        <Link 
                          key={child.name}
                          to={child.path}
                          className="block px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 text-sm transition-colors border-b border-gray-50 last:border-0"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`font-medium hover:text-blue-500 transition-colors ${linkColor}`}
                >
                  {link.name}
                </Link>
              );
            }
          })}
        </div>

        {/* --- MOBILE MENU BUTTON --- */}
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          {isMenuOpen ? <X size={28} color={logoColor} /> : <Menu size={28} color={logoColor} />}
        </button>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl border-t max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col py-6 px-6 space-y-4">
            {navLinks.map((link) => {
               if (link.type === 'dropdown') {
                 const isOpen = getMobileDropdownState(link.stateKey);
                 return (
                   <div key={link.name} className="border-b border-gray-100 pb-2 last:border-0">
                     <button 
                       onClick={() => toggleMobileDropdown(link.stateKey)}
                       className="flex items-center justify-between w-full text-slate-800 font-bold hover:text-blue-900 py-2"
                     >
                       {link.name} <ChevronDown size={16} className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}/>
                     </button>
                     
                     <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                       <div className="ml-4 space-y-3 border-l-2 border-slate-100 pl-4 py-1">
                         {link.children.map((child) => (
                           <Link 
                             key={child.name}
                             to={child.path}
                             onClick={() => setIsMenuOpen(false)}
                             className="block text-slate-600 text-sm hover:text-blue-600 font-medium"
                           >
                             {child.name}
                           </Link>
                         ))}
                       </div>
                     </div>
                   </div>
                 )
               } else {
                 return (
                   <Link 
                     key={link.name} 
                     to={link.path} 
                     onClick={() => setIsMenuOpen(false)}
                     className="text-slate-800 font-bold hover:text-blue-900 hover:pl-2 transition-all border-b border-gray-100 pb-2 last:border-0 block"
                   >
                     {link.name}
                   </Link>
                 )
               }
            })}
          </div>
        </div>
      )}
    </nav>
  );
}