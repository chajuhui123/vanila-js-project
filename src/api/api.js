const API_END_POINT = "";

export const request = async (nodeId) => {
  try {
    const res = await fetch(`${API_END_POINT}/${nodeId ? nodeId : ""}`);
    if (!res.ok) throw new Error("서버의 상태를 확인해주세요.");
    return await res.json();
  } catch (e) {
    throw new Error(`오류가 발생하였습니다. ${e.message}`);
  }
};
