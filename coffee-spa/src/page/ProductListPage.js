import ProductList from "../feature.component/product/ProductList.js";
import { api } from "../api/api.js";

export default function ProductListPage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "ProductListPage";

  $page.innerHTML = "<h1>상품 목록</h1>";

  const fetchProducts = async () => {
    const products = await api.fetchProducts();
    this.setState(products);
  };

  const productList = new ProductList({
    $target: $page,
    initialState: this.state,
  });

  fetchProducts();

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
