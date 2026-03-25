import { useContext, useState, useEffect, useMemo } from 'react';
import { StoreContext } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCardSkeleton = () => (
  <div className="group relative animate-pulse flex flex-col items-center">
    <div className="aspect-[3/4] w-full overflow-hidden bg-[var(--color-brand-rose-gold-light)]/20 mb-6" />
    <div className="w-full flex flex-col items-center space-y-3">
      <div className="h-4 bg-[var(--color-brand-rose-gold-light)]/20 w-2/3"></div>
      <div className="h-3 bg-[var(--color-brand-rose-gold-light)]/20 w-1/3"></div>
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
  const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [sortOption, setSortOption] = useState('name'); 

  // Derived filter options
  const categories = [...new Set(products.map(p => p.category))];
  const allSkinTypes = [...new Set(products.flatMap(p => p.skinType || []))];
  const allConcerns = [...new Set(products.flatMap(p => p.concern || []))];
  const allIngredients = [...new Set(products.flatMap(p => p.ingredients || []))];

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
    if (selectedSkinTypes.length > 0) {
      filtered = filtered.filter(p => p.skinType && p.skinType.some(s => selectedSkinTypes.includes(s)));
    }
    if (selectedConcerns.length > 0) {
      filtered = filtered.filter(p => p.concern && p.concern.some(c => selectedConcerns.includes(c)));
    }
    if (selectedIngredients.length > 0) {
      filtered = filtered.filter(p => p.ingredients && p.ingredients.some(i => selectedIngredients.includes(i)));
    }

    return filtered.sort((a, b) => {
      if (sortOption === 'priceAsc') return a.price - b.price;
      if (sortOption === 'priceDesc') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
  }, [products, selectedCategories, selectedSkinTypes, selectedConcerns, selectedIngredients, sortOption]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSkinTypes([]);
    setSelectedConcerns([]);
    setSelectedIngredients([]);
  };

  const FilterSection = () => (
    <div className="space-y-12">
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand-rose-gold-dark)] mb-6 border-b border-[var(--color-brand-rose-gold-light)] pb-3">Collection</h4>
        <div className="space-y-4">
          {categories.map(cat => (
            <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleArrayItem(selectedCategories, setSelectedCategories, cat)}
                className="form-checkbox h-4 w-4 bg-transparent border-[var(--color-brand-rose-gold-light)] text-[var(--color-brand-rose-gold-dark)] focus:ring-0 transition duration-300"
              />
              <span className="text-[10px] tracking-[0.2em] text-[var(--color-brand-muted)] group-hover:text-[var(--color-brand-charcoal)] uppercase font-medium">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand-rose-gold-dark)] mb-6 border-b border-[var(--color-brand-rose-gold-light)] pb-3">Skin Type</h4>
        <div className="space-y-4">
          {allSkinTypes.map(type => (
            <label key={type} className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={selectedSkinTypes.includes(type)}
                onChange={() => toggleArrayItem(selectedSkinTypes, setSelectedSkinTypes, type)}
                className="form-checkbox h-4 w-4 bg-transparent border-[var(--color-brand-rose-gold-light)] text-[var(--color-brand-rose-gold-dark)] focus:ring-0 transition duration-300"
              />
              <span className="text-[10px] tracking-[0.2em] text-[var(--color-brand-muted)] group-hover:text-[var(--color-brand-charcoal)] uppercase font-medium">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand-rose-gold-dark)] mb-6 border-b border-[var(--color-brand-rose-gold-light)] pb-3">Dermal Concern</h4>
        <div className="space-y-4">
          {allConcerns.map(concern => (
            <label key={concern} className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={selectedConcerns.includes(concern)}
                onChange={() => toggleArrayItem(selectedConcerns, setSelectedConcerns, concern)}
                className="form-checkbox h-4 w-4 bg-transparent border-[var(--color-brand-rose-gold-light)] text-[var(--color-brand-rose-gold-dark)] focus:ring-0 transition duration-300"
              />
              <span className="text-[10px] tracking-[0.2em] text-[var(--color-brand-muted)] group-hover:text-[var(--color-brand-charcoal)] uppercase font-medium">{concern}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand-rose-gold-dark)] mb-6 border-b border-[var(--color-brand-rose-gold-light)] pb-3">Potent Actives</h4>
        <div className="space-y-4 max-h-48 overflow-y-auto custom-scrollbar pr-2">
          {allIngredients.slice(0, 10).map(ing => (
            <label key={ing} className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={selectedIngredients.includes(ing)}
                onChange={() => toggleArrayItem(selectedIngredients, setSelectedIngredients, ing)}
                className="form-checkbox h-4 w-4 bg-transparent border-[var(--color-brand-rose-gold-light)] text-[var(--color-brand-rose-gold-dark)] focus:ring-0 transition duration-300"
              />
              <span className="text-[10px] tracking-[0.2em] text-[var(--color-brand-muted)] group-hover:text-[var(--color-brand-charcoal)] uppercase font-medium">{ing}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[var(--color-brand-silk-white)] min-h-screen pt-32 pb-24 selection:bg-[var(--color-brand-rose-gold-light)] selection:text-[var(--color-brand-charcoal)] text-[var(--color-brand-charcoal)]">
      
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 glass-panel text-[var(--color-brand-charcoal)] px-8 py-4 flex items-center shadow-2xl rounded-sm border border-[var(--color-brand-rose-gold-dark)]/50"
          >
            <ShoppingBag className="w-4 h-4 mr-4 text-[var(--color-brand-rose-gold-dark)]" />
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <p className="text-[var(--color-brand-rose-gold-dark)] text-xs font-bold tracking-[0.4em] uppercase mb-4">The Dermal Collection</p>
          <h2 className="text-5xl md:text-7xl font-serif mb-8 tracking-tight text-[var(--color-brand-charcoal)]">Scientific <span className="italic secondary-serif">Beauty</span></h2>
          <div className="w-16 h-px bg-[var(--color-brand-rose-gold-dark)] mx-auto mb-8"></div>
          <p className="text-[var(--color-brand-muted)] max-w-2xl mx-auto font-light text-sm md:text-lg tracking-widest leading-relaxed secondary-serif">
            Meticulously formulated clinical-grade skincare. Filter by concern to find your bespoke ritual.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center border-b border-[var(--color-brand-rose-gold-light)] pb-4">
            <button 
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex items-center text-xs uppercase tracking-[0.2em] text-[var(--color-brand-rose-gold-dark)] font-bold"
            >
              <Filter className="w-4 h-4 mr-2" /> Filters
            </button>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-brand-muted)] font-medium">{displayedProducts.length} Results</span>
          </div>

          <AnimatePresence>
            {mobileFilterOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden mb-12"
              >
                <div className="bg-white/50 p-6 rounded-sm border border-[var(--color-brand-rose-gold-light)]">
                  <FilterSection />
                  <button 
                    onClick={clearFilters}
                    className="mt-12 text-[10px] uppercase tracking-widest text-[var(--color-brand-muted)] hover:text-[var(--color-brand-charcoal)] border-b border-[var(--color-brand-rose-gold-light)] pb-1"
                  >
                    Reset Analysis
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Sidebar Filter */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-32 glass-panel p-10">
              <div className="flex justify-between items-center mb-10 pb-4 border-b border-[var(--color-brand-rose-gold-light)]">
                <span className="text-xs font-bold text-[var(--color-brand-charcoal)] uppercase tracking-[0.2em]">Analysis</span>
                {(selectedCategories.length > 0 || selectedSkinTypes.length > 0 || selectedIngredients.length > 0 || selectedConcerns.length > 0) && (
                  <button onClick={clearFilters} className="text-[10px] uppercase tracking-widest text-[var(--color-brand-rose-gold-dark)] hover:text-[var(--color-brand-charcoal)] transition-colors">Reset</button>
                )}
              </div>
              <FilterSection />
            </div>
          </div>

          {/* Main Grid */}
          <div className="flex-1">
            <div className="hidden lg:flex justify-between items-center mb-12 pb-4 border-b border-[var(--color-brand-rose-gold-light)]">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--color-brand-muted)]">{displayedProducts.length} Formulations</span>
              <div className="flex items-center space-x-6">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--color-brand-muted)]">Priority</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-transparent border-none text-[var(--color-brand-charcoal)] text-[10px] font-bold uppercase tracking-[0.2em] py-2 focus:outline-none focus:ring-0 cursor-pointer text-right appearance-none"
                >
                  <option value="name">Alphabetical</option>
                  <option value="priceAsc">Value (Low to High)</option>
                  <option value="priceDesc">Value (High to Low)</option>
                </select>
                <ChevronDown className="w-3 h-3 text-[var(--color-brand-rose-gold-dark)]" />
              </div>
            </div>

            {/* Mobile Sort */}
            <div className="lg:hidden flex items-center justify-between mb-10">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-brand-muted)] font-bold">Sort</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent border-b border-[var(--color-brand-rose-gold-light)] text-[var(--color-brand-charcoal)] text-[10px] uppercase tracking-[0.2em] py-1 focus:outline-none cursor-pointer font-bold"
              >
                <option value="name">A-Z</option>
                <option value="priceAsc">Price ↑</option>
                <option value="priceDesc">Price ↓</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-y-16 gap-x-12 sm:grid-cols-2 xl:grid-cols-3">
              {loading
                ? Array.from({ length: 9 }).map((_, i) => <ProductCardSkeleton key={i} />)
                : displayedProducts.map((product, index) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: (index % 3) * 0.1 }}
                      className="group relative flex flex-col cursor-pointer luxury-card p-4"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--color-brand-silk-white)] relative mb-8">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover object-center transition-all duration-1000 group-hover:scale-110"
                        />
                        
                        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 flex justify-center">
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className="bg-white/95 backdrop-blur-md border border-[var(--color-brand-rose-gold-dark)] text-[var(--color-brand-charcoal)] w-full py-4 uppercase tracking-[0.3em] text-[10px] font-bold flex items-center justify-center hover:bg-[var(--color-brand-rose-gold-dark)] hover:text-white transition-all duration-300 shadow-xl"
                          >
                            <Plus className="w-4 h-4 mr-2" /> Add to Bag
                          </button>
                        </div>

                        {product.isBestseller && (
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-[var(--color-brand-rose-gold-dark)] text-[var(--color-brand-rose-gold-dark)] text-[10px] uppercase tracking-[0.3em] px-4 py-2 font-black shadow-sm">
                            Iconic
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-center text-center px-4">
                        <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[var(--color-brand-rose-gold-dark)] mb-3">{product.category}</p>
                        <h3 className="text-2xl font-serif text-[var(--color-brand-charcoal)] mb-3 group-hover:text-[var(--color-brand-rose-gold-dark)] transition-colors duration-500">
                          {product.name}
                        </h3>
                        <p className="text-sm font-light text-[var(--color-brand-muted)] tracking-widest secondary-serif italic">₹{product.price.toLocaleString()}</p>
                      </div>
                    </motion.div>
                  ))}
            </div>
            
            {!loading && displayedProducts.length === 0 && (
              <div className="text-center py-48 border border-[var(--color-brand-rose-gold-light)] bg-white/30 backdrop-blur-sm mt-12 luxury-card">
                <p className="text-[var(--color-brand-muted)] font-light tracking-[0.3em] uppercase text-xs mb-8 italic secondary-serif">No formulations match your analysis.</p>
                <button onClick={clearFilters} className="text-[var(--color-brand-rose-gold-dark)] border-b border-[var(--color-brand-rose-gold-dark)] pb-1 text-[10px] uppercase tracking-[0.3em] hover:text-[var(--color-brand-charcoal)] transition-colors font-bold">
                  Reset Analysis
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
