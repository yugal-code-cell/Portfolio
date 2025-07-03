function loadCategory(category) {
fetch(`/products/${category}`)
.then(res => res.json())
.then(products => {
const content = document.getElementById('content');
content.innerHTML = `<h2>${category.toUpperCase()}</h2>`;
products.forEach(p => {
content.innerHTML += `
<div>
<h3>${p.name}</h3>
<p>$${p.price}</p>
<button onclick="addToCart(${p.id})">Add to Cart</button>
</div>`;
});
});
}

function addToCart(id) {
fetch('/cart/add', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ productId: id })
}).then(res => res.text()).then(alert);
}

function loadCart() {
fetch('/cart')
.then(res => res.json())
.then(items => {
const content = document.getElementById('content');
let total = 0;
content.innerHTML = "<h2>Your Cart</h2>";
items.forEach(i => {
total += i.price;
content.innerHTML += `<p>${i.name} - $${i.price}</p>`;
});
content.innerHTML += `
<p><b>Total: $${total}</b></p>
<input id="address" placeholder="Your address" />
<button onclick="checkout()">Place Order (COD)</button>`;
});
}

function checkout() {
const address = document.getElementById('address').value;
fetch('/checkout', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ address })
}).then(res => res.text()).then(msg => {
alert(msg);
document.getElementById('content').innerHTML = "<h2>Order Placed!</h2>";
});
}