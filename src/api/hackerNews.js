export const getByDate = async (query) => {
  const searchStoriesByDateEndpoint = `http://hn.algolia.com/api/v1/search_by_date?tags=story&query=${query}`;

  try {
    const searchStoriesByDateResponse = await fetch(searchStoriesByDateEndpoint);
    const responseBody = await searchStoriesByDateResponse.json()
    console.log({ searchByDateResponse: searchStoriesByDateResponse, responseBody });
  } catch (e) {
    throw e
  }
};
