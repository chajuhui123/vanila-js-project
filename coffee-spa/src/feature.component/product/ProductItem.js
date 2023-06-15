export const productListItem = (index, imageUrl, name, price) => {
  const product_li = document.createElement("li");
  product_li.setAttribute("idx", index);
  product_li.setAttribute("class", "Product");

  const img = document.createElement("img");
  img.setAttribute("src", imageUrl);

  const div = document.createElement("div");
  div.setAttribute("class", "Product__info");

  const name_div = document.createElement("div");
  name_div.appendChild(document.createTextNode(name));
  const price_div = document.createElement("div");
  price_div.appendChild(
    document.createTextNode(`${price.toLocaleString()}원~`)
  );

  div.appendChild(name_div);
  div.appendChild(price_div);
  product_li.appendChild(img);
  product_li.appendChild(div);

  product_li.addEventListener("click", (e) => {
    // url 이동
    console.log(e);
  });

  return product_li;
};
