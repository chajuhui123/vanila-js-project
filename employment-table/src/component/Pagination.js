function Pagination({ $app, initialState, handlePickPage }) {
  this.state = initialState;
  this.onClick = handlePickPage;

  this.$target = document.createElement("div");
  this.$target.className = "area";
  this.$target.id = "pagination";
  $app.append(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { perData, tableData, currentPage } = this.state;
    const maxPage =
      tableData.length === 0 ? 1 : Math.ceil(tableData.length / perData);

    const getNumButtons = () => {
      const buttons = [];
      for (let num = 1; num <= maxPage; num++) {
        buttons.push(
          `<button ${
            num === currentPage && 'style="color:red"'
          }>${num}</button>`
        );
      }
      return buttons.join("");
    };

    const buttonHtml = getNumButtons();

    this.$target.innerHTML = `
            <button class="arrow"><<</button>
            ${buttonHtml}
            <button class="arrow">>></button>
        `;
  };

  this.$target.addEventListener("click", (e) => {
    const { className, innerHTML, nodeName } = e.target;
    const { perData, tableData, currentPage } = this.state;
    const maxPage =
      tableData.length === 0 ? 1 : Math.ceil(tableData.length / perData);

    if (nodeName === "BUTTON") {
      let nextPage = currentPage;

      if (className === "arrow") {
        nextPage = innerHTML === ("&lt;&lt;" || "<<") ? 1 : maxPage;
      } else {
        nextPage = Number(innerHTML);
      }

      this.onClick(nextPage);
    }
  });

  this.render();
}

export default Pagination;
