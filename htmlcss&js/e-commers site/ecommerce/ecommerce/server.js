const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'abcd',
database: 'ecommerce'
});

db.connect(err => {
if (err) throw err;
console.log('MySQL connected');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
secret: 'secret-key',
resave: false,
saveUninitialized: true
}));

app.post('/register', async (req, res) => {
const { username, password } = req.body;
const hash = await bcrypt.hash(password, 10);
db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err) => {
if (err) return res.status(500).send('User already exists');
res.redirect('/login.html');
});
});

app.post('/login', (req, res) => {
const { username, password } = req.body;
db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
if (results.length && await bcrypt.compare(password, results[0].password)) {
req.session.userId = results[0].id;
res.redirect('/index.html');
} else {
res.status(401).send('Invalid credentials');
}
});
});

app.get('/logout', (req, res) => {
req.session.destroy();
res.redirect('/login.html');
});

app.get('/products/:category', (req, res) => {
db.query('SELECT * FROM products WHERE category = ?', [req.params.category], (err, results) => {
res.json(results);
});
});

app.post('/cart/add', (req, res) => {
if (!req.session.userId) return res.status(401).send('Login required');
const { productId } = req.body;
db.query('INSERT INTO cart (user_id, product_id) VALUES (?, ?)', [req.session.userId, productId], () => {
res.send('Added to cart');
});
});

app.get('/cart', (req, res) => {
if (!req.session.userId) return res.status(401).send('Login required');
const q = `
SELECT products.id, products.name, products.price
FROM cart
JOIN products ON cart.product_id = products.id
WHERE cart.user_id = ?
`;
db.query(q, [req.session.userId], (err, results) => {
res.json(results);
});
});

app.post('/checkout', (req, res) => {
if (!req.session.userId) return res.status(401).send('Login required');
const { address } = req.body;
db.query('DELETE FROM cart WHERE user_id = ?', [req.session.userId], () => {
res.send('Order placed with COD. Delivery to: ' + address);
});
});

app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
});