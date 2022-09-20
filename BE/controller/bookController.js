const express = require("express");
const Books = require("../model/books");

const getBooks = (req, res, next) => {
  try {
    Books.find({}, (err, data) => {
      if (err) {
        return err;
      }
      res.json({
        data: data,
      });
    });
  } catch (error) {
    res.json({
      message: err,
    });
  }
};

const createBook = (req, res) => {
  try {
    const book = new Books(req.body);
    book.save();
    res.json({
      success: true,
      message: "Tanii nom amjilttai burtgegdlee",
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  await Books.findByIdAndDelete(id);
  try {
    res.json({
      success: true,
      data: "deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      data: error,
    });
  }
};
const updateBook = async (req, res) => {
  console.log("Updated");
  const { id } = req.params;
  await Books.findByIdAndUpdate(id, req.body);
  const book = await Books.findById(id);
  try {
    res.json({
      success: true,
      data: "Updated",
    });
  } catch (error) {
    res.json({
      success: false,
      data: error,
    });
  }
};
module.exports = { getBooks, createBook, deleteBook, updateBook };
