import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Settings from 'src/pages/Settings';
import BrandList from './pages/BrandList';
import CommodityList from './pages/CommodityList';
import AddProduct from './pages/Product/add-product';
import VendorComponent from './pages/Vendor/index';
import AddVendorPage from './pages/Vendor/add-vendor';

const routes = (isLoggedIn) => [
  {
    path: '/app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'brands', element: <BrandList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'vendors', element: <VendorComponent /> },
      { path: 'vendors/add', element: <AddVendorPage /> },

      {
        path: 'commodities',
        element: <CommodityList />,
        // children: [
        //   { path: 'add', element: <AddProduct /> },
        // ]
      },
      { path: 'products/add', element: <AddProduct /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/dashboard" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> }
    ],
  },
];

export default routes;
