import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Plus, Minus, ArrowLeft } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, cart, updateQuantity } = useContext(StoreContext);
  
  const product = products.find(p => p.id === id);
  const [activeAccordion, setActiveAccordion] = useState('description');
  const [localQuantity, setLocalQuantity] = useState(1);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--color-brand-silk-white)] flex items-center justify-center text-[var(--color-brand-charcoal)]">
        <div className="text-center">
          <h2 className="text-4xl font-serif mb-6 uppercase tracking-widest">Formulation Not Found</h2>
          <button onClick={() => navigate('/catalog')} className="text-[var(--color-brand-rose-gold-dark)] uppercase tracking-[0.3em] text-xs hover:text-[var(--color-brand-charcoal)] transition-colors border-b border-[var(--color-brand-rose-gold-dark)] pb-1 font-bold">
            Return to Collection
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // We can add multiple quantities if needed, but our generic addToCart assumes 1.
    // To support quantity selection before adding, we adapt StoreContext lightly or just loop
    for (let i = 0; i < localQuantity; i++) {
        addToCart(product);
    }
  };

  return (
    <div className="bg-[var(--color-brand-silk-white)] min-h-screen py-32 selection:bg-[var(--color-brand-rose-gold-light)] selection:text-[var(--color-brand-charcoal)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <button 
          onClick={() => navigate('/catalog')}
          className="flex items-center text-[10px] uppercase tracking-[0.3em] text-[var(--color-brand-muted)] hover:text-[var(--color-brand-rose-gold-dark)] transition-colors mb-16 font-bold"
        >
          <ArrowLeft className="w-4 h-4 mr-3" /> Back to Collection
        </button>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 xl:gap-x-24">
          
          {/* Left: Image Gallery */}
          <div className="flex flex-col mb-16 lg:mb-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full aspect-[4/5] bg-white overflow-hidden sticky top-32 luxury-card"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-1000 transform hover:scale-105"
              />
              {product.isBestseller && (
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md border border-[var(--color-brand-rose-gold-dark)] text-[var(--color-brand-rose-gold-dark)] px-5 py-2 text-[10px] uppercase font-black tracking-[0.3em] shadow-lg">
                  Iconic
                </div>
              )}
            </motion.div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-[var(--color-brand-rose-gold-dark)] text-[11px] uppercase tracking-[0.4em] font-black mb-4">{product.category}</p>
              <h1 className="text-5xl sm:text-6xl font-serif text-[var(--color-brand-charcoal)] mb-6 leading-tight uppercase tracking-tight">{product.name}</h1>
              <p className="text-2xl text-[var(--color-brand-charcoal)] font-light tracking-widest mb-10 secondary-serif italic">₹{product.price.toLocaleString()}</p>

              <div className="h-px bg-[var(--color-brand-rose-gold-light)] w-full mb-10"></div>

              {/* Skin Type & Concern Tags */}
              {product.skinType && (Array.isArray(product.skinType) ? product.skinType.length > 0 : product.skinType.trim().length > 0) && (
                <div className="mb-8">
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-[var(--color-brand-muted)] mb-4 font-bold">Skin Compatibility</span>
                  <div className="flex flex-wrap gap-3">
                    {(Array.isArray(product.skinType) ? product.skinType : [product.skinType]).map(type => (
                      <span key={type} className="px-4 py-2 border border-[var(--color-brand-rose-gold-light)] text-[10px] text-[var(--color-brand-muted)] uppercase tracking-[0.2em] font-medium bg-white/50">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.concern && (Array.isArray(product.concern) ? product.concern.length > 0 : product.concern.trim().length > 0) && (
                <div className="mb-12">
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-[var(--color-brand-muted)] mb-4 font-bold">Targeted Concern</span>
                  <div className="flex flex-wrap gap-3">
                    {(Array.isArray(product.concern) ? product.concern : [product.concern]).map(occ => (
                      <span key={occ} className="px-4 py-2 border border-[var(--color-brand-rose-gold-dark)] text-[10px] text-[var(--color-brand-rose-gold-dark)] uppercase tracking-[0.2em] font-bold">
                        {occ}
                      </span>
                    ))}
                  </div>
                </div>
              )}


              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
                <div className="flex items-center justify-between border border-[var(--color-brand-rose-gold-light)] w-full sm:w-40 px-6 py-5 text-[var(--color-brand-charcoal)] bg-white/50 luxury-card">
                  <button onClick={() => setLocalQuantity(Math.max(1, localQuantity - 1))} className="text-[var(--color-brand-muted)] hover:text-[var(--color-brand-rose-gold-dark)] transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm tracking-[0.3em] font-bold">{localQuantity}</span>
                  <button onClick={() => setLocalQuantity(localQuantity + 1)} className="text-[var(--color-brand-muted)] hover:text-[var(--color-brand-rose-gold-dark)] transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 py-5"
                >
                  Add To Bag
                </button>
              </div>

              {/* Accordions */}
              <div className="border-t border-[var(--color-brand-rose-gold-light)]">
                
                <div className="border-b border-[var(--color-brand-rose-gold-light)]">
                  <button 
                    onClick={() => setActiveAccordion(activeAccordion === 'description' ? '' : 'description')}
                    className="w-full flex justify-between items-center py-8 text-left group"
                  >
                    <span className="uppercase tracking-[0.3em] text-[10px] text-[var(--color-brand-charcoal)] group-hover:text-[var(--color-brand-rose-gold-dark)] transition-colors font-bold">The Formulation</span>
                    {activeAccordion === 'description' ? <ChevronDown className="w-4 h-4 text-[var(--color-brand-rose-gold-dark)]" /> : <ChevronRight className="w-4 h-4 text-[var(--color-brand-muted)] group-hover:text-[var(--color-brand-rose-gold-dark)]" />}
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'description' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-[var(--color-brand-muted)] font-light text-sm md:text-md leading-relaxed secondary-serif">
                          {product.description} <br/><br/>
                          Designed for clinical precision, this signature Antilia formulation integrates bio-active peptides and cold-pressed botanical oils to restore the skin's natural barrier. A transformative ritual that delivers visible radiance and long-term dermal health.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="border-b border-[var(--color-brand-rose-gold-light)]">
                  <button 
                    onClick={() => setActiveAccordion(activeAccordion === 'ingredients' ? '' : 'ingredients')}
                    className="w-full flex justify-between items-center py-8 text-left group"
                  >
                    <span className="uppercase tracking-[0.3em] text-[10px] text-[var(--color-brand-charcoal)] group-hover:text-[var(--color-brand-rose-gold-dark)] transition-colors font-bold">Clinical Actives</span>
                    {activeAccordion === 'ingredients' ? <ChevronDown className="w-4 h-4 text-[var(--color-brand-rose-gold-dark)]" /> : <ChevronRight className="w-4 h-4 text-[var(--color-brand-muted)] group-hover:text-[var(--color-brand-rose-gold-dark)]" />}
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'ingredients' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 space-y-6">
                          <div className="flex flex-wrap gap-2">
                            {product.ingredients && product.ingredients.map(ing => (
                              <span key={ing} className="bg-[var(--color-brand-rose-gold-light)]/20 px-3 py-1 text-[10px] text-[var(--color-brand-rose-gold-dark)] font-bold uppercase tracking-widest">{ing}</span>
                            ))}
                          </div>
                          <p className="text-[var(--color-brand-muted)] font-light text-xs leading-relaxed italic secondary-serif">
                            Full INCI: Aqua/Water/Eau, Squalane, Glycerin, Caprylic/Capric Triglyceride, Propanediol, 
                            Heptyl Undecylenate, Bio-Peptide Complex, Botanical Stem Cells, 
                            Hyaluronic Acid, Tocopherol (Vitamin E), Phenoxyethanol. <br/><br/>
                            <span className="font-bold text-[var(--color-brand-charcoal)] uppercase tracking-widest not-italic">100% Bio-Available & Dermatologically Tested.</span>
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="border-b border-[var(--color-brand-rose-gold-light)]">
                  <button 
                    onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')}
                    className="w-full flex justify-between items-center py-8 text-left group"
                  >
                    <span className="uppercase tracking-[0.3em] text-[10px] text-[var(--color-brand-charcoal)] group-hover:text-[var(--color-brand-rose-gold-dark)] transition-colors font-bold">Delivery Ritual</span>
                    {activeAccordion === 'shipping' ? <ChevronDown className="w-4 h-4 text-[var(--color-brand-rose-gold-dark)]" /> : <ChevronRight className="w-4 h-4 text-[var(--color-brand-muted)] group-hover:text-[var(--color-brand-rose-gold-dark)]" />}
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'shipping' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <ul className="pb-8 text-[var(--color-brand-muted)] font-light text-sm leading-relaxed space-y-4 secondary-serif">
                          <li className="flex items-start">
                            <span className="text-[var(--color-brand-rose-gold-dark)] mr-3 opacity-50">✦</span>
                            Complimentary white-glove delivery on all orders over ₹10,000.
                          </li>
                          <li className="flex items-start">
                            <span className="text-[var(--color-brand-rose-gold-dark)] mr-3 opacity-50">✦</span>
                            Housed in our signature Silk White sustainable packaging with Rose Gold foil detailing.
                          </li>
                          <li className="flex items-start">
                            <span className="text-[var(--color-brand-rose-gold-dark)] mr-3 opacity-50">✦</span>
                            Complimentary returns within 14 days of receipt, provided the protective seal is unbroken.
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
