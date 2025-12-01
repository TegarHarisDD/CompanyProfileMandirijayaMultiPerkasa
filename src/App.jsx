  import React, { useState, useEffect, useRef } from 'react';

  // --- Icons (Inline SVGs to avoid 'lucide-react' dependency errors) ---

  const IconWrapper = ({ children, size = 24, color = "currentColor", className = "" }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {children}
    </svg>
  );

  const Menu = (props) => (
    <IconWrapper {...props}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </IconWrapper>
  );

  const X = (props) => (
    <IconWrapper {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </IconWrapper>
  );

  const Phone = (props) => (
    <IconWrapper {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </IconWrapper>
  );

  const Mail = (props) => (
    <IconWrapper {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </IconWrapper>
  );

  const MapPin = (props) => (
    <IconWrapper {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </IconWrapper>
  );

  const Building = (props) => (
    <IconWrapper {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="9" y1="22" x2="9" y2="22" />
      <line x1="15" y1="22" x2="15" y2="22" />
      <line x1="12" y1="22" x2="12" y2="22" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="8" y1="10" x2="8" y2="10" />
      <line x1="8" y1="14" x2="8" y2="14" />
      <line x1="8" y1="18" x2="8" y2="18" />
      <line x1="16" y1="10" x2="16" y2="10" />
      <line x1="16" y1="14" x2="16" y2="14" />
      <line x1="16" y1="18" x2="16" y2="18" />
    </IconWrapper>
  );

  const CheckCircle = (props) => (
    <IconWrapper {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </IconWrapper>
  );

  const ArrowRight = (props) => (
    <IconWrapper {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </IconWrapper>
  );

  const Shield = (props) => (
    <IconWrapper {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </IconWrapper>
  );

  const Star = (props) => (
    <IconWrapper {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </IconWrapper>
  );

  const Users = (props) => (
    <IconWrapper {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </IconWrapper>
  );

  // --- Components & Helpers ---

  // Hook untuk animasi scroll reveal sederhana
  const useOnScreen = (ref, rootMargin = "0px") => {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        { rootMargin, threshold: 0.1 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }, [ref, rootMargin]);
    return isIntersecting;
  };

  // Komponen Pembungkus Animasi
  const FadeInSection = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const isVisible = useOnScreen(ref);

    return (
      <div
        ref={ref}
        className={`transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  };

  export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle Navbar Scroll Effect
    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
      { name: 'Beranda', href: '#home' },
      { name: 'Tentang Kami', href: '#about' },
      { name: 'Layanan', href: '#services' },
      { name: 'Keunggulan', href: '#advantages' },
      { name: 'Galeri', href: '#gallery' },
      { name: 'Kontak', href: '#contact' },
    ];

    return (
      <div className="font-sans text-slate-800 bg-gray-50 overflow-x-hidden">
        
        {/* --- NAVIGATION --- */}
        <nav 
          className={`fixed w-full z-50 transition-all duration-300 ${
            scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
          }`}
        >
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-900 text-white p-2 rounded font-bold text-xl"><img src="/logo.png" alt="Logo PT. Mandirijaya Multi Perkasa" className="h-8 w-auto" /></div>
              <span className={`font-bold text-lg md:text-xl tracking-wide ${scrolled ? 'text-blue-900' : 'text-white'}`}>
                PT. MANDIRIJAYA MULTI PERKASA
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`font-medium hover:text-blue-500 transition-colors ${scrolled ? 'text-slate-700' : 'text-gray-200'}`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden text-blue-600 focus:outline-none">
              {isMenuOpen ? <X size={28} color={scrolled ? '#1e3a8a' : '#ffffff'} /> : <Menu size={28} color={scrolled ? '#1e3a8a' : '#ffffff'} />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl border-t">
              <div className="flex flex-col py-4 px-6 space-y-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-slate-700 font-medium hover:text-blue-900 hover:pl-2 transition-all"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* --- HERO SECTION --- */}
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
              alt="Glass Building Construction" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-slate-900/70"></div>
          </div>

          <div className="relative z-10 container mx-auto px-6 text-center md:text-left">
            <FadeInSection>
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-4 border border-blue-400/30">
                Mitra Pembangunan Terpercaya
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Solusi Konstruksi <br />
                <span className="text-blue-400">Kaca & Aluminium</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl">
                Melayani dengan profesionalitas tinggi dan standar asosiasi APAKSINDO. 
                Mewujudkan visi arsitektur Anda dengan kualitas terbaik di Semarang.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                <a href="#contact" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2">
                  Hubungi Kami <ArrowRight size={20} />
                </a>
                <a href="#services" className="px-8 py-3 bg-transparent border border-white text-white font-semibold rounded hover:bg-white hover:text-blue-900 transition-colors flex items-center justify-center">
                  Layanan Kami
                </a>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 relative">
                <FadeInSection>
                  <div className="relative rounded-lg overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Construction Site" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-blue-900 text-white p-6 opacity-90">
                      <p className="font-bold text-2xl">APAKSINDO</p>
                      <p className="text-sm">Anggota Asosiasi Resmi</p>
                    </div>
                  </div>
                  {/* Decorative dots */}
                  <div className="absolute -z-10 top-[-20px] left-[-20px] text-blue-100">
                    <svg width="100" height="100" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                  </div>
                </FadeInSection>
              </div>

              <div className="md:w-1/2">
                <FadeInSection delay={200}>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 border-l-4 border-blue-600 pl-4">
                    Tentang Perusahaan
                  </h2>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    <strong>PT. MANDIRIJAYA MULTI PERKASA</strong> adalah mitra pembangunan yang reliable yang berbasis di Kota Semarang. 
                    Kami aktif dalam eksekusi proyek konstruksi dengan spesialisasi utama pada pengerjaan pemasangan kaca dan aluminium.
                  </p>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Kami memiliki ijin kegiatan resmi dan merupakan anggota aktif <strong>Asosiasi APAKSINDO</strong>. 
                    Dengan track record yang solid, kami berkomitmen untuk menghadirkan pelayanan berkualitas tinggi demi memberikan hasil terbaik dalam setiap proyek yang kami tangani.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-blue-600 flex-shrink-0" size={24} />
                      <div>
                        <h4 className="font-bold text-slate-800">Berizin Resmi</h4>
                        <p className="text-sm text-slate-500">Legalitas terjamin</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-blue-600 flex-shrink-0" size={24} />
                      <div>
                        <h4 className="font-bold text-slate-800">Profesional</h4>
                        <p className="text-sm text-slate-500">Standar tinggi</p>
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              </div>
            </div>
          </div>
        </section>

        {/* --- VISION & MISSION --- */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <FadeInSection>
                <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors h-full">
                  <div className="bg-blue-600 w-12 h-12 rounded flex items-center justify-center mb-6">
                    <Star className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Visi Kami</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Menjadi perusahaan konstruksi spesialis kaca dan aluminium terdepan di Indonesia, khususnya di Semarang, yang dikenal karena integritas, kualitas, dan inovasi dalam setiap pembangunan.
                  </p>
                </div>
              </FadeInSection>

              <FadeInSection delay={200}>
                <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors h-full">
                  <div className="bg-blue-600 w-12 h-12 rounded flex items-center justify-center mb-6">
                    <Shield className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Misi Kami</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      Memberikan hasil konstruksi berkualitas tinggi sesuai standar APAKSINDO.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      Membangun hubungan jangka panjang dengan klien melalui kepercayaan dan kepuasan.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      Terus berinovasi dalam teknik pemasangan dan penggunaan material modern.
                    </li>
                  </ul>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* --- SERVICES SECTION --- */}
        <section id="services" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <FadeInSection>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Layanan Kami</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto rounded"></div>
                <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                  Kami menyediakan solusi komprehensif untuk kebutuhan konstruksi bangunan Anda.
                </p>
              </FadeInSection>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <FadeInSection delay={0}>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-b-4 border-transparent hover:border-blue-600 group">
                  <div className="mb-6 p-4 bg-blue-50 rounded-full inline-block group-hover:bg-blue-600 transition-colors">
                    <Building className="text-blue-600 group-hover:text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">Pemasangan Kaca</h3>
                  <p className="text-slate-600">
                    Spesialisasi dalam instalasi kaca gedung, partisi kantor, pintu kaca, dan fasad bangunan dengan presisi tinggi dan material terbaik.
                  </p>
                </div>
              </FadeInSection>

              {/* Service 2 */}
              <FadeInSection delay={100}>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-b-4 border-transparent hover:border-blue-600 group">
                  <div className="mb-6 p-4 bg-blue-50 rounded-full inline-block group-hover:bg-blue-600 transition-colors">
                    <Shield className="text-blue-600 group-hover:text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">Konstruksi Aluminium</h3>
                  <p className="text-slate-600">
                    Pengerjaan kusen, jendela, pintu, dan kerangka aluminium untuk kebutuhan residensial maupun komersial yang tahan lama.
                  </p>
                </div>
              </FadeInSection>

              {/* Service 3 */}
              <FadeInSection delay={200}>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-b-4 border-transparent hover:border-blue-600 group">
                  <div className="mb-6 p-4 bg-blue-50 rounded-full inline-block group-hover:bg-blue-600 transition-colors">
                    <Users className="text-blue-600 group-hover:text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">Mitra Pembangunan</h3>
                  <p className="text-slate-600">
                    Melayani sebagai kontraktor terpercaya untuk berbagai skala proyek pembangunan di Kota Semarang dan sekitarnya.
                  </p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* --- ADVANTAGES (Why Us) --- */}
        <section id="advantages" className="py-20 relative bg-blue-900 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                  <FadeInSection>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Mengapa Memilih Kami?</h2>
                    <p className="text-blue-100 mb-8 text-lg">
                      Komitmen kami adalah kepuasan Anda. Berikut adalah nilai lebih yang kami tawarkan:
                    </p>
                    
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 bg-blue-800/50 p-4 rounded-lg backdrop-blur-sm">
                        <div className="bg-white text-blue-900 rounded-full p-2">
                          <CheckCircle size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">Anggota APAKSINDO</h4>
                          <p className="text-sm text-blue-200">Terdaftar dan mengikuti standar asosiasi.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 bg-blue-800/50 p-4 rounded-lg backdrop-blur-sm">
                        <div className="bg-white text-blue-900 rounded-full p-2">
                          <Star size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">Track Record Solid</h4>
                          <p className="text-sm text-blue-200">Berpengalaman menangani berbagai proyek di Semarang.</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 bg-blue-800/50 p-4 rounded-lg backdrop-blur-sm">
                        <div className="bg-white text-blue-900 rounded-full p-2">
                          <Shield size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">Material Berkualitas</h4>
                          <p className="text-sm text-blue-200">Hanya menggunakan bahan kaca & aluminium terbaik.</p>
                        </div>
                      </div>
                    </div>
                  </FadeInSection>
              </div>
            </div>
          </div>
        </section>

        {/* --- GALLERY --- */}
        <section id="gallery" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <FadeInSection>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Galeri Proyek</h2>
                <p className="text-slate-500">Contoh hasil pengerjaan dan proyek kami</p>
              </FadeInSection>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "/galeri/Tentrem Park.jpeg",
                  "/galeri/Bank BCA MT. Haryono.jpeg",
                  "/galeri/Plaza Piaza Graha Padma.jpeg",
                  "/galeri/Hotel Moxy Solo.jpeg",
                ].map((src, index) => (
                  <FadeInSection key={index} delay={index * 100}>
                    <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                      <img src={src} alt={`Project ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  </FadeInSection>
                ))}
            </div>
          </div>
        </section>

        {/* --- CONTACT & FOOTER --- */}
        <footer id="contact" className="bg-slate-900 text-gray-300">
          <div className="container mx-auto px-6 py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              
              {/* Info */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-4">PT. MANDIRIJAYA MULTI PERKASA</h3>
                <p className="leading-relaxed text-sm">
                  Mitra pembangunan yang reliable di Kota Semarang. Solusi terbaik untuk kebutuhan kaca dan aluminium Anda.
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <Phone className="text-blue-500" size={18} />
                  <span>024-86041802</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-blue-500" size={18} />
                  <span>mandirijayasmg@yahoo.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                  <span>JL. Gondomono Raya No. 20H Semarang, Jawa Tengah, Indonesia</span>
                </div>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-lg font-bold text-white mb-6">Navigasi Cepat</h4>
                <ul className="space-y-2">
                  <li><a href="#home" className="hover:text-blue-400 transition-colors">Beranda</a></li>
                  <li><a href="#about" className="hover:text-blue-400 transition-colors">Tentang Kami</a></li>
                  <li><a href="#services" className="hover:text-blue-400 transition-colors">Layanan</a></li>
                  <li><a href="#gallery" className="hover:text-blue-400 transition-colors">Galeri</a></li>
                </ul>
              </div>

              {/* Map Embed */}
              <div className="w-full h-64 bg-slate-800 rounded-lg overflow-hidden">
                <iframe 
                  title="Lokasi Perusahaan"
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src="https://maps.google.com/maps?q=JL.+Gondomono+Raya+Semarang&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="filter grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-slate-800 py-6 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} PT. MANDIRIJAYA MULTI PERKASA. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    );
  }