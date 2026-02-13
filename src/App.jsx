import React, { useState } from 'react';
import bgmain from './assets/bgmain.jpg';
import taichansignature from './assets/taichansignature.jpeg';
import { Instagram, Music2, MapPin, Phone, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import MenuPage from './Menu';

const TendaTaichan = () => {
  
  const [showMenu, setShowMenu] = useState(false);

  
  if (showMenu) {
    return <MenuPage onBack={() => setShowMenu(false)} />;
  }

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen selection:bg-red-600 font-sans">
      
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 absolute w-full z-20">
        <div className="text-2xl font-black tracking-tighter text-white">
          TENDA<span className="text-red-600">TAICHAN.</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] font-medium">
          <a href="#menu" className="hover:text-red-600 transition">Menu Utama</a>
          <a href="#lokasi" className="hover:text-red-600 transition">Lokasi</a>
          <a href="https://wa.me/628159977168?text=Halo%20Tenda%20Taichan,%20saya%20mau%20pesan%20untuk%20diambil%20jam%20..." className="hover:text-red-600 transition text-red-500 font-bold">Pesan Sekarang</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0a0a0a] z-10" />
          {/* Ganti URL image dengan foto Sate Taichan andalanmu */}
<img 
  src={bgmain} 
  alt="Sate Taichan Juara" 
  className="w-full h-full object-cover"
/>
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-red-600 font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            Pedas, Segar, Nagih!.
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl font-serif font-bold mb-6 italic"
          >
            Sate <span className="text-white not-italic">Taichan</span>
          </motion.h1>
  <motion.button 
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowMenu(true)} 
            className="bg-red-600 text-white px-10 py-4 rounded-full font-bold tracking-wide hover:bg-red-700 transition shadow-2xl shadow-red-600/20"
          >
            LIHAT MENU
          </motion.button>
        </div>
      </section>

      {/* Featured Menu / Promotion */}
      <section id="menu" className="py-32 px-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl"></div>
             
             <img 
                src={taichansignature} 
               alt="Taichan Signature" 
               className="relative z-10 w-full rounded-2xl grayscale-[20%] hover:grayscale-0 transition duration-500"
             />
          </div>
          
          <div className="space-y-8">
            <h2 className="text-4xl font-serif font-bold leading-tight">
              Daging Ayam Pilihan <br/> dengan <span className="text-red-600 text-5xl">Sambal Spesial</span> Juara.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Tenda Taichan menyajikan sate ayam putih tanpa bumbu kacang, dibakar sempurna hingga juicy, dan disajikan dengan perasan jeruk nipis serta sambal pedas yang bikin nagih.
            </p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-xl font-medium">Taichan Tenda Naga</span>
                <span className="text-red-500 font-bold text-xl">Rp 28.500</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-xl font-medium">Taichan Kulit Naga</span>
                <span className="text-red-500 font-bold text-xl">Rp 16.000</span>
              </div>
            </div>

<div className="space-y-4">
  {/* Opsi 1: GoFood (Warna Hijau) */}
  <a 
    href="https://gofood.link/a/toko-kamu" // Ganti link GoFood kamu
    target="_blank" 
    rel="noopener noreferrer"
    className="w-full bg-[#00AA13] text-white py-4 px-6 rounded-xl font-black flex items-center justify-center gap-3 
               hover:bg-[#009110] transition-all duration-300 shadow-lg shadow-green-900/20 group"
  >
    <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" /> 
    SIKAT PEDASNYA DI GOFOOD
  </a>

  {/* Opsi 2: Pre-Order/Pick-up (Warna Border/Transparan yang Elegan) */}
  <a 
    href="https://wa.me/628159977168?text=Halo%20Tenda%20Taichan,%20saya%20mau%20pesan%20untuk%20diambil%20jam%20..." 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-full bg-transparent border-2 border-white text-white py-4 px-6 rounded-xl font-black flex items-center justify-center gap-3 
               hover:bg-white hover:text-black transition-all duration-300"
  >
    <Phone size={22} /> 
    PESAN DULU, SAMPAI TINGGAL MAKAN
  </a>
  <p className="text-center text-xs text-gray-500 italic">
    *Opsi kedua cocok untuk kamu yang mau makan di tempat tanpa antre.
  </p>
</div>
          </div>
        </div>
      </section>

      {/* Footer / Location */}
<footer id="lokasi" className="bg-[#050505] pt-20 pb-10 px-6 border-t border-white/5">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
    
    {/* Kolom Kiri: Info & Sosmed */}
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-serif font-bold text-white mb-2">Tenda Taichan</h3>
        <p className="text-gray-400 max-w-sm">
          Sate Taichan dengan resep rahasia, dibakar dengan cinta, disajikan dengan pedas yang membara.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 text-gray-300">
          <MapPin className="text-red-600" size={20} />
          <span>Jl. Monginsidi No. 32, Kec. Sidorejo, Salatiga</span>
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <Phone className="text-red-600" size={20} />
          <span>+62 815-997-7168</span>
        </div>
      </div>

{/* Logo Sosmed */}
<div className="flex gap-6">
  {/* Link Instagram */}
  <a 
    href="https://instagram.com/tendataichan" 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-3 bg-zinc-900 rounded-full hover:bg-red-600 transition-all duration-300 text-white"
  >
    <Instagram size={24} />
  </a>

  {/* Link TikTok */}
  <a 
    href="https://tiktok.com/@tenda.taichan" 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-3 bg-zinc-900 rounded-full hover:bg-red-600 transition-all duration-300 text-white"
  >
    <Music2 size={24} />
  </a>
</div>
    </div>

    {/* Kolom Kanan: Google Maps Mini */}
    <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 grayscale-[80%] hover:grayscale-0 transition-all duration-500">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7914.543555831854!2d110.4984935!3d-7.3233394999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a79917a53af35%3A0xe1717dab25af9b2!2sTenda%20Taichan!5e0!3m2!1sid!2sid!4v1770916637640!5m2!1sid!2sid" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      
    </div>
  </div>

  <div className="mt-20 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
    &copy; {new Date().getFullYear()} Tenda Taichan. Dibuat dengan Bangga di Indonesia.
  </div>
</footer>
    </div>
  );
};

export default TendaTaichan;