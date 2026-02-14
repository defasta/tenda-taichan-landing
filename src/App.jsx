import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram, Music2, MapPin, Phone, ShoppingBag, 
  MessageCircle, Utensils, ArrowRight, Loader2 
} from 'lucide-react';

// Import Assets
import bgmain from './assets/bgmain.jpg'; 
import taichansignature from './assets/taichansignature.jpeg';

import { supabase } from './supabaseClient';
import MenuPage from './Menu';
import AdminPage from './Admin';

// Mapping Icon
const ICON_MAP = {
  ShoppingBag: <ShoppingBag size={22} />,
  MessageCircle: <MessageCircle size={22} />,
  Utensils: <Utensils size={22} />,
  MapPin: <MapPin size={22} />,
  Phone: <Phone size={22} />,
  ArrowRight: <ArrowRight size={22} />,
};

const TendaTaichan = () => {
  const [view, setView] = useState('home');
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    fetchHeroContent();
  }, []);

  async function fetchHeroContent() {
    try {
      const { data } = await supabase.from('hero_content').select('*').single();
      if (data) setHeroData(data);
    } catch (err) { console.log(err); } 
  }

  // Logic khusus: Saat kembali dari Menu, cek apakah harus scroll ke promo
  const handleBackToPromo = () => {
    setView('home');
    // Beri jeda sedikit agar halaman 'home' ter-render dulu, baru scroll
    setTimeout(() => {
      const section = document.getElementById('menu');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (view === 'menu') return <MenuPage onBack={handleBackToPromo} />;
  if (view === 'admin') return <AdminPage onBack={() => setView('home')} />;

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen selection:bg-red-600 font-sans">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-6 absolute w-full z-20">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-black tracking-tighter text-white">
          TENDA<span className="text-red-600">TAICHAN.</span>
        </motion.div>
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] font-medium items-center">
          {/* UBAH 1: Menu Utama scroll ke section #menu (Promo) */}
          <a onClick={() => setView('menu')}className="hover:text-red-600 transition">Menu Kami</a>
          
          <a href="#lokasi" className="hover:text-red-600 transition">Lokasi</a>
          <a href='#menu' className="hover:text-red-600 transition text-red-500 font-bold border border-red-600 px-4 py-2 rounded-full hover:bg-red-600 hover:text-white">Pesan Sekarang</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-10" />
          <img src={heroData?.image_url || bgmain} alt="Hero" className="w-full h-full object-cover"/>
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-red-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
            Pedas, Segar, Nagih!
          </motion.span>
          <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-6xl md:text-8xl font-serif font-bold mb-6 italic leading-tight">
            Sate <span className="text-white not-italic">Taichan</span>
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {heroData?.description || "Nikmati sensasi pedas gurih Sate Taichan terbaik."}
          </motion.p>
          
          {/* UBAH 2: Tombol Hero STATIS ke Halaman Menu (Settingan Admin diabaikan di tombol ini) */}
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }}>
            <button 
               onClick={() => setView('menu')}
               className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full font-bold tracking-wide transition shadow-2xl hover:scale-105 shadow-red-600/20"
            >
               LIHAT MENU
            </button>
          </motion.div>
        </div>
      </section>

      {/* FEATURED MENU / PROMO SECTION */}
      <section id="menu" className="py-32 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div className="relative group">
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl"></div>
             <img 
               src={heroData?.featured_image_url || taichansignature} 
               alt="Featured Menu" 
               className="relative z-10 w-full rounded-2xl grayscale-[20%] group-hover:grayscale-0 transition duration-500 shadow-2xl border border-white/10"
             />
          </div>
          
          <div className="space-y-8">
            <h2 className="text-4xl font-serif font-bold leading-tight">
              {heroData?.featured_title_normal || "Daging Ayam Pilihan dengan"} <br/> 
              <span className="text-red-600 text-5xl">
                {heroData?.featured_title_highlight || "Sambal Spesial"}
              </span>.
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              {heroData?.featured_description || "Tenda Taichan menyajikan sate ayam putih..."}
            </p>
            
            <div className="space-y-4 bg-zinc-900/30 p-6 rounded-2xl border border-white/5">
              {heroData?.highlight_list?.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <span className="text-lg md:text-xl font-medium">{item.name}</span>
                  <span className="text-red-500 font-bold text-lg md:text-xl">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4">
               {heroData?.featured_buttons?.map((btn, idx) => (
                   <a 
                     key={idx} href={btn.url} target="_blank" rel="noopener noreferrer"
                     className={`w-full py-4 px-6 rounded-xl font-black flex items-center justify-center gap-3 transition-all duration-300 shadow-lg group ${btn.style === 'green' ? 'bg-[#00AA13] text-white hover:bg-[#009110]' : btn.style === 'outline' ? 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-black' : 'bg-red-600 text-white hover:bg-red-700'}`}
                   >
                     <div className="group-hover:scale-110 transition-transform">{ICON_MAP[btn.icon]}</div>
                     {btn.text}
                   </a>
               ))}
               {heroData?.featured_note && <p className="text-center text-xs text-gray-500 italic mt-2">{heroData.featured_note}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="lokasi" className="bg-[#050505] pt-20 pb-10 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div><h3 className="text-3xl font-serif font-bold text-white mb-2">Tenda Taichan</h3><p className="text-gray-400 max-w-sm">Sate Taichan dengan resep rahasia.</p></div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-300"><MapPin className="text-red-600" size={20} /><span>Jl. Monginsidi No. 32, Salatiga</span></div>
              <div className="flex items-center gap-4 text-gray-300"><Phone className="text-red-600" size={20} /><span>+62 815-997-7168</span></div>
            </div>
            <div className="flex gap-6">
              <a href="https://instagram.com/tendataichan" className="p-3 bg-zinc-900 rounded-full hover:bg-red-600 transition text-white"><Instagram size={24} /></a>
              <a href="https://tiktok.com/@tenda.taichan" className="p-3 bg-zinc-900 rounded-full hover:bg-red-600 transition text-white"><Music2 size={24} /></a>
            </div>
          </div>
          <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 grayscale-[80%] hover:grayscale-0 transition duration-500">
             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7914.543555831854!2d110.4984935!3d-7.3233394999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a79917a53af35%3A0xe1717dab25af9b2!2sTenda%20Taichan!5e0!3m2!1sid!2sid!4v1770916637640!5m2!1sid!2sid" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5 text-center text-gray-600 text-sm flex justify-center gap-2">
           <span>© 2026.</span><button onClick={() => setView('admin')} className="hover:text-red-900 transition flex items-center gap-1"><span className="w-1 h-1 bg-red-900 rounded-full"></span> Dibuat dengan Bangga di Indonesia.</button>
        </div>
      </footer>
    </div>
  );
};

export default TendaTaichan;