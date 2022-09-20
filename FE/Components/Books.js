import useSWR from "swr";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
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

export default function Books() {
  const [temp, setTemp] = useState();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [result, setResult] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const booksApi = "https://miigaa.ilearn.mn/books";
  const router = useRouter();
  const fetcher = async (url) =>
    await axios.get(url).then((res) => {
      return res.data.data;
    });
  const { data, error } = useSWR(booksApi, fetcher);
  function update(e) {
    e.preventDefault();
    const name = e.target[0].value;
    const price = e.target[2].value;
    const author = e.target[4].value;
    const isbn = e.target[6].value;
    const publisher = e.target[8].value;
    const publishedDate = e.target[10].value;

    axios
      .put(`https://miigaa.ilearn.mn/books/${temp?._id}`, {
        name: name,
        isbn: isbn,
        author: author,
        publisher: publisher,
        publishedDate: publishedDate,
        price: price,
      })
      .then((res) => {
        setResult(res.data);
        location.reload();
      });
  }
  console.log(result);
  function deleteButton() {
    axios.delete(`https://miigaa.ilearn.mn/books/${temp?._id}`).then((res) => {
      setResult(res.data);
      location.reload();
    });
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Authors</StyledTableCell>
              <StyledTableCell align="right">ISBN</StyledTableCell>
              <StyledTableCell align="right">Publisher</StyledTableCell>
              <StyledTableCell align="right">Published on</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((e) => (
              <StyledTableRow key={e.name}>
                <StyledTableCell component="th" scope="row">
                  {e.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  ${e.price ? e.price : "Free"}
                </StyledTableCell>
                <StyledTableCell align="right">{e.author}</StyledTableCell>
                <StyledTableCell align="right">{e.isbn}</StyledTableCell>
                <StyledTableCell align="right">{e.publisher}</StyledTableCell>
                <StyledTableCell align="right">
                  {e?.publishedDate?.slice(0, 10)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    onClick={() => {
                      setOpen(true), setTemp(e);
                    }}
                    className=" mt-2"
                    variant="contained"
                    color="success"
                  >
                    Edit
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <div className="loginForm">
                        <form onSubmit={update}>
                          <p>Update book</p>
                          <TextField
                            fullWidth
                            defaultValue={temp?.name}
                            label="Name"
                            id="fullWidth"
                          />
                          <TextField
                            fullWidth
                            defaultValue={temp?.price}
                            label="Price"
                            id="fullWidth"
                          />
                          <TextField
                            fullWidth
                            defaultValue={temp?.author}
                            label="Author"
                            id="fullWidth"
                          />
                          <TextField
                            fullWidth
                            defaultValue={temp?.isbn}
                            label="ISBN"
                            id="fullWidth"
                          />
                          <TextField
                            fullWidth
                            defaultValue={temp?.publisher}
                            label="Publisher"
                            id="fullWidth"
                          />
                          <TextField
                            fullWidth
                            defaultValue={temp?.publishedDate.slice(0, 10)}
                            label="Published on"
                            id="fullWidth"
                          />
                          <button type="submit">Update</button>
                          <p className="result">{result?.data}</p>
                        </form>
                      </div>
                    </Box>
                  </Modal>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    onClick={() => {
                      setOpen1(true), setTemp(e);
                    }}
                    value={e._id}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                  <Modal
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <div className="loginForm">
                        <h3>Та устгахдаа итгэлтэй байна уу?</h3>
                        <div className="delete">
                          <button onClick={deleteButton}>Тийм</button>
                          <button onClose={handleClose1}>Үгүй</button>
                        </div>
                        <p>{result?.data}</p>
                      </div>
                    </Box>
                  </Modal>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
