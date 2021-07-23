import fetchCacher from './fetchCacher';

export const getByDate = async (query = '', page = 0) => {
  const queryParams = `?tags=story&query=${query}&page=${page}`;
  const searchStoriesByDateUrl = `https://hn.algolia.com/api/v1/search_by_date${queryParams}`;
  try {
    const searchByDateResponse = await fetchCacher(searchStoriesByDateUrl);
    if (searchByDateResponse) {
      const { hits: searchResults = [], nbPages: totalPages = 0 } = searchByDateResponse;
      return { searchResults, totalPages };
    } else {
      throw new Error('No Response from API');
    }
  } catch (e) {
    throw new Error(e.message ? e.message : 'Error Occurred when Querying API');
  }
};
