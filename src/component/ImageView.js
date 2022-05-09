const IMAGE_PATH_PREFIX = "...";

export default function ImageView({ $app, initialState, onClick }) {
  this.state = initialState;
  this.onClick = onClick;

  this.$target = document.createElement("div");
  this.$target.className = "Modal ImageView";
  $app.append(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `<div class="content">${
      this.state ? `<IMG SRC = "${IMAGE_PATH_PREFIX}${this.state}"/>` : ""
    }</div>`;
    this.$target.style.display = this.state ? "block" : "none";
    this.$target.addEventListener("click", onClick);
  };

  this.render();
}
