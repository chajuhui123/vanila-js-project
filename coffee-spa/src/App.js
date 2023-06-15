import ProductListPage from "./page/ProductListPage.js";
import ProductDetailPage from "./page/ProductDetailPage.js";

class App {
  constructor($body) {
    this.$body = $body;
    this.render();
  }

  async render() {
    const pageDiv = document.createElement("div");
    const pathLi = location.pathname.split("/").filter((item) => item !== "");

    if (pathLi.length === 1) {
      pageDiv.setAttribute("class", "ProductListPage");
      this.$body.appendChild(pageDiv);
      const productListPage = new ProductListPage(pageDiv);
      productListPage.render();
    } else if (pathLi[1] === "products") {
      console.log("products", pathLi[2]);
      pageDiv.setAttribute("class", "ProductDetailPage");
      this.$body.appendChild(pageDiv);
      const productDetailPage = new ProductDetailPage(pageDiv, pathLi[2]);
      productDetailPage.render();
    } else if (pathLi[1] === "cart") {
      console.log("cart");
      pageDiv.setAttribute("class", "CartPage");
      this.$body.appendChild(pageDiv);
      // const productListPage = new ProductListPage(pageDiv);
      // productListPage.render();
    }
  }
}

export default App;
