{
  /* <div class="SelectedLanguage">
  <ul>
    <li>JavaScript</li>
    <li>Python</li>
    <li>Elixir</li>
    <li>Java</li>
    <li>PHP</li>
  </ul>
</div>; */
}

function SelectedLanguage({ $app }) {
  this.$target = document.createElement("div");
  this.$target.className = "SelectedLanguage";
  target.appendChild(this.$target);

  this.state = {
    items: [],
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    if (this.state.items.length > 5) {
      this.state.items = this.state.items.slice(
        this.state.items.length - 5,
        this.state.items.length
      );
    }
    this.render();
  };

  this.render = () => {
    if (this.state.items.length > 0) {
      this.$target.style.display = "block";
      this.$target.innerHTML = `
                <ul>
                    ${this.state.items.map(
                      (el) => `
                        <li>${el}</li>
                        `
                    )}
                </ul>
            `;
    } else {
      this.$target.style.display = "none";
      this.$target.innerHTML = "";
    }
  };

  this.render();
}

export default SelectedLanguage;
