
const express = require("express");
const userRouter = require("./user");
const zod = require("zod");
const { User, Account } = require("../database");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const accRouter = require("./account");

const router = express.Router();
router.use('/user',userRouter);
router.use('/account',accRouter);

module.exports = router;
