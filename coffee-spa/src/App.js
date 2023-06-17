import ProductListPage from "./page/ProductListPage.js";
import ProductDetailPage from "./page/ProductDetailPage.js";
import CartPage from "./page/CartPage.js";
import { init } from "./module/router.js";

function App({ $target }) {
  this.route = () => {
    const { pathname } = location;

    $target.innerHTML = "";

    if (pathname === "/") {
      new ProductListPage({ $target }).render();
    } else if (pathname.indexOf("/products/") === 0) {
      const [, , productId] = pathname.split("/");
      new ProductDetailPage({
        $target,
        productId,
      }).render();
    } else if (pathname === "/cart") {
      new CartPage({
        $target,
      }).render();
    }
  };

  init(this.route); // 1. url 변경시 pushstate 후, ROUTE_CHANGE 이벤트 발생시킴 2. 이벤트 발시 this.route 실행
  window.addEventListener("popstate", this.route); // 뒤로 가기 처리

  this.route();
}

export default App;
