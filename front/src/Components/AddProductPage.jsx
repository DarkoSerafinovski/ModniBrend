import React, { useState } from "react";
import "./AddProductPage.css";
import Navigation from "./Navigation";

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState(null);

  const styles = ["Casual", "Formal", "Sport", "Old Money"];
  const categories = ["Duks", "Majica", "Jakna", "Pantalone"];

  const handleStyleSelection = (style) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !productName ||
      !price ||
      selectedStyles.length === 0 ||
      !selectedCategory ||
      !image
    ) {
      alert("Popunite sva polja!");
      return;
    }

    // Mock logika za slanje podataka
    const newProduct = {
      name: productName,
      price,
      styles: selectedStyles,
      category: selectedCategory,
      image,
    };

    console.log("Novi proizvod:", newProduct);
    alert("Proizvod je uspešno dodat!");
    setProductName("");
    setPrice("");
    setSelectedStyles([]);
    setSelectedCategory("");
    setImage(null);
  };

  return (
    <>
        <Navigation/>
    
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
            {styles.map((style, index) => (
              <label key={index} className="style-label">
                <input
                  type="checkbox"
                  checked={selectedStyles.includes(style)}
                  onChange={() => handleStyleSelection(style)}
                />
                {style}
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
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
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
