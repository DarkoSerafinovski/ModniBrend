import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './StyleSurvey.css';

const StyleSurvey = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state.formData);
  const [styles, setStyles] = useState([]); // Dinamički učitani stilovi
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Učitavanje stilova sa servera
  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/stilovi');
        setStyles(response.data.data); // Pretpostavljamo da `response.data` sadrži niz stilova
      } catch (error) {
        console.error('Greška pri učitavanju stilova:', error);
        setErrorMessage('Greška pri učitavanju stilova.');
      }
    };

    fetchStyles();
  }, []);

  // Dodavanje i uklanjanje stilova
  const handleCheckboxChange = (styleId) => {
    if (selectedStyles.includes(styleId)) {
      setSelectedStyles((prev) => prev.filter((id) => id !== styleId));
    } else if (selectedStyles.length < 3) {
      setSelectedStyles((prev) => [...prev, styleId]);
      setErrorMessage(''); // Reset greške kad se izbor napravi
    } else {
      setErrorMessage('Možete izabrati samo 3 stila.');
    }
  };

  // Slanje podataka na server
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedStyles.length === 3) {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/register',
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: 'Korisnik', 
            stilovi: selectedStyles.map((id) => ({ id })), 
          },
          {
            headers: {
              Authorization: `Bearer ${window.sessionStorage.getItem('auth_token')}`,
            },
          }
        );
        console.log('Registracija uspešna:', response.data);
        alert('Registracija uspešna!');
        navigate('/'); // Preusmeravanje korisnika na početnu stranicu
      } catch (error) {
        console.error('Greška pri registraciji:', error);
        setErrorMessage('Greška pri registraciji. Pokušajte ponovo.');
      }
    } else {
      setErrorMessage('Molimo izaberite tačno 3 stila.');
    }
  };

  return (
    <div className="style-survey">
      <h2>Izaberite svoj omiljeni stil</h2>
      <form onSubmit={handleSubmit}>
        {styles.length > 0 ? (
          <div className="toggle-list">
            {styles.map((style) => (
              <div key={style.id} className="toggle-container">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    value={style.id}
                    checked={selectedStyles.includes(style.id)}
                    onChange={() => handleCheckboxChange(style.id)}
                  />
                  <span className="toggle"></span>
                  {style.naziv}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p>Učitavanje stilova...</p>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Registruj se</button>
      </form>
    </div>
  );
};

export default StyleSurvey;
