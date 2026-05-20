import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem'; 

export default function ProductList({ handleNavigateHome }) {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false); 
  
  const cartItems = useSelector(state => state.cart.items);
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", icon: "🪴", cost: 15, description: "Thrives on neglect and purifies indoor air efficiently." },
        { name: "Spider Plant", icon: "🌿", cost: 12, description: "Excellent at removing formaldehyde from living areas." }
      ]
    },
    {
      category: "Aromatic & Fragrant",
      plants: [
        { name: "Lavender", icon: "🪻", cost: 18, description: "Calming scent that promotes deeper sleep and relaxation." },
        { name: "Jasmine", icon: "🌸", cost: 22, description: "Sweet, exotic fragrance that blooms beautifully indoors." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem({
      name: plant.name,
      image: plant.icon,
      cost: plant.cost
    }));
  };

  if (showCart) {
    return <CartItem onContinueShopping={() => setShowCart(false)} />;
  }

  return (
    <div className="product-list-container">
      <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#2e7d32', color: 'white' }}>
        <div className="nav-logo" onClick={handleNavigateHome} style={{ cursor: 'pointer', fontSize: '1.5rem', fontWeight: 'bold' }}>
          🌿 Paradise Nursery
        </div>
        <div 
          className="nav-cart" 
          onClick={() => setShowCart(true)} 
          style={{ fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}
        >
          🛒 Cart: <span className="cart-badge" style={{ background: '#e65100', padding: '2px 8px', borderRadius: '50%' }}>{totalCartCount}</span>
        </div>
      </nav>

      <div className="catalog-content" style={{ padding: '30px' }}>
        {plantsArray.map((group, index) => (
          <div key={index} className="category-section" style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#2e7d32', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>{group.category}</h2>
            <div className="plants-grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
              {group.plants.map((plant, pIndex) => {
                const isInCart = cartItems.some(item => item.name === plant.name);
                
                return (
                  <div key={pIndex} className="plant-card" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', width: '250px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '10px' }}>{plant.icon}</div>
                    <h3 style={{ margin: '10px 0' }}>{plant.name}</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', height: '60px' }}>{plant.description}</p>
                    {/* Currency updated to South African Rands */}
                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '15px' }}>R{plant.cost}</div>
                    <button 
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart}
                      style={{ 
                        background: isInCart ? '#9e9e9e' : '#2e7d32', 
                        color: 'white', 
                        border: 'none', 
                        padding: '10px 15px', 
                        borderRadius: '4px', 
                        cursor: isInCart ? 'not-allowed' : 'pointer',
                        width: '100%'
                      }}
                    >
                      {isInCart ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}