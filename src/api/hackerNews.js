import fetchCacher from './fetchCacher';

export const getByDate = async (query = '', page = 0) => {
  const queryParams = `?tags=story&query=${query}&page=${page}`;
  const searchStoriesByDateEndpoint = `https://hn.algolia.com/api/v1/search_by_date${queryParams}`;

  try {
    const searchByDateResponse = await fetchCacher(searchStoriesByDateEndpoint);
    if (searchByDateResponse) {
      const {
        hits: searchResults = null,
        page: searchResultsPage = null,
        nbPages: totalPages = null,
      } = searchByDateResponse;
      return { searchResults, searchResultsPage, totalPages };
    }
    return null;
  } catch (e) {
    throw new Error('Issue with Hacker News API');
  }
};
