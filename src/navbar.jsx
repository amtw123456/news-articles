import React from 'react';
import './navbar.css'; // Import your header bar CSS file


function HeaderBar() {
  return (
      <ul>
          <input type="checkbox" className="checkbox-input" />
          <a class="publish-span">Publish</a>
          <a class="delete-span">Delete</a>
          <input type="text" className="search-bar" placeholder="Search..."/>
      </ul>  
  );
};

export default HeaderBar;