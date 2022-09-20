const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BooksSchema = new Schema({
  name: {
    type: String,
  },
  isbn: {
    type: String,
  },
  creator: {
    type: String,
  },
  publishDate: {
    type: Date,
  },
  price: {
    type: Number,
  },
});
const Books = mongoose.model("book", BooksSchema);
module.exports = Books;
