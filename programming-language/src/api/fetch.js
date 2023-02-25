const baseUrl = "";

const cache = {};

const request = async (url) => {
  if (cache[url]) return cache[url];

  const res = await fetch(url);

  if (res?.ok) {
    const json = await res.json();
    cache[url] = json;
    return json;
  }

  throw new Error("알 수 없는 오류가 발생하였습니다.");
};

const fetchRecommendLanguages = (keyword) => {
  const data = request(`${baseUrl}/languages?keyword=${keyword}`);
  return data;
};

export { fetchRecommendLanguages };
