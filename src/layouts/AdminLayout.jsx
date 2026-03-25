import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { LogOut, PackageSearch, Users } from 'lucide-react';

const AdminLayout = () => {
  const { currentUser, logout } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-brand-silk-white)] flex flex-col font-sans">
      <header className="bg-white border-b border-[var(--color-brand-rose-gold-light)] py-4">
        <div className="max-w-[1600px] mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-[var(--color-brand-charcoal)] flex items-center justify-center rounded-sm">
                <span className="text-[var(--color-brand-rose-gold-light)] font-serif text-xl font-bold">L</span>
            </div>
            <div>
                <h1 className="text-xl font-serif text-[var(--color-brand-charcoal)] uppercase tracking-[0.2em] font-black">Antilia <span className="italic secondary-serif lowercase">Internal</span></h1>
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-right hidden sm:block">
                <p className="text-[10px] text-[var(--color-brand-muted)] uppercase tracking-widest font-bold">Operator</p>
                <p className="text-xs font-serif italic text-[var(--color-brand-charcoal)]">{currentUser?.name}</p>
            </div>
            <button 
                onClick={handleLogout}
                className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-brand-muted)] hover:text-red-600 transition-colors border border-[var(--color-brand-rose-gold-light)] px-4 py-2 hover:border-red-600"
            >
                <LogOut className="w-3 h-3 mr-2" />
                Terminal Exit
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow max-w-[1600px] mx-auto px-8 py-12 w-full">
        <Outlet />
      </main>
      
      <footer className="py-8 bg-white border-t border-[var(--color-brand-rose-gold-light)] text-center">
        <p className="text-[9px] text-[var(--color-brand-muted)] uppercase tracking-[0.5em] font-black">Antilia Command Engine v4.0 // All interactions logged</p>
      </footer>
    </div>
  );
};

export default AdminLayout;
