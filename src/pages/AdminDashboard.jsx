import { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Package, Users, ShoppingCart, X } from 'lucide-react';

const AdminDashboard = () => {
  const { products, orders, users, addProduct } = useContext(StoreContext);
  const [activeTab, setActiveTab] = useState('insights');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Product Form State (Enhanced for Skincare)
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: 'Antilia',
    category: 'Serum',
    price: '',
    stock: '',
    image: '',
    description: '',
    skinType: [],
    concern: [],
    ingredients: []
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    addProduct({
      ...newProduct,
      id: `p${Date.now()}`,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock, 10),
      isBestseller: false
    });
    setIsModalOpen(false);
    setNewProduct({ name: '', brand: 'Antilia', category: 'Serum', price: '', stock: '', image: '', description: '', skinType: [], concern: [], ingredients: [] });
  };

  const tabs = [
    { id: 'insights', name: 'Command Insights', icon: ShoppingCart },
    { id: 'orders', name: 'Process Rituals', icon: ShoppingCart },
    { id: 'inventory', name: 'Inventory Engine', icon: Package },
    { id: 'customers', name: 'Elite Clientele', icon: Users },
  ];

  const lowStockProducts = products.filter(p => p.stock < 10);
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-8 bg-[var(--color-brand-silk-white)] p-8 rounded-sm border border-[var(--color-brand-rose-gold-light)] shadow-sm">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-serif text-[var(--color-brand-charcoal)] uppercase tracking-tight">Command <span className="italic secondary-serif">Center</span></h1>
          <p className="text-[10px] text-[var(--color-brand-rose-gold-dark)] uppercase tracking-[0.4em] font-black mt-2">Antilia Cosmetics Operations</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-[var(--color-brand-muted)] uppercase tracking-widest font-bold">Session Active</p>
          <p className="text-xs font-serif italic text-[var(--color-brand-charcoal)] mt-1">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      {/* Quick Alerts */}
      {lowStockProducts.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 flex items-center justify-between"
        >
          <div className="flex items-center">
            <Package className="w-5 h-5 text-red-500 mr-3" />
            <p className="text-xs text-red-700 uppercase tracking-widest font-black">
              Critical Stock Alert: {lowStockProducts.length} formulations requiring immediate replenishment.
            </p>
          </div>
          <button onClick={() => setActiveTab('inventory')} className="text-[10px] text-red-500 underline uppercase tracking-widest font-bold">View Inventory</button>
        </motion.div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <div className="bg-white p-6 border border-[var(--color-brand-rose-gold-light)] luxury-card">
          <p className="text-[10px] text-[var(--color-brand-muted)] uppercase tracking-[0.3em] font-black mb-4 italic">Gross Revenue</p>
          <p className="text-3xl font-serif text-[var(--color-brand-charcoal)]">₹{(totalRevenue/1000).toFixed(1)}K</p>
          <div className="mt-4 flex items-center text-[10px] text-green-600 font-bold uppercase tracking-widest">
            <Plus className="w-3 h-3 mr-1" /> 12% vs last month
          </div>
        </div>
        <div className="bg-white p-6 border border-[var(--color-brand-rose-gold-light)] luxury-card">
          <p className="text-[10px] text-[var(--color-brand-muted)] uppercase tracking-[0.3em] font-black mb-4 italic">Active Rituals</p>
          <p className="text-3xl font-serif text-[var(--color-brand-charcoal)]">{orders.length}</p>
          <p className="mt-4 text-[10px] text-[var(--color-brand-rose-gold-dark)] font-bold uppercase tracking-widest">Orders in Processing</p>
        </div>
        <div className="bg-white p-6 border border-[var(--color-brand-rose-gold-light)] luxury-card">
          <p className="text-[10px] text-[var(--color-brand-muted)] uppercase tracking-[0.3em] font-black mb-4 italic">Client Base</p>
          <p className="text-3xl font-serif text-[var(--color-brand-charcoal)]">{users.filter(u => u.role === 'customer').length}</p>
          <p className="mt-4 text-[10px] text-[var(--color-brand-rose-gold-dark)] font-bold uppercase tracking-widest">Growth 8.2%</p>
        </div>
        <div className="bg-white p-6 border border-[var(--color-brand-rose-gold-light)] luxury-card">
          <p className="text-[10px] text-[var(--color-brand-muted)] uppercase tracking-[0.3em] font-black mb-4 italic">Avg Ritual Value</p>
          <p className="text-3xl font-serif text-[var(--color-brand-charcoal)]">₹{orders.length > 0 ? (totalRevenue/orders.length).toFixed(0) : '0'}</p>
          <p className="mt-4 text-[10px] text-[var(--color-brand-rose-gold-dark)] font-bold uppercase tracking-widest">Premium Tiers</p>
        </div>
      </div>

      <div className="bg-white border border-[var(--color-brand-rose-gold-light)] rounded-sm overflow-hidden">
        <div className="bg-white border-b border-[var(--color-brand-rose-gold-light)]">
          <nav className="-mb-px flex space-x-12 px-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center whitespace-nowrap py-6 px-1 border-b-2 font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-300
                    ${activeTab === tab.id 
                      ? 'border-[var(--color-brand-rose-gold-dark)] text-[var(--color-brand-charcoal)]' 
                      : 'border-transparent text-[var(--color-brand-muted)] hover:text-[var(--color-brand-charcoal)] hover:border-[var(--color-brand-rose-gold-light)]'
                    }
                  `}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'insights' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-[var(--color-brand-charcoal)] italic">Sales Trajectory</h3>
                  <div className="h-64 bg-[var(--color-brand-silk-white)] border border-[var(--color-brand-rose-gold-light)] flex items-end p-6 space-x-4">
                    {[40, 60, 45, 90, 100, 80, 120].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="flex-1 bg-[var(--color-brand-rose-gold-dark)]/30 hover:bg-[var(--color-brand-rose-gold-dark)] transition-colors relative group"
                      >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--color-brand-charcoal)] text-white text-[8px] py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          ₹{(h * 500).toLocaleString()}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[8px] uppercase tracking-[0.4em] text-[var(--color-brand-muted)] font-black">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-[var(--color-brand-charcoal)] italic">Demand Distribution</h3>
                  <div className="space-y-4">
                    {['Serums', 'Oils', 'Creams', 'Cleansers'].map((cat, i) => (
                      <div key={cat} className="space-y-2">
                        <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                          <span>{cat}</span>
                          <span className="text-[var(--color-brand-rose-gold-dark)]">{[45, 25, 20, 10][i]}%</span>
                        </div>
                        <div className="w-full h-1 bg-[var(--color-brand-rose-gold-light)]">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${[45, 25, 20, 10][i]}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-[var(--color-brand-rose-gold-dark)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div>
              <div className="sm:flex sm:items-center sm:justify-between mb-12">
                <div>
                  <h3 className="text-2xl font-serif text-[var(--color-brand-charcoal)]">Formulation Registry</h3>
                  <p className="mt-2 text-[10px] text-[var(--color-brand-muted)] uppercase tracking-[0.2em] font-bold">Manage clinical catalog and live stock levels.</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary px-8 py-3 text-[10px]"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Formulation
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[var(--color-brand-rose-gold-light)]">
                  <thead>
                    <tr className="bg-[var(--color-brand-silk-white)]">
                      <th className="px-6 py-4 text-left text-[10px] font-black text-[var(--color-brand-muted)] uppercase tracking-[0.3em]">Formulation</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black text-[var(--color-brand-muted)] uppercase tracking-[0.3em]">Concentration</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black text-[var(--color-brand-muted)] uppercase tracking-[0.3em]">Evaluation</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black text-[var(--color-brand-muted)] uppercase tracking-[0.3em]">Availability</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[var(--color-brand-rose-gold-light)]">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-[var(--color-brand-silk-white)]/50 transition-colors">
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-16 w-12 luxury-card overflow-hidden">
                              <img className="h-full w-full object-cover" src={product.image} alt="" />
                            </div>
                            <div className="ml-6">
                              <div className="text-sm font-serif text-[var(--color-brand-charcoal)] uppercase tracking-tight">{product.name}</div>
                              <div className="text-[10px] text-[var(--color-brand-muted)] uppercase tracking-widest font-bold mt-1">{product.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <span className="text-[10px] uppercase font-black tracking-widest text-[var(--color-brand-rose-gold-dark)] bg-[var(--color-brand-rose-gold-light)]/20 px-3 py-1 rounded-sm">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap text-sm text-[var(--color-brand-charcoal)] font-light secondary-serif italic">
                          ₹{product.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          {product.stock > 15 ? (
                            <span className="text-[10px] text-green-700 font-black uppercase tracking-[0.2em]">In Flux: {product.stock} Units</span>
                          ) : product.stock > 0 ? (
                            <span className="text-[10px] text-orange-600 font-black uppercase tracking-[0.2em] animate-pulse">Low: {product.stock} Units</span>
                          ) : (
                            <span className="text-[10px] text-red-600 font-black uppercase tracking-[0.2em]">Depleted</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 font-serif mb-6">Recent Orders</h3>
              <div className="overflow-hidden border border-gray-200 sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <li key={order.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-[#1A1A1A] truncate">Order #{order.id}</p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {order.status}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              {order.customerName}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <ShoppingCart className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              {order.items.length} items (₹{order.total.toFixed(2)})
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>
                              Placed on <time>{new Date(order.date).toLocaleDateString()}</time>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                  {orders.length === 0 && (
                    <li className="px-4 py-8 text-center text-gray-500">No orders found.</li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <h3 className="text-2xl font-serif text-[var(--color-brand-charcoal)] mb-8 uppercase tracking-widest underline decoration-[var(--color-brand-rose-gold-light)] underline-offset-8">Elite Clientele</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {users.filter(u => u.role === 'customer').map(user => (
                  <motion.div 
                    key={user.id} 
                    whileHover={{ scale: 1.02 }}
                    className="p-6 border border-[var(--color-brand-rose-gold-light)] flex items-center bg-white luxury-card"
                  >
                    <div className="h-14 w-14 rounded-full bg-[var(--color-brand-rose-gold-light)]/30 flex items-center justify-center text-[var(--color-brand-rose-gold-dark)] font-black text-xl font-serif uppercase">
                      {user.name.charAt(0)}
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="text-sm font-bold text-[var(--color-brand-charcoal)] uppercase tracking-widest">{user.name}</div>
                      <div className="text-[10px] text-[var(--color-brand-muted)] uppercase tracking-[0.2em] font-medium mt-1">{user.email}</div>
                      <div className="text-[9px] text-[var(--color-brand-rose-gold-dark)] uppercase tracking-widest font-black mt-3">Level: Diamond Member</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-brand-charcoal)]/40 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[var(--color-brand-silk-white)] rounded-sm shadow-2xl max-w-2xl w-full overflow-hidden border border-[var(--color-brand-rose-gold-light)]"
            >
              <div className="px-10 py-8 border-b border-[var(--color-brand-rose-gold-light)] flex justify-between items-center">
                <h3 className="text-2xl font-serif text-[var(--color-brand-charcoal)]">Register <span className="italic">New Formulation</span></h3>
                <button onClick={() => setIsModalOpen(false)} className="text-[var(--color-brand-muted)] hover:text-[var(--color-brand-charcoal)]">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleAddProduct} className="p-10 space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[var(--color-brand-muted)] font-black mb-2">Formulation Name</label>
                      <input type="text" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-white border border-[var(--color-brand-rose-gold-light)] p-3 text-xs focus:outline-none focus:border-[var(--color-brand-rose-gold-dark)] transition-colors uppercase tracking-widest font-bold" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[var(--color-brand-muted)] font-black mb-2">Collection</label>
                      <select required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-white border border-[var(--color-brand-rose-gold-light)] p-3 text-xs focus:outline-none focus:border-[var(--color-brand-rose-gold-dark)] transition-colors uppercase tracking-widest font-bold">
                        <option value="Serum">Serum</option>
                        <option value="Cream">Cream</option>
                        <option value="Oil">Oil</option>
                        <option value="Mask">Mask</option>
                        <option value="Cleanser">Cleanser</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-[var(--color-brand-muted)] font-black mb-2">Evaluation (₹)</label>
                        <input type="number" required min="1" step="0.01" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-white border border-[var(--color-brand-rose-gold-light)] p-3 text-xs focus:outline-none focus:border-[var(--color-brand-rose-gold-dark)] transition-colors font-bold" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-[var(--color-brand-muted)] font-black mb-2">Units</label>
                        <input type="number" required min="0" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} className="w-full bg-white border border-[var(--color-brand-rose-gold-light)] p-3 text-xs focus:outline-none focus:border-[var(--color-brand-rose-gold-dark)] transition-colors font-bold" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[var(--color-brand-muted)] font-black mb-2">Asset URL</label>
                      <input type="url" required value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} className="w-full bg-white border border-[var(--color-brand-rose-gold-light)] p-3 text-xs focus:outline-none focus:border-[var(--color-brand-rose-gold-dark)] transition-colors font-light italic" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[var(--color-brand-muted)] font-black mb-2">Formulation Logic</label>
                      <textarea rows="4" required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full bg-white border border-[var(--color-brand-rose-gold-light)] p-3 text-xs focus:outline-none focus:border-[var(--color-brand-rose-gold-dark)] transition-colors font-light leading-relaxed"></textarea>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-[var(--color-brand-rose-gold-light)] flex justify-end space-x-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-brand-muted)] hover:text-[var(--color-brand-charcoal)] font-black transition-colors">Abort</button>
                  <button type="submit" className="btn-primary px-12 py-3 text-[10px]">Secure Entry</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;
