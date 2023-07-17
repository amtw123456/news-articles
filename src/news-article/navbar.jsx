import React, { useContext, useState, useEffect} from 'react';
import Articles from './MOCK-DATA.json';
import Popup from 'reactjs-popup';
import { AppContext } from './AppState';
import './navbar.css'; // Import your header bar CSS file

import { API, Storage } from 'aws-amplify';
import {
  createArticle as createArticleMutation,
  deleteArticle as deleteArticleMutation
} from "../graphql/mutations";
import { Auth } from 'aws-amplify';

function HeaderBar() {
  const {checkedIds, setCheckedIds} = useContext(AppContext);
  const [articles, setArticles] = useState([]);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    getCurrentUser()
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCheckboxChange = () => {
    if (checkedIds.length === Articles.length) {
      setCheckedIds([]);
    } else {
      const articleIds = Articles.map((article) => article.id);
      setCheckedIds(articleIds);
    }
  };

  
  async function handleDeleteAllChecked(){
    try {
      // Delete articles from the API
      await Promise.all(
        checkedIds.map(async (id) => {
          await API.graphql({
            query: deleteArticleMutation,
            variables: { input: { id } },
          });
        })
      );
  
      // Update the local state
      const newArticles = Articles.filter((article) => !checkedIds.includes(article.id));
      setArticles(newArticles);
      setCheckedIds([]);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }


  async function createArticle(event) {
    const currentDate = new Date().toISOString().substring(0, 10);
    const formData = document.getElementById("articleForm");
    const form = new FormData(formData);
    const authenticatedUsername = await getCurrentUser();
    const data = {
      author: authenticatedUsername,
      title: form.get("title"),
      content: form.get("content"),
      date: currentDate,

    };
    await API.graphql({
      query: createArticleMutation,
      variables: { input: data },
    });
    // fetchNotes();
    // event.target.reset();
  }

  async function getCurrentUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user.username;
    } catch (err) {
      console.log(err);
      throw err; // Rethrow the error to handle it outside the function if needed
    }
  }
  

  return (
      <ul>
          <input 
            type="checkbox" 
            className="checkbox-input"
            checked={checkedIds.length === Articles.length}
            onChange={handleCheckboxChange}
          />
          <Popup trigger=
                    {
                      <button className="navbar-publish-button" onclick="">
                            Publish
                      </button>
                    }
                    modal nested>
                      {
                        close => (
                            <div className='modal'>
                                <div class="pt-5">
                                  {/* <button className="close-button" onClick={onClose}>
                                    Close
                                  </button> */}
                                  <form id="articleForm" onSubmit={() => {}} >
                                    <div class="flex mb-3">
                                      <label class="mr-auto" htmlFor="title">Title:</label>
                                      <textarea
                                        name="title"
                                        class="ml-2 border h-5"
                                        id="title"
                                        value={title}
                                        onChange={handleTitleChange}
                                      >
                                      </textarea>
                                    </div>
                                    <div>
                                      <label class="mr-auto mx-auto block text-center" htmlFor="content">Content</label>
                                      <div class="flex mb-3">
                                        <textarea
                                          name="content"
                                          class="ml-2 border h-40 w-full"
                                          id="content"
                                          value={content}
                                          onChange={handleContentChange}
                                        >
                                        </textarea>
                                      </div>
                                    </div>
                                    <button onClick={createArticle} class="bg-violet-700 p-5 text-white py-2 px-4 rounded mx-auto mt-4 block">
                                      Publish
                                    </button>
                                  </form>
                                </div>
                            </div>
                        )
                    }
                </Popup> 
          <button onClick={() => handleDeleteAllChecked()} className="navbar-delete-button">Delete</button>
          <input type="text" className="search-bar" placeholder="Search..."/>
      </ul>  
  );
};

export default HeaderBar;