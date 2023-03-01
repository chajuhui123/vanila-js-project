class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  loading = false;

  setState(nextData) {
    this.loading = nextData.loading;
    this.data = nextData.data;
    this.render();
  }

  render() {
    // 로딩 상태 및 데이터 없는 경우
    if (this.loading) {
      if (!this.data.length) {
        this.$searchResult.innerHTML = "<h3>검색 결과가 없습니다.</h3>";
      } else {
        // 마우스 오버시 고양이 이름
        this.$searchResult.innerHTML = this.data
          .map(
            (cat) => `
              <div class="item" title=${cat.name}>
                <img src=${cat.url} alt=${cat.name} />
              </div>
            `
          )
          .join("");

        this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
          $item.addEventListener("click", () => {
            this.onClick(this.data[index]);
          });
        });
      }
    }

    if (!this.loading && this.data === null) {
      this.$searchResult.innerHTML = "<h3>LOADING ...</h3>";
    }
    if (!this.loading && this.data === []) {
      this.$searchResult.innerHTML = "";
    }
  }
}
