import React, { useState } from 'react';
import { getByDate } from './api/hackerNews';

export default function Search() {
  const handleSearch = (event) => {
    event.preventDefault();
    console.log({ searchTerm });
    getByDate(searchTerm);
  };
  const [searchTerm, updateSearchTerm] = useState('');
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
    </div>
  );
}
