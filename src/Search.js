import React, { useState } from 'react';
import { getByDate } from './api/hackerNews';

const strings = {
  nextPage: 'Next Page',
  previousPage: 'Previous Page',
  inputPlaceholder: 'Search for articles',
  pageText: 'Page: ',
};

const firstPageIndex = 0;

export default function Search({ addSearchHistory }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(firstPageIndex);
  const [totalSearchResultsPages, setTotalSearchResultsPages] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const previousPageButtonDisabled =
    loading || searchResults.length === 0 || currentPage === firstPageIndex;
  const nextPageButtonDisabled =
    loading ||
    searchResults.length === 0 ||
    totalSearchResultsPages === 0 ||
    currentPage === totalSearchResultsPages;
  const displayedPage = currentPage + 1;

  const handleSubmit = async (event = { preventDefault: () => {} }, page) => {
    try {
      if (event) event.preventDefault();
      const searchTermValid = searchTerm !== '';
      if (searchTermValid) {
        const { searchResults = [], totalPages = 0 } = await getByDate(searchTerm, page);
        if (searchResults && searchResults.length) {
          addSearchHistory(searchTerm);
          setSearchResults(searchResults);
          setTotalSearchResultsPages(totalPages);
        }
      } else {
        throw new Error('Not a valid search term');
      }
      return null;
    } catch (e) {
      setErrorMessage(e);
    } finally {
      setLoading(false);
    }
  };

  const renderSearchResults = (searchResults) =>
    searchResults.length
      ? searchResults.map((result, index) => {
          const key = result.objectId ? result.objectId : `${result.title.slice(4)}${index}`;
          return (
            <li key={key}>
              <a href={result.url}>{result.title}</a>
            </li>
          );
        })
      : null;

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
        <div>
          {strings.pageText}
          {displayedPage}
        </div>
        <button
          id="next-page-button"
          type="button"
          onClick={nextPage}
          disabled={nextPageButtonDisabled}
        >
          {strings.nextPage}
        </button>
      </form>
      <ul>{searchResults && searchResults.length ? renderSearchResults(searchResults) : null}</ul>
    </div>
  );
}
