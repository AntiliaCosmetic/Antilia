import { useContext, useState, useEffect, useMemo } from 'react';
import { StoreContext } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Filter } from 'lucide-react';

const ProductCardSkeleton = () => (
  <div className="group relative animate-pulse flex flex-col items-center">
    <div className="aspect-[3/4] w-full overflow-hidden bg-[#1A1A1A] mb-6" />
    <div className="w-full flex flex-col items-center space-y-3">
      <div className="h-4 bg-[#1A1A1A] w-2/3"></div>
      <div className="h-3 bg-[#1A1A1A] w-1/3"></div>
      <div className="h-4 bg-[#1A1A1A] w-16 mt-2"></div>
    </div>
  </div>
);

const CatalogPage = () => {
  const { products, addToCart } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  
  // Filter and Sort State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('name'); // 'name', 'priceAsc', 'priceDesc'

  const categories = ['All', ...new Set(products.map(p => p.category))];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setToastMessage(`${product.name} added to your bag`);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  const displayedProducts = useMemo(() => {
    let filtered = products;
    if (selectedCategory !== 'All') {
      filtered = products.filter(p => p.category === selectedCategory);
    }

    return filtered.sort((a, b) => {
      if (sortOption === 'priceAsc') return a.price - b.price;
      if (sortOption === 'priceDesc') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
  }, [products, selectedCategory, sortOption]);

  return (
    <div className="bg-[#0F0F0F] min-h-screen pt-32 pb-24 selection:bg-[#D9BB73] selection:text-[#0F0F0F] text-[#F9F8F6]">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 glass-panel-dark text-[#F9F8F6] px-8 py-4 flex items-center shadow-2xl rounded-sm"
          >
            <ShoppingBag className="w-4 h-4 mr-4 text-[#D9BB73]" />
            <span className="font-sans text-xs tracking-[0.15em] uppercase">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-[#D9BB73] text-xs font-medium tracking-[0.3em] uppercase mb-4">Parfumerie Fine</p>
          <h2 className="text-5xl md:text-6xl font-serif mb-6 tracking-tight text-white">The Collection</h2>
          <div className="w-12 h-px bg-[#D9BB73] mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-xl mx-auto font-light text-lg tracking-wide leading-relaxed">
            Discover our meticulously curated selection of the most exquisite fragrances from around the world.
          </p>
        </motion.div>

        {/* Filters and Sorting Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 space-y-6 md:space-y-0 border-y border-[#1A1A1A] py-6">
          <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 flex items-center">
              <Filter className="w-3 h-3 mr-2" /> Filter
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] px-4 py-2 border transition-all duration-300 ${
                  selectedCategory === cat 
                  ? 'border-[#D9BB73] text-[#D9BB73] bg-[#D9BB73]/10' 
                  : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500">Sort By</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent border-b border-[#1A1A1A] text-white text-xs uppercase tracking-[0.15em] py-2 focus:outline-none focus:border-[#D9BB73] cursor-pointer"
            >
              <option value="name" className="bg-[#0F0F0F]">Name (A-Z)</option>
              <option value="priceAsc" className="bg-[#0F0F0F]">Price (Low to High)</option>
              <option value="priceDesc" className="bg-[#0F0F0F]">Price (High to Low)</option>
            </select>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-y-20 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-16">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : displayedProducts.map((product, index) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
                  className="group relative luxury-card flex flex-col"
                >
                  <div className="aspect-[3/4] w-full overflow-hidden bg-[#1A1A1A] relative mb-8">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center transition-all duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                    
                    {/* Hover Overlay with Glassmorphism */}
                    <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 flex justify-center">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="glass-panel text-[#F9F8F6] w-full py-4 uppercase tracking-[0.2em] text-[10px] font-semibold flex items-center justify-center hover:bg-[#D9BB73] hover:text-[#0F0F0F] hover:border-[#D9BB73] transition-all duration-300"
                      >
                        <Plus className="w-3 h-3 mr-2" />
                        Add to Bag
                      </button>
                    </div>

                    {/* Stock indicator badge */}
                    {product.stock <= 5 && product.stock > 0 && (
                      <div className="absolute top-4 left-4 bg-[#D9BB73] text-[#0F0F0F] text-[9px] uppercase tracking-[0.2em] px-3 py-1 font-bold">
                        Rare Find
                      </div>
                    )}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="border border-[#D9BB73] text-[#D9BB73] px-6 py-2 text-xs uppercase tracking-[0.3em] font-medium bg-[#0F0F0F]/50">Sold Out</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-center text-center flex-grow px-4">
                    <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-500 mb-2">{product.category}</p>
                    <h3 className="text-xl font-serif text-white mb-3 group-hover:text-[#D9BB73] transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-sm font-light text-gray-300 tracking-widest">₹{product.price}</p>
                  </div>
                </motion.div>
              ))}
        </div>
        
        {!loading && displayedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 font-light tracking-widest uppercase">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
