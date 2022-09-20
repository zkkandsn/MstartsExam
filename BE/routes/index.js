const bookRouter = require("./bookRouter");
const express = require("express");

const router = express.Router();

router.use("/books", bookRouter);

module.exports = router;
