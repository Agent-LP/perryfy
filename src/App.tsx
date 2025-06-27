import React from 'react';
import './App.css';
import { LandingPage } from './pages/LandingPage';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <HomePage/>
    </>
  );
}

export default App;
