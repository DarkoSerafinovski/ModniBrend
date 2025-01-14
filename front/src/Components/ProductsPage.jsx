import React, { useState, useEffect } from "react";
import { useParams, useNavigate,useLocation  } from "react-router-dom";
import axios from 'axios';
import "./ProductsPage.css";
import Navigation from "./Navigation";
import CartPopup from "./CartPopup"; // Dodaj uvoz

const ProductsPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const categoryName = location.state?.categoryName;
  const [products, setProducts] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [cartItems, setCartItems] = useState([]); // Stanje za korpu
  const [isCartOpen, setIsCartOpen] = useState(false); // Stanje za prikaz korpe
  const [styles, setStyles] = useState([]); // Stanje za stilove
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });

  useEffect(() => {
    // Učitavanje stilova sa backend-a
    const fetchStyles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/stilovi');
        setStyles(response.data.data);
      } catch (error) {
        console.error('Greška prilikom učitavanja stilova:', error);
      }
    };

    fetchStyles();
  }, []);

  useEffect(() => {
    // Funkcija za učitavanje proizvoda sa filtrima
    const fetchProducts = async () => {
      try {
        const kategorijaId = type;  // Kategorija_id je zapravo iz URL-a
        const stilId = selectedStyle ? selectedStyle : ""; // Stil je opcionalan

        const response = await axios.get('http://localhost:8000/api/proizvodi', {
          params: {
            kategorija_id: kategorijaId,
            stil_id: stilId,
            page: pagination.currentPage, // Dodaj trenutnu stranicu
          },
          headers: {
            Authorization: 'Bearer ' + window.sessionStorage.getItem('auth_token'),
          }
        });

        setProducts(response.data.data); // Postavljanje proizvoda na osnovu odgovora

        // Ažuriraj informacije o paginaciji
        setPagination({
          currentPage: response.data.meta.current_page,
          totalPages: response.data.meta.last_page,
          totalItems: response.data.meta.total
        });
      } catch (error) {
        console.error('Greška prilikom učitavanja proizvoda:', error);
      }
    };

    fetchProducts();
  }, [type, selectedStyle, pagination.currentPage]); // Učitaj ponovo kad se promeni stranica, kategorija ili stil

  useEffect(() => {
    // Učitavanje korpe iz localStorage kada komponenta bude učitana
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleStyleFilter = (style) => {
    setSelectedStyle(style);
  };

  const addToCart = async (product) => {
    try {
      // Slanje POST zahteva za dodavanje proizvoda u korpu
      const response = await axios.post(
        "http://localhost:8000/api/korpa/dodaj", 
        { proizvod_id: product.id },
        {
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
          },
        }
      );
  
      if (response.status === 201) {
        alert(`Proizvod "${product.naziv}" je uspešno dodat u korpu!`);
      }
  
   
    } catch (error) {
      console.error("Greška prilikom dodavanja proizvoda u korpu:", error);
      alert("Došlo je do greške prilikom dodavanja proizvoda u korpu. Pokušajte ponovo.");
    }
  };



  // Navigacija kroz stranice
  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setPagination({ ...pagination, currentPage: page });
    }
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
              <li
                onClick={() => handleStyleFilter("")}
                className={selectedStyle === "" ? "active" : ""}
              >
                Svi stilovi
              </li>
              {styles.map((style, index) => (
                <li
                  key={index}
                  onClick={() => handleStyleFilter(style.id)} // Ako je stil odabran, poziva se sa id-em stila
                  className={selectedStyle === style.id ? "active" : ""}
                >
                  {style.naziv}
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <div className="right-column">
          <div className="header">
            <h1>{categoryName ? `Proizvodi - ${categoryName}` : 'Proizvodi'}</h1>
          </div>
          <div className="products-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div className="product-card" key={product.id}>
                  <img src={product.slika} alt={product.naziv} className="product-image" />
                  <div className="product-info">
                    <h4>{product.naziv}</h4>
                    <p>{product.opis}</p>
                    <p>{product.cena} RSD</p>
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

          {/* Paginacija */}
          <div className="pagination">
            <button 
              onClick={() => handlePageChange(pagination.currentPage - 1)} 
              disabled={pagination.currentPage === 1}
            >
              Prethodna
            </button>
            <span>{pagination.currentPage} / {pagination.totalPages}</span>
            <button 
              onClick={() => handlePageChange(pagination.currentPage + 1)} 
              disabled={pagination.currentPage === pagination.totalPages}
            >
              Sledeća
            </button>
          </div>
        </div>
      </div>
      {isCartOpen && (
        <CartPopup
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductsPage;
