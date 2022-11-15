import * as React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  Box,
  Pagination,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

//! Function Starts from here
export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const [pageNo, setPageNO] = useState(1);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getAllData();
  }, [pageNo]);
  const getAllData = async (title) => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/comments",
        {
          params: {
            _page: pageNo,
            _limit: 10,
          },
        }
      );
      setRows(res?.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const handlePagination = (e, value) => {
    setPageNO(value);
  };

  //HANDLE DELETE FUNCTIONALITY
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://jsonplaceholder.typicode.com/comments/${id}`
      );
      console.log(res);
      setRows(
        rows.filter((user) => {
          return user.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  //HandleSearch FUNCTIONALITY
  const handleSearch = (title) => {
    console.log(
      rows.map((user) => {
        console.log(user.name.search(`/${title}/i`));
        if (user.name.search(`/${title}/i`)) {
          return user;
        } else {
          return "";
        }
      })
    );
  };
  return (
    <>
      <TextField
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />{" "}
      <Button onClick={() => handleSearch(title)}>Search</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Comment</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row?.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.id}
                </TableCell>
                <TableCell align="left">{row?.name}</TableCell>
                <TableCell align="left">{row?.email}</TableCell>
                <TableCell align="left">{row?.body}</TableCell>
                <TableCell align="left">
                  <Button
                    onClick={() => {
                      navigate(`/form/${row.id}`);
                    }}
                  >
                    <ModeEditOutlineOutlinedIcon />
                  </Button>
                  <Button onClick={() => handleDelete(row.id)}>
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2}>
            <Pagination
              count={10}
              onChange={handlePagination}
              color="primary"
            />
          </Stack>
        </Box>
      </TableContainer>
    </>
  );
}
