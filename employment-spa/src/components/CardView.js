{
  /* 
    <div id="cards_container">
        <div idx="1" class="card">
            <div class="card_plane card_plane--front">Heedo</div>
            <div class="card_plane card_plane--back">ESTJ</div>
        </div>
        ...
    </div> 
*/
}

import { cardDiv, cardPlane } from "./Card.js";
import { setCardStatus } from "../api/storage.js";

class CardView {
  constructor($main) {
    this.$main = $main;
  }
  render() {
    setCardStatus();

    const containerDiv = document.createElement("div");
    containerDiv.setAttribute("id", "cards_container");

    const personalInfo = JSON.parse(localStorage.getItem("personalInfo")) ?? [];

    for (let i = 0; i < personalInfo.length; i++) {
      console.log(personalInfo);
      const card = cardDiv(i); // 카드의 레이아웃 요소

      const personNickName = personalInfo[i]?.nickname ?? "-";
      const personMBTI = personalInfo[i]?.mbti ?? "-";

      card.appendChild(cardPlane("front", personNickName)); // 카드 앞면의 요소
      card.appendChild(cardPlane("back", personMBTI)); // 카드 뒷면의 요소
      containerDiv.appendChild(card);
    }

    this.$main.appendChild(containerDiv);
  }
}

export default CardView;
