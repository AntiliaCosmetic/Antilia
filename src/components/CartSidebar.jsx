import { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import CheckoutSuccess from './CheckoutSuccess';

const CartSidebar = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, placeOrder } = useContext(StoreContext);
  const [showConfetti, setShowConfetti] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    placeOrder();
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setIsCartOpen(false);
    }, 4000);
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
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 max-w-md w-full bg-[#0F0F0F] border-l border-[#1A1A1A] shadow-2xl z-50 flex flex-col"
            >
              <div className="px-6 py-6 border-b border-[#1A1A1A] flex items-center justify-between">
                <h2 className="text-2xl font-serif text-[#F9F8F6]">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-800 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                    <p className="font-serif text-lg">Your cart is empty.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 uppercase tracking-widest text-sm border-b border-[#D9BB73] text-[#D9BB73] pb-1"
                    >
                      Discover Collection
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-6">
                    {cart.map((item) => (
                      <li key={item.id} className="flex py-2">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex justify-between text-base font-medium text-[#F9F8F6]">
                              <h3 className="font-serif">{item.name}</h3>
                              <p className="ml-4 font-light tracking-widest text-[#D9BB73]">₹{item.price}</p>
                            </div>
                            <p className="mt-1 text-xs uppercase tracking-widest text-gray-500">{item.brand}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {item.quantity}</p>

                            <div className="flex">
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="font-medium text-red-500 hover:text-red-400 flex items-center"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-gray-200 px-6 py-6 bg-white">
                  <div className="flex justify-between text-lg font-serif font-medium text-gray-900 mb-4">
                    <p>Subtotal</p>
                    <p>₹{subtotal.toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      className="w-full flex items-center justify-center rounded-md border border-transparent bg-[#0F0F0F] px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-gray-800 transition-colors uppercase tracking-widest"
                    >
                      Place Order
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
