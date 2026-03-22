import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1A1A1A] pt-16 pb-8 text-[#F9F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-serif mb-6 text-[#D9BB73]">Antilia</h3>
            <p className="text-gray-400 text-xs tracking-widest leading-relaxed">
              Meticulously curated selection of the most exquisite, authentic luxury fragrances perfectly tailored for your unique persona.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6">Explore</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-light">
              <li><a href="#/catalog" className="hover:text-[#D9BB73] transition-colors">The Collection</a></li>
              <li><a href="#" className="hover:text-[#D9BB73] transition-colors">Bestsellers</a></li>
              <li><a href="#" className="hover:text-[#D9BB73] transition-colors">Bespoke Services</a></li>
              <li><a href="#" className="hover:text-[#D9BB73] transition-colors">Journal</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6">Assistance</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-light">
              <li><a href="#" className="hover:text-[#D9BB73] transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#D9BB73] transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-[#D9BB73] transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-[#D9BB73] transition-colors">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6">Join The Society</h4>
            <p className="text-gray-400 text-xs mb-4 leading-relaxed font-light">
              Subscribe to receive updates, access to exclusive launches, and more.
            </p>
            <div className="flex border-b border-[#1A1A1A] pb-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-none outline-none flex-grow text-sm text-[#F9F8F6] placeholder-gray-500 font-light"
              />
              <button className="text-xs uppercase tracking-widest text-[#D9BB73] hover:text-white transition-colors">Subscribe</button>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-[#1A1A1A] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-light uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Antilia Parfums. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#D9BB73] transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#D9BB73] transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#D9BB73] transition-colors"><Facebook className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
