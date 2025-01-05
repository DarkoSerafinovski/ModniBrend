import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCategoryPage.css";
import Navigation from "./Navigation";

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (categoryName.trim() === "") {
      alert("Naziv kategorije ne može biti prazan!");
      return;
    }

    // Logika za slanje na backend
    console.log("Nova kategorija:", categoryName);

    // Resetovanje forme i preusmeravanje (opciono)
    setCategoryName("");
    alert("Kategorija uspešno dodata!");
    navigate("/shop");
  };

  return (
    <div>
        <Navigation/>
        <div className="add-category-page">
        <div className="header">
            <h2>Dodavanje nove kategorije</h2>
            <p>Ovde možete dodati novu kategoriju proizvoda koja će biti vidljiva na sajtu.</p>
        </div>
        <div className="form-container">
            <form onSubmit={handleSubmit} className="add-category-form">
            <div className="form-group">
                <label htmlFor="categoryName">Naziv nove kategorije:</label>
                <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                placeholder="Unesite naziv kategorije (npr. Duks, Jakne, Haljine)"
                />
            </div>

            <button type="submit" className="submit-btn">
                Dodaj kategoriju
            </button>
            </form>
        </div>

        <div className="info-section">
            <h3>Kako popuniti formu?</h3>
            <p>
            - Unesite naziv kategorije koji opisuje grupu proizvoda (npr. Jakne, Pantalone). <br />
            - Uverite se da naziv nije predugačak i da jasno opisuje kategoriju. <br />
            - Kliknite na dugme <strong>Dodaj kategoriju</strong> da biste sačuvali.
            </p>
        </div>
        </div>
    </div>
  );
};

export default AddCategoryPage;
