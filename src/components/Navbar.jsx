import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { StoreContext } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { cart, toggleCart } = useContext(StoreContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const isHome = location.pathname === '/';

  const categories = ['Oriental', 'Floral', 'Woody', 'Fresh'];

  return (
    <nav className={`w-full z-50 transition-all duration-300 ${isHome ? 'absolute top-0 left-0 bg-transparent text-[var(--color-brand-charcoal)]' : 'bg-[var(--color-brand-silk-white)]/80 backdrop-blur-md text-[var(--color-brand-charcoal)] border-b border-[var(--color-brand-rose-gold-light)] sticky top-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center">
            <Link to="/" className="font-serif text-3xl font-bold tracking-widest uppercase text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-rose-gold-dark)] transition-colors">
              Antilia
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-12">
            
            <div 
              className="relative h-20 flex items-center group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link to="/catalog" className={`flex items-center text-xs font-semibold tracking-[0.2em] uppercase hover:text-[var(--color-brand-rose-gold-dark)] transition-colors ${isHome ? 'text-[var(--color-brand-charcoal)]/90' : 'text-[var(--color-brand-charcoal)]'}`}>
                The Collection <ChevronDown className="w-3 h-3 ml-1" />
              </Link>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] bg-[var(--color-brand-silk-white)] border border-[var(--color-brand-rose-gold-light)] shadow-2xl p-8 grid grid-cols-2 gap-8"
                  >
                    <div>
                      <h3 className="text-[var(--color-brand-rose-gold-dark)] text-[10px] uppercase tracking-[0.3em] font-bold mb-6 border-b border-[var(--color-brand-rose-gold-light)] pb-2">By Category</h3>
                      <ul className="space-y-4">
                        {['Serums', 'Creams', 'Oils', 'Masks'].map(cat => (
                          <li key={cat}>
                            <Link to="/catalog" className="text-sm font-light tracking-widest text-[var(--color-brand-muted)] hover:text-[var(--color-brand-charcoal)] hover:translate-x-1 inline-block transition-transform uppercase">
                              {cat}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-[var(--color-brand-rose-gold-dark)] text-[10px] uppercase tracking-[0.3em] font-bold mb-6 border-b border-[var(--color-brand-rose-gold-light)] pb-2">Curated Highlights</h3>
                      <ul className="space-y-4">
                        <li>
                          <Link to="/catalog" className="text-sm font-light tracking-widest text-[var(--color-brand-muted)] hover:text-[var(--color-brand-charcoal)] hover:translate-x-1 inline-block transition-transform uppercase">
                            Bestsellers
                          </Link>
                        </li>
                        <li>
                          <Link to="/catalog" className="text-sm font-light tracking-widest text-[var(--color-brand-muted)] hover:text-[var(--color-brand-charcoal)] hover:translate-x-1 inline-block transition-transform uppercase">
                            New Arrivals
                          </Link>
                        </li>
                        <li>
                          <Link to="/catalog" className="text-sm font-light tracking-widest text-[var(--color-brand-muted)] hover:text-[var(--color-brand-charcoal)] hover:translate-x-1 inline-block transition-transform uppercase">
                            Essentials
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="#" className={`text-xs font-semibold tracking-[0.2em] uppercase hover:text-[var(--color-brand-rose-gold-dark)] transition-colors ${isHome ? 'text-[var(--color-brand-charcoal)]/90' : 'text-[var(--color-brand-charcoal)]'}`}>
              The Ritual
            </Link>
            
            <button onClick={toggleCart} className="relative p-2 group flex items-center">
              <span className={`text-xs font-semibold tracking-[0.2em] uppercase mr-2 hover:text-[var(--color-brand-rose-gold-dark)] transition-colors ${isHome ? 'text-[var(--color-brand-charcoal)]/90' : 'text-[var(--color-brand-charcoal)]'}`}>Bag</span>
              <ShoppingBag className={`w-4 h-4 group-hover:text-[var(--color-brand-rose-gold-dark)] transition-colors ${isHome ? 'text-[var(--color-brand-charcoal)]' : 'text-[var(--color-brand-charcoal)]'}`} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[9px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/4 bg-[var(--color-brand-rose-gold-dark)] rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleCart} className="relative p-2 mr-4">
              <ShoppingBag className={`w-5 h-5 ${isHome ? 'text-[var(--color-brand-charcoal)]' : 'text-[var(--color-brand-charcoal)]'}`} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-[var(--color-brand-rose-gold-dark)] rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              {mobileMenuOpen ? <X className={`w-6 h-6 ${isHome ? 'text-[var(--color-brand-charcoal)]' : 'text-[var(--color-brand-charcoal)]'}`} /> : <Menu className={`w-6 h-6 ${isHome ? 'text-[var(--color-brand-charcoal)]' : 'text-[var(--color-brand-charcoal)]'}`} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[var(--color-brand-silk-white)] text-[var(--color-brand-charcoal)] absolute top-20 left-0 w-full shadow-2xl border-b border-[var(--color-brand-rose-gold-light)] overflow-hidden"
          >
            <div className="px-4 py-6 space-y-6">
              <div>
                <Link to="/catalog" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-serif text-[var(--color-brand-rose-gold-dark)] mb-4">
                  The Collection
                </Link>
                <div className="pl-4 space-y-3 border-l border-[var(--color-brand-rose-gold-light)]">
                  {['Serums', 'Creams', 'Oils', 'Masks'].map(cat => (
                    <Link key={cat} to="/catalog" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-light tracking-widest text-[var(--color-brand-muted)] uppercase">
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="#" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-light tracking-[0.2em] uppercase text-[var(--color-brand-muted)]">
                The Ritual
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
