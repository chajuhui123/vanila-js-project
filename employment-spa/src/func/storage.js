export const setPersonalInfo = async () => {
  const response = await fetch("...");
  const data = await response.json();

  // localStorage에 인사 정보가 없다면 저장, JSON.stringify(data) 로 저장
  if (!localStorage.getItem("personalInfo")) {
    localStorage.setItem("personalInfo", JSON.stringify(data));
  }
};

export const setCardStatus = () => {
  if (!localStorage.getItem("cardStatus")) {
    localStorage.setItem("cardStatus", JSON.stringify([]));
  }
};
