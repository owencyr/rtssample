import fetchCacher from './fetchCacher';

export const getByDate = async (query = '', page = 0) => {
  const queryParams = `?tags=story&query=${query}&page=${page}`;
  const searchStoriesByDateUrl = `https://hn.algolia.com/api/v1/search_by_date${queryParams}`;
  try {
    const searchByDateResponse = await fetchCacher(searchStoriesByDateUrl);
    if (searchByDateResponse) {
      const { hits: searchResults = [], nbPages: totalPages = 0 } = searchByDateResponse;
      return { searchResults, totalPages };
    }
    return { searchResults: [], totalPages: 0 };
  } catch (e) {
    throw new Error('Issue with Hacker News API');
  }
};
