import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./ClothingTypesPage.css";
import Navigation from "./Navigation";

const ClothingTypesPage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/kategorije", {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem("auth_token")}`,
          },
        });
        setCategories(response.data.data);
      } catch (err) {
        setError("Došlo je do greške pri učitavanju kategorija. Pokušajte ponovo.");
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="clothing-types-page">
        <h1>Izaberite vrstu odeće</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="clothing-types-grid">
          {categories.map((category) => (
            <div
              className="clothing-type-card"
              key={category.id}
              onClick={() =>  navigate(`/shop/${category.id}`, { state: { categoryName: category.naziv } })}
            >
              <img src={category.slika} alt={category.naziv} className="clothing-type-image" />
              <div className="clothing-type-name">{category.naziv}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClothingTypesPage;
