import React from 'react';
import './newsArticle.css'
import Navbar from './navbar.jsx'
import ArticlesPosts from './articles.jsx'
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';

function NewsArticles({ signOut }) {
    return (
      <div className="news-articles-container"> 
        <div class="flex items-center">
          <div class="text-purple-400">News Article</div>
          <button class="ml-4 hover bg-sky-500 text-white hover:bg-white hover:text-black p-2" onClick={signOut}>Sign Out </button>
        </div>
        <Navbar />
        <ArticlesPosts />
        
      </div>
    )
  }
  
export default withAuthenticator(NewsArticles);