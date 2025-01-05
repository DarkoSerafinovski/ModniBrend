import React from 'react';
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
];

const Blog = () => {
  const navigate = useNavigate();

  const handleReadMore = (id) => {
    navigate(`/blog/${id}`); // Navigacija na stranicu detalja vesti
  };

  return (
    <div>
        <Navigation/>
        <div className="blog">
        <h1>Dobrodošli na naš blog!</h1>
        <p>Pročitajte najnovije vesti, savete i trendove iz sveta mode i stila.</p>

        <div className="blog-grid">
            {blogPosts.map((post) => (
            <div key={post.id} className="blog-card">
                <img src={post.image} alt={post.title} />
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <button onClick={() => handleReadMore(post.id)}>Detalji</button>
            </div>
            ))}
        </div>
        </div>
    </div>
  );
};

export default Blog;
