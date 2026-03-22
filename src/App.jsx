import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';
import LandingPage from './pages/LandingPage';
import CatalogPage from './pages/CatalogPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { useContext } from 'react';
import { StoreContext } from './context/StoreContext';

const AdminRoute = ({ children }) => {
  const { currentUser } = useContext(StoreContext);
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="catalog" element={<CatalogPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="login" element={<AdminLogin />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
