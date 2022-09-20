const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BooksSchema = new Schema({
  name: {
    type: String,
  },
  isbn: {
    type: String,
  },
  author: {
    type: String,
  },
  publisher: {
    type: String,
  },
  publishedDate: {
    type: Date,
  },
  price: {
    type: Number,
  },
});
const Books = mongoose.model("book", BooksSchema);
module.exports = Books;
