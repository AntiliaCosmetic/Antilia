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
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center text-[#F9F8F6]">
        <div className="text-center">
          <h2 className="text-3xl font-serif mb-4">Fragrance Not Found</h2>
          <button onClick={() => navigate('/catalog')} className="text-[#D9BB73] uppercase tracking-[0.2em] text-xs hover:text-white transition-colors border-b border-[#D9BB73] pb-1">
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
    <div className="bg-[#0F0F0F] min-h-screen py-24 selection:bg-[#D9BB73] selection:text-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <button 
          onClick={() => navigate('/catalog')}
          className="flex items-center text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-[#D9BB73] transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
        </button>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 xl:gap-x-24">
          
          {/* Left: Image Gallery */}
          <div className="flex flex-col mb-16 lg:mb-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full aspect-[4/5] bg-[#1A1A1A] overflow-hidden sticky top-32"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.isBestseller && (
                <div className="absolute top-6 left-6 bg-[#D9BB73] text-[#0F0F0F] px-4 py-2 text-[10px] uppercase font-bold tracking-[0.2em]">
                  Bestseller
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
              <p className="text-[#D9BB73] text-[10px] uppercase tracking-[0.3em] font-medium mb-3">{product.brand}</p>
              <h1 className="text-4xl sm:text-5xl font-serif text-[#F9F8F6] mb-4 leading-tight">{product.name}</h1>
              <p className="text-xl text-gray-300 font-light tracking-widest mb-8">₹{product.price}</p>

              <div className="h-px bg-[#1A1A1A] w-full mb-8"></div>

              {/* Notes & Occasions Tags */}
              {product.notes && product.notes.length > 0 && (
                <div className="mb-6">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Key Notes</span>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.map(note => (
                      <span key={note} className="px-3 py-1 border border-[#1A1A1A] text-xs text-gray-400 tracking-wider">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.occasions && product.occasions.length > 0 && (
                <div className="mb-8">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Perfect For</span>
                  <div className="flex flex-wrap gap-2">
                    {product.occasions.map(occ => (
                      <span key={occ} className="px-3 py-1 bg-[#1A1A1A] text-xs text-gray-300 tracking-wider">
                        {occ}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="flex space-x-4 mb-12">
                <div className="flex items-center justify-between border border-[#1A1A1A] w-32 px-4 py-4 text-[#F9F8F6]">
                  <button onClick={() => setLocalQuantity(Math.max(1, localQuantity - 1))} className="text-gray-500 hover:text-[#D9BB73]">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm tracking-widest">{localQuantity}</span>
                  <button onClick={() => setLocalQuantity(localQuantity + 1)} className="text-gray-500 hover:text-[#D9BB73]">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#D9BB73] text-[#0F0F0F] flex items-center justify-center text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white transition-colors duration-300"
                >
                  Add To Bag
                </button>
              </div>

              {/* Accordions */}
              <div className="border-t border-[#1A1A1A]">
                
                <div className="border-b border-[#1A1A1A]">
                  <button 
                    onClick={() => setActiveAccordion(activeAccordion === 'description' ? '' : 'description')}
                    className="w-full flex justify-between items-center py-6 text-left group"
                  >
                    <span className="uppercase tracking-[0.2em] text-xs text-[#F9F8F6] group-hover:text-[#D9BB73] transition-colors">The Description</span>
                    {activeAccordion === 'description' ? <ChevronDown className="w-4 h-4 text-[#D9BB73]" /> : <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#D9BB73]" />}
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'description' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-gray-400 font-light text-sm leading-relaxed">
                          {product.description} A masterclass in olfactory architecture. This exquisite formulation is blended with the rarest raw materials, meticulously aged to perfection to ensure extraordinary longevity and sillage on the skin. Every spritz evokes a profound sense of luxury and sophistication, establishing an unforgettable aura that lingers long after you leave the room.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="border-b border-[#1A1A1A]">
                  <button 
                    onClick={() => setActiveAccordion(activeAccordion === 'ingredients' ? '' : 'ingredients')}
                    className="w-full flex justify-between items-center py-6 text-left group"
                  >
                    <span className="uppercase tracking-[0.2em] text-xs text-[#F9F8F6] group-hover:text-[#D9BB73] transition-colors">Ingredients & Composition</span>
                    {activeAccordion === 'ingredients' ? <ChevronDown className="w-4 h-4 text-[#D9BB73]" /> : <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#D9BB73]" />}
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'ingredients' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-gray-400 font-light text-sm leading-relaxed">
                          Alcohol Denat., Parfum (Fragrance), Aqua (Water), Ethylhexyl Methoxycinnamate, Hexyl Cinnamal, 
                          Butyl Methoxydibenzoylmethane, Ethylhexyl Salicylate, Linalool, Hydroxycitronellal, Geraniol, 
                          Citronellol, Limonene, Alpha-Isomethyl Ionone, Bht, Eugenol, Citral. <br/><br/>
                          <span className="italic text-xs text-gray-500">100% Vegan & Cruelty-Free. Formulated without parabens or phthalates.</span>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="border-b border-[#1A1A1A]">
                  <button 
                    onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')}
                    className="w-full flex justify-between items-center py-6 text-left group"
                  >
                    <span className="uppercase tracking-[0.2em] text-xs text-[#F9F8F6] group-hover:text-[#D9BB73] transition-colors">Complimentary Shipping & Returns</span>
                    {activeAccordion === 'shipping' ? <ChevronDown className="w-4 h-4 text-[#D9BB73]" /> : <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#D9BB73]" />}
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'shipping' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <ul className="pb-6 text-gray-400 font-light text-sm leading-relaxed list-disc list-inside space-y-2">
                          <li>Complimentary express delivery on all orders over ₹15,000.</li>
                          <li>Every order arrives in our signature Antilia gift box.</li>
                          <li>To ensure exceptional customer experience, complimentary returns are accepted within 30 days of purchase, provided the seal remains intact.</li>
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
