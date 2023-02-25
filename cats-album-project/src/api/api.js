const BASE_URL = "";

const request = async (nodeId) => {
  try {
    const res = await fetch(`${BASE_URL}/${nodeId ? nodeId : ""}`);
    if (!res.ok) throw new Error("서버의 상태를 확인해주세요.");
    return await res.json();
  } catch (e) {
    throw new Error(`오류가 발생하였습니다. ${e.message}`);
  }
};

const loading_request = async ({ nodeId, setLoading, finishLoading }) => {
  try {
    setLoading();
    const nodes = await request(nodeId);
    return nodes;
  } catch (e) {
    throw new Error(`무엇인가 잘못 되었습니다. ${e.message}`);
  } finally {
    finishLoading();
  }
};

export { request, loading_request };
