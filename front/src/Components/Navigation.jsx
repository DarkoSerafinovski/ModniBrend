import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartPopup from './CartPopup';
import './Navigation.css';

const Navigation = () => {
  const [userRole, setUserRole] = useState('Shop Manager'); // Podrazumevana uloga
  const [navItems, setNavItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false); // Kontrola vidljivosti korpe
  const navigate = useNavigate();

  // Funkcija za odjavu korisnika
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  // Promena navigacije zavisno od korisničke uloge
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

  return (
    <nav className="navigation">
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
        <li>
          <button
            className="cart-icon-btn"
            onClick={() => setIsCartVisible(true)}
          >
            🛒
          </button>
        </li>
      </ul>
      <CartPopup
        visible={isCartVisible}
        onClose={() => setIsCartVisible(false)}
      />
    </nav>
  );
};

export default Navigation;
