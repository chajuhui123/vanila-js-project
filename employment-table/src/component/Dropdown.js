function Dropdown({ $app, initialState, handleChangePerData }) {
  this.state = initialState;
  this.onClick = handleChangePerData;

  this.$target = document.createElement("div");
  this.$target.className = "area";
  this.$target.id = "dropdown";
  $app.append(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const optionHTML = [5, 15]
      .map(
        (perData) => `
            <option value="${perData}" ${
          perData === this.state && "selected"
        }>${perData}개씩</option>
            `
      )
      .join("");

    this.$target.innerHTML = `
            <select name="counts" id="data-count-select">
                ${optionHTML}
            </select>
        `;
  };

  this.$target.addEventListener("change", (e) => {
    const { value, nodeName } = e.target;
    if (nodeName === "SELECT") {
      this.onClick(Number(value));
    }
  });

  this.render();
}

export default Dropdown;
