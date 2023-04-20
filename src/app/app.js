'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const dotenv = require('dotenv').config();

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

//Chama As Variaveis De Ambiente
const urlHome = process.env.URL_HOME;
const urlLogin = process.env.URL_LOGIN;
const urlCadastro = process.env.URL_CADASTRO;

// Habilita O CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', urlHome, urlCadastro, urlLogin);
	res.header('Access-Control-Allow-Headers', '*Origen, X-Requested-With, Content-Type, Accept, x-access-token');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD');
	next();
});
app.use(cors());

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