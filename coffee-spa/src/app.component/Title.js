class Title {
  constructor($main, $title) {
    this.$main = $main;
    this.$title = $title;
  }

  render() {
    const h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode(this.$title));

    this.$main.appendChild(h1);
  }
}

export default Title;
