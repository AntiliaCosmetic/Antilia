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
    <div className="bg-[var(--color-brand-silk-white)] text-[var(--color-brand-charcoal)] selection:bg-[var(--color-brand-rose-gold-light)] selection:text-[var(--color-brand-charcoal)] overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden glow-hero">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/Antilia/assets/products/hero.jpg" 
            alt="Luxury Skincare" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-silk-white)] via-transparent to-white/30" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <p className="text-[var(--color-brand-rose-gold-dark)] text-xs md:text-sm font-medium tracking-[0.4em] uppercase mb-6">Boutique Skin Rituals</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[var(--color-brand-charcoal)] tracking-tight leading-tight mb-8">
              The Silk <span className="italic secondary-serif text-[var(--color-brand-rose-gold-dark)]">Glow</span> <br/>Experience
            </h1>
            <p className="text-[var(--color-brand-muted)] font-light text-sm md:text-lg tracking-widest max-w-2xl mx-auto mb-12 leading-relaxed secondary-serif">
              Discover a meticulously curated collection of clinical-grade skincare, crafted to define your most radiant self.
            </p>
            
            <button 
              onClick={() => navigate('/catalog')}
              className="btn-primary group flex items-center mx-auto"
            >
              Shop The Collection
              <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Shop By Collection */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Seasonal Collections</h2>
            <div className="w-12 h-px bg-[var(--color-brand-rose-gold)] mx-auto mb-4"></div>
            <p className="text-[var(--color-brand-muted)] text-xs tracking-[0.2em] uppercase">Targeted Science for your skin</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'Serums', img: '/Antilia/assets/products/p1.jpg' },
              { name: 'Creams', img: '/Antilia/assets/products/p2.jpg' },
              { name: 'Oils', img: '/Antilia/assets/products/p3.jpg' },
              { name: 'Masks', img: '/Antilia/assets/products/p7.jpg' }
            ].map((cat, idx) => {

              return (
                <motion.div 
                  key={cat.name} 
                  variants={itemVariants}
                  onClick={() => navigate('/catalog')}
                  className={`group relative h-[450px] overflow-hidden cursor-pointer ${idx === 0 || idx === 3 ? 'md:col-span-2' : 'col-span-1'}`}
                >
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10">
                    <h3 className="text-3xl font-serif text-white group-hover:text-[var(--color-brand-rose-gold-light)] transition-colors">{cat.name}</h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-300 mt-3 flex items-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Explore Ritual <ArrowRight className="w-3 h-3 ml-2" />
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* 3. Iconic Bestsellers */}
      <section className="py-24 bg-white border-y border-[var(--color-brand-rose-gold-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="text-[var(--color-brand-rose-gold-dark)] text-[10px] tracking-[0.3em] uppercase mb-3">Curated Selection</p>
              <h2 className="text-3xl md:text-5xl font-serif text-[var(--color-brand-charcoal)]">The Gold Standard</h2>
            </div>
            <button 
              onClick={() => navigate('/catalog')}
              className="hidden md:flex text-xs uppercase tracking-[0.2em] text-[var(--color-brand-muted)] hover:text-[var(--color-brand-rose-gold-dark)] items-center transition-colors pb-1 border-b border-transparent hover:border-[var(--color-brand-rose-gold-dark)]"
            >
              View Global Bestsellers <ArrowRight className="w-3 h-3 ml-2" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {bestsellers.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col luxury-card p-4"
              >
                <div 
                  className="aspect-[4/5] w-full overflow-hidden bg-[var(--color-brand-silk-white)] relative mb-8 cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-full bg-white/90 backdrop-blur-sm border border-[var(--color-brand-rose-gold-dark)] text-[var(--color-brand-charcoal)] py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--color-brand-rose-gold-dark)] hover:text-white transition-all duration-300 flex justify-center items-center shadow-lg"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Quick Add
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-[var(--color-brand-rose-gold-dark)] mb-2 font-bold">{product.category}</p>
                  <h3 className="text-xl font-serif text-[var(--color-brand-charcoal)] mb-3 group-hover:text-[var(--color-brand-rose-gold-dark)] transition-colors cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                    {product.name}
                  </h3>
                  <p className="text-sm font-light text-[var(--color-brand-muted)] tracking-widest secondary-serif italic">₹{product.price.toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Science of Ingredients */}
      <section className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">The Potent Science</h2>
          <div className="w-12 h-px bg-[var(--color-brand-rose-gold)] mx-auto mb-4"></div>
          <p className="text-[var(--color-brand-muted)] text-xs tracking-[0.2em] uppercase">Shop by Key Ingredient</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {[
            { name: 'Retinol', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400' },
            { name: 'Vitamin C', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400' },
            { name: 'Hyaluronic', img: 'https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?auto=format&fit=crop&q=80&w=400' },
            { name: 'Squalane', img: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=400' },
            { name: 'Peptides', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400' },
          ].map((note, i) => (
            <div key={note.name} className="group cursor-pointer text-center" onClick={() => navigate('/catalog')}>
              <div className="aspect-square rounded-full overflow-hidden mb-6 border border-[var(--color-brand-rose-gold-light)] group-hover:border-[var(--color-brand-rose-gold-dark)] transition-all duration-700 relative">
                <img src={note.img} alt={note.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0" />
              </div>
              <h4 className="text-sm tracking-[0.2em] uppercase text-[var(--color-brand-charcoal)] group-hover:text-[var(--color-brand-rose-gold-dark)] transition-colors font-medium">{note.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Luxora Bespoke (B2B/Corporate Equivalent) */}
      <section className="relative py-32 bg-[var(--color-brand-charcoal)] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p className="text-[var(--color-brand-rose-gold)] text-xs font-bold tracking-[0.3em] uppercase mb-6">Atelier Antilia</p>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">Your Signature <span className="italic secondary-serif">Ritual</span></h2>
          <p className="text-gray-400 font-light text-sm md:text-lg mb-12 max-w-2xl mx-auto tracking-wide leading-relaxed secondary-serif">
            Partner with our clinical dermatologists to design bespoke skincare regimens personalized to your unique DNA. A truly unique identity crafted from the world's most potent botanical actives.
          </p>
          <button className="bg-[var(--color-brand-rose-gold-dark)] text-white px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[var(--color-brand-charcoal)] transition-all duration-500 shadow-xl">
            Request Skin Analysis
          </button>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">The Society Speaks</h2>
          <div className="w-12 h-px bg-[var(--color-brand-rose-gold)] mx-auto mb-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initialTestimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-10 relative flex flex-col luxury-card"
            >
              <div className="flex space-x-1 text-[var(--color-brand-rose-gold-dark)] mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-serif text-[var(--color-brand-charcoal)] text-xl leading-relaxed flex-grow italic mb-8 secondary-serif">
                "{testimonial.text}"
              </p>
              <div>
                <h4 className="text-[var(--color-brand-charcoal)] text-sm tracking-widest uppercase mb-1 font-bold">{testimonial.name}</h4>
                <p className="text-[var(--color-brand-muted)] text-[10px] uppercase tracking-[0.2em]">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
