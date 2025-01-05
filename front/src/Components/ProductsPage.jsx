import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importujemo useParams
import "./ProductsPage.css";
import Navigation from "./Navigation";

const ProductsPage = () => {
  const { type } = useParams(); // Koristimo useParams za preuzimanje parametra "type"
  const [products, setProducts] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState("");
  console.log("Trenutni tip:", type);

  // Simulirani podaci o proizvodima
  const allProducts = [
    { id: 1, name: "Majica 1", image: "/images/majica1.jpg", price: 1500, style: "Sportski", category: "majice" },
    { id: 2, name: "Majica 2", image: "/images/majica2.jpg", price: 1800, style: "Old Money", category: "majice" },
    { id: 3, name: "Majica 3", image: "/images/majica3.jpg", price: 1200, style: "Baggie", category: "majice" },
    { id: 4, name: "Duks 1", image: "/images/duks1.jpg", price: 2000, style: "Sportski", category: "duksevi" },
    { id: 5, name: "Duks 2", image: "/images/duks2.jpg", price: 2200, style: "Old Money", category: "duksevi" },
  ];
  

  const styles = ["Sportski", "Old Money", "Baggie"];

  useEffect(() => {
    // Filtriramo proizvode prema tipu odeće
    const filteredProducts = allProducts.filter(
      (product) => product.category.toLowerCase().includes(type)
    );
    setProducts(filteredProducts);
  }, [type]);

  const handleStyleFilter = (style) => {
    setSelectedStyle(style);
  };

  const filteredProducts = selectedStyle
    ? products.filter((product) => product.style === selectedStyle)
    : products;

  return (
    <div>
      <Navigation />
      <div className="products-page">
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
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h4>{product.name}</h4>
                <p>{product.price} RSD</p>
                <button className="add-to-cart-btn">Dodaj u korpu</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
