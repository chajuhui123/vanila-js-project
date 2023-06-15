import { api } from "../../api/api.js";
import { productListItem } from "./ProductItem.js";

class ProductList {
  constructor($main) {
    this.$main = $main;
  }

  async render() {
    const productListUl = document.createElement("ul");

    const products = await api.fetchGetProductItem();
    products.forEach((product) => {
      const { id, imageUrl, name, price } = product;
      const productItem = productListItem(id, imageUrl, name, price);

      productListUl.appendChild(productItem);
    });

    this.$main.appendChild(productListUl);
  }
}

export default ProductList;
