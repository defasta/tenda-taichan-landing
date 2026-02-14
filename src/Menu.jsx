import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { ArrowLeft, Star, Flame, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const MenuPage = ({ onBack }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  useEffect(() => {
    fetchMenu();
  }, []);

  async function fetchMenu() {
    try {
      const { data, error } = await supabase.from('menu').select('*').order('id', { ascending: true });
      if (error) throw error;
      setMenuItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Filter Kategori
  const categories = ['Semua', ...new Set(menuItems.map(item => item.category))];
  const filteredItems = selectedCategory === 'Semua' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-red-600">
      
      {/* HEADER MENU PAGE */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">

          <div className="text-xl font-black tracking-tighter">
            TENDA<span className="text-red-600">TAICHAN.</span>
          </div>

          <button 
            onClick={onBack} 
            className="p-2 bg-zinc-900 rounded-full hover:bg-red-600 transition text-white border border-white/10"
            title="Ke Menu Unggulan"
          >
            <Home size={20} />
          </button>
        </div>

        {/* Categories Scroll */}
        <div className="max-w-6xl mx-auto mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 
                ${selectedCategory === cat 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                  : 'bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full"></div></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-red-600/50 transition-all duration-300 group"
              >
                {/* Image */}
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={item.image_url || 'https://via.placeholder.com/400x300'} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold border border-white/10">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" /> {item.rating}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold font-serif leading-tight">{item.name}</h3>
                  </div>
                  
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10">
                    {item.desc_text || "Menu favorit dengan rasa otentik yang bikin nagih."}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-white/10 h-12">
                    <span className="text-lg font-bold text-red-500">{item.price}</span>
                    
                    {/* BAGIAN UBAHAN: GANTI BUTTON DENGAN BADGE PEDAS */}
                    {item.is_spicy ? (
                       <span className="flex items-center gap-1.5 bg-red-900/20 border border-red-500/30 text-red-500 px-3 py-1.5 rounded-full text-xs font-bold animate-in fade-in">
                          <Flame size={14} className="fill-red-500 animate-pulse" /> PEDAS
                       </span>
                    ) : (
                       // Opsional: Jika tidak pedas, biarkan kosong atau beri label "Original"
                       <span className="text-zinc-600 text-xs font-medium uppercase tracking-wider"></span>
                    )}

                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;