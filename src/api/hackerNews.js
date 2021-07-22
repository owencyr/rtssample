export const getByDate = async (query) => {
  const searchStoriesByDateEndpoint = `http://hn.algolia.com/api/v1/search_by_date?tags=story&query=${query}`;

  try {
    const searchStoriesByDateResponse = await fetch(searchStoriesByDateEndpoint);
    const responseBody = await searchStoriesByDateResponse.json()
    const searchResults = responseBody && responseBody.hits ? responseBody.hits : null
    console.log({ searchByDateResponse: searchStoriesByDateResponse, responseBody });

    return searchResults
  } catch (e) {
    throw e
  }
};
