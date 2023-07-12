import Articles from '../mock_data/news-article-MOCK_DATA.json';
import React, { useContext } from 'react';
import { AppContext } from './AppState';
import './navbar.css'; // Import your header bar CSS file


function HeaderBar() {
  const {checkedIds, setCheckedIds} = useContext(AppContext);
  console.log('Checked IDs:', checkedIds);

  const handleCheckboxChange = () => {
    if (checkedIds.length === Articles.length) {
      setCheckedIds([]);
    } else {
      const articleIds = Articles.map((article) => article.id);
      setCheckedIds(articleIds);
    }
  };

  const handleDeleteAllChecked = () =>{
    const newArticles = Articles.filter((article) => !checkedIds.includes(article.id));
    Articles.splice(0, Articles.length, ...newArticles);
    setCheckedIds([]);
  }



  return (
      <ul>
          <input 
            type="checkbox" 
            className="checkbox-input"
            checked={checkedIds.length === Articles.length}
            onChange={handleCheckboxChange}
          />
          <button className="navbar-publish-button">Publish</button>
          <button onClick={() => handleDeleteAllChecked()} className="navbar-delete-button">Delete</button>
          <input type="text" className="search-bar" placeholder="Search..."/>
      </ul>  
  );
};

export default HeaderBar;