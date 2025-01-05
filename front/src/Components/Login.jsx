import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prosta validacija unosa
    if (!email || !password) {
      setError('Molimo vas da popunite sva polja.');
      return;
    }

    // Simulacija provere podataka
    if (email === 'test@modnibrend.com' && password === '123456') {
      // Uspešna prijava - preusmeravanje
      navigate('/shop');
    } else {
      // Greška u podacima
      setError('Neispravna email adresa ili šifra.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Prijavite se</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email adresa</label>
            <input
              type="email"
              id="email"
              placeholder="Unesite vaš email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Šifra</label>
            <input
              type="password"
              id="password"
              placeholder="Unesite vašu šifru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
