import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Dodajemo axios za slanje zahteva
import "./AddNewsPage.css";
import Navigation from "./Navigation";

const AddNewsPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("naslov", title);
    formData.append("sadrzaj", content);
    formData.append("slika", image);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/clanci", 
        formData,
        {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      console.log("Vest uspešno kreirana:", response.data.data);
      navigate("/blog"); // Preusmeravamo korisnika na blog nakon uspešnog slanja
    } catch (error) {
      console.error("Greška prilikom kreiranja vesti:", error);
      alert("Došlo je do greške, pokušajte ponovo!");
    }
  };

  return (
    <div>
        <Navigation />
        <div className="add-news-page">
          <h2>Dodaj novu vest</h2>
          <form onSubmit={handleSubmit} className="add-news-form">
            <div className="form-group">
              <label htmlFor="title">Naslov</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Unesite naslov vesti"
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Sadržaj</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                placeholder="Unesite sadržaj vesti"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="image">Slika</label>
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Objavi vest
            </button>
          </form>
        </div>
    </div>
  );
};

export default AddNewsPage;
