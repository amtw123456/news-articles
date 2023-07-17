import React, { useContext, useState, useEffect} from 'react';
import Articles from './MOCK-DATA.json';
import Popup from 'reactjs-popup';
import { AppContext } from './AppState';
import './navbar.css'; // Import your header bar CSS file


function HeaderBar() {
  const {checkedIds, setCheckedIds} = useContext(AppContext);
  console.log('Checked IDs:', checkedIds);
  const [isOpen, setIsOpen] = useState(false);

  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

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

  const handleDeleteAllChecked = () =>{
    const newArticles = Articles.filter((article) => !checkedIds.includes(article.id));
    Articles.splice(0, Articles.length, ...newArticles);
    setCheckedIds([]);
  }

  const pushDataOnClick = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed
    const day = currentDate.getDate();
    console.log(`${year}/${month}/${day}`);
    console.log(author)
    console.log(title)
    console.log(content)
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
                                  <form onSubmit={() => {}} >
                                    <div class="flex mb-3">
                                      <label class="mr-auto" htmlFor="author">Author:</label>
                                      <textarea
                                        class="ml-2 border h-5"
                                        id="content"
                                        value={author}
                                        onChange={handleAuthorChange}
                                      >
                                      </textarea>
                                    </div>
                                    <div class="flex mb-3">
                                      <label class="mr-auto" htmlFor="title">Title:</label>
                                      <textarea
                                        class="ml-2 border h-5"
                                        id="content"
                                        value={title}
                                        onChange={handleTitleChange}
                                      >
                                      </textarea>
                                    </div>
                                    <div>
                                      <label class="mr-auto mx-auto block text-center" htmlFor="content">Content</label>
                                      <div class="flex mb-3">
                                        <textarea
                                          class="ml-2 border h-40 w-full"
                                          id="content"
                                          value={content}
                                          onChange={handleContentChange}
                                        >
                                        </textarea>
                                      </div>
                                    </div>
                                  </form>
                                  <button onClick={pushDataOnClick} class="bg-violet-700 p-5 text-white py-2 px-4 rounded mx-auto mt-4 block">
                                    Publish
                                  </button>
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