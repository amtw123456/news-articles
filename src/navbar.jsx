// import Articles from '../mock_data/news-article-MOCK_DATA.json';
import React, { useContext, useEffect } from 'react';
import { AppContext } from './AppState';
import './navbar.css'; // Import your header bar CSS file


function HeaderBar() {
  const {checkedIds, setCheckedIds} = useContext(AppContext);
  const {articles, setArticles} = useContext(AppContext);

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = () => {
    if (checkedIds.length === articles.length) {
      setCheckedIds([]);
    } else {
      const articleIds = articles.map((article) => article.id);
      setCheckedIds(articleIds);
    }
  };

  const handleDeleteAllChecked = () =>{
    const newArticles = articles.filter((article) => !checkedIds.includes(article.id));
    articles.splice(0, articles.length, ...newArticles);
    setCheckedIds([]);
  }

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/get-all-articles');
      const json_response = await response.json();
      setArticles(json_response);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
      <ul>
          <input 
            type="checkbox" 
            className="checkbox-input"
            checked={checkedIds.length === articles.length}
            onChange={handleCheckboxChange}
          />
          <button className="navbar-publish-button">Publish</button>
          <button onClick={() => handleDeleteAllChecked()} className="navbar-delete-button">Delete</button>
          <input type="text" className="search-bar" placeholder="Search..."/>
      </ul>  
  );
};

export default HeaderBar;