import React from 'react';
import './CartPopup.css';

const CartPopup = ({ items, onClose, onRemove, onCheckout }) => (
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
              <button className="remove-btn" onClick={() => onRemove(item.id)}>
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
        <button className="checkout-btn" onClick={onCheckout}>
          Završi kupovinu
        </button>
      </div>
    </div>
  </div>
);

export default CartPopup;
