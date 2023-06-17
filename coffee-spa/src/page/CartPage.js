import { getItem } from "./storage.js";
import { routeChange } from "./router.js";

export default function CartPage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "CartPage";

  $page.innerHTML = "<h1>장바구니</h1>";

  const cartData = getItem("products_cart", []); // 문제에 나온 명칭 지켜주기!
  this.state = {
    products: null,
  };

  this.fetchProducts = async () => {
    const products = await Promise.all(
      cartData.map(async (cartItem) => {
        const product = await request(`/products/${cartItem.productId}`);
        const selectedOption = product.productOptions.find(
          (option) => option.id === cartItem.optionId
        );

        return {
          imageUrl: product.imageUrl,
          productName: product.name,
          quantity: cartItem.quantity,
          productPrice: product.price,
          optionName: selectedOption.name,
          optionPrice: selectedOption.price,
        };
      })
    );

    this.setState({ products });
  };

  this.render = () => {
    if (cartData.length === 0) {
      alert("장바구니가 비어있습니다.");
      routeChange("/");
    } else {
      $target.appendChild($page);
    }
  };

  this.fetchProducts();
}
