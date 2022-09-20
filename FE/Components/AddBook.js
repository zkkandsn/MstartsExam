import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddBook() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleForm = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const price = e.target[2].value;
    const author = e.target[4].value;
    const isbn = e.target[6].value;
    const publisher = e.target[8].value;
    const publishedDate = e.target[10].value;

    axios
      .post("https://miigaa.ilearn.mn/books/", {
        name: name,
        isbn: isbn,
        author: author,
        publisher: publishedDate,
        price: price,
        publishedDate: publishedDate,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div className="addBook">
      <Button onClick={handleOpen}>Add Book</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="loginForm">
            <form onSubmit={handleForm}>
              <p>Add Book</p>
              <TextField fullWidth label="Name" id="fullWidth" />
              <TextField fullWidth label="Price" id="fullWidth" />
              <TextField fullWidth label="Author" id="fullWidth" />
              <TextField fullWidth label="ISBN" id="fullWidth" />
              <TextField fullWidth label="Publisher" id="fullWidth" />
              <TextField fullWidth label="Published on" id="fullWidth" />
              <button type="submit">Log In</button>
              <p className="result"></p>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
