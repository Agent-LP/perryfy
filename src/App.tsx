import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
