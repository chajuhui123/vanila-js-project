const TEMPLATE = '<input type="text">';

class SearchInput {
  recentInput = [];

  constructor({ $target, onSearch, onClick }) {
    const $searchHeader = document.createElement("div");
    $searchHeader.className = "SearchHeader";
    $target.appendChild($searchHeader);

    // 다크모드/라이트모드 토글
    const $themeModeToggle = document.createElement("input");
    this.$themeModeToggle = $themeModeToggle;
    this.$themeModeToggle.type = "checkbox";
    $searchHeader.appendChild($themeModeToggle);

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.autofocus = true; // 페이지 진입시 자동 포커스
    $searchInput.className = "SearchInput";
    $searchHeader.appendChild($searchInput);

    // 랜덤 고양이 불러오기
    const $randomButton = document.createElement("button");
    $randomButton.innerText = "랜덤";
    $randomButton.className = "RandomButton";
    $searchHeader.appendChild($randomButton);

    // 최근 검색어
    const $recentInput = document.createElement("div");
    $recentInput.className = "RecentInput";

    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
        this.$searchInput.value = "";
        // 최근 5개의 검색어 남기고 리셋시키기
      }
    });

    // input 클릭시 입력값 초기화
    $searchInput.addEventListener("click", (e) => {
      if (e.target.value.length > 0) {
        e.target.value = "";
      }
    });

    // 키워드 클릭시 해당 검색으로 이동
    $recentInput.addEventListener("click", (e) => {
      if (e.target.nodeName === "BUTTON") {
        onSearch(e.target.innerText);
        this.$searchInput.value = "";
      }
    });

    $randomButton.addEventListener("click", (e) => {
      onClick();
    });

    $themeModeToggle.addEventListener("click", () => {
      const theme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isToggleChecked = $themeModeToggle.checked;
      // 다크모드 경우
      if (theme) {
        if (isToggleChecked) {
          document.body.classList.add("light");
          document.body.classList.remove("dark");
        } else {
          document.body.classList.add("dark");
          document.body.classList.remove("light");
        }
      } else {
        // 다크모드 아닌 경우
        if (isToggleChecked) {
          document.body.classList.add("dark");
          document.body.classList.remove("light");
        } else {
          document.body.classList.add("light");
          document.body.classList.remove("dark");
        }
      }
    });
    console.log("SearchInput created.", this);
  }
  render() {}
}
