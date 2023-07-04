import React, { useContext, useState, useEffect} from 'react';
import './articles.css'; // Import your header bar CSS file
// import Articles from '../mock_data/news-article-MOCK_DATA.json';
import Popup from 'reactjs-popup';
import iconSquare6x6 from '../icon_images/icon-square3x3.png'
import { BsPersonCircle } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { AppContext } from './AppState';

function ArticlePosts() {
  const {checkedIds, setCheckedIds} = useContext(AppContext);
  const {articles} = useContext(AppContext);

  const handleCheckboxChange = (id) => {
    const isChecked = checkedIds.includes(id);

    if (isChecked) {
      setCheckedIds(checkedIds.filter((checkedId) => checkedId !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const deleteSingleArticle = async  (id) => {
    const response = await fetch(`https://news-articles-backend-server.vercel.app/get-all-articles/delete-article/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      window.location.reload(false);
    } else {
      console.error('Failed to delete the article.');
    }
  };

  // fetchData()
  return (
    <div>
      {articles.map((article) => (
          <div className='news-articles-cards' key={article.id}>
            <ul>
              <div className='icon-container'>
                <img src={iconSquare6x6} alt="Icon" className="icon-square3x3-size" />
              </div>
              <input 
                type="checkbox"
                id={article.id}
                checked={checkedIds.includes(article.id)}
                onChange={() => handleCheckboxChange(article.id)}
                className="card-checkbox-input" 
              />
              <div className='content-title-style'>
                <div className='title-container'>
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
                <ul className='paragraph-unordered-list-container'>
                    <div className='content-container'>
                      {article.content.substring(0,80)}
                      ....
                    </div>
                    <div className='icon-view-container'>
                      <AiFillEye />
                    </div>
                    <div className='read-article-button'>
                        <Popup trigger=
                          {
                            <button onclick="">
                              <ul >
                                <a className='icon-view-text-container'>
                                  Read Full
                                </a>
                              </ul>                        
                            </button>
                          }
                          modal nested>
                          {
                              close => (
                                  <div className='modal'>
                                      <div className='content'>
                                        <div className='popup-title-header'>
                                          <ul>
                                            <div className='popup-title-container'>
                                              {article.title}
                                            </div>
                                            <div className='popup-exit-container'>
                                              <button onClick={() => close()} className='popup-exit-container'>  
                                               x
                                              </button>
                                            </div>
                                          </ul>
                                        </div>
                                        <div className='popup-author-date-textinfo'>
                                          <p>{article.author} | {article.date}</p>
                                        </div>
                                        <div className='popup-content-container'>
                                          <div className='popup-content'>
                                            {article.content}
                                          </div>                                          
                                        </div>
                                      </div>
                                        <ul className='popup-publish-delete-button-container'>
                                          <li>
                                            <button onClick = {""} className="articles-publish-button">
                                              Publish
                                            </button>
                                          </li>
                                          <li>
                                            <button onClick = {() => deleteSingleArticle(article.id)} className="articles-delete-button">
                                             Delete
                                            </button>
                                          </li>
                                        </ul>
                                  </div>
                              )
                          }
                      </Popup> 
                    </div>
                </ul>
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

export default ArticlePosts;