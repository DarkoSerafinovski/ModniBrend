import React from 'react';
import './Preporuke.css';
import Navigation from './Navigation';

const preporukeData = [
  {
    style: 'Elegantno',
    products: [
      { id: 1, name: 'Elegantna haljina', price: 4500, image: '/images/haljina1.jpg' },
      { id: 2, name: 'Kožne cipele', price: 7500, image: '/images/cipele1.jpg' },
    ],
  },
  {
    style: 'Sportski',
    products: [
      { id: 3, name: 'Sportska majica', price: 3000, image: '/images/majica2.jpg' },
      { id: 4, name: 'Patike za trening', price: 6000, image: '/images/patike2.jpg' },
    ],
  },
  {
    style: 'Minimalistički',
    products: [
      { id: 5, name: 'Bele patike', price: 5000, image: '/images/patike3.jpg' },
      { id: 6, name: 'Jednostavni ranac', price: 4000, image: '/images/ranac2.jpg' },
    ],
  },
];

const Preporuke = () => {
  return (
    <div>
        <Navigation/>
        <div className="preporuke">
        {/* Hero sekcija */}
        <div className="hero">
            <h1>Preporučujemo za vas!</h1>
            <p>Na osnovu vaših omiljenih stilova, izdvojili smo proizvode koji će vam se svideti.</p>
        </div>

        {/* Prikaz proizvoda po stilovima */}
        {preporukeData.map((group, index) => (
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
