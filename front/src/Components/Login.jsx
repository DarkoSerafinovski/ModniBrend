import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Rukovanje unosom podataka u formu
  const handleInput = (e) => {
    const newUserData = { ...userData };
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
  };

  // Rukovanje login akcijom
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/login', userData)
      .then((response) => {
        if (response.data.success) {
          // Čuvanje tokena i korisničkih podataka
          window.sessionStorage.setItem('auth_token', response.data.access_token);
          window.sessionStorage.setItem('role', response.data.role);
          window.sessionStorage.setItem('user_id', response.data.data.id);

          // Preusmeravanje na željenu stranicu
          navigate('/shop');
        } else {
          setErrorMessage('Pogrešan email ili lozinka.');
        }
      })
      .catch((error) => {
        console.error('Greška pri prijavi:', error);
        setErrorMessage('Došlo je do greške. Molimo pokušajte ponovo.');
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Prijavite se</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email adresa</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Unesite vaš email"
              value={userData.email}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Šifra</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Unesite vašu šifru"
              value={userData.password}
              onChange={handleInput}
              required
            />
          </div>
          <button type="submit" className="login-button">Prijava</button>
        </form>
        <p className="register-prompt">
          Nemate nalog? <a href="/registracija" className="register-link">Registrujte se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
