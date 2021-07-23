export const getByDate = async (query = '', page = 0) => {
  const queryParams = `?tags=story&query=${query}&page=${page}`;
  const searchStoriesByDateEndpoint = `http://hn.algolia.com/api/v1/search_by_date${queryParams}`;

  try {
    const searchByDateResponse = await fetch(searchStoriesByDateEndpoint);
    const responseBody = await searchByDateResponse.json();
    if (responseBody) {
      const {
        hits: searchResults = null,
        page: searchResultsPage = null,
        nbPages: totalPages = null,
      } = responseBody
      console.log({ searchByDateResponse, responseBody, searchResultsPage, totalPages });
      return {  searchResults, searchResultsPage, totalPages };
    }
    return null;
  } catch (e) {
    throw new Error('Issue with Hacker News API');
  }
};
