function TextInput({ $app, initialState, onChange }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.$target = document.createElement("div");
  this.$target.className = "SearchInput";
  this.render = () => {
    this.$target.innerHTML = `<input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value=${this.state}>`;
  };
  this.render();

  $app.append(this.$target);

  document
    .querySelector(".SearchInput__input")
    .addEventListener("keyup", (e) => {
      const exceptKey = [
        "ArrowDown",
        "ArrowUp",
        "ArrowLeft",
        "ArrowRight",
        "Enter",
      ];
      if (!exceptKey.includes(e?.key)) {
        const isAllClear = e?.target?.value === "";

        setTimeout(
          () => {
            onChange(e?.target?.value);
          },
          isAllClear ? 0 : 1500
        );
      }
    });

  document.querySelector(".SearchInput__input").focus();
}

export default TextInput;
