import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const CheckoutSuccess = () => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="glass-panel p-12 shadow-2xl max-w-md w-full text-center relative overflow-hidden border border-[var(--color-brand-rose-gold-light)]"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-24 h-24 mx-auto bg-[var(--color-brand-rose-gold-light)]/30 rounded-full flex items-center justify-center mb-8 border border-[var(--color-brand-rose-gold-dark)]/20"
        >
          <CheckCircle className="w-12 h-12 text-[var(--color-brand-rose-gold-dark)]" />
        </motion.div>
        
        <h2 className="text-4xl font-serif text-[var(--color-brand-charcoal)] mb-4">Ritual Confirmed</h2>
        <p className="text-[var(--color-brand-muted)] mb-10 font-light text-sm tracking-widest leading-relaxed secondary-serif uppercase">
          Your luxury skincare experience is on its way. We have received your order and our specialists are now preparing your parcel with care.
        </p>

        {/* Confetti Animation Effect (simplified with CSS/Framer) */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#D9BB73] rounded-full"
              initial={{ 
                x: '50%', y: '50%', 
                opacity: 1 
              }}
              animate={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                opacity: 0,
                scale: [1, 1.5, 0]
              }}
              transition={{ 
                duration: 1.5, 
                ease: "easeOut",
                delay: Math.random() * 0.5
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutSuccess;
