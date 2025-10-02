// list.js
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

document.querySelector("h2").textContent = category; 


fetch(`https://kea-alt-del.dk/t7/api/products?category=${category}`)
  .then(res => res.json())
  .then(showProducts);

function showProducts(products) {
  const container = document.querySelector(".product_list_container");
  container.innerHTML = ""; 

  products.forEach(product => {
    const template = `
      <div class="product_card ${product.soldout ? "sold-out" : ""} ${product.discount ? "on-sale" : ""}">
        <div class="media">
          ${product.soldout ? `<span class="badge">Sold Out</span>` : ""}
          ${product.discount ? `<span class="badge">Sale</span>` : ""}
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
        </div>
        <div class="card-body">
          <h3>${product.productdisplayname}</h3>
          <p class="desc">${product.articletype} — ${product.brandname}</p>
        </div>
        <div class="card-footer">
          <p class="price">
            ${product.discount ?
              `<span class="old-price">${product.price} kr</span> <span class="new-price">${Math.round(product.price - product.price * product.discount / 100)} kr</span>` :
              `${product.price} kr`}
          </p>
          <a class="btn ${product.soldout ? "disabled" : ""}" 
             href="produkt.html?id=${product.id}">
             ${product.soldout ? "Notify me" : "View"}
          </a>
        </div>
      </div>`;
    container.insertAdjacentHTML("beforeend", template);
  });
}
