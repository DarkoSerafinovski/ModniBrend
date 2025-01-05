import React, { useState } from "react";
import "./AddStylePage.css";
import Navigation from "./Navigation";

const AddStylePage = () => {
  const [styleName, setStyleName] = useState("");
  const [description, setDescription] = useState("");
  const [styles, setStyles] = useState([
    "Casual",
    "Formal",
    "Sport",
    "Old Money",
  ]);

  const handleAddStyle = (e) => {
    e.preventDefault();
    if (styleName.trim() === "" || description.trim() === "") {
      alert("Popunite sva polja!");
      return;
    }

    if (styles.includes(styleName)) {
      alert("Ovaj stil već postoji!");
      return;
    }

    setStyles([...styles, styleName]);
    setStyleName("");
    setDescription("");
    alert(`Stil "${styleName}" je uspešno dodat!`);
  };

  return (
    <div>
        <Navigation/>
        <div className="add-style-page">
        <h2 className="page-title">Dodaj Novi Stil Odeće</h2>

        <form className="style-form" onSubmit={handleAddStyle}>
            <div className="form-group">
            <label htmlFor="styleName">Naziv Stila:</label>
            <input
                type="text"
                id="styleName"
                value={styleName}
                onChange={(e) => setStyleName(e.target.value)}
                placeholder="Unesite naziv stila (npr. Casual, Sport)"
            />
            </div>

           

            <button type="submit" className="add-btn">
            Dodaj Stil
            </button>
        </form>

        <div className="existing-styles">
            <h3>Postojeći Stilovi</h3>
            <ul>
            {styles.map((style, index) => (
                <li key={index}>{style}</li>
            ))}
            </ul>
        </div>
        </div>
    </div>
  );
};

export default AddStylePage;
