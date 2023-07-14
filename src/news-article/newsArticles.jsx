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
          <div class="mr-4">Text</div>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Button</button>
        </div>
        <Navbar />
        <ArticlesPosts />
        
      </div>
    )
  }
  
export default withAuthenticator(NewsArticles);