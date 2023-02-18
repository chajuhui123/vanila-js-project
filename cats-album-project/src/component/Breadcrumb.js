function Breadcrumb({ $app, initialState: [], onClick }) {
  this.state = initialState;
  this.onClick = onClick;

  this.$target = document.createElement("nav");
  this.$target.className = "Breadcrumb";
  $app.append(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `<div class ="nav-item">root</div>${this.state
      .map(
        (node, index) =>
          `<div class="nav-item" data-index="${index}">${node.name}</div>`
      )
      .join("")}`;
  };

  // 이벤트 위임 (이전 path로 돌아가기)
  this.$target.addEventListener("click", (e) => {
    const $navItem = e.target.closet(".nav-item");

    if ($navItem) {
      const { index } = $navItem.dataset;
      this.onClick(index ? parseInt(index, 10) : null);
    }
  });

  this.render();
}

export default Breadcrumb;
