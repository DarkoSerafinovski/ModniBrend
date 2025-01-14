import React, { useState, useEffect } from 'react';
import './Blog.css';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import axios from 'axios';

const Blog = () => {
  const [posts, setPosts] = useState([]); // For storing posts
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const postsPerPage = 3; // Number of posts per page
  const navigate = useNavigate();

  // Load data from server when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/clanci', {
          params: {
            page: pagination.currentPage,
            per_page: postsPerPage, // Send the number of posts per page
          },
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
          }
        });

        setPosts(response.data.data); // Save posts to state

        // Update pagination info from API response
        setPagination({
          currentPage: response.data.meta.current_page,
          totalPages: response.data.meta.last_page,
          totalItems: response.data.meta.total,
        });
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };

    fetchPosts();
  }, [pagination.currentPage]); // Trigger fetch when page changes

  // Handle pagination
  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination(prev => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination(prev => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  // Handle reading more on a post
  const handleReadMore = (id) => {
    navigate(`/blog/${id}`); // Navigate to post details
  };

  return (
    <div>
      <Navigation />
      <div className="blog">
        <h1>Dobrodošli na naš blog!</h1>
        <p>Pročitajte najnovije vesti, savete i trendove iz sveta mode i stila.</p>

        <div className="blog-grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="blog-card">
                <img src={post.slika} alt={post.naslov} />
                <h2>{post.naslov}</h2>
                <p>Autor: {post.autor.username}</p>
                <p>Kreiran: {new Date(post.kreiran).toLocaleDateString()}</p>
                <button onClick={() => handleReadMore(post.id)}>Detalji</button>
              </div>
            ))
          ) : (
            <p>Nema postova za prikaz.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            onClick={handlePrevPage}
            disabled={pagination.currentPage === 1}
            className="pagination-button"
          >
            Prethodna
          </button>
          <span className="pagination-info">
            Stranica {pagination.currentPage} od {pagination.totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={pagination.currentPage === pagination.totalPages}
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
