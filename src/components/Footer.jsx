import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[var(--color-brand-charcoal)] border-t border-[var(--color-brand-rose-gold-light)] pt-24 pb-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-3xl font-serif mb-8 text-[var(--color-brand-rose-gold)]">Antilia</h3>
            <p className="text-gray-400 text-xs tracking-widest leading-relaxed secondary-serif">
              Meticulously curated clinical-grade skincare, crafted to define your most radiant self. Science-backed, luxury-driven.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-[var(--color-brand-rose-gold-light)]">The House</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-light tracking-wide">
              <li><Link to="/catalog" className="hover:text-[var(--color-brand-rose-gold)] transition-colors">The Collection</Link></li>
              <li><Link to="#" className="hover:text-[var(--color-brand-rose-gold)] transition-colors">Dermal Analysis</Link></li>
              <li><Link to="#" className="hover:text-[var(--color-brand-rose-gold)] transition-colors">Sustainability</Link></li>
              <li><Link to="#" className="hover:text-[var(--color-brand-rose-gold)] transition-colors">Our Atelier</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-[var(--color-brand-rose-gold-light)]">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-light tracking-wide">
              <li><a href="#" className="hover:text-[var(--color-brand-rose-gold)] transition-colors">Concierge</a></li>
              <li><a href="#" className="hover:text-[var(--color-brand-rose-gold)] transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-[var(--color-brand-rose-gold)] transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-[var(--color-brand-rose-gold)] transition-colors">Boutique Locator</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-[var(--color-brand-rose-gold-light)]">Journal</h4>
            <p className="text-gray-400 text-xs mb-6 leading-relaxed font-light secondary-serif">
              Join our society for exclusive access to advanced skin rituals and new launches.
            </p>
            <div className="flex border-b border-gray-700 pb-2 group focus-within:border-[var(--color-brand-rose-gold)] transition-colors">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-none outline-none flex-grow text-sm text-white placeholder-gray-600 font-light"
              />
              <button className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-brand-rose-gold)] hover:text-white transition-colors font-bold">Inquire</button>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 font-medium uppercase tracking-[0.3em]">
          <p>&copy; {new Date().getFullYear()} ANTILIA COSMETICS. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-10 mt-6 md:mt-0">
            <a href="#" className="hover:text-[var(--color-brand-rose-gold)] transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-[var(--color-brand-rose-gold)] transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-[var(--color-brand-rose-gold)] transition-colors"><Facebook className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
