import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CartPopup.css';

const CartPopup = ({ visible, onClose }) => {
  const [items, setItems] = useState([]);
  const[ukupna_cena,setUkupnaCena]=useState(null);


  // Funkcija za prikaz korpe
  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/korpa/prikaz', {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('auth_token'),
        },
      });
      setItems(response.data.stavke_korpe);
      setUkupnaCena(response.data.ukupna_cena);
    } catch (error) {
      console.error('Greška prilikom učitavanja korpe:', error);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchCartItems();
    }
  }, [visible]);

  // Uklanjanje proizvoda iz korpe
  const handleRemove = async (id) => {
    try {
      await axios.post(
        'http://localhost:8000/api/korpa/izbaci',
        { korpa_id: id },
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('auth_token'),
          },
        }
      );
      await fetchCartItems(); // Ponovo učitaj stavke korpe nakon uklanjanja
    } catch (error) {
      console.error('Greška prilikom uklanjanja iz korpe:', error);
    }
  };

  // Završavanje kupovine
  const handleCheckout = async () => {
    if (window.confirm('Da li ste sigurni da želite da završite kupovinu?')) {
      try {
        await axios.post(
          'http://localhost:8000/api/porudzbine',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('auth_token'),
            },
          }
        );
        alert('Uspešno izvršena porudžbina, detalji su poslati na vašu e-mail adresu.');
        setItems([]); // Isprazni korpu
        setUkupnaCena(null); // Resetuj ukupnu cenu
        onClose(); // Zatvori popup
      } catch (error) {
        console.error('Greška prilikom završavanja kupovine:', error);
      }
    }
  };

  if (!visible) return null; // Ako popup nije vidljiv, ništa se ne renderuje

  return (
    <div className="cart-popup-overlay">
      <div className="cart-popup">
        <h3>Vaša korpa</h3>
        <div className="cart-popup-overlay">
          <div className="cart-popup">
            <h3>Vaša korpa</h3>
            <div className="cart-items">
              {items.length > 0 ? (
                items.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img
                      src={item.proizvod.slika}
                      alt={item.proizvod.naziv}
                      className="cart-item-image"
                    />
                    <div className="cart-item-info">
                      <h4>{item.proizvod.naziv}</h4>
                      <p>Komada: {item.kolicina}</p>
                      <p>Cena po komadu: {item.proizvod.cena} RSD</p>
                      <p>Ukupna cena: {item.kolicina * item.proizvod.cena} RSD</p>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                    >
                      Ukloni
                    </button>
                  </div>
                ))
              ) : (
                <p>Vaša korpa je prazna.</p>
              )}
            </div>
            {items.length > 0 && (
              <p className="total-price">
                Ukupna cena porudžbine: {ukupna_cena} RSD
              </p>
            )}
            <div className="cart-actions">
              <button className="continue-shopping-btn" onClick={onClose}>
                Nastavi sa kupovinom
              </button>
              {items.length > 0 && (
            <button className="checkout-btn" onClick={handleCheckout}>
              Završi kupovinu
            </button>
          )}
            </div>
          </div>
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
