const products = {
men: [
{ name: "Men Shirt", price: 30 },
{ name: "Men Jeans", price: 50 },
{ name: "Men Jacket", price: 70 },
],
women: [
{ name: "Women Dress", price: 40 },
{ name: "Women Bag", price: 60 },
{ name: "Women Shoes", price: 80 },
],
kids: [
{ name: "Kids Toy", price: 15 },
{ name: "Kids Shirt", price: 20 },
{ name: "Kids Book", price: 10 },
]
};

let cart = [];

function showPage(category) {
const content = document.getElementById("content");
if (category === "home") {
content.innerHTML = "<h2>Welcome to Our Store!</h2><p>Select a category above to start shopping.</p>";
return;
}

let html = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)} Products</h2>`;
products[category].forEach((item, index) => {
html += `
<div class="product">
<h3>${item.name}</h3>
<p>Price: $${item.price}</p>
<button class="add-btn" onclick="addToCart('${category}', ${index})">Add to Cart</button>
</div>
`;
});

content.innerHTML = html;
}

function addToCart(category, index) {
const product = products[category][index];
cart.push(product);
document.getElementById("cart-count").textContent = cart.length;
alert(`${product.name} added to cart.`);
}

function showCart() {
const content = document.getElementById("content");
if (cart.length === 0) {
content.innerHTML = "<h2>Your Cart is Empty</h2>";
return;
}

let html = "<h2>Your Cart</h2>";
let total = 0;
cart.forEach((item, i) => {
html += `<p>${item.name} - $${item.price}</p>`;
total += item.price;
});

html += `<p class="total">Total: $${total}</p>`;
html += `<button onclick="checkout()">Proceed to Checkout</button>`;

content.innerHTML = html;
}

function checkout() {
const content = document.getElementById("content");
content.innerHTML = `
<h2>Checkout</h2>
<p>Total: $${cart.reduce((sum, item) => sum + item.price, 0)}</p>
<input type="text" id="address" placeholder="Enter your address" style="width: 100%; padding: 10px; margin: 10px 0;" />
<button onclick="placeOrder()">Place Order (COD)</button>
`;
}

function placeOrder() {
const address = document.getElementById("address").value;
if (!address.trim()) {
alert("Please enter your address.");
return;
}

alert("Order placed successfully!\nDelivery to: " + address);
cart = [];
document.getElementById("cart-count").textContent = 0;
showPage("home");
}

// Load home by default
showPage("home");
