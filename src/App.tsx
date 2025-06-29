
import './App.css';
import { LandingPage } from './pages/LandingPage';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import MerchandiserDashboardPage from './pages/MerchandiserDashboardPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <RegisterPage/>
    </>
  );
}

export default App;
