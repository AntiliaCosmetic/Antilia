import { useContext, useState, useEffect, useMemo } from 'react';
import { StoreContext } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [sortOption, setSortOption] = useState('name'); 

  // Derived filter options
  const categories = [...new Set(products.map(p => p.category))];
  const allNotes = [...new Set(products.flatMap(p => p.notes || []))];
  const allOccasions = [...new Set(products.flatMap(p => p.occasions || []))];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setToastMessage(`${product.name} added to your bag`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const toggleArrayItem = (array, setArray, item) => {
    setArray(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const displayedProducts = useMemo(() => {
    let filtered = products;
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    if (selectedNotes.length > 0) {
      filtered = filtered.filter(p => p.notes && p.notes.some(n => selectedNotes.includes(n)));
    }
    if (selectedOccasions.length > 0) {
      filtered = filtered.filter(p => p.occasions && p.occasions.some(o => selectedOccasions.includes(o)));
    }

    return filtered.sort((a, b) => {
      if (sortOption === 'priceAsc') return a.price - b.price;
      if (sortOption === 'priceDesc') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
  }, [products, selectedCategories, selectedNotes, selectedOccasions, sortOption]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedNotes([]);
    setSelectedOccasions([]);
  };

  const FilterSection = () => (
    <div className="space-y-10">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9BB73] mb-4 border-b border-[#1A1A1A] pb-2">Category</h4>
        <div className="space-y-3">
          {categories.map(cat => (
            <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleArrayItem(selectedCategories, setSelectedCategories, cat)}
                className="form-checkbox h-4 w-4 bg-transparent border-[#333] text-[#D9BB73] focus:ring-0 focus:ring-offset-0 transition duration-200"
              />
              <span className="text-xs tracking-widest text-gray-400 group-hover:text-white uppercase">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9BB73] mb-4 border-b border-[#1A1A1A] pb-2">Key Notes</h4>
        <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
          {allNotes.map(note => (
            <label key={note} className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={selectedNotes.includes(note)}
                onChange={() => toggleArrayItem(selectedNotes, setSelectedNotes, note)}
                className="form-checkbox h-4 w-4 bg-transparent border-[#333] text-[#D9BB73] focus:ring-0 focus:ring-offset-0 transition duration-200"
              />
              <span className="text-xs tracking-widest text-gray-400 group-hover:text-white uppercase">{note}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9BB73] mb-4 border-b border-[#1A1A1A] pb-2">Occasion</h4>
        <div className="space-y-3">
          {allOccasions.map(occ => (
            <label key={occ} className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={selectedOccasions.includes(occ)}
                onChange={() => toggleArrayItem(selectedOccasions, setSelectedOccasions, occ)}
                className="form-checkbox h-4 w-4 bg-transparent border-[#333] text-[#D9BB73] focus:ring-0 focus:ring-offset-0 transition duration-200"
              />
              <span className="text-xs tracking-widest text-gray-400 group-hover:text-white uppercase">{occ}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#0F0F0F] min-h-screen pt-32 pb-24 selection:bg-[#D9BB73] selection:text-[#0F0F0F] text-[#F9F8F6]">
      
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 glass-panel-dark text-[#F9F8F6] px-8 py-4 flex items-center shadow-2xl rounded-sm border border-[#D9BB73]/50"
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
          <p className="text-gray-400 max-w-xl mx-auto font-light text-sm md:text-lg tracking-wide leading-relaxed">
            Discover our meticulously curated selection of the most exquisite fragrances from around the world.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center border-b border-[#1A1A1A] pb-4">
            <button 
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex items-center text-xs uppercase tracking-[0.2em] text-[#D9BB73]"
            >
              <Filter className="w-4 h-4 mr-2" /> Filters
            </button>
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500">{displayedProducts.length} Results</span>
          </div>

          <AnimatePresence>
            {mobileFilterOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden mb-8"
              >
                <FilterSection />
                <button 
                  onClick={clearFilters}
                  className="mt-8 text-xs uppercase tracking-widest text-gray-500 hover:text-white border-b border-gray-700 pb-1"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Sidebar Filter */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm font-serif text-white uppercase tracking-widest">Filters</span>
                {(selectedCategories.length > 0 || selectedNotes.length > 0 || selectedOccasions.length > 0) && (
                  <button onClick={clearFilters} className="text-[10px] uppercase tracking-widest text-[#D9BB73] hover:text-white">Clear</button>
                )}
              </div>
              <FilterSection />
            </div>
          </div>

          {/* Main Grid */}
          <div className="flex-1">
            <div className="hidden lg:flex justify-between items-center mb-10 pb-4 border-b border-[#1A1A1A]">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500">{displayedProducts.length} Products</span>
              <div className="flex items-center space-x-4">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-500">Sort By</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-transparent border-none text-white text-xs uppercase tracking-[0.15em] py-2 focus:outline-none focus:ring-0 cursor-pointer text-right"
                >
                  <option value="name" className="bg-[#0F0F0F]">Name (A-Z)</option>
                  <option value="priceAsc" className="bg-[#0F0F0F]">Price (Low to High)</option>
                  <option value="priceDesc" className="bg-[#0F0F0F]">Price (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Mobile Sort */}
            <div className="lg:hidden flex items-center justify-between mb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500">Sort By</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent border-b border-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.15em] py-1 focus:outline-none cursor-pointer"
              >
                <option value="name" className="bg-[#0F0F0F]">Name (A-Z)</option>
                <option value="priceAsc" className="bg-[#0F0F0F]">Price (Low to High)</option>
                <option value="priceDesc" className="bg-[#0F0F0F]">Price (High to Low)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-y-16 gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
                : displayedProducts.map((product, index) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                      className="group relative flex flex-col cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <div className="aspect-[3/4] w-full overflow-hidden bg-[#1A1A1A] relative mb-6">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover object-center transition-all duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                        
                        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 flex justify-center bg-gradient-to-t from-black/80 to-transparent">
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className="bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#D9BB73]/50 text-[#F9F8F6] w-full py-3 uppercase tracking-[0.2em] text-[10px] font-semibold flex items-center justify-center hover:bg-[#D9BB73] hover:text-[#0F0F0F] transition-all duration-300"
                          >
                            <Plus className="w-3 h-3 mr-2" /> Quick Add
                          </button>
                        </div>

                        {product.isBestseller && (
                          <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-[#D9BB73]/30 text-[#D9BB73] text-[9px] uppercase tracking-[0.2em] px-3 py-1 font-bold">
                            Bestseller
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-center text-center px-2">
                        <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-gray-500 mb-1">{product.brand}</p>
                        <h3 className="text-lg font-serif text-white mb-2 group-hover:text-[#D9BB73] transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-xs font-light text-gray-400 tracking-widest">₹{product.price}</p>
                      </div>
                    </motion.div>
                  ))}
            </div>
            
            {!loading && displayedProducts.length === 0 && (
              <div className="text-center py-32 border border-[#1A1A1A] bg-[#141414] mt-8">
                <p className="text-gray-400 font-light tracking-widest uppercase text-sm mb-4">No fragrances match your selection.</p>
                <button onClick={clearFilters} className="text-[#D9BB73] border-b border-[#D9BB73] pb-1 text-xs uppercase tracking-widest hover:text-white transition-colors">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
