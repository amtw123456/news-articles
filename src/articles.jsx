import React, { useState } from 'react';
import './articles.css'; // Import your header bar CSS file
import Articles from '../mock_data/news-article-MOCK_DATA.json';
import Popup from 'reactjs-popup';
import { BsPersonCircle } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";


function ArticlePosts() {
  
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
                                            <button onClick = {() => close()} className="publish-button">
                                              Publish
                                            </button>
                                          </li>
                                          <li>
                                            <button onClick = {() => close()} className="delete-button">
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