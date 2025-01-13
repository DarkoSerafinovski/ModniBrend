import React, { useState, useEffect } from 'react';
import './CartPopup.css';

const CartPopup = ({ visible, onClose, onRemove, onCheckout }) => {
  const [items, setItems] = useState([]);

  // Učitavanje stavki iz localStorage kada se popup otvori
  useEffect(() => {
    if (visible) {
      const savedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const groupedItems = groupItemsById(savedItems);
      setItems(groupedItems);
    }
  }, [visible]);

  // Funkcija za grupisanje stavki prema ID-ju
  const groupItemsById = (cartItems) => {
    const grouped = cartItems.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity; // Povećanje količine
      } else {
        acc.push({ ...item }); // Dodavanje nove stavke
      }
      return acc;
    }, []);
    return grouped;
  };

  // Uklanjanje proizvoda iz korpe i localStorage-a
  const handleRemove = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    if (onRemove) onRemove(id); // Ako postoji dodatna logika za uklanjanje
  };

  // Završavanje kupovine
  const handleCheckout = () => {
    console.log('Kupovina završena sa sledećim proizvodima:', items);
    setItems([]);
    localStorage.removeItem('cartItems'); // Brisanje korpe iz localStorage-a
    if (onCheckout) onCheckout(); // Ako postoji dodatna logika za završetak kupovine
  };

  if (!visible) return null; // Ako popup nije vidljiv, ništa se ne renderuje

  return (
    <div className="cart-popup-overlay">
      <div className="cart-popup">
        <h3>Vaša korpa</h3>
        <div className="cart-items">
          {items.length > 0 ? (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>Komada: {item.quantity}</p>
                  <p>Cena po komadu: {item.price} RSD</p>
                  <p>Ukupna cena: {item.price * item.quantity} RSD</p>
                </div>
                <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                  Ukloni
                </button>
              </div>
            ))
          ) : (
            <p>Vaša korpa je prazna.</p>
          )}
        </div>
        <div className="cart-actions">
          <button className="continue-shopping-btn" onClick={onClose}>
            Nastavi sa kupovinom
          </button>
          <button className="checkout-btn" onClick={handleCheckout}>
            Završi kupovinu
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
