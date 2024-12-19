 // Global Cart Array to Store Selected Products
let cart = [];

// Product Data (Static Example)
const products = [
    { id: 1, name: "Plain Sweatshirt", price: 1999, img: "https://via.placeholder.com/300x400" },
    { id: 2, name: "Versace Bloom", price: 1999, img: "https://via.placeholder.com/300x400" }
];

// Add to Cart Functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    alert(`${product.name} has been added to your cart!`);
    updateCartCounter();
    saveCartToLocalStorage();
}

// Update Cart Counter in Navbar
function updateCartCounter() {
    document.querySelector('.cart-counter').innerText = cart.length;
}

// Save Cart Data to Local Storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load Cart Data on Page Reload
function loadCartFromLocalStorage() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart = savedCart;
        updateCartCounter();
    }
}

// Initialize on Page Load
window.onload = function () {
    loadCartFromLocalStorage();
};

// Sticky Navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('header');
    navbar.classList.toggle('sticky', window.scrollY > 0);
});
document.querySelector("form").addEventListener("submit", function (e) {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    if (!name || !address || !phone) {
        alert("Please fill in all the required fields!");
        e.preventDefault();
    } else {
        alert("Order submitted successfully!");
    }
});
function filterProducts() {
    const maxPrice = document.getElementById("filter").value;
    const filtered = products.filter(p => p.price <= maxPrice);
    alert(`Showing products below Rs. ${maxPrice}. Refresh to see all.`);
    console.log(filtered);
}
 // Update total price dynamically
document.addEventListener("DOMContentLoaded", function () {
    const quantityInput = document.querySelector(".quantity");
    const priceElement = document.querySelector(".price");
    const totalElement = document.getElementById("total-price");

    quantityInput.addEventListener("input", function () {
        const price = parseFloat(priceElement.textContent);
        const quantity = parseInt(quantityInput.value);
        totalElement.textContent = (price * quantity).toFixed(2);
    });

    // Form Submission Validation
    document.getElementById("shipping-form").addEventListener("submit", function (e) {
        alert("Your shipping details have been submitted successfully!");
    });
});
document.getElementById("shipping-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
    window.location.href = "thank-you.html"; // Redirect to Thank You Page
});
