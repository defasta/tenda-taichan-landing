import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Flame } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';

const MenuPage = ({ onBack }) => {
  // Kategori sesuai menu baru
  const categories = ["Semua", "Sate Taichan", "Taichan Naga", "Menu Paket", "Tambahan", "Extra Menu", "Minuman"];
  const [activeTab, setActiveTab] = useState("Semua");

  const menuData = [
    // --- SATE TAICHAN (ORIGINAL) ---
    { 
      id: 1, 
      name: "Sate Taichan Tenda", 
      desc: "Mix Paha + Dada dengan Kulit di tengah. Juicy & Gurih!", 
      price: "26.000", 
      category: "Sate Taichan",
      rating: "4.9",
      image: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/2243d2ca-a64d-461c-8a77-f4982a7f2bef_Go-Biz_20241218_170000.jpeg?auto=format"
    },
    { 
      id: 2, 
      name: "Sate Taichan Mix Paha Dada", 
      desc: "5 Tusuk Dada + 5 Tusuk Paha.", 
      price: "26.000", 
      category: "Sate Taichan",
      rating: "4.8",
      image: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/06352623-1330-48db-8b1f-6af27765cad7_Go-Biz_20241218_170334.jpeg?auto=format"
    },
    { 
      id: 3, 
      name: "Sate Taichan Paha", 
      desc: "10 Tusuk Paha Ayam. Tekstur lebih lembut.", 
      price: "26.000", 
      category: "Sate Taichan",
      rating: "4.8",
      image: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/06352623-1330-48db-8b1f-6af27765cad7_Go-Biz_20241218_170334.jpeg?auto=format"
    },
    { 
      id: 4, 
      name: "Sate Taichan Dada", 
      desc: "10 Tusuk Dada Ayam. Full daging, rendah lemak.", 
      price: "26.000", 
      category: "Sate Taichan",
      rating: "4.7",
      image: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/06352623-1330-48db-8b1f-6af27765cad7_Go-Biz_20241218_170334.jpeg?auto=format"
    },

    // --- SATE TAICHAN NAGA (SPESIAL SAMBAL OLES) ---
    { 
      id: 5, 
      name: "Sate Taichan Tenda Naga", 
      desc: "Sate dengan olesan sambal khas tenda (Pedas, Gurih, Manis).", 
      price: "28.500", 
      category: "Taichan Naga",
      rating: "5.0",
      image: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/7344460c-e042-46c6-9aa4-bc81861c8d5c_Go-Biz_20250123_133533.jpeg?auto=format"
    },
    { 
      id: 6, 
      name: "Sate Taichan Mix Naga", 
      desc: "Mix Paha 5 + Dada 5 dengan bumbu Naga spesial.", 
      price: "28.500", 
      category: "Taichan Naga",
      rating: "4.9",
      image: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/7344460c-e042-46c6-9aa4-bc81861c8d5c_Go-Biz_20250123_133533.jpeg?auto=format"
    },
    { 
      id: 7, 
      name: "Sate Kulit Naga (10 Tusuk)", 
      desc: "Kulit ayam kenyal dibakar dengan bumbu Naga.", 
      price: "31.000", 
      category: "Taichan Naga",
      rating: "5.0",
      image: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/748d1c1c-aeb7-4069-8c4c-c019dbc25185_Go-Biz_20250123_134241.jpeg?auto=format"
    },
    { 
      id: 8, 
      name: "Sate Kulit Naga (5 Tusuk)", 
      desc: "Porsi hemat sate kulit bumbu Naga.", 
      price: "16.000", 
      category: "Taichan Naga",
      rating: "4.8",
      image: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/748d1c1c-aeb7-4069-8c4c-c019dbc25185_Go-Biz_20250123_134241.jpeg?auto=format"
    },

    // --- MENU PAKET (NASI) ---
    { 
      id: 9, 
      name: "Paket Tenda (Nasi)", 
      desc: "Sate Tenda (4 Paha + 4 Dada + Kulit) + Nasi Putih.", 
      price: "28.000", 
      category: "Menu Paket",
      rating: "4.9",
      image: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/6a1f79db-548a-4818-b7fc-5e04db053241_Go-Biz_20250123_134619.jpeg?auto=format"
    },
    { 
      id: 10, 
      name: "Paket Mix (Nasi)", 
      desc: "Sate Mix (4 Paha + 4 Dada) + Nasi Putih.", 
      price: "28.000", 
      category: "Menu Paket",
      rating: "4.8",
      image: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/193a0b7e-65ef-4698-846f-3f4d9570969e_Go-Biz_20250123_135151.jpeg?auto=format"
    },

    // --- TAMBAHAN & EXTRA ---
    { 
      id: 11, 
      name: "Nasi Uduk", 
      desc: "Nasi uduk gurih wangi.", 
      price: "6.000", 
      category: "Tambahan",
      rating: "4.7",
      image: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/8b9c4d33-e14e-4955-9412-35b7c2477ce0_Go-Biz_20240810_181900.jpeg?auto=format"
    },
    { 
      id: 12, 
      name: "Dimsum (3 pcs)", 
      desc: "Siomay ayam lembut.", 
      price: "12.500", 
      category: "Extra Menu",
      rating: "4.6",
      image: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/93d158cc-a874-4ea3-8f1b-667134ea1add_Go-Biz_20240810_181147.jpeg?auto=format"
    },
    { 
      id: 13, 
      name: "Udang Keju", 
      desc: "Udang balut tepung isi keju lumer.", 
      price: "12.500", 
      category: "Extra Menu",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&q=80&w=800"
    },

    // --- MINUMAN ---
    { 
      id: 14, 
      name: "Es Teh Kampul", 
      desc: "Teh Tenda + Jeruk Nipis/Lemon (Raspberry Base).", 
      price: "8.500", 
      category: "Minuman",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800"
    },
    { 
      id: 15, 
      name: "Es Pink Panda", 
      desc: "Minuman segar creamy warna pink.", 
      price: "19.000", 
      category: "Minuman",
      rating: "5.0",
      image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&q=80&w=800"
    },
    { 
      id: 16, 
      name: "Mango Yakult", 
      desc: "Segarnya mangga campur Yakult.", 
      price: "14.000", 
      category: "Minuman",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800"
    },
    { 
      id: 17, 
      name: "Fresh Milk Shake Chocolate", 
      desc: "Susu segar di-shake dengan coklat premium.", 
      price: "13.500", 
      category: "Minuman",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800"
    },
    { 
      id: 18, 
      name: "Teh Tenda (Ice/Hot)", 
      desc: "Teh rasa Raspberry khas Tenda Taichan.", 
      price: "7.000", 
      category: "Minuman",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const filteredMenu = activeTab === "Semua" 
    ? menuData 
    : menuData.filter(item => item.category === activeTab);

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-10 font-sans">
      
      {/* 1. Header Sticky */}
      <div className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-white/5 shadow-2xl">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Kiri: Tombol Kembali */}
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-white/70 hover:text-white transition group"
          >
            <div className="bg-zinc-800 p-2 rounded-full group-hover:bg-red-600 transition">
               <ChevronLeft size={20} />
            </div>
            {/* Teks Kembali hanya muncul di Desktop */}
            <span className="hidden md:block text-sm font-medium tracking-wide ml-2">Kembali ke Beranda</span>
          </button>

          {/* Tengah: Judul (Hanya di Mobile) */}
          <div className="md:hidden text-center">
            <h1 className="text-lg font-serif font-bold tracking-wider">TENDA TAICHAN</h1>
          </div>

          {/* Kanan: Tombol GoFood DESKTOP (Baru!) */}
          <a 
            href="https://gofood.link/a/toko-kamu"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-[#00AA13] hover:bg-[#009110] text-white px-6 py-2 rounded-full font-bold text-sm transition-all shadow-lg shadow-green-900/20"
          >
            <ShoppingBag size={18} />
            Order via GoFood
          </a>

          {/* Spacer kosong untuk Mobile biar layout seimbang */}
          <div className="w-10 md:hidden"></div>
        </div>

        {/* Category Scroll */}
        <div className="flex gap-3 overflow-x-auto px-6 pb-4 pt-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border ${
                activeTab === cat 
                ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/50" 
                : "bg-transparent text-gray-400 border-zinc-800 hover:border-gray-500 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Menu Grid Gallery */}
      <div className="px-4 py-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-white/5 flex flex-row md:flex-col h-32 md:h-auto"
            >
              {/* Image Area (Sebelah kiri di HP, Atas di Desktop) */}
              <div className="w-32 md:w-full h-full md:h-56 flex-shrink-0 relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                {/* Badge Rating */}
                <div className="absolute bottom-2 left-2 md:top-3 md:right-3 md:bottom-auto md:left-auto bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                  <Star size={10} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] font-bold text-white">{item.rating}</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-3 md:p-5 flex flex-col justify-center w-full">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm md:text-lg font-bold leading-tight line-clamp-2">
                    {item.name}
                  </h3>
                </div>
                
                <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed line-clamp-2 mb-2">
                  {item.desc}
                </p>
                
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-sm md:text-lg font-mono font-bold text-red-500">
                    {item.price}
                  </span>
                  {item.category.includes("Naga") && (
                    <Flame size={14} className="text-red-600 animate-pulse" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

     {/* 3. Floating Button (HANYA MUNCUL DI MOBILE) */}
      {/* Perhatikan class 'md:hidden' di bawah ini */}
      <div className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
        <a 
          href="https://gofood.link/a/toko-kamu" 
          className="w-full bg-[#00AA13] py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-white shadow-xl shadow-green-900/30 text-sm active:scale-95 transition-transform"
        >
          <ShoppingBag size={18} />
          PESAN DI GOFOOD
        </a>
      </div>
      

    </div>
  );
};

export default MenuPage;