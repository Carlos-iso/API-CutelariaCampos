'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');

const app = express();
const router = express.Router();

//Conectar ao banco mongodb
mongoose.connect(config.connectionString);

//Carregar models
const Product = require('../models/product');
const Customer = require('../models/customer');
const Order = require('../models/order');

//Carregar Rotas
const indexRoute = require('../routes/index-route');
const productRoute = require('../routes/product-route');
const customerRoute = require('../routes/customer-route');
const orderRoute = require('../routes/order-route');

// Habilita O CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*Origen, X-Requested-With, Content-Type, Accept, x-access-token');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	app.use(cors());
	next();
});

app.use(bodyParser.json({
	limit: '5mb'
}));
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use("/", indexRoute);
app.use("/products", productRoute);
app.use("/account", customerRoute);
app.use("/order", orderRoute);

module.exports = app;