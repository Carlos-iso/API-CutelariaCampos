"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/customer-controller");
const authService = require("../services/auth-service");

router.get("/", controller.get);
router.get("/:id", controller.getById);
router.post("/new", controller.post);
router.post("/login", controller.authenticate);
router.post("/refresh-token", authService.authorize, controller.refreshToken);
router.put("/rename/:id", authService.authorize, controller.put);
router.delete("/delete/:id", authService.authorize, controller.delete);

module.exports = router;