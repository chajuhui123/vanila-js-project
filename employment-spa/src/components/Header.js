{
  /* <header>
    <div class="header header_left">
        <span class="menu_name" id="menu_home">HOME</span>
    </div>
    <div class="header header_right">
        <span class="menu_name" id="menu_signup">SIGNUP</span>
    </div>
</header> */
}

class Header {
  constructor($body) {
    // App 컴포넌트로부터 전달받은 GNB 요소의 상위 요소인 body 를 인자로 갖는 constructor() 를 선언하여 렌더링 함수에서 사용할 수 있도록 합니다.
    this.$body = $body;
  }

  // header 양 옆으로 구성되는 menu 하위 아이템을 만들기 위한 함수
  createMenuElem(divClass, spanClass, spanId, menuText) {
    const div = document.createElement("div");
    div.setAttribute("class", divClass);

    const span = document.createElement("span");
    span.setAttribute("class", spanClass);
    span.setAttribute("id", spanId);

    // span 태그를 div 태그 안에 포함시키기
    // span 요소 노드와 텍스트 노드 연결
    span.appendChild(document.createTextNode(menuText)); //<span> 태그에 연결하기 위한 텍스트 노드를 생성하기 위해서는 createTextNode()
    // div 요소 노드와 span 요소 노드 연결
    div.appendChild(span);

    return div;
  }

  render() {
    const header = document.createElement("header");
    const home_menu = this.createMenuElem(
      "header header_left",
      "menu_name",
      "menu_home",
      "HOME"
    );
    const signup_menu = this.createMenuElem(
      "header header_right",
      "menu_name",
      "menu_signup",
      "SIGNUP"
    );

    header.appendChild(home_menu);
    header.appendChild(signup_menu);

    this.$body.appendChild(header);

    // home 메뉴 클릭에 대한 이벤트
    home_menu.addEventListener("click", () => {
      window.history.pushState("", "", "/web/");
      const urlChange = new CustomEvent("urlchange", {
        detail: { href: "/web/" },
      });
      document.dispatchEvent(urlChange);
    });
    // signup 메뉴 클릭에 대한 이벤트
    signup_menu.addEventListener("click", () => {
      window.history.pushState("", "", "/web/signup");
      const urlChange = new CustomEvent("urlchange", {
        detail: { href: "/web/signup" },
      });
      document.dispatchEvent(urlChange);
    });
  }
}
export default Header;
