import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./FashionGallery.css";
import Navigation from './Navigation';
const FashionGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('fashion');  // Početni pojam za pretragu
  const [page, setPage] = useState(1);  // Početna stranica
  const [totalPages, setTotalPages] = useState(0); // Ukupno stranica

  // Funkcija za fetch slika
  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          client_id: process.env.REACT_APP_ACCESS_KEY, // Tvoj Access Key
          per_page: 10,  // Broj slika po stranici
          page: page,    // Trenutna stranica
          query: query,  // Pretraga po ključnim rečima
        }
      });
      setImages(response.data.results);
      setTotalPages(Math.ceil(response.data.total / 10)); // Ukupno stranica
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch images');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(); // Učitaj slike samo pri prvom renderovanju
  }, [page]);  // Poziva se samo kada se promeni stranica

  // Funkcija koja se poziva kada korisnik klikne "Search"
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);  // Resetuj stranicu na prvu kada se pokrene nova pretraga
    fetchImages();  // Pozivaj fetchImages kada korisnik klikne Search
  };

  // Funkcije za paginaciju
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <Navigation/>
    <div className="fashion-gallery">
      <h2>Fashion Inspiration</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}  // Ažuriranje query-ja
          placeholder="Search for fashion..."
        />
        <button type="submit">Search</button>
      </form>

      {/* Image Gallery */}
      <div className="image-container">
        {images.map((image) => (
          <div key={image.id} className="image-item">
            <img src={image.urls.small} alt={image.alt_description} />
            <p>{image.alt_description || 'No description'}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
    </>
  );
};

export default FashionGallery;
