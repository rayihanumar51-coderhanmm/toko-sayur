import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CheckCircle, Leaf, Search } from 'lucide-react';

// Data produk bohongan (mock data)
const PRODUCTS = [
  {
    id: 1,
    name: 'Apel Merah Segar',
    category: 'Buah',
    price: 35000,
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    name: 'Pisang Cavendish',
    category: 'Buah',
    price: 20000,
    unit: '1 Sisir',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 3,
    name: 'Wortel Organik',
    category: 'Sayur',
    price: 15000,
    unit: '500 gram',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 4,
    name: 'Brokoli Hijau',
    category: 'Sayur',
    price: 18000,
    unit: '500 gram',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 5,
    name: 'Tomat Merah',
    category: 'Sayur',
    price: 12000,
    unit: '500 gram',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 6,
    name: 'Alpukat Mentega',
    category: 'Buah',
    price: 45000,
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 7,
    name: 'Sayur Bayam',
    category: 'Sayur',
    price: 5000,
    unit: '1 Ikat',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 8,
    name: 'Jeruk Manis',
    category: 'Buah',
    price: 28000,
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1549888834-3ec93abae044?auto=format&fit=crop&w=500&q=60',
  }
];

export default function App() {
  // State manajemen aplikasi
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('home'); // 'home', 'cart', 'checkout', 'success'
  const [searchQuery, setSearchQuery] = useState('');

  // Fungsi memformat harga menjadi Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Fungsi menambah ke keranjang
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Fungsi mengubah jumlah barang di keranjang
  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  // Fungsi menghapus barang dari keranjang
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Hitung total belanja
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Filter produk berdasarkan pencarian
  const filteredProducts = PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Komponen Navigasi / Header
  const Navbar = () => (
    <nav className="bg-green-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => setView('home')}
          >
            <Leaf className="h-8 w-8 text-green-300" />
            <span className="font-bold text-2xl tracking-tight">SayurKu</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setView('cart')}
              className="relative p-2 rounded-full hover:bg-green-500 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-600 transform translate-x-1/4 -translate-y-1/4 bg-white rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Tampilan Halaman Utama (Daftar Produk)
  if (view === 'home') {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        <Navbar />
        
        {/* Banner */}
        <div className="bg-green-100 py-12 px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-green-800 mb-4">Belanja Sayur & Buah Segar</h1>
          <p className="text-lg text-green-700 mb-8 max-w-2xl mx-auto">
            Langsung dari petani lokal. Kualitas terbaik, harga terjangkau, dan diantar langsung ke depan pintu Anda.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white bg-white/80 backdrop-blur-sm"
              placeholder="Cari apel, bayam, brokoli..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Product Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Produk Pilihan Hari Ini</h2>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Produk tidak ditemukan. Coba kata kunci lain.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
                  <div className="h-48 overflow-hidden relative">
                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur text-xs font-semibold px-2 py-1 rounded text-green-700 shadow-sm z-10">
                      {product.category}
                    </span>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between mt-2 mb-4">
                      <span className="font-bold text-green-600 text-lg">{formatRupiah(product.price)}</span>
                      <span className="text-sm text-gray-500">/ {product.unit}</span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-green-50 text-green-700 border border-green-200 hover:bg-green-600 hover:text-white hover:border-green-600 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Tambah</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }

  // Tampilan Keranjang
  if (view === 'cart') {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button 
            onClick={() => setView('home')}
            className="flex items-center text-green-600 hover:text-green-700 font-medium mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Lanjut Belanja
          </button>
          
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Keranjang Belanja</h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">Keranjang Anda kosong</h2>
              <p className="text-gray-500 mb-6">Yuk, mulai belanja sayur dan buah segar!</p>
              <button 
                onClick={() => setView('home')}
                className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-grow space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col sm:flex-row items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                      <p className="text-green-600 font-medium">{formatRupiah(item.price)} <span className="text-sm text-gray-500 font-normal">/ {item.unit}</span></p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 rounded bg-white shadow-sm text-gray-600 hover:text-green-600 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 rounded bg-white shadow-sm text-gray-600 hover:text-green-600"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="font-bold text-lg w-32 text-center sm:text-right">
                      {formatRupiah(item.price * item.quantity)}
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Ringkasan Belanja */}
              <div className="w-full lg:w-80 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-24">
                  <h3 className="text-xl font-bold mb-4 border-b pb-4">Ringkasan Belanja</h3>
                  <div className="flex justify-between mb-2 text-gray-600">
                    <span>Total Barang</span>
                    <span>{totalItems} item</span>
                  </div>
                  <div className="flex justify-between mb-6 text-gray-600">
                    <span>Ongkos Kirim</span>
                    <span className="text-green-600 font-medium">Gratis</span>
                  </div>
                  <div className="flex justify-between items-center mb-6 pt-4 border-t border-dashed">
                    <span className="font-bold text-gray-800">Total Harga</span>
                    <span className="font-bold text-2xl text-green-600">{formatRupiah(cartTotal)}</span>
                  </div>
                  <button 
                    onClick={() => setView('checkout')}
                    className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                  >
                    Lanjut ke Pembayaran
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Tampilan Checkout Form
  if (view === 'checkout') {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button 
            onClick={() => setView('cart')}
            className="flex items-center text-green-600 hover:text-green-700 font-medium mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Keranjang
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-green-50 p-6 border-b border-green-100">
              <h2 className="text-2xl font-bold text-green-800">Informasi Pengiriman</h2>
              <p className="text-green-600 text-sm mt-1">Lengkapi data di bawah ini untuk pengiriman pesanan Anda.</p>
            </div>
            
            <form 
              className="p-6 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                // Simulasi proses checkout
                setTimeout(() => {
                  setCart([]); // Kosongkan keranjang
                  setView('success'); // Pindah ke halaman sukses
                }, 500);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                  <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" placeholder="Budi Santoso" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                  <input required type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" placeholder="0812xxxxxx" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                <textarea required rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" placeholder="Jl. Sudirman No. 123, RT/RW..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Metode Pembayaran</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Transfer Bank', 'E-Wallet', 'COD (Bayar di Tempat)'].map((method, idx) => (
                    <label key={idx} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-green-500">
                      <input type="radio" name="payment" className="h-4 w-4 text-green-600 focus:ring-green-500" required defaultChecked={idx === 2} />
                      <span className="ml-3 text-sm font-medium text-gray-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center border border-gray-200 mt-8">
                <div>
                  <p className="text-sm text-gray-500">Total yang harus dibayar:</p>
                  <p className="text-2xl font-bold text-green-600">{formatRupiah(cartTotal)}</p>
                </div>
                <button type="submit" className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors shadow-md">
                  Selesaikan Pesanan
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  }

  // Tampilan Sukses Pembayaran
  if (view === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full border border-gray-100 transform transition-all">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Pesanan Berhasil!</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Terima kasih telah berbelanja di SayurKu. Pesanan sayur dan buah segar Anda sedang kami siapkan dan akan segera dikirim ke alamat Anda.
            </p>
            <button 
              onClick={() => setView('home')}
              className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-md"
            >
              Kembali ke Beranda
            </button>
          </div>
        </main>
      </div>
    );
  }

  return null;
}