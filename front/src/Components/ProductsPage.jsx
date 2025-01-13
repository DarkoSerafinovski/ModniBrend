import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductsPage.css";
import Navigation from "./Navigation";
import CartPopup from "./CartPopup"; // Dodaj uvoz

const ProductsPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [cartItems, setCartItems] = useState([]); // Stanje za korpu
  const [isCartOpen, setIsCartOpen] = useState(false); // Stanje za prikaz korpe

  const allProducts = [
    { id: 1, name: "Majica 1", image: "/images/majica1.jpg", price: 1500, style: "Sportski", category: "majice" },
    { id: 2, name: "Majica 2", image: "/images/majica2.jpg", price: 1800, style: "Old Money", category: "majice" },
    { id: 3, name: "Majica 3", image: "/images/majica3.jpg", price: 1200, style: "Baggie", category: "majice" },
    { id: 4, name: "Duks 1", image: "/images/duks1.jpg", price: 2000, style: "Sportski", category: "duksevi" },
    { id: 5, name: "Duks 2", image: "/images/duks2.jpg", price: 2200, style: "Old Money", category: "duksevi" },
  ];

  const styles = ["Sportski", "Old Money", "Baggie"];

  useEffect(() => {
    // Filtriranje proizvoda na osnovu tipa
    const filteredProducts = allProducts.filter(
      (product) => product.category.toLowerCase().includes(type)
    );
    setProducts(filteredProducts);
  }, [type]);

  useEffect(() => {
    // Učitavanje korpe iz localStorage kada komponenta bude učitana
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleStyleFilter = (style) => {
    setSelectedStyle(style);
  };

  const filteredProducts = selectedStyle
    ? products.filter((product) => product.style === selectedStyle)
    : products;

    const addToCart = (product) => {
      // Preuzimanje trenutnih proizvoda iz localStorage
      const currentCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
      // Dodavanje novog proizvoda
      const updatedCartItems = [...currentCartItems, { ...product, quantity: 1 }];
    
      // Ažuriranje localStorage i stanja
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      
    
      // Otvaranje prikaza korpe
      setIsCartOpen(true);
    };
    

  const handleCheckout = () => {
    alert("Vaša kupovina je obavljena, informacije o porudžbini su poslate na email.");
    setCartItems([]); // Isprazni korpu
    localStorage.setItem("cartItems", JSON.stringify([])); // Isprazni localStorage
    setIsCartOpen(false); // Zatvori korpu
  };

  return (
    <div>
      <Navigation />
      <div className="products-page">
        <div className="left-column">
          <button
            className="add-product-btn"
            onClick={() => navigate("/dodaj-proizvod")}
          >
            Dodaj Novi Proizvod
          </button>
          <aside className="sidebar">
            <h3>Filtriraj po stilu</h3>
            <ul>
              {styles.map((style, index) => (
                <li
                  key={index}
                  onClick={() => handleStyleFilter(style)}
                  className={selectedStyle === style ? "active" : ""}
                >
                  {style}
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <div className="right-column">
          <div className="header">
            <h1>Proizvodi - {type}</h1>
          </div>
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>{product.price} RSD</p>
                    <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                      Dodaj u korpu
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-products">Nema proizvoda za prikaz.</p>
            )}
          </div>
        </div>
      </div>
      {isCartOpen && (
        <CartPopup
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
};

export default ProductsPage;
