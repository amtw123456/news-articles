import React, { useState, useEffect } from "react";
import "./articles-test-page.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from 'aws-amplify';

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

import { listArticles } from "../graphql/queries";
import {
  createArticle as createArticleMutation,
  deleteNote as deleteNoteMutation
} from "../graphql/mutations";

const LoginPage = ({ signOut }) => {
  const [articles, setArticles] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const apiData = await API.graphql({ query: listArticles });
    const ArticlesFromAPI = apiData.data.listArticles.items;
    setArticles(ArticlesFromAPI);
  }

  async function createArticle(event) {
    event.preventDefault();
    const currentDate = new Date().toISOString().substring(0, 10);
    const form = new FormData(event.target);
    const data = {
      author: "name",
      title: "red green",
      content: "content content",
      date: currentDate,

    };
    await API.graphql({
      query: createArticleMutation,
      variables: { input: data },
    });
    // fetchNotes();
    // event.target.reset();
  }

  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await Storage.remove(name);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  return (    
    <View className="App">
      <Heading level={1}>My test App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createArticle}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Note Description"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <Button class="bg-violet-600" type="submit" variation="primary">
            Create Article
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
      {notes.map((note) => (
        <Flex
          key={note.id || note.name}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Text as="strong" fontWeight={700}>
            {note.name}
          </Text>
          <Text as="span">{note.description}</Text>
          {note.image && (
            <Image
              src={note.image}
              alt={`visual aid for ${notes.name}`}
              style={{ width: 400 }}
            />
          )}
          <Button variation="link" onClick={() => deleteNote(note)}>
            Delete note
          </Button>
        </Flex>
      ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(LoginPage);