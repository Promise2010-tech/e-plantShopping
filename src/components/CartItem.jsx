import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

export default function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all items in the cart
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  return (
    <div className="cart-container" style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#2e7d32', textAlign: 'center', marginBottom: '30px' }}>Your Shopping Cart</h2>
      
      <div>
        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>Your cart is empty</p>
          </div>
        ) : (
          <div>
            {/* Total Cart Amount Display */}
            <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'right' }}>
              Total Cart Amount: <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>R{calculateTotalAmount()}</span>
            </h3>

            {cartItems.map((item, index) => (
              <div key={index} className="cart-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #ddd', marginBottom: '15px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '3rem', marginRight: '20px' }}>{item.image}</div>
                
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{item.name}</h4>
                  <div style={{ color: '#666' }}>Unit Price: R{item.cost}</div>
                  <div style={{ fontWeight: 'bold', color: '#2e7d32', marginTop: '5px' }}>
                    Subtotal: R{item.cost * item.quantity}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '20px' }}>
                  <button onClick={() => handleDecrement(item)} style={{ background: '#e0e0e0', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)} style={{ background: '#e0e0e0', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                </div>

                <button 
                  onClick={() => handleRemove(item.name)} 
                  style={{ background: '#d32f2f', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation & Checkout Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <button 
          onClick={onContinueShopping} 
          style={{ background: '#2e7d32', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Continue Shopping
        </button>
        <button 
          onClick={() => alert('Checkout functionality coming soon!')} 
          disabled={cartItems.length === 0}
          style={{ background: cartItems.length === 0 ? '#9e9e9e' : '#e65100', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}