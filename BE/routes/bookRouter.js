const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookController");

router.get("/", bookController.getBooks);
router.post("/", bookController.createBook);
router.delete("/:id", bookController.deleteBook);
router.put("/:id", bookController.updateBook);

module.exports = router;
