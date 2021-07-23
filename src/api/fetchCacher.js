const cache = new Map();

const fetchCacher = async (url) => {
  if (!cache.get(url)) {
    const result = await fetch(url);
    const resultJson = await result.json()
    cache.set(url, resultJson);
    return resultJson;
  } else {
    return cache.get(url);
  }
};

export default fetchCacher;
