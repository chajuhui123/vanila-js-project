{
  /* <div class="Suggestion">
  <ul>
    <li class="Suggestion__item--selected">
      Action<span class="Suggestion__item--matched">Script</span>
    </li>
    <li>
      Java<span class="Suggestion__item--matched">Script</span>
    </li>
    <li>
      Type<span class="Suggestion__item--matched">Script</span>
    </li>
    <li>
      Pure<span class="Suggestion__item--matched">Script</span>
    </li>
  </ul>
</div>; */
}

function SuggestionLanguage({ $app, onSelect }) {
  this.$target = document.createElement("div");
  this.$target.className = "Suggestion";
  $app.appendChild(this.$target);

  this.state = {
    selectedIndex: 0,
    items: [],
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.render = () => {
    const { selectedIndex, items } = this.state;

    if (items.length > 0) {
      this.$target.style.display = "block";
      this.$target.innerHTML = `
                <ul>
                    ${items
                      .map(
                        (el, index) =>
                          `<li class="${
                            index === selectedIndex
                              ? "Suggestion__item--selected"
                              : ""
                          }" data-index=${index}>${el}</li>`
                      )
                      .join("")}
                </ul>
            `;
    } else {
      this.$target.style.display = "none";
      this.$target.innerHTML = "";
    }
  };

  window.addEventListener("keyup", (e) => {
    if (this.state.items.length > 0) {
      const lastIndex = this.state.items.length - 1;
      if (e.code === "ArrowUp") {
        this.setState({
          selectedIndex:
            this.state.selectedIndex > 0
              ? this.state.selectedIndex - 1
              : lastIndex,
        });
      } else if (e.code === "ArrowDown") {
        this.setState({
          selectedIndex:
            this.state.selectedIndex < lastIndex
              ? this.state.selectedIndex + 1
              : 0,
        });
      } else if (e.code === "Enter") {
        onSelect(this.state.items[this.state.selectedIndex]);
      }
    }
  });
}

export default SuggestionLanguage;
