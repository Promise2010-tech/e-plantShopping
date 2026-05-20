import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem'; 

export default function ProductList({ handleNavigateHome }) {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false); 
  
  const cartItems = useSelector(state => state.cart.items);
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // 1. EXTENSIVE CATALOG: 3 Categories with 6 unique plants each (18 total)
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", icon: "🪴", cost: 15, description: "Thrives on neglect and purifies indoor air efficiently." },
        { name: "Spider Plant", icon: "🌿", cost: 12, description: "Excellent at removing formaldehyde from living areas." },
        { name: "Peace Lily", icon: "🌱", cost: 20, description: "Produces beautiful white blooms and filters airborne toxins." },
        { name: "Boston Fern", icon: "🍀", cost: 14, description: "Adds lush greenery and acts as a natural humidifier." },
        { name: "Aloe Vera", icon: "🌵", cost: 10, description: "Medicinal gel interior and purifies air at night." },
        { name: "English Ivy", icon: "🍃", cost: 16, description: "Classic climbing vine known to reduce airborne mold particles." }
      ]
    },
    {
      category: "Aromatic & Fragrant",
      plants: [
        { name: "Lavender", icon: "🪻", cost: 18, description: "Calming scent that promotes deeper sleep and relaxation." },
        { name: "Jasmine", icon: "🌸", cost: 22, description: "Sweet, exotic fragrance that blooms beautifully indoors." },
        { name: "Rosemary", icon: "🌿", cost: 15, description: "Invigorating herbal aroma that aids focus and memory." },
        { name: "Mint", icon: "🌱", cost: 11, description: "Sharp, refreshing fragrance ideal for kitchen spaces." },
        { name: "Eucalyptus", icon: "🍃", cost: 25, description: "Menthol aroma that clarifies breathing environments." },
        { name: "Gardenia", icon: "💮", cost: 28, description: "Intense, beautiful floral aroma for bright rooms." }
      ]
    },
    {
      category: "Low Maintenance & Succulents",
      plants: [
        { name: "Jade Plant", icon: "🌳", cost: 19, description: "Symbol of good luck with thick, resilient succulent leaves." },
        { name: "Zanzibar Gem", icon: "🌿", cost: 24, description: "The ultimate survivor plant, tolerates low light environments." },
        { name: "Pothos", icon: "🍃", cost: 13, description: "Fast-growing trailing vine that handles erratic watering." },
        { name: "Chinese Evergreen", icon: "🌱", cost: 21, description: "Sturdy plant with variegated leaves, happy in low light." },
        { name: "Cast Iron Plant", icon: "🌾", cost: 26, description: "Living up to its name, it survives almost any indoor condition." },
        { name: "Echeveria", icon: "🌹", cost: 9, description: "Compact, rosette-shaped succulent perfect for sunny windows." }
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

  // Switch views cleanly based on structural state
  if (showCart) {
    return <CartItem onContinueShopping={() => setShowCart(false)} />;
  }

  return (
    <div className="product-list-container">
      {/* 2. RECONCILED NAVBAR: Navigation links explicitly managing Home, Plants, and Cart */}
      <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', background: '#2e7d32', color: 'white' }}>
        <div className="nav-logo" onClick={handleNavigateHome} style={{ cursor: 'pointer', fontSize: '1.5rem', fontWeight: 'bold' }}>
          🌿 Paradise Nursery
        </div>
        
        {/* Navigation links targeting all three structural layouts */}
        <div className="nav-links" style={{ display: 'flex', gap: '30px', fontSize: '1.1rem' }}>
          <span onClick={handleNavigateHome} style={{ cursor: 'pointer', hover: { textDecoration: 'underline' } }}>Home</span>
          <span onClick={() => setShowCart(false)} style={{ cursor: 'pointer', fontWeight: 'bold', borderBottom: '2px solid white' }}>Plants</span>
          <span onClick={() => setShowCart(true)} style={{ cursor: 'pointer' }}>Cart ({totalCartCount})</span>
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
                // Strict validation against Redux store state to guarantee button disabling works
                const isInCart = cartItems.some(item => item.name === plant.name);
                
                return (
                  <div key={pIndex} className="plant-card" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', width: '250px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '10px' }}>{plant.icon}</div>
                    <h3 style={{ margin: '10px 0' }}>{plant.name}</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', height: '60px' }}>{plant.description}</p>
                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '15px' }}>R{plant.cost}</div>
                    
                    {/* 3. STRICT DISABLE CRITERIA: Correctly handles disabling upon being added */}
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
                        width: '100%',
                        fontWeight: 'bold'
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