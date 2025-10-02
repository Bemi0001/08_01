

console.log("index.js loaded - building category links");

document.querySelectorAll(".category").forEach(a => {
  const categoryText = a.textContent.trim();
  
  a.href = "produktliste.html?category=" + encodeURIComponent(categoryText);


  a.title = "Se produkter i: " + categoryText;
});
