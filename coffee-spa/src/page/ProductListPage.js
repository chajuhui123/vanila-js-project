import Title from "../app.component/Title.js";
import ProductList from "../feature.component/product/ProductList.js";

class ProductListPage {
  constructor($main) {
    this.$main = $main;
  }

  render() {
    const title = new Title(this.$main, "상품목록");
    const productList = new ProductList(this.$main);

    title.render();
    productList.render();
  }
}

export default ProductListPage;
