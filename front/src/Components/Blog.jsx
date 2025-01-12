import React, { useState } from 'react';
import './Blog.css';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const blogPosts = [
  {
    id: 1,
    title: 'Modni trendovi za ovu sezonu',
    description: 'Otkrijte najnovije modne trendove koji će obeležiti ovu sezonu.',
    image: '/images/blog1.jpg',
  },
  {
    id: 2,
    title: 'Saveti za stilizovanje sportske garderobe',
    description: 'Kako kombinovati sportsku odeću za svakodnevni elegantan izgled.',
    image: '/images/blog2.jpg',
  },
  {
    id: 3,
    title: 'Minimalistički pristup modi',
    description: 'Zašto je minimalizam u modi sve popularniji i kako ga primeniti.',
    image: '/images/blog3.jpg',
  },
  {
    id: 4,
    title: 'Kako odabrati idealne čizme za zimu',
    description: 'Pronađite savršene čizme koje kombinuju stil i udobnost.',
    image: '/images/blog4.jpg',
  },
  {
    id: 5,
    title: 'Osnovni komadi za garderobu',
    description: 'Koji komadi su must-have u svakoj garderobi.',
    image: '/images/blog5.jpg',
  },
];

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3; // Broj postova po stranici
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const navigate = useNavigate();

  // Prikaz postova za trenutnu stranicu
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleReadMore = (id) => {
    navigate(`/blog/${id}`); // Navigacija na stranicu detalja vesti
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="blog">
        <h1>Dobrodošli na naš blog!</h1>
        <p>Pročitajte najnovije vesti, savete i trendove iz sveta mode i stila.</p>

        <div className="blog-grid">
          {currentPosts.map((post) => (
            <div key={post.id} className="blog-card">
              <img src={post.image} alt={post.title} />
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <button onClick={() => handleReadMore(post.id)}>Detalji</button>
            </div>
          ))}
        </div>

        {/* Kontrole za paginaciju */}
        <div className="pagination">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Prethodna
          </button>
          <span className="pagination-info">
            Stranica {currentPage} od {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Sledeća
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
