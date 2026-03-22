import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const CheckoutSuccess = () => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="glass-panel-dark p-8 md:p-12 shadow-2xl max-w-md w-full text-center relative overflow-hidden border border-[#D9BB73]/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 mx-auto bg-[#D9BB73]/10 rounded-full flex items-center justify-center mb-6 border border-[#D9BB73]/30"
        >
          <CheckCircle className="w-10 h-10 text-[#D9BB73]" />
        </motion.div>
        
        <h2 className="text-3xl font-serif text-[#F9F8F6] mb-4">Order Confirmed</h2>
        <p className="text-gray-400 mb-8 font-light text-sm tracking-wide">
          Your luxury experience is on its way. We have received your order and will begin processing it shortly.
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
