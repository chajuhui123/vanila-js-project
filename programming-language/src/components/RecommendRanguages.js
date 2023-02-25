function RecommendLanguages({ $app, initialState, onSelect }) {
  this.state = {
    searchLanguage: "",
    suggestionIndex: 0,
    items: [],
    selectedLanguages: initialState.selectedLanguages,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.setIndex = (number) => {
    this.state.suggestionIndex = number;
    this.render();
  };

  this.$target = document.createElement("div");
  this.$target.className = "Suggestion";
  $app.appendChild(this.$target);

  this.render = () => {
    const items = this.state.items;
    const selectedIndex = this.state.suggestionIndex;

    if (items.length > 0) {
      this.$target.style.display = "block";
      this.$target.style.marginTop = "50px";
      this.$target.innerHTML = `
            <ul>
              ${items
                .map((item, index) => {
                  return `<li class="${
                    selectedIndex === index ? "Suggestion__item--selected" : ""
                  }" data-index=${index} >${item}</li>`;
                })
                .join("")}
            </ul>
          `;
    } else {
      this.$target.style.display = "none";
      this.$target.innerHTML = "";
    }
  };

  this.render();

  window.addEventListener("keyup", (e) => {
    if (this.state.items.length > 0) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        // e.key를 통해서 해당 값이 어떤 버튼을 통해서 눌렸는지 확인합니다.
        if (
          0 <= this.state.suggestionIndex &&
          this.state.suggestionIndex < this.state.items.length - 1
        ) {
          this.setIndex(this.state.suggestionIndex + 1);
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (0 < this.state.suggestionIndex) {
          this.setIndex(this.state.suggestionIndex - 1);
        }
      } else if (e.key === "Enter") {
        onSelect(this.state.items[this.state.suggestionIndex]);
      }
    }
  });

  this.$target.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      const { index } = $li.dataset;
      try {
        onSelect(this.state.items[index]);
      } catch {
        alert("선택할 수 없습니다.");
      }
    }
  });
}

export default RecommendLanguages;
