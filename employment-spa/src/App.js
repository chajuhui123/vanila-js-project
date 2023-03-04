import Header from "./components/Header.js";
import HomePage from "./page/HomePage.js";
import SignupPage from "./page/SignupPage.js";
import { setPersonalInfo } from "./api/storage.js";

// 생성자 함수 + 랜더링 함수의 구성
class App {
  // 인사 정보 페이지의 요소들을 화면에 나타내기 위해 최상위 요소인 body 를 인자로 갖는 constructor() 를 선언하여 렌더링 함수에서 사용할 수 있도록 합니다.
  // 해당 함수 필드에는 index.js 로부터 전달받은 body 요소를 this 문법을 활용하여 특정 이름의 멤버 변수(예. $body)로 정의합니다.
  // render() 함수를 실행하여 index.js 에서 컴포넌트를 사용할 때, 구현한 인사 정보 SPA 리뉴얼 페이지가 화면에 렌더링 되도록 합니다.
  constructor($body) {
    this.$body = $body;
    this.render();
  }

  async render() {
    await setPersonalInfo();

    // 헤더
    const header = new Header(this.$body);
    header.render();

    // 페이지 content
    const main = document.createElement("main");
    main.setAttribute("id", "page_content");
    this.$body.appendChild(main);

    const homePage = new HomePage(main);
    const signupPage = new SignupPage(main);

    homePage.render();

    document.addEventListener("urlchange", (e) => {
      let pathname = e.detail.href;

      switch (pathname) {
        case "/web/":
          homePage.render();
          break;
        case "/web/signup":
          signupPage.render();
          break;
        default:
      }
    });
  }
}

export default App;
