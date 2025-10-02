console.log("Product page loaded...");

const id = 1526; 
const productUrl = "https://kea-alt-del.dk/t7/api/products/" + id;
const productContainer = document.querySelector("#productContainer");

console.log("Fetching product from:", productUrl);

// Fetch data
function getData() {
  fetch(productUrl)
    .then(res => res.json())
    .then(data => show(data));
}

// Render data into HTML
function show(data) {
  console.log("Product data:", data);

  productContainer.innerHTML = `
    <div class="product_gallery">
      <img src="https://kea-alt-del.dk/t7/images/webp/640/${id}.webp" 
           alt="${data.productdisplayname}" 
           class="productImage">
    </div>

    <div class="product_details">
      <h2 class="product_title">${data.productdisplayname}</h2>
      <p class="product_price">${data.price} DKK</p>
      <p class="product_desc">
        ${data.description || "No description available"}
      </p>

      <div class="product_actions">
        <button class="btn primary">Add to Cart</button>
        <button class="btn secondary">Add to Wishlist</button>
      </div>

      <div class="product_meta">
        <p><strong>Category:</strong> ${data.category || "N/A"}</p>
        <p><strong>Availability:</strong> ${data.soldout ? "Sold Out" : "In Stock"}</p>
        <p><strong>Shipping:</strong> 2–4 business days</p>
      </div>
    </div>
  `;
}

getData();
