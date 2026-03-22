import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CartSidebar from '../components/CartSidebar';
import Footer from '../components/Footer';

const CustomerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative bg-[#0F0F0F]">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default CustomerLayout;
