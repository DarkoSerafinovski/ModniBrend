import React from "react";
import "./ClothingTypesPage.css";
import Navigation from "./Navigation";

const ClothingTypesPage = () => {
  const clothingTypes = [
    { name: "Majice", image: "/images/majice.jpg" },
    { name: "Duksevi", image: "/images/duksevi.jpg" },
    { name: "Trenerke", image: "/images/trenerke.jpg" },
    { name: "Pantalone", image: "/images/pantalone.jpg" },
    { name: "Jakne", image: "/images/jakne.jpg" },
    { name: "Haljine", image: "/images/haljine.jpg" },
  ];

  return (
    <div>
      <Navigation/>
      <div className="clothing-types-page">
        <h1>Izaberite vrstu odeće</h1>
        <div className="clothing-types-grid">
          {clothingTypes.map((type, index) => (
            <div 
              className="clothing-type-card" 
              key={index} 
              onClick={() => window.location.href = `/shop/${type.name.toLowerCase()}`}
            >
              <img src={type.image} alt={type.name} className="clothing-type-image" />
              <div className="clothing-type-name">{type.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClothingTypesPage;
