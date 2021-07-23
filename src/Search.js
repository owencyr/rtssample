import React, { useState } from 'react';
import { getByDate } from './api/hackerNews';

export default function Search({ addSearchHistory }) {
  const handleSubmit = async (event = { preventDefault: () => {} }) => {
    try {
      event.preventDefault();
      const searchTermValid = searchTerm !== '';
      console.log({ searchTerm });
      if (searchTermValid) {
        const {
          searchResults = [],
          searchResultsPage = 0,
          totalPages = 0,
        } = await getByDate(searchTerm);
        if (searchResults && searchResults.length) {
          addSearchHistory(searchTerm);
          updateSearchResults(searchResults);
          updateSearchResultsPage(searchResultsPage);
          updateTotalSearchResultsPages(totalPages);
        }
      } else {
        throw new Error('Not a valid search term');
      }
    } catch (e) {
      updateErrorMessage(e);
    }
  };

  const renderSearchResults = (searchResults) => {
    return searchResults.map((result, index) => {
      return (
        <li key={`${result.title.slice(4)}-${index}}`}>
          <a href={result.url}>{result.title}</a>
        </li>
      );
    });
  };

  const nextPage = () => {
    updateSearchResultsPage(searchResultsPage + 1);
    handleSubmit(searchResultsPage);
  };

  const previousPage = () => {
    const pageToUpdateTo = searchResultsPage > 1 ? searchResultsPage - 1 : 1;
    updateSearchResultsPage(pageToUpdateTo);
    handleSubmit(searchResultsPage);
  };

  const [searchTerm, updateSearchTerm] = useState('');
  const [searchResults, updateSearchResults] = useState([]);
  const [searchResultsPage, updateSearchResultsPage] = useState(0);
  const [totalSearchResultsPages, updateTotalSearchResultsPages] = useState(0);
  const [errorMessage, updateErrorMessage] = useState('');

  const previousPageButtonDisabled = searchResults.length === 0 || searchResultsPage === 0;
  const nextPageButtonDisabled =
    searchResults.length === 0 ||
    totalSearchResultsPages === 0 ||
    searchResultsPage === totalSearchResultsPages;

  console.log({ searchResults });
  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="text"
          placeholder="Search for articles"
          value={searchTerm}
          onChange={(event) => updateSearchTerm(event.target.value)}
        ></input>
        <div style={{ visibility: errorMessage === '' ? 'hidden' : 'visible' }}>{errorMessage}</div>
        <input type="submit"></input>
        <button
          id="previous-page-button"
          type="button"
          onClick={previousPage}
          disabled={previousPageButtonDisabled}
        >
          Previous Page
        </button>
        <button
          id="next-page-button"
          type="button"
          onClick={nextPage}
          disabled={nextPageButtonDisabled}
        >
          Next Page
        </button>
      </form>
      <ul>{searchResults ? renderSearchResults(searchResults) : null}</ul>
    </div>
  );
}
