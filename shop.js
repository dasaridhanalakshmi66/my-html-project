document.addEventListener("DOMContentLoaded", () => {
    const shopProductList = document.getElementById("shop-product-list");

    // Retrieve products from localStorage
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Function to Render Products in Shop Page
    function renderShopProducts() {
        shopProductList.innerHTML = "";
        products.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add("shop-product-card");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button class="buy-btn">Buy Now</button>
            `;
            shopProductList.appendChild(productCard);
        });
    }

    // Initial Rendering of Products
    renderShopProducts();
});
