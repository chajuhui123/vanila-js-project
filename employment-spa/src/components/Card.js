{
  /* <div idx="1" class="card">
    <div class="card_plane card_plane--front">Heedo</div>
    <div class="card_plane card_plane--back">ESTJ</div>
</div> */
}

// idx를 가지는 카드 컴포넌트
export const cardDiv = (index) => {
  const card_div = document.createElement("div");
  card_div.setAttribute("idx", index);
  card_div.setAttribute("class", "card");

  let cardStorage = JSON.parse(localStorage.getItem("cardStatus"));
  if (!cardStorage[index]) {
    cardStorage.push({
      idx: index,
      status: "card",
    });
    localStorage.setItem("cardStatus", JSON.stringify(cardStorage));
  }

  card_div.addEventListener("click", (e) => {
    console.log(e);
    card_div.classList.toggle("is-flipped"); // class 명을 추가하는 메서드
    let cardStorage = JSON.parse(localStorage.getItem("cardStatus"));
    cardStorage[index].status = targetStatus;
    localStorage.setItem("cardStatus", cardStorage);
  });

  return card_div;
};

// 카드 안의 컨텐츠
export const cardPlane = (side, data) => {
  const cardPlane_div = document.createElement("div");
  cardPlane_div.setAttribute("class", "card_plane card_plane--" + side);
  cardPlane_div.appendChild(document.createTextNode(data));

  return cardPlane_div;
};
