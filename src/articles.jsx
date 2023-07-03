import React from 'react';
import './articles.css'; // Import your header bar CSS file
import Articles from '../mock_data/news-article-MOCK_DATA.json';
import { BsPersonCircle } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";


function HeaderBar() {
  
  return (
    <div>
      {Articles.map((article) => (
          <div className='news-articles-cards' key={article.id}>
          <ul>
            <div className='icon-container'>
              <img src={'./icon_images/icon-square3x3.png'} alt="Icon" className="icon-square3x3-size" />
            </div>
            <input type="checkbox" className="card-checkbox-input" />
              <div className='content-title-style'>
                <div className='author-container'>
                {article.title}
                </div>
                <div className='author-date-container'>
                  <ul>
                    <div className='icon-person-circle-container'>
                      <BsPersonCircle color="#12ba83"/>
                    </div>
                    <div className='author-container'>
                      {article.author}
                    </div>
                    <div className='icon-date-container'>
                      <MdDateRange color="#12ba83"/>
                    </div>
                    <div className='date-container'>
                      {article.date}
                    </div>
                  </ul>
                </div>
              </div>
            <div className='content-tags-style'>
              <ul>
                <div className='tags-content'>#Sports</div>
                <div className='tags-content'>#Worldwide</div>
                <div className='tags-content'>#Local</div>
              </ul>
            </div>
        </ul>
      </div>
      ))}
    </div>
    
//    <div>
//     {Articles.map((article) => (
//         <div key={article.id}>{article.Data}</div>
//     ))}
//    </div>
  );
};

export default HeaderBar;