import { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { initialTestimonials } from '../data/mockData';
import { ArrowRight, Star, Plus } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { products, addToCart } = useContext(StoreContext);

  const bestsellers = products.filter(p => p.isBestseller).slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#0F0F0F] text-[#F9F8F6] selection:bg-[#D9BB73] selection:text-[#0F0F0F] overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Perfume" 
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-black/30" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <p className="text-[#D9BB73] text-xs md:text-sm font-medium tracking-[0.4em] uppercase mb-6">Maison de Parfumerie</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-tight mb-8">
              The Essence of <br/><span className="italic text-[#D9BB73]">Elegance</span>
            </h1>
            <p className="text-gray-300 font-light text-sm md:text-lg tracking-widest max-w-2xl mx-auto mb-12 leading-relaxed">
              Discover a meticulously curated collection of authentic, rare, and niche fragrances crafted to define your signature aura.
            </p>
            
            <button 
              onClick={() => navigate('/catalog')}
              className="glass-panel text-white hover:bg-[#D9BB73] hover:text-[#0F0F0F] border-[#D9BB73]/50 transition-all duration-500 uppercase tracking-[0.3em] text-xs px-10 py-5 font-semibold group flex items-center mx-auto"
            >
              Shop The Collection
              <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Shop By Category */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Scent Profiles</h2>
            <div className="w-12 h-px bg-[#D9BB73] mx-auto mb-4"></div>
            <p className="text-gray-400 text-xs tracking-[0.2em] uppercase">Find your perfect category</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Oriental', 'Floral', 'Woody', 'Fresh'].map((cat, idx) => {
              const bgImages = {
                'Oriental': 'https://images.unsplash.com/photo-1608528577891-eb0559ec3ea0?auto=format&fit=crop&q=80&w=800',
                'Floral': 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&q=80&w=800',
                'Woody': 'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&q=80&w=800',
                'Fresh': 'https://images.unsplash.com/photo-1550005740-4cb50f6d538e?auto=format&fit=crop&q=80&w=800'
              };
              return (
                <motion.div 
                  key={cat} 
                  variants={itemVariants}
                  onClick={() => navigate('/catalog')}
                  className={`group relative h-80 overflow-hidden cursor-pointer ${idx === 0 || idx === 3 ? 'md:col-span-2' : 'col-span-1'}`}
                >
                  <img 
                    src={bgImages[cat]} 
                    alt={cat} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-40" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <h3 className="text-2xl font-serif text-white group-hover:text-[#D9BB73] transition-colors">{cat}</h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-2 flex items-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Explore <ArrowRight className="w-3 h-3 ml-2" />
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* 3. Iconic Bestsellers */}
      <section className="py-24 bg-[#141414] border-y border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="text-[#D9BB73] text-[10px] tracking-[0.3em] uppercase mb-3">Curated Selection</p>
              <h2 className="text-3xl md:text-5xl font-serif text-white">Iconic Bestsellers</h2>
            </div>
            <button 
              onClick={() => navigate('/catalog')}
              className="hidden md:flex text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-[#D9BB73] items-center transition-colors pb-1 border-b border-transparent hover:border-[#D9BB73]"
            >
              View All <ArrowRight className="w-3 h-3 ml-2" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col"
              >
                <div 
                  className="aspect-[3/4] w-full overflow-hidden bg-[#0F0F0F] relative mb-6 cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-full bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#D9BB73]/50 text-[#F9F8F6] py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[#D9BB73] hover:text-[#0F0F0F] transition-colors flex justify-center items-center"
                    >
                      <Plus className="w-3 h-3 mr-2" /> Quick Add
                    </button>
                  </div>
                </div>
                <div className="text-center px-2">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-gray-500 mb-1">{product.brand}</p>
                  <h3 className="text-lg font-serif text-white mb-2 group-hover:text-[#D9BB73] transition-colors cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                    {product.name}
                  </h3>
                  <p className="text-xs font-light text-gray-400 tracking-widest">₹{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <button 
            onClick={() => navigate('/catalog')}
            className="md:hidden mt-12 w-full text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-[#D9BB73] flex justify-center items-center py-4 border border-[#1A1A1A]"
          >
            View All Bestsellers <ArrowRight className="w-3 h-3 ml-2" />
          </button>
        </div>
      </section>

      {/* 4. Shop by Notes (Ingredients equivalent) */}
      <section className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">The Olfactory Palette</h2>
          <div className="w-12 h-px bg-[#D9BB73] mx-auto mb-4"></div>
          <p className="text-gray-400 text-xs tracking-[0.2em] uppercase">Shop by Key Notes</p>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar space-x-6 pb-8 snap-x">
          {[
            { name: 'Oud', img: 'https://images.unsplash.com/photo-1610461888750-10bfc601b874?auto=format&fit=crop&q=80&w=400' },
            { name: 'Vanilla', img: 'https://images.unsplash.com/photo-1608985161093-690226cbaae1?auto=format&fit=crop&q=80&w=400' },
            { name: 'Rose', img: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&q=80&w=400' },
            { name: 'Bergamot', img: 'https://images.unsplash.com/photo-1613204918239-0153ab7ee83a?auto=format&fit=crop&q=80&w=400' },
            { name: 'Patchouli', img: 'https://images.unsplash.com/photo-1540324888062-09439bdffcfc?auto=format&fit=crop&q=80&w=400' },
          ].map((note, i) => (
            <div key={note.name} className="snap-start flex-shrink-0 w-48 group cursor-pointer" onClick={() => navigate('/catalog')}>
              <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border border-[#1A1A1A] group-hover:border-[#D9BB73] transition-colors duration-500 relative">
                <img src={note.img} alt={note.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
              </div>
              <h4 className="text-center text-sm tracking-[0.2em] uppercase text-gray-300 group-hover:text-white transition-colors">{note.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Bespoke Services (B2B/Corporate Equivalent) */}
      <section className="relative py-32 bg-[#1A1A1A] overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1557008890-a54101e4bb25?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#D9BB73] text-xs font-bold tracking-[0.3em] uppercase mb-6">Atelier Antilia</p>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">Create Your Signature Scent</h2>
          <p className="text-gray-300 font-light text-sm md:text-lg mb-12 max-w-2xl mx-auto tracking-wide leading-relaxed">
            Partner with our master perfumers to design bespoke fragrances for yourself, your luxury hotel, or corporate gifting. A truly unique olfactory identity crafted from the world's most precious ingredients.
          </p>
          <button className="bg-[#D9BB73] text-[#0F0F0F] px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors">
            Book a Consultation
          </button>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">The Society Speaks</h2>
          <div className="w-12 h-px bg-[#D9BB73] mx-auto mb-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initialTestimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel-dark p-10 relative flex flex-col border border-[#1A1A1A]"
            >
              <div className="flex space-x-1 text-[#D9BB73] mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-serif text-gray-300 text-lg leading-relaxed flex-grow italic mb-8">
                "{testimonial.text}"
              </p>
              <div>
                <h4 className="text-white text-sm tracking-wider uppercase mb-1">{testimonial.name}</h4>
                <p className="text-[#D9BB73] text-[9px] uppercase tracking-[0.2em]">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
