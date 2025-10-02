console.log("Product list page loaded...");

const productList = document.querySelector("#productList");


const productUrl = "https://kea-alt-del.dk/t7/api/products?limit=12";

getData();

function getData() {
  console.log("Fetching products...");
  fetch(productUrl)
    .then(res => res.json())
    .then(data => showProducts(data));
}

function showProducts(products) {
  productList.innerHTML = ""; // 

  products.forEach(product => {
    
    let soldOutClass = product.soldout ? "sold-out" : "";
    let onSaleClass = product.discount ? "on-sale" : "";

    productList.innerHTML += `
      <div class="product_card ${soldOutClass} ${onSaleClass}">
        <div class="media">
          ${product.discount ? `<span class="badge">Sale</span>` : ""}
          ${product.soldout ? `<span class="badge">Sold Out</span>` : ""}
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" 
               alt="${product.productdisplayname}" />
        </div>

        <div class="card-body">
          <h3>${product.productdisplayname}</h3>
          <p class="desc">${product.articletype} — ${product.brandname}</p>
        </div>

        <div class="card-footer">
          <p class="price">
            ${product.discount 
              ? `<span class="old-price">${product.price} DKK</span>
                 <span class="new-price">${Math.floor(product.price * (1 - product.discount/100))} DKK</span>`
              : `${product.price} DKK`}
          </p>
          <a class="btn ${product.soldout ? "disabled" : ""}" 
             href="produkt.html?id=${product.id}">
             ${product.soldout ? "Notify me" : "View"}
          </a>
        </div>
      </div>
    `;
  });
}
