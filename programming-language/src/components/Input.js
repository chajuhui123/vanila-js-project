// <form class="SearchInput">
//     <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value="Script">
// </form>

function Input({ $app, initialState, onChange }) {
  this.state = initialState;
  this.onChange = onChange;

  this.$target = document.createElement("form");
  this.$target.className = "SearchInput";

  this.render = () => {
    this.$target.innerHTML = `<input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value=${this.state}>`;
  };

  this.render();

  $app.append(this.$target);

  document.querySelector(".SearchInput").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  document
    .querySelector(".SearchInput__input")
    .addEventListener("keyup", (e) => {
      if (
        e.code !== "ArrowUp" &&
        e.code !== "ArrowDown" &&
        e.code !== "Enter"
      ) {
        onChange(e.target.value);
      }
    });

  document.querySelector(".SearchInput__input").focus();
}

export default Input;
