import React, { useState } from 'react';
import { getByDate } from './api/hackerNews';
import { firstPageIndex, strings, defaults } from './constants';

export default function Search({ addSearchHistory }) {
  const [searchTerm, setSearchTerm] = useState(defaults.searchTerm);
  const [searchResults, setSearchResults] = useState(defaults.searchResults);
  const [currentPage, setCurrentPage] = useState(defaults.currentPage);
  const [totalSearchResultsPages, setTotalSearchResultsPages] = useState(
    defaults.totalSearchResultsPages
  );
  const [errorMessage, setErrorMessage] = useState(defaults.errorMessage);
  const [loading, setLoading] = useState(false);

  const previousPageButtonDisabled =
    loading || searchResults.length === 0 || currentPage === firstPageIndex;
  const nextPageButtonDisabled =
    loading ||
    searchResults.length === 0 ||
    totalSearchResultsPages === 0 ||
    currentPage === totalSearchResultsPages;
  const displayedPage = `${strings.pageText}${currentPage + 1}`;

  const handleSubmit = async (event = { preventDefault: () => {} }, page) => {
    setErrorMessage(strings.defaultErrorMessage);
    try {
      if (event) event.preventDefault();
      const searchTermValid = searchTerm !== '';
      if (searchTermValid) {
        const { searchResults = [], totalPages = 0 } = await getByDate(searchTerm, page);
        if (searchResults && searchResults.length) {
          addSearchHistory(searchTerm);
          setSearchResults(searchResults);
          setTotalSearchResultsPages(totalPages);
        } else {
          setSearchResults(defaults.searchResults);
        }
      } else {
        throw new Error('Not a valid search term');
      }
      return null;
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  const renderSearchResults = (searchResults) =>
    searchResults.map((result, index) => {
      const key = result.objectId ? result.objectId : `${result.title.slice(4)}${index}`;
      return (
        <li key={key}>
          <a href={result.url}>{result.title}</a>
        </li>
      );
    });

  const nextPage = async () => {
    setLoading(true);
    const pageToQuery = currentPage + 1;
    await handleSubmit(null, pageToQuery);
    setCurrentPage(pageToQuery);
  };

  const previousPage = async () => {
    setLoading(true);
    const pageToQuery = currentPage - 1;
    await handleSubmit(null, pageToQuery);
    setCurrentPage(pageToQuery);
  };

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event, currentPage)}>
        <input
          type="text"
          placeholder={strings.inputPlaceholder}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        ></input>
        <div style={{ visibility: errorMessage === '' ? 'hidden' : 'visible' }}>{errorMessage}</div>
        <input type="submit"></input>
        <button
          id="previous-page-button"
          type="button"
          onClick={previousPage}
          disabled={previousPageButtonDisabled}
        >
          {strings.previousPage}
        </button>
        <div>{displayedPage}</div>
        <button
          id="next-page-button"
          type="button"
          onClick={nextPage}
          disabled={nextPageButtonDisabled}
        >
          {strings.nextPage}
        </button>
      </form>
      <ul>{searchResults && searchResults.length ? renderSearchResults(searchResults) : 'No Results'}</ul>
    </div>
  );
}
