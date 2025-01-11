import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartPopup from './CartPopup'; // Uvozimo CartPopup komponentu
import './Navigation.css';

const Navigation = () => {
  const [userRole, setUserRole] = useState('Bloger'); // Podrazumevana uloga
  const [navItems, setNavItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false); // State za prikaz korpe
  const [cartItems, setCartItems] = useState([
    // Simulirani proizvodi u korpi
    { id: 1, name: 'Majica 1', price: 1500, image: '/images/majica1.jpg' },
    { id: 2, name: 'Duks 1', price: 2000, image: '/images/duks1.jpg' },
  ]);

  const navigate = useNavigate(); // Hook za navigaciju

  useEffect(() => {
    if (userRole === 'Korisnik') {
      setNavItems([
        { name: 'Kolekcija', path: '/shop' },
        { name: 'Preporuke', path: '/preporuke' },
        { name: 'Blog', path: '/blog' },
        { name: 'Ebay', path: '/ebay' },
      ]);
    } else if (userRole === 'Bloger') {
      setNavItems([
        { name: 'Kolekcija', path: '/shop' },
        { name: 'Blog', path: '/blog' },
        { name: 'Dodaj članak', path: '/dodaj-clanak' },
      ]);
    } else if (userRole === 'Shop Manager') {
      setNavItems([
        { name: 'Kolekcija', path: '/shop' },
        { name: 'Dodaj kategoriju', path: '/dodaj-kategoriju' },
        { name: 'Dodaj stil', path: '/dodaj-stil' },
        { name: 'Porudžbine', path: '/porudzbine' },
      ]);
    }
  }, [userRole]);

  const handleLogout = () => {
    sessionStorage.clear(); // Brišemo sve podatke iz sessionStorage
    navigate('/login'); // Preusmeravamo korisnika na login stranicu
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <nav className="navigation">
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
        <li>
          <button className="cart-icon" onClick={toggleCart}>
            🛒
          </button>
        </li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
      {cartVisible && (
        <CartPopup
          items={cartItems}
          onClose={toggleCart} // Zatvaranje popupa
        />
      )}
    </nav>
  );
};

export default Navigation;
