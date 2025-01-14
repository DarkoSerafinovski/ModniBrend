import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProductPage.css";
import Navigation from "./Navigation";

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState(null);

  const [styles, setStyles] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch styles and categories from the server
  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/stilovi", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
          },
        });
        setStyles(response.data.data);
      } catch (error) {
        console.error("Greška prilikom učitavanja stilova:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/kategorije", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
          },
        });
        setCategories(response.data.data);
      } catch (error) {
        console.error("Greška prilikom učitavanja kategorija:", error);
      }
    };

    fetchStyles();
    fetchCategories();
  }, []);

  const handleStyleSelection = (styleId) => {
    if (selectedStyles.includes(styleId)) {
      setSelectedStyles(selectedStyles.filter((id) => id !== styleId));
    } else {
      setSelectedStyles([...selectedStyles, styleId]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!productName || !description || !price || selectedStyles.length === 0 || !selectedCategory || !image) {
      alert("Popunite sva polja!");
      return;
    }

    const formData = new FormData();
    formData.append("naziv", productName);
    formData.append("opis", description);
    formData.append("cena", price);
    formData.append("slika", image);
    formData.append("kategorija_id", selectedCategory);
    selectedStyles.forEach((styleId, index) => {
      formData.append(`stilovi[${index}][id]`, styleId);
    });

    try {
      await axios.post("http://localhost:8000/api/proizvodi", formData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Proizvod je uspešno dodat!");
      setProductName("");
      setDescription("");
      setPrice("");
      setSelectedStyles([]);
      setSelectedCategory("");
      setImage(null);
    } catch (error) {
      console.error("Greška prilikom čuvanja proizvoda:", error);
      alert("Došlo je do greške. Proizvod nije dodat.");
    }
  };

  return (
    <>
      <Navigation />

      <div className="add-product-page">
        <h2 className="page-title">Dodaj Novi Proizvod</h2>

        <form className="product-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="productName">Ime Proizvoda:</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Unesite ime proizvoda"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Opis:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Unesite opis proizvoda"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="price">Cena (RSD):</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Unesite cenu proizvoda"
            />
          </div>

          <div className="form-group">
            <label>Stilovi:</label>
            <div className="styles-container">
              {styles.map((style) => (
                <label key={style.id} className="style-label">
                  <input
                    type="checkbox"
                    checked={selectedStyles.includes(style.id)}
                    onChange={() => handleStyleSelection(style.id)}
                  />
                  {style.naziv}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Kategorija:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Izaberite kategoriju</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.naziv}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="image">Dodajte Sliku:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button type="submit" className="add-btn">
            Dodaj Proizvod
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProductPage;
