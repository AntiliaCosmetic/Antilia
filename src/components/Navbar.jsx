import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { StoreContext } from '../context/StoreContext';

const Navbar = () => {
  const { cart, toggleCart } = useContext(StoreContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const isHome = location.pathname === '/';

  return (
    <nav className={`w-full z-50 transition-all duration-300 ${isHome ? 'absolute top-0 left-0 bg-transparent text-[#F9F8F6]' : 'bg-[#0F0F0F]/80 backdrop-blur-md text-[#F9F8F6] border-b border-[#1A1A1A] sticky top-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center">
            <Link to="/" className="font-serif text-3xl font-bold tracking-widest uppercase">
              Antilia
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <Link to="/catalog" className={`text-sm font-light tracking-[0.2em] uppercase hover:text-[#D9BB73] transition-colors ${isHome ? 'text-white/90' : 'text-[#F9F8F6]'}`}>
              The Collection
            </Link>
            
            <button onClick={toggleCart} className="relative p-2 group">
              <ShoppingBag className={`w-5 h-5 group-hover:text-[#D9BB73] transition-colors ${isHome ? 'text-white' : 'text-[#F9F8F6]'}`} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-[#0F0F0F] transform translate-x-1/4 -translate-y-1/4 bg-[#D9BB73] rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleCart} className="relative p-2 mr-4">
              <ShoppingBag className={`w-5 h-5 ${isHome ? 'text-white' : 'text-[#F9F8F6]'}`} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-[#0F0F0F] transform translate-x-1/4 -translate-y-1/4 bg-[#D9BB73] rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              {mobileMenuOpen ? <X className={`w-6 h-6 ${isHome ? 'text-white' : 'text-[#F9F8F6]'}`} /> : <Menu className={`w-6 h-6 ${isHome ? 'text-white' : 'text-[#F9F8F6]'}`} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F0F0F] text-[#F9F8F6] absolute top-20 left-0 w-full shadow-2xl border-b border-[#1A1A1A]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/catalog" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-4 text-sm font-light tracking-[0.2em] uppercase">
              The Collection
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
