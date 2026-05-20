import React, { useState } from 'react';
import ProductList from './components/ProductList';
import './App.css';

export default function App() {
  // 'landing' shows the welcome page, 'products' shows the shopping store
  const [view, setView] = useState('landing'); 

  return (
    <div className="app-main">
      {view === 'landing' ? (
        <div className="hero-landing" style={{ textAlign: 'center', padding: '50px', background: '#e8f5e9', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="hero-box" style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <h1 style={{ color: '#2e7d32', fontSize: '3rem', margin: '0 0 10px 0' }}>Paradise Nursery</h1>
            <p className="subtitle" style={{ color: '#666', fontSize: '1.2rem', marginBottom: '30px' }}>Bring Nature Indoors</p>
            
            <p style={{ maxWidth: '500px', color: '#555', marginBottom: '30px', lineHeight: '1.6' }}>
              Welcome to Paradise Nursery, where green dreams come to life. We specialize in sourcing the finest air-purifying and aromatic indoor plants to transform your living spaces into vibrant, healthy sanctuaries.
            </p>

            <button 
              className="start-btn" 
              onClick={() => setView('products')}
              style={{ background: '#2e7d32', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <ProductList handleNavigateHome={() => setView('landing')} />
      )}
    </div>
  );
}