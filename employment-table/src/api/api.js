const request = async (url) => {
  try {
    const result = await fetch(url);
    if (result.status < 300) return result.json();
    else if (result.status < 400)
      return console.warn(`Redirection Error : ${result.status}`);
    else if (result.status < 500)
      return console.warn(`Client Error : ${result.status}`);
    else if (result.status < 600)
      return console.warn(`Server Error : ${result.status}`);
  } catch (e) {
    console.warn(e);
  }
};

const api = {
  fetchTableData: () => {
    return request("/web/src/data.json");
  },
};

export { api };
