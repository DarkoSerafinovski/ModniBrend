import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCategoryPage.css";
import Navigation from "./Navigation";
import axios from "axios";

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null); // State for image
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (categoryName.trim() === "") {
      alert("Naziv kategorije ne može biti prazan!");
      return;
    }

    // Check if image is selected
    if (!image) {
      alert("Molimo vas da dodate sliku.");
      return;
    }

    // Prepare FormData to send to backend
    const formData = new FormData();
    formData.append("naziv", categoryName);
    formData.append("slika", image); // Append the image to formData

    try {
      // Send the data to the backend (replace URL with your actual endpoint)
      const response = await axios.post('http://localhost:8000/api/kategorije', formData, {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
          'Content-Type': 'multipart/form-data',
        }
      });

      // Reset form after successful submission
      setCategoryName("");
      setImage(null); // Clear the image input

      alert("Kategorija uspešno dodata!");
      navigate("/shop"); // Redirect to shop page or wherever you want
    } catch (error) {
      console.error("Greška prilikom dodavanja kategorije:", error);
      alert("Došlo je do greške pri dodavanju kategorije. Pokušajte ponovo.");
    }
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

            <div className="form-group">
                <label htmlFor="image">Slika:</label>
                <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                required
                accept="image/*" // Optional: limit file types
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
            - Dodajte sliku koja će predstavljati kategoriju. <br />
            - Kliknite na dugme <strong>Dodaj kategoriju</strong> da biste sačuvali.
            </p>
        </div>
        </div>
    </div>
  );
};

export default AddCategoryPage;
