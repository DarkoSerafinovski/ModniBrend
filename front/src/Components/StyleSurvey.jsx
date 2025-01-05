import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './StyleSurvey.css';

const StyleSurvey = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state.formData);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const styles = ['Sportski', 'Old Money', 'Casual', 'Streetwear', 'Business', 'Boho'];

  const handleCheckboxChange = (style) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles((prev) => prev.filter((s) => s !== style));
    } else if (selectedStyles.length < 3) {
      setSelectedStyles((prev) => [...prev, style]);
      setErrorMessage(''); // Resetuj grešku kad se izbor napravi
    } else {
      setErrorMessage('Možete izabrati samo 3 stila.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStyles.length === 3) {
      const data = { ...formData, selectedStyles };
      console.log('Korisnik registrovan:', data); // Ovde šaljemo podatke na server ili čuvamo
      alert('Registracija uspešna!');
      navigate('/welcome'); // Prebacujemo korisnika na neku stranicu
    } else {
      setErrorMessage('Molimo izaberite tačno 3 stila.');
    }
  };

  return (
    <div className="style-survey">
  <h2>Izaberite svoj omiljeni stil</h2>
  <form onSubmit={handleSubmit}>
    <div className="toggle-list">
      {styles.map((style) => (
        <div key={style} className="toggle-container">
          <label className="toggle-label">
            <input
              type="checkbox"
              value={style}
              checked={selectedStyles.includes(style)}
              onChange={() => handleCheckboxChange(style)}
            />
            <span className="toggle"></span>
            {style}
          </label>
        </div>
      ))}
    </div>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    <button type="submit">Registruj se</button>
  </form>
</div>

  );
};

export default StyleSurvey;
