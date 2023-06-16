import { api } from "../api/api.js";
import ProductDetail from "../feature.component/detail/ProductDetail.js";

function ProductDetailPage({ $target, productId }) {
  this.state = {
    productId,
    product: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const $page = document.createElement("div");
  $page.className = "ProductDetailPage";
  $page.innerHTML = "<h1>상품 정보</h1>";

  this.render = () => {
    if (!this.state.product) {
      $target.innerHTML = "Loading..";
    } else {
      $target.innerHTML = "";
      $target.appendChild($page);
      new ProductDetail({
        $target: $page,
        initialState: {
          product: this.state.product,
          // ProductDetail의 initialState에 선택된 상품들을 담아둘 selectedOptions 추가
          selectedOptions: [],
        },
      });
    }
  };

  this.fetchProduct = async () => {
    const { productId } = this.state;
    const product = await api.fetGetProductItemById(productId);
    this.setState({
      ...this.state,
      product,
    });
  };

  this.fetchProduct();
}

export default ProductDetailPage;
