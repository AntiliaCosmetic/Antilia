import { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import CheckoutSuccess from './CheckoutSuccess';

const CartSidebar = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, placeOrder } = useContext(StoreContext);
  const [showConfetti, setShowConfetti] = useState(false);
  const [step, setStep] = useState('bag'); // bag, address, payment
  const [address, setAddress] = useState({ name: '', street: '', city: '', zip: '' });
  const [payment, setPayment] = useState({ card: '', expiry: '', cvv: '' });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const resetSidebar = () => {
    setIsCartOpen(false);
    setTimeout(() => {
        setStep('bag');
        setShowConfetti(false);
    }, 400);
  };

  const handleCheckout = () => {
    if (step === 'bag') {
      if (cart.length === 0) return;
      setStep('address');
    } else if (step === 'address') {
      setStep('payment');
    } else if (step === 'payment') {
      placeOrder();
      setShowConfetti(true);
      setTimeout(() => {
        resetSidebar();
      }, 4000);
    }
  };

  const handleBack = () => {
    if (step === 'address') setStep('bag');
    if (step === 'payment') setStep('address');
  };

  return (
    <>
      {showConfetti && <CheckoutSuccess />}
      
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={resetSidebar}
              className="fixed inset-0 bg-[var(--color-brand-charcoal)] backdrop-blur-sm z-50"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 max-w-md w-full bg-[var(--color-brand-silk-white)]/90 backdrop-blur-xl border-l border-[var(--color-brand-rose-gold-light)] shadow-[0_0_50px_rgba(0,0,0,0.1)] z-50 flex flex-col"
            >
              <div className="px-8 py-8 border-b border-[var(--color-brand-rose-gold-light)] flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-[var(--color-brand-charcoal)] uppercase tracking-[0.2em] mb-1">
                    {step === 'bag' ? 'Your Bag' : step === 'address' ? 'Shipping' : 'Payment'}
                  </h2>
                  <p className="text-[10px] text-[var(--color-brand-rose-gold-dark)] uppercase tracking-widest font-black">Step {step === 'bag' ? '1' : step === 'address' ? '2' : '3'} of 3</p>
                </div>
                <button onClick={resetSidebar} className="text-[var(--color-brand-muted)] hover:text-[var(--color-brand-charcoal)] transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <AnimatePresence mode='wait'>
                  {step === 'bag' && (
                    <motion.div
                      key="bag"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="h-full"
                    >
                      {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-[var(--color-brand-muted)]">
                          <ShoppingBag className="w-20 h-20 mb-6 opacity-10" />
                          <p className="font-serif text-xl secondary-serif italic">Your bag is empty.</p>
                          <button 
                            onClick={resetSidebar}
                            className="mt-8 uppercase tracking-[0.2em] text-xs border-b border-[var(--color-brand-rose-gold-dark)] text-[var(--color-brand-rose-gold-dark)] pb-1 hover:text-[var(--color-brand-charcoal)] hover:border-[var(--color-brand-charcoal)] transition-colors"
                          >
                            Begin Your Ritual
                          </button>
                        </div>
                      ) : (
                        <ul className="space-y-8">
                          {cart.map((item) => (
                            <li key={item.id} className="flex py-4 group">
                              <div className="h-28 w-24 flex-shrink-0 overflow-hidden luxury-card">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                                />
                              </div>

                              <div className="ml-6 flex flex-1 flex-col justify-between">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-[var(--color-brand-charcoal)]">
                                    <h3 className="font-serif text-lg">{item.name}</h3>
                                    <p className="ml-4 font-light tracking-widest text-[var(--color-brand-rose-gold-dark)]">₹{item.price.toLocaleString()}</p>
                                  </div>
                                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-brand-rose-gold-dark)] font-black">{item.category}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-[var(--color-brand-muted)] text-[10px] uppercase tracking-widest font-medium">Qty {item.quantity}</p>

                                  <div className="flex">
                                    <button
                                      type="button"
                                      onClick={() => removeFromCart(item.id)}
                                      className="font-black text-[10px] uppercase tracking-widest text-[var(--color-brand-muted)] hover:text-red-600 flex items-center transition-colors"
                                    >
                                      <Trash2 className="w-3 h-3 mr-2" />
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  )}

                  {step === 'address' && (
                    <motion.div
                      key="address"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-brand-rose-gold-dark)] mb-8 border-b border-[var(--color-brand-rose-gold-light)] pb-3">Shipping Details</h3>
                      <div className="space-y-4">
                        {['name', 'street', 'city', 'zip'].map((field) => (
                          <div key={field}>
                            <label className="block text-[10px] uppercase tracking-widest text-[var(--color-brand-muted)] mb-2 font-bold">{field}</label>
                            <input
                              type="text"
                              value={address[field]}
                              onChange={(e) => setAddress({...address, [field]: e.target.value})}
                              placeholder={`Enter your ${field}`}
                              className="w-full bg-white/50 border border-[var(--color-brand-rose-gold-light)] p-4 text-sm focus:outline-none focus:border-[var(--color-brand-rose-gold-dark)] transition-colors placeholder:text-[var(--color-brand-rose-gold-light)]"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 'payment' && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-brand-rose-gold-dark)] mb-8 border-b border-[var(--color-brand-rose-gold-light)] pb-3">Payment Simulation</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-[var(--color-brand-muted)] mb-2 font-bold">Card Number</label>
                          <input
                            type="text"
                            value={payment.card}
                            onChange={(e) => setPayment({...payment, card: e.target.value})}
                            placeholder="XXXX XXXX XXXX XXXX"
                            className="w-full bg-white/50 border border-[var(--color-brand-rose-gold-light)] p-4 text-sm focus:outline-none focus:border-[var(--color-brand-rose-gold-dark)] transition-colors placeholder:text-[var(--color-brand-rose-gold-light)]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-[var(--color-brand-muted)] mb-2 font-bold">Expiry</label>
                            <input
                              type="text"
                              value={payment.expiry}
                              onChange={(e) => setPayment({...payment, expiry: e.target.value})}
                              placeholder="MM/YY"
                              className="w-full bg-white/50 border border-[var(--color-brand-rose-gold-light)] p-4 text-sm focus:outline-none focus:border-[var(--color-brand-rose-gold-dark)] transition-colors placeholder:text-[var(--color-brand-rose-gold-light)]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-[var(--color-brand-muted)] mb-2 font-bold">CVV</label>
                            <input
                              type="password"
                              value={payment.cvv}
                              onChange={(e) => setPayment({...payment, cvv: e.target.value})}
                              placeholder="***"
                              className="w-full bg-white/50 border border-[var(--color-brand-rose-gold-light)] p-4 text-sm focus:outline-none focus:border-[var(--color-brand-rose-gold-dark)] transition-colors placeholder:text-[var(--color-brand-rose-gold-light)]"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-[var(--color-brand-silk-white)] border border-dashed border-[var(--color-brand-rose-gold-dark)] mt-8">
                        <p className="text-[10px] text-[var(--color-brand-rose-gold-dark)] tracking-wider uppercase leading-relaxed text-center font-bold">Secure Luxury Transaction Enabled</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {cart.length > 0 && (
                <div className="border-t border-[var(--color-brand-rose-gold-light)] px-8 py-8 bg-white/50 backdrop-blur-md">
                  <div className="flex justify-between text-xl font-serif font-medium text-[var(--color-brand-charcoal)] mb-6">
                    <p>Subtotal</p>
                    <p className="secondary-serif">₹{subtotal.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex space-x-4">
                    {step !== 'bag' && (
                      <button
                        onClick={handleBack}
                        className="w-1/3 border border-[var(--color-brand-rose-gold-light)] py-4 text-[10px] uppercase tracking-widest text-[var(--color-brand-muted)] hover:text-[var(--color-brand-charcoal)] hover:border-[var(--color-brand-charcoal)] transition-colors font-bold"
                      >
                        Back
                      </button>
                    )}
                    <button
                      onClick={handleCheckout}
                      disabled={showConfetti}
                      className={`btn-primary flex-1 ${showConfetti ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {step === 'bag' ? 'Secure Ritual' : step === 'address' ? 'To Payment' : 'Confirm Order'}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartSidebar;
