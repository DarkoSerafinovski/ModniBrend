import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './NewsDetailPage.css';
import Navigation from './Navigation';

const NewsDetailPage = () => {
  const { newsId } = useParams(); // Preuzimanje ID-a vesti iz URL-a
  const navigate = useNavigate();
  
  // Simulirani podaci o vesti
  const newsArticles = [
    {
      id: 1,
      title: "Nova kolekcija je stigla!",
      date: "4. Januar 2025.",
      image: "/images/vest1.jpg",
      content: "Ovaj članak govori o dolasku nove kolekcije, sa svim najnovijim trendovima i modelima koji su upravo stigli. Svi proizvodi su pažljivo odabrani da zadovolje ukuse modernih kupaca. Posetite nas i uverite se u kvalitet najnovijih proizvoda.",
    },
    {
      id: 2,
      title: "Bloger preporučuje najbolje outfite za zimu",
      date: "2. Januar 2025.",
      image: "/images/vest2.jpg",
      content: "Zima je pred nama, a blogeri širom sveta već biraju najbolje outfite za hladne dane. Saznajte šta je trenutno popularno i kako se oblačiti u ovoj sezoni. Ovaj članak nudi praktične savete o tome šta nositi i kako se ugrejati u stilu.",
    },
  ];

  // Pronađi vest prema ID-u
  const article = newsArticles.find((item) => item.id === parseInt(newsId));

  const handleBack = () => {
    navigate('/blog'); // Vratiti korisnika na listu vesti
  };

  if (!article) {
    return <div>Vest nije pronađena.</div>;
  }

  return (
    <div>
        <Navigation/>
        <div className="news-detail-page">
        <button className="back-btn" onClick={handleBack}>Nazad na blog</button>
        <div className="news-detail">
            <h1>{article.title}</h1>
            <p className="news-date">{article.date}</p>
            <img src={article.image} alt={article.title} className="news-image" />
            <p className="news-content">{article.content}</p>
        </div>
        </div>
    </div>
  );
};

export default NewsDetailPage;
