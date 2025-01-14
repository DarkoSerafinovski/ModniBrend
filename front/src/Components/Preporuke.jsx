import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Preporuke.css';
import Navigation from './Navigation';

const Preporuke = () => {
  const [preporuke, setPreporuke] = useState([]);

  useEffect(() => {
    // Funkcija za preuzimanje preporučenih proizvoda
    const fetchPreporuke = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/preporuke', {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
          },
        });
        setPreporuke(response.data);  // Čuvanje podataka u state
      } catch (error) {
        console.error('Greška prilikom preuzimanja preporuka:', error);
      }
    };

    fetchPreporuke();
  }, []);  // Samo jednom prilikom učitavanja komponente

  return (
    <div>
      <Navigation />
      <div className="preporuke">
        {/* Hero sekcija */}
        <div className="hero">
          <h1>Preporučujemo za vas!</h1>
          <p>Na osnovu vaših omiljenih stilova, izdvojili smo proizvode koji će vam se svideti.</p>
        </div>

        {/* Prikaz proizvoda po stilovima */}
        {preporuke.map((group, index) => (
          <div key={index} className="style-section">
            <h2>{group.style}</h2>
            <div className="products-grid">
              {group.products.map(product => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p className="price">{product.price} RSD</p>
                  <button className="add-to-cart-btn">Dodaj u korpu</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preporuke;
