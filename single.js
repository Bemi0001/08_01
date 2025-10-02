
const params = new URLSearchParams(window.location.search);
const id = params.get("id");


fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
  .then(res => res.json())
  .then(product => showProduct(product));


function showProduct(product) {
  const container = document.querySelector("#productContainer");

  container.innerHTML = `
    <div class="product_gallery">
      <img src="https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp" alt="${product.productdisplayname}">
    </div>

    <div class="product_details">
      <h2 class="product_title">${product.productdisplayname}</h2>

      <p class="product_price">
        ${product.discount 
          ? `<span class="old-price">${product.price} DKK</span> 
             <span class="new-price">${Math.floor(product.price - (product.price * product.discount) / 100)} DKK</span>`
          : `${product.price} DKK`}
      </p>

      <p class="product_desc">${product.description || "No description available."}</p>

      <div class="product_actions">
        ${product.soldout 
          ? `<button class="btn secondary disabled">Sold Out</button>`
          : `<button class="btn primary">Add to Cart</button>`}
        <button class="btn secondary">Add to Wishlist</button>
      </div>

      <div class="product_meta">
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Subcategory:</strong> ${product.subcategory}</p>
        <p><strong>Brand:</strong> ${product.brandname}</p>
        <p><strong>Season:</strong> ${product.season}</p>
      </div>
    </div>
  `;
}
