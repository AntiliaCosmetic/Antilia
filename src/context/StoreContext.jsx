import { createContext, useState, useEffect } from 'react';
import { initialProducts, initialUsers, initialOrders } from '../data/mockData';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Initialize state from LocalStorage or use defaults
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('antilia_v4_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('antilia_v4_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('antilia_v4_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('antilia_v4_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('antilia_v4_currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('antilia_v4_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('antilia_v4_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('antilia_v4_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('antilia_v4_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('antilia_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  // Actions
  const addProduct = (product) => {
    setProducts([...products, { ...product, id: `p${Date.now()}` }]);
  };

  const updateStock = (productId, quantitySold) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, stock: Math.max(0, p.stock - quantitySold) } : p
    ));
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const placeOrder = () => {
    if (cart.length === 0) return null;
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder = {
      id: `o${Date.now()}`,
      userId: currentUser?.id || 'guest',
      customerName: currentUser?.name || 'Guest User',
      date: new Date().toISOString(),
      items: cart,
      total,
      status: 'Processing'
    };
    
    // Update local inventory
    cart.forEach(item => updateStock(item.id, item.quantity));
    
    setOrders([newOrder, ...orders]);
    clearCart();
    return newOrder;
  };

  const login = (email) => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    // Simulate signup if not found
    const newUser = { id: `u${Date.now()}`, name: email.split('@')[0], email, role: 'customer' };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const adminLogin = () => {
    const admin = users.find(u => u.role === 'admin');
    setCurrentUser(admin);
    return true;
  };

  const logout = () => setCurrentUser(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const contextValue = {
    products,
    users,
    orders,
    cart,
    currentUser,
    isCartOpen,
    setIsCartOpen,
    toggleCart,
    addProduct,
    addToCart,
    removeFromCart,
    clearCart,
    placeOrder,
    login,
    adminLogin,
    logout
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
