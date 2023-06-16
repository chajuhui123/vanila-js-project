import SelectedOptions from "./SelectedOption.js";

function ProductDetail({ $target, initialState }) {
  let isInitialized = false; // 화면 깜빡임 방지

  const $productDetail = document.createElement("div");
  $productDetail.className = "ProductDetail";

  $target.appendChild($productDetail);

  let selectedOptions = null;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();

    if (selectedOptions) {
      selectedOptions.setState({
        selectedOptions: this.state.selectedOptions,
      });
    }
  };

  this.render = () => {
    const { product } = this.state;

    if (!isInitialized) {
      $productDetail.innerHTML = `
      <img src="${product.imageUrl}">
      <div class="ProductDetail__info">
        <h2>${product.name}</h2>
        <div class="ProductDetail__price">${product.price}원~</div>
        <select>
          <option>선택하세요.</option>
          ${product.productOptions
            .map(
              (option) =>
                `
              <option value="${option.id}" ${
                  option.stock === 0 ? "disabled" : ""
                }>
                ${option.stock === 0 ? "(품절) " : ""}${product.name} ${
                  option.name
                } ${option.price > 0 ? `(+${option.price}원)` : ""}
              </option>
            `
            )
            .join("")}
        </select>
        <div class="ProductDetail__selectedOptions"></div>
      </div>
    `;

      const selectedOptions = new SelectedOptions({
        $target: $productDetail.querySelector(
          ".ProductDetail__selectedOptions"
        ),
        initialState: {
          product: this.state.product,
          selectedOptions: this.state.selectedOptions,
        },
      });

      isInitialized = true;
    }
  };

  this.render();

  $productDetail.addEventListener("change", (e) => {
    if (e.target.tagName === "SELECT") {
      const selectedOptionId = parseInt(e.target.value);
      const { product, selectedOptions } = this.state;
      // 상품의 옵션 데이터에서 현재 선택한 optionId가 존재하는지 탐색
      const option = product.productOptions.find(
        (option) => option.id === selectedOptionId
      );
      // 이미 선택한 상품인지 선택된 상품 데이터에서 탐색
      const selectedOption = selectedOptions.find(
        (selectedOption) => selectedOption.optionId === selectedOptionId
      );

      // 위 경우 모두 아닌 상황에서 selectedOptions에 현재 선택한 옵션 추가
      if (option && !selectedOption) {
        const nextSelectedOptions = [
          ...selectedOptions,
          {
            productId: product.id,
            optionId: option.id,
            optionName: option.name,
            optionPrice: option.price,
            quantity: 1,
          },
        ];
        this.setState({
          ...this.state,
          selectedOptions: nextSelectedOptions,
        });
      }
    }
  });
}

export default ProductDetail;
