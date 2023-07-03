import React from 'react';
import './newsArticle.css'
import Navbar from './navbar.jsx'
import ArticlesPosts from './articles.jsx'

function NewsArticles() {
    return (
      <div className="news-articles-container">
        <div className="news-articles-heading">News Articles</div>
        <Navbar />
        <ArticlesPosts />
      </div>
    )
  }
  
export default NewsArticles