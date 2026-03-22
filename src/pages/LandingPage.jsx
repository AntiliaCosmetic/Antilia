import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const slides = [
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1600',
  'https://images.unsplash.com/photo-1615397323136-bd06aa3fb524?auto=format&fit=crop&q=80&w=1600',
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1600'
];

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLogin, setIsLogin] = useState(true);
  const { login, currentUser } = useContext(StoreContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/catalog');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0F0F0F] text-white overflow-hidden">
      {/* Left Column - Auth / Welcome (Dark Editorial Theme) */}
      <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col justify-center px-8 py-20 md:px-16 lg:px-24 z-10 relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] -z-10"></div>
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#D9BB73] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 -z-10 animate-blob"></div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-md w-full mx-auto"
        >
          {currentUser ? (
            <div className="text-center">
              <h2 className="text-5xl font-serif text-[#F9F8F6] mb-6 tracking-tight leading-tight">
                Welcome,<br/>
                <span className="italic text-[#D9BB73]">{currentUser.name}</span>
              </h2>
              <p className="text-gray-400 mb-10 font-light text-lg tracking-wide">Enter the gallery and discover your signature scent.</p>
              <Link 
                to="/catalog"
                className="group relative inline-flex items-center justify-center w-full py-5 px-8 font-medium tracking-[0.2em] text-xs uppercase overflow-hidden border border-[#D9BB73]/30 hover:border-[#D9BB73] transition-colors duration-500"
              >
                <div className="absolute inset-0 w-full h-full bg-[#D9BB73] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <span className="relative z-10 text-[#F9F8F6]">The Collection</span>
                <ArrowRight className="relative z-10 ml-3 w-4 h-4 text-[#D9BB73] transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-14">
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-5xl font-serif text-[#F9F8F6] mb-4 tracking-tight"
                >
                  {isLogin ? 'Sign In' : 'Join Us'}
                </motion.h2>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "40px" }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="h-px bg-[#D9BB73] mb-4"
                ></motion.div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-gray-400 font-light tracking-wide text-sm"
                >
                  Curated luxury for the discerning.
                </motion.p>
              </div>

              <form onSubmit={handleAuth} className="space-y-8">
                {!isLogin && (
                  <div className="relative group">
                    <input
                      type="text"
                      className="block w-full py-3 bg-transparent border-b border-gray-800 focus:outline-none focus:border-[#D9BB73] transition-colors text-[#F9F8F6] placeholder-transparent peer font-light"
                      placeholder="Full Name"
                      id="fullName"
                    />
                    <label htmlFor="fullName" className="absolute left-0 top-3 text-gray-500 text-sm tracking-wide transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#D9BB73] cursor-text">
                      Full Name
                    </label>
                  </div>
                )}
                
                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full py-3 bg-transparent border-b border-gray-800 focus:outline-none focus:border-[#D9BB73] transition-colors text-[#F9F8F6] placeholder-transparent peer font-light"
                    placeholder="Email Address"
                    id="email"
                  />
                  <label htmlFor="email" className="absolute left-0 top-3 text-gray-500 text-sm tracking-wide transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#D9BB73] cursor-text">
                    Email Address
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="password"
                    className="block w-full py-3 bg-transparent border-b border-gray-800 focus:outline-none focus:border-[#D9BB73] transition-colors text-[#F9F8F6] placeholder-transparent peer font-light"
                    placeholder="Password"
                    id="password"
                  />
                  <label htmlFor="password" className="absolute left-0 top-3 text-gray-500 text-sm tracking-wide transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#D9BB73] cursor-text">
                    Password
                  </label>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full relative inline-flex items-center justify-center py-4 px-8 font-medium tracking-[0.15em] text-xs uppercase border border-[#D9BB73] hover:bg-[#D9BB73] hover:text-[#0F0F0F] transition-all duration-300 text-[#D9BB73]"
                  >
                    {isLogin ? 'Enter' : 'Register'}
                  </button>
                </div>
              </form>

              <div className="mt-10 flex flex-col items-center space-y-4">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xs text-gray-500 hover:text-[#D9BB73] transition-colors uppercase tracking-widest border-b border-transparent hover:border-[#D9BB73] pb-1"
                >
                  {isLogin ? "Create an account" : 'Already a member?'}
                </button>
                
                <Link to="/catalog" className="text-xs font-light text-[#F9F8F6] hover:text-[#D9BB73] uppercase tracking-widest transition-colors opacity-60 hover:opacity-100 flex items-center">
                  Continue as Guest <ArrowRight className="ml-1 w-3 h-3" />
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Right Column - Hero Slider (The Gallery) */}
      <div className="w-full md:w-[55%] lg:w-[60%] h-[50vh] md:h-screen relative overflow-hidden order-first md:order-last bg-[#0F0F0F]">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentSlide}
            src={slides[currentSlide]}
            alt="Luxury Fragrance"
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            animate={{ opacity: 0.85, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity"
          />
        </AnimatePresence>
        
        {/* Gradients to blend imagery seamlessly */}
        <div className="absolute inset-0 tracking-widest bg-gradient-to-r from-[#0F0F0F] via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-[#0F0F0F]/30" />
        
        {/* Floating Text Overlay over Image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="text-6xl md:text-8xl font-serif text-[#F9F8F6]/90 tracking-tighter"
          >
            Antilia
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.5 }}
            className="mt-4 text-[#D9BB73] tracking-[0.5em] text-xs uppercase"
          >
            L'Essence de Paris
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
