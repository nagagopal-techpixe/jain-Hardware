
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomeView from './pages/HomeView';
import ProductListView from './pages/ProductListView';
import CartView from './pages/CartView';
import { StoreProvider, useStore } from "./context/StoreContext";
import ProductDetailView from './pages/ProductDetailView';
import DashboardView from './pages/DashboardView';
import CheckoutView from './pages/CheckoutView';
import ToastContainer from './components/ui/ToastContainer';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContactPage from "./pages/ContactPage";
import AddressPage from "./pages/AddressPage"; 

const AppContent = () => {
  const { view } = useStore();

  const renderView = () => {
    switch(view) {
      case "login": return <Login />;
case "register": return <Register />;

 case "addresses": return <AddressPage />;  
      case 'home': return <HomeView />;
      case 'products': return <ProductListView />;
      case 'product-detail': return <ProductDetailView />;
      case 'cart': return <CartView />;
      case 'checkout': return <CheckoutView />;
      case 'dashboard': return <DashboardView />;
      case 'contact': return <ContactPage />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-red-100">
      <Header />
      <main className="min-h-[calc(100vh-400px)]">
         {renderView()}
      </main>
      <Footer />
      <ToastContainer />  
    </div>
  );
};

export default AppContent;
