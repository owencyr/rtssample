import React, { useState } from 'react';
import { getByDate } from './api/hackerNews';

export default function Search({ addSearchHistory }) {
  const handleSearch = async (event) => {
    event.preventDefault();
    console.log({ searchTerm });
    const articles = await getByDate(searchTerm);
    if (articles) {
      addSearchHistory(searchTerm);
      updateSearchResults(articles)
    }
  };

  const renderSearchResults = (searchResults) => {
    return searchResults.map((result, index) => {
      return <li key={`${result.title.slice(4)}-${index}}`}>{result.title}</li>;
    });
  };

  const [searchTerm, updateSearchTerm] = useState('');
  const [searchResults, updateSearchResults] = useState([]);
  console.log({ searchTerm });
  return (
    <div>
      <form onSubmit={(event) => handleSearch(event)}>
        <input
          type="text"
          placeholder="search For articles here"
          value={searchTerm}
          onChange={(event) => updateSearchTerm(event.target.value)}
        ></input>
        <input type="submit"></input>
      </form>
      <ul>{searchResults ? renderSearchResults(searchResults) : null}</ul>
    </div>
  );
}
