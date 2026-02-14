import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  Trash2, LogOut, Save, Image as ImageIcon, Loader2, Star, Flame, 
  ShoppingBag, MessageCircle, MapPin, ArrowRight, Utensils, Phone, Plus, X
} from 'lucide-react';

const ICON_LIST = [
  { id: 'ShoppingBag', icon: <ShoppingBag size={18}/>, label: 'Tas Belanja' },
  { id: 'MessageCircle', icon: <MessageCircle size={18}/>, label: 'Chat/WA' },
  { id: 'Phone', icon: <Phone size={18}/>, label: 'Telepon' },
  { id: 'Utensils', icon: <Utensils size={18}/>, label: 'Sendok Garpu' },
];

const AdminPage = ({ onBack }) => {
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState('menu'); 
  
  // STATE MENU
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState(["Sate Taichan", "Taichan Naga", "Menu Paket", "Minuman", "Lainnya"]); // Default
  const [isManualCategory, setIsManualCategory] = useState(false); // Toggle input manual
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [menuForm, setMenuForm] = useState({ 
    name: '', 
    price: '', 
    category: 'Sate Taichan', 
    desc_text: '', 
    image_url: '', 
    rating: '5.0', 
    is_spicy: false 
  });
  const [editingMenuId, setEditingMenuId] = useState(null);

  // STATE HERO & FEATURED
  const [heroForm, setHeroForm] = useState({
    image_url: '', description: '', 
    button_text: '', button_url: '', button_style: 'red', button_icon: 'ShoppingBag', button_note: '',
    highlight_list: [],
    featured_image_url: '', featured_title_normal: '', featured_title_highlight: '', featured_description: '', featured_note: '', featured_buttons: [] 
  });
  const [heroId, setHeroId] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) { fetchMenu(); fetchHero(); }
    });
  }, []);

  async function fetchMenu() {
    const { data } = await supabase.from('menu').select('*').order('id', { ascending: false });
    if (data) {
        setMenu(data);
        // LOGIKA BARU: Ambil semua kategori unik dari database + default
        const existingCats = [...new Set(data.map(item => item.category))];
        const defaultCats = ["Sate Taichan", "Taichan Naga", "Menu Paket", "Minuman", "Lainnya"];
        // Gabungkan dan hilangkan duplikat
        const mergedCats = [...new Set([...defaultCats, ...existingCats])];
        setCategories(mergedCats);
    }
  }

  async function fetchHero() {
    const { data } = await supabase.from('hero_content').select('*').single();
    if (data) {
        if(!data.highlight_list) data.highlight_list = [];
        if(!data.featured_buttons) data.featured_buttons = [];
        setHeroForm(data);
        setHeroId(data.id);
    }
  }

  async function handleImageUpload(event, targetField) {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;
      const fileName = `${Date.now()}.${file.name.split('.').pop()}`;
      const { error } = await supabase.storage.from('menu-images').upload(fileName, file);
      if (error) throw error;
      const { data } = supabase.storage.from('menu-images').getPublicUrl(fileName);
      
      if (targetField === 'menu') setMenuForm({ ...menuForm, image_url: data.publicUrl });
      else setHeroForm({ ...heroForm, [targetField]: data.publicUrl });

    } catch (err) { alert(err.message); } 
    finally { setUploading(false); }
  }

  // --- CRUD MENU ---
  async function handleMenuSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    // Pastikan kategori tidak kosong
    if(!menuForm.category.trim()) {
        alert("Kategori harus diisi!");
        setLoading(false);
        return;
    }

    const query = supabase.from('menu');
    const { error } = editingMenuId ? await query.update(menuForm).eq('id', editingMenuId) : await query.insert([menuForm]);
    
    if (!error) { 
        alert("Menu Berhasil Disimpan!"); 
        fetchMenu(); 
        resetMenuForm(); 
    }
    setLoading(false);
  }
  
  async function deleteMenu(id) {
     if(confirm("Hapus menu ini?")) { await supabase.from('menu').delete().eq('id', id); fetchMenu(); }
  }

  function resetMenuForm() {
    setMenuForm({ name: '', price: '', category: 'Sate Taichan', desc_text: '', image_url: '', rating: '5.0', is_spicy: false });
    setEditingMenuId(null);
    setIsManualCategory(false);
  }

  // --- CRUD HERO ---
  async function handleHeroSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('hero_content').update(heroForm).eq('id', heroId);
    if (!error) alert("Tampilan Website Berhasil Diupdate!");
    else alert("Gagal: " + error.message);
    setLoading(false);
  }

  const updateList = (field, index, key, value) => {
    const newList = [...heroForm[field]];
    newList[index][key] = value;
    setHeroForm({...heroForm, [field]: newList});
  };
  const addRow = (field, defaultObj) => setHeroForm({...heroForm, [field]: [...heroForm[field], defaultObj]});
  const removeRow = (field, index) => {
    const newList = heroForm[field].filter((_, i) => i !== index);
    setHeroForm({...heroForm, [field]: newList});
  };

  if (!session) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Silakan Login Admin...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-24">
      {/* HEADER */}
      <div className="bg-zinc-900 border-b border-white/10 sticky top-0 z-50 px-4 py-4 flex justify-between items-center max-w-5xl mx-auto w-full shadow-xl">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-lg hidden md:block">Admin Panel</h1>
            <span className="text-xs bg-red-600 px-2 py-1 rounded text-white">v1.0</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setActiveTab('menu')} className={`px-4 py-2 rounded-lg text-sm transition ${activeTab==='menu'?'bg-red-600 text-white font-bold shadow-red-900/20':'text-gray-400 hover:text-white'}`}>Daftar Menu</button>
            <button onClick={() => setActiveTab('hero')} className={`px-4 py-2 rounded-lg text-sm transition ${activeTab==='hero'?'bg-red-600 text-white font-bold shadow-red-900/20':'text-gray-400 hover:text-white'}`}>Tampilan Depan</button>
            <button onClick={onBack} className="px-3 py-2 border border-zinc-700 rounded-lg text-sm hover:bg-zinc-800 transition"><LogOut size={16}/></button>
          </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 md:p-8">
        
        {/* === TAB 1: MENU === */}
        {activeTab === 'menu' && (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl mb-8 shadow-2xl">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-red-500">
                  <Utensils size={20}/> {editingMenuId ? "Edit Menu" : "Tambah Menu Baru"}
                </h2>
                
                <form onSubmit={handleMenuSubmit} className="grid md:grid-cols-2 gap-8">
                    {/* KOLOM KIRI */}
                    <div className="space-y-5">
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Nama Makanan</label>
                            <input value={menuForm.name} onChange={e => setMenuForm({...menuForm, name: e.target.value})} placeholder="Contoh: Sate Kulit" className="w-full bg-black border border-zinc-700 p-3 rounded-lg text-white focus:border-red-500 outline-none transition" required />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Deskripsi Singkat</label>
                            <textarea value={menuForm.desc_text || ''} onChange={e => setMenuForm({...menuForm, desc_text: e.target.value})} placeholder="Deskripsi menu..." className="w-full bg-black border border-zinc-700 p-3 rounded-lg text-white h-24 text-sm resize-none" />
                        </div>
                        <div className="flex gap-4">
                             <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1 block">Harga</label>
                                <input value={menuForm.price} onChange={e => setMenuForm({...menuForm, price: e.target.value})} placeholder="Rp 15.000" className="w-full bg-black border border-zinc-700 p-3 rounded-lg text-white" required />
                             </div>
                             
                             {/* UPDATED: KATEGORI DENGAN OPSI TAMBAH BARU */}
                             <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1 block">Kategori</label>
                                {isManualCategory ? (
                                    <div className="flex gap-2">
                                        <input 
                                            value={menuForm.category} 
                                            onChange={e => setMenuForm({...menuForm, category: e.target.value})} 
                                            placeholder="Ketik Kategori Baru..." 
                                            className="w-full bg-black border border-blue-500 text-blue-400 p-3 rounded-lg focus:outline-none"
                                            autoFocus
                                        />
                                        <button type="button" onClick={() => { setIsManualCategory(false); setMenuForm({...menuForm, category: categories[0]}) }} className="px-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 border border-zinc-700">
                                            <X size={16}/>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <select 
                                            value={menuForm.category} 
                                            onChange={e => setMenuForm({...menuForm, category: e.target.value})} 
                                            className="w-full bg-black border border-zinc-700 p-3 rounded-lg text-white appearance-none"
                                        >
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        <button 
                                            type="button" 
                                            onClick={() => { setIsManualCategory(true); setMenuForm({...menuForm, category: ''}) }} 
                                            className="px-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 border border-zinc-700 text-gray-400 hover:text-white"
                                            title="Tambah Kategori Baru"
                                        >
                                            <Plus size={16}/>
                                        </button>
                                    </div>
                                )}
                             </div>
                        </div>

                        <div className="flex gap-4 items-center">
                            <div className="w-1/3">
                                <label className="text-xs text-gray-400 mb-1 block">Rating (0-5)</label>
                                <div className="flex items-center gap-2 bg-black border border-zinc-700 px-3 py-2 rounded-lg">
                                    <Star size={16} className="text-yellow-500 fill-yellow-500"/>
                                    <input value={menuForm.rating} onChange={e => setMenuForm({...menuForm, rating: e.target.value})} className="bg-transparent w-full outline-none text-white font-bold"/>
                                </div>
                            </div>
                            <label className={`cursor-pointer flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition ${menuForm.is_spicy ? 'bg-red-900/20 border-red-500 text-red-500' : 'bg-black border-zinc-700 text-gray-500'}`}>
                                <input type="checkbox" className="hidden" checked={menuForm.is_spicy} onChange={e => setMenuForm({...menuForm, is_spicy: e.target.checked})} />
                                <Flame size={18} className={menuForm.is_spicy ? "animate-pulse" : ""}/> 
                                <span className="font-bold text-sm">{menuForm.is_spicy ? "PEDAS" : "TIDAK PEDAS"}</span>
                            </label>
                        </div>
                    </div>

                    {/* KOLOM KANAN */}
                    <div className="flex flex-col h-full">
                         <label className="text-xs text-gray-400 mb-1 block">Foto Menu</label>
                         <div className="flex-1 bg-black border-2 border-dashed border-zinc-800 rounded-xl mb-4 overflow-hidden relative group flex items-center justify-center min-h-[200px]">
                            {menuForm.image_url ? (
                                <img src={menuForm.image_url} className="w-full h-full object-cover"/>
                            ) : (
                                <div className="text-zinc-600 text-sm flex flex-col items-center gap-2"><ImageIcon size={32}/><span>Belum ada foto</span></div>
                            )}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                {uploading ? <Loader2 className="animate-spin text-red-500"/> : (
                                    <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:scale-105 transition">
                                        Pilih Foto <input type="file" onChange={(e)=>handleImageUpload(e, 'menu')} className="hidden"/>
                                    </label>
                                )}
                            </div>
                         </div>
                         <div className="flex gap-3">
                            {editingMenuId && <button type="button" onClick={resetMenuForm} className="px-4 py-3 border border-zinc-600 rounded-lg text-sm text-gray-400 hover:text-white transition">Batal</button>}
                            <button type="submit" disabled={loading} className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-sm py-3 transition flex items-center justify-center gap-2">
                                {loading ? <Loader2 className="animate-spin"/> : <Save size={18}/>} {editingMenuId ? "UPDATE MENU" : "SIMPAN MENU"}
                            </button>
                         </div>
                    </div>
                </form>
              </div>

              {/* LIST MENU */}
              <div className="space-y-3">
                  <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-4">Daftar Menu Saat Ini ({menu.length})</h3>
                  {menu.map(m => (
                      <div key={m.id} className="bg-zinc-900/40 p-4 rounded-xl flex justify-between items-center border border-white/5 hover:border-white/20 transition group">
                          <div className="flex items-center gap-4">
                              <img src={m.image_url || 'https://via.placeholder.com/50'} className="w-16 h-16 rounded-lg bg-black object-cover shadow-md"/>
                              <div>
                                  <div className="font-bold text-lg text-white flex items-center gap-2">{m.name} {m.is_spicy && <Flame size={14} className="text-red-500"/>}</div>
                                  <div className="text-gray-500 text-sm flex gap-3"><span className="text-green-500 font-mono">{m.price}</span><span>•</span><span className="flex items-center gap-1 text-zinc-400 bg-zinc-800/50 px-2 rounded">{m.category}</span></div>
                              </div>
                          </div>
                          <div className="flex gap-3 opacity-50 group-hover:opacity-100 transition">
                              <button onClick={()=>{setEditingMenuId(m.id); setMenuForm(m); window.scrollTo({top:0, behavior:'smooth'})}} className="text-blue-400 text-sm border border-blue-900/50 px-3 py-1 rounded bg-blue-900/10">Edit</button>
                              <button onClick={()=>deleteMenu(m.id)} className="text-red-500 text-sm border border-red-900/50 px-3 py-1 rounded bg-red-900/10">Hapus</button>
                          </div>
                      </div>
                  ))}
              </div>
           </div>
        )}

        {/* === TAB 2: HERO & FEATURED === */}
        {activeTab === 'hero' && (
            <div className="animate-in fade-in space-y-8">
                <form onSubmit={handleHeroSubmit}>
                    
                    {/* SECTION 1: HERO UTAMA */}
                    <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl mb-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
                        <h3 className="text-lg font-bold mb-4 text-white">1. Hero Section (Halaman Utama)</h3>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                             <div>
                                <label className="text-xs text-gray-400 block mb-2">Background Image</label>
                                <div className="h-48 bg-black rounded-xl border border-zinc-800 mb-3 overflow-hidden relative group">
                                   {heroForm.image_url ? (
                                      <img src={heroForm.image_url} className="w-full h-full object-cover"/>
                                   ) : (
                                      <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No Image</div>
                                   )}
                                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                        <label className="cursor-pointer bg-white text-black px-3 py-2 rounded-lg text-xs font-bold shadow-lg">
                                            Ganti Background <input type="file" onChange={(e)=>handleImageUpload(e, 'image_url')} className="hidden"/>
                                        </label>
                                   </div>
                                </div>
                             </div>

                        </div>
                    </div>

                    {/* SECTION 2: HIGHLIGHT LIST */}
                    <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl mb-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-orange-600"></div>
                        <h3 className="text-lg font-bold mb-4 text-white">2. Highlight List (Daftar Harga Kecil)</h3>
                        <div className="space-y-3">
                            {heroForm.highlight_list.map((item, index) => (
                                <div key={index} className="flex gap-3 items-center">
                                    <div className="bg-black/50 px-3 py-2 rounded text-gray-500 font-mono text-xs">#{index+1}</div>
                                    <input placeholder="Nama Menu" value={item.name} onChange={(e)=>updateList('highlight_list', index, 'name', e.target.value)} className="bg-black border border-zinc-700 p-2 rounded text-sm flex-1"/>
                                    <input placeholder="Harga" value={item.price} onChange={(e)=>updateList('highlight_list', index, 'price', e.target.value)} className="bg-black border border-zinc-700 p-2 rounded text-sm w-32"/>
                                    <button type="button" onClick={()=>removeRow('highlight_list', index)} className="text-red-500 bg-red-900/10 p-2 rounded hover:bg-red-900/30"><Trash2 size={16}/></button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={()=>addRow('highlight_list', {name:'', price:''})} className="mt-4 text-xs font-bold text-blue-400 flex items-center gap-1 bg-blue-900/10 px-3 py-2 rounded border border-blue-900/30 hover:bg-blue-900/20">
                            <Plus size={14}/> TAMBAH HIGHLIGHT BARU
                        </button>
                    </div>

                    {/* SECTION 3: FEATURED MENU */}
                    <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl mb-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-600"></div>
                        <h3 className="text-lg font-bold mb-4 text-white">3. Section Promo / Menu Unggulan</h3>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="text-xs text-gray-400 mb-2 block">Gambar (Sebelah Kiri)</label>
                                <div className="h-48 bg-black rounded-xl border border-zinc-800 mb-2 overflow-hidden relative group">
                                    <img src={heroForm.featured_image_url} className="w-full h-full object-cover"/>
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                         <label className="cursor-pointer text-xs bg-white text-black px-3 py-2 rounded font-bold shadow-lg">Ganti Foto <input type="file" onChange={(e)=>handleImageUpload(e, 'featured_image_url')} className="hidden"/></label>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-400 mb-1 block">Judul Normal (Putih)</label>
                                    <input value={heroForm.featured_title_normal} onChange={e=>setHeroForm({...heroForm, featured_title_normal: e.target.value})} className="w-full bg-black border border-zinc-700 p-2 rounded text-white text-sm" placeholder="Daging Ayam Pilihan dengan..."/>
                                </div>
                                <div>
                                    <label className="text-xs text-red-400 mb-1 block font-bold">Judul Highlight (Merah)</label>
                                    <input value={heroForm.featured_title_highlight} onChange={e=>setHeroForm({...heroForm, featured_title_highlight: e.target.value})} className="w-full bg-black border border-red-900/50 p-2 rounded text-red-500 text-sm font-bold" placeholder="Sambal Spesial"/>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 mb-1 block">Deskripsi Paragraf</label>
                                    <textarea value={heroForm.featured_description} onChange={e=>setHeroForm({...heroForm, featured_description: e.target.value})} className="w-full bg-black border border-zinc-700 p-2 rounded text-white text-sm h-24 resize-none"/>
                                </div>
                            </div>
                        </div>

                        {/* BUTTON LIST */}
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                            <label className="text-sm font-bold text-gray-300 mb-3 block">Tombol Aksi (Action Buttons)</label>
                            <div className="space-y-3">
                                {heroForm.featured_buttons.map((btn, idx) => (
                                    <div key={idx} className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 flex flex-col md:flex-row gap-3 items-start md:items-center">
                                        <div className="flex-1 w-full">
                                            <input placeholder="Teks Tombol" value={btn.text} onChange={(e)=>updateList('featured_buttons', idx, 'text', e.target.value)} className="bg-black border border-zinc-700 p-2 rounded text-sm w-full text-white"/>
                                        </div>
                                        <div className="w-full md:w-1/3">
                                            <input placeholder="https://..." value={btn.url} onChange={(e)=>updateList('featured_buttons', idx, 'url', e.target.value)} className="bg-black border border-zinc-700 p-2 rounded text-sm w-full text-blue-400"/>
                                        </div>
                                        <div className="flex gap-2 w-full md:w-auto">
                                            <select value={btn.style} onChange={(e)=>updateList('featured_buttons', idx, 'style', e.target.value)} className="bg-black border border-zinc-700 p-2 rounded text-xs flex-1">
                                                <option value="green">Hijau (GoFood)</option>
                                                <option value="outline">Outline</option>
                                                <option value="red">Merah</option>
                                            </select>
                                            <div className="flex gap-1 bg-black p-1 rounded border border-zinc-700">
                                                {ICON_LIST.map(ic => (
                                                    <button type="button" key={ic.id} onClick={()=>updateList('featured_buttons', idx, 'icon', ic.id)} className={`p-1 rounded ${btn.icon === ic.id ? 'bg-white text-black' : 'text-gray-600 hover:text-gray-300'}`}>{ic.icon}</button>
                                                ))}
                                            </div>
                                            <button type="button" onClick={()=>removeRow('featured_buttons', idx)} className="bg-red-900/20 text-red-500 p-2 rounded hover:bg-red-900/50"><Trash2 size={16}/></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={()=>addRow('featured_buttons', {text: 'TOMBOL BARU', url: '#', style: 'green', icon: 'ShoppingBag'})} className="mt-4 flex items-center gap-2 text-xs text-white px-4 py-2 bg-green-700 rounded-lg hover:bg-green-600 transition shadow-lg">
                                <Plus size={16}/> Tambah Tombol
                            </button>
                        </div>

                        <div className="mt-4">
                            <label className="text-xs text-gray-400 mb-1 block">Catatan Kecil (Footer)</label>
                            <input value={heroForm.featured_note} onChange={e=>setHeroForm({...heroForm, featured_note: e.target.value})} className="w-full bg-black border border-zinc-700 p-2 rounded text-gray-500 text-sm italic"/>
                        </div>
                    </div>

                    <div className="fixed bottom-6 right-6 z-50">
                         <button type="submit" disabled={loading} className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-4 px-8 rounded-full shadow-2xl flex items-center justify-center gap-3 hover:scale-105 transition hover:shadow-orange-500/20 ring-1 ring-white/20">
                             <Save size={20}/> {loading ? "Menyimpan..." : "SIMPAN SEMUA PERUBAHAN"}
                         </button>
                    </div>

                </form>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;