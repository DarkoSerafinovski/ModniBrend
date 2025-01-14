import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Dodaj axios za HTTP zahteve
import './NewsDetailPage.css';
import Navigation from './Navigation';

const NewsDetailPage = () => {
  const { newsId } = useParams(); // Preuzimanje ID-a članka iz URL-a
  const navigate = useNavigate();
  
  const [article, setArticle] = useState(null); // Stanje za podatke o članku
  const [loading, setLoading] = useState(true); // Stanje za učitavanje
  const [error, setError] = useState(null); // Stanje za greške

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/clanci/${newsId}`, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
          }
        });
        setArticle(response.data.data); 
        setLoading(false);
      } catch (err) {
        setError('Došlo je do greške prilikom učitavanja članka.');
        setLoading(false);
      }
    };

    fetchArticle(); // Poziv funkcije za učitavanje članka
  }, [newsId]); // Pozivaj efekat svaki put kada se promeni newsId

  const handleBack = () => {
    navigate('/blog'); // Vratiti korisnika na listu vesti
  };

  if (loading) {
    return <div>Učitavanje...</div>; // Prikaz poruke dok se učitava
  }

  if (error) {
    return <div>{error}</div>; // Prikaz greške ako dođe do problema sa učitavanjem
  }

  if (!article) {
    return <div>Članak nije pronađen.</div>; // Ako članku nije moguće pristupiti
  }

  return (
    <div>
        <Navigation />
        <div className="news-detail-page">
            <button className="back-btn" onClick={handleBack}>Nazad na blog</button>
            <div className="news-detail">
                <h1>{article.naslov}</h1> {/* Prikaz naslova */}
                <p className="news-date">{new Date(article.kreiran).toLocaleDateString()}</p> {/* Prikaz datuma */}
                <img src={article.slika} alt={article.naslov} className="news-image" /> {/* Prikaz slike */}
                <p className="news-content">{article.sadrzaj}</p> {/* Prikaz sadržaja */}
                <p className="news-author">Autor: {article.autor.username}</p> {/* Prikaz autora */}
            </div>
        </div>
    </div>
  );
};

export default NewsDetailPage;
