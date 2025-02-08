// Load vendor products from localStorage or initialize an empty array
let storedVendorProducts = localStorage.getItem("vendorProducts");
let vendorProducts = storedVendorProducts && JSON.parse(storedVendorProducts).length > 0
    ? JSON.parse(storedVendorProducts)
    : [
        { id: 1, name: "Leather Jacket", vendor: "Vendor A", price: 1499, image: "https://images-na.ssl-images-amazon.com/images/I/7155p8b%2BnBL._AC_UL1280_.jpg" },
        { id: 2, name: "Sneakers", vendor: "Vendor B", price: 999, image: "https://th.bing.com/th/id/OIP.YguOkIP2xIjpoReX_q0R4gHaHa?rs=1&pid=ImgDetMain" },
        { id: 3, name: "Denim Jeans", vendor: "Vendor C", price: 799, image: "https://www.jockey.in/cdn/shop/products/UM45_INDGO_0103_S223_JKY_1_0fb1268a-8d40-4d36-b45f-7ca32121f615.webp?v=1700019161&width=560" },
    ];

// Save vendor products to localStorage
function saveVendorProductsToLocalStorage() {
    localStorage.setItem("vendorProducts", JSON.stringify(vendorProducts));
}

// Function to display vendor products
function displayVendorProducts(vendorFilter = "all") {
    const productContainer = document.getElementById("vendor-product-container");
    productContainer.innerHTML = "";

    let filteredProducts = vendorFilter === "all"
        ? vendorProducts
        : vendorProducts.filter(product => product.vendor === vendorFilter);

    if (filteredProducts.length === 0) {
        productContainer.innerHTML = "<p>No products available.</p>";
        return;
    }

    filteredProducts.forEach((product) => {
        let productElement = document.createElement("div");
        productElement.classList.add("vendor-pro");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>Vendor: ${product.vendor}</p>
            <p>Price: RS.${product.price}/-</p>
            <button class="modify" onclick="modifyVendorProduct(${product.id})">Modify</button>
            <button class="delete" onclick="deleteVendorProduct(${product.id})">Delete</button>
        `;
        productContainer.appendChild(productElement);
    });
}

// Populate vendor filter dropdown
function populateVendorFilter() {
    const vendorFilter = document.getElementById("vendor-filter");
    let vendorSet = new Set(vendorProducts.map(product => product.vendor));
    
    vendorFilter.innerHTML = `<option value="all">All Vendors</option>`;
    vendorSet.forEach(vendor => {
        let option = document.createElement("option");
        option.value = vendor;
        option.textContent = vendor;
        vendorFilter.appendChild(option);
    });
}

// Handle form submission to add a new vendor product
document.getElementById("vendor-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const vendorName = document.getElementById("vendor-name").value.trim();
    const productName = document.getElementById("product-name").value.trim();
    const price = document.getElementById("product-price").value.trim();
    const image = document.getElementById("product-image").value.trim();

    if (!vendorName || !productName || !price || !image) {
        alert("Please fill all fields!");
        return;
    }

    const newVendorProduct = {
        id: vendorProducts.length ? Math.max(...vendorProducts.map(p => p.id)) + 1 : 1,
        name: productName,
        vendor: vendorName,
        price: parseFloat(price),
        image: image
    };

    vendorProducts.push(newVendorProduct);
    saveVendorProductsToLocalStorage();
    displayVendorProducts();
    populateVendorFilter();
    this.reset();
});

// Modify vendor product price
function modifyVendorProduct(id) {
    let newPrice = prompt("Enter new price:");
    if (newPrice && !isNaN(newPrice)) {
        vendorProducts = vendorProducts.map(product =>
            product.id === id ? { ...product, price: parseFloat(newPrice) } : product
        );
        saveVendorProductsToLocalStorage();
        displayVendorProducts();
    } else {
        alert("Invalid price!");
    }
}

// Delete vendor product
function deleteVendorProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
        vendorProducts = vendorProducts.filter(product => product.id !== id);
        saveVendorProductsToLocalStorage();
        displayVendorProducts();
        populateVendorFilter();
    }
}

// Filter products by vendor
document.getElementById("vendor-filter").addEventListener("change", function () {
    displayVendorProducts(this.value);
});

// Initialize page
populateVendorFilter();
displayVendorProducts();
