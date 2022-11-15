import { TextField, Typography, Button, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function Form() {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    body: "",
  });

  //USEFFECT TO CALL THE GET DATA FUNCTION
  useEffect(() => {
    getIdData();
  }, [id]);

  //Get Data API CALL FUNCTION
  const getIdData = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/comments",
        {
          params: {
            id: id,
          },
        }
      );
      console.log(res);
      setData(res?.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  //FUNCTION TO HANDLE THE INPUT DATA
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };

  //FUNCTION TO HANDLE THE SAVE FUNCTIONALITY
  const handleSubmit = async () => {
    try {
      const res = await axios.patch(
        `https://jsonplaceholder.typicode.com/comments/${id}`,
        data
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Typography>Name</Typography>
      <TextField value={data?.name} name="name" onChange={handleInput} />
      <Typography>Email</Typography>
      <TextField value={data?.email} name="email" onChange={handleInput} />
      <Typography>Comment</Typography>
      <TextField value={data?.body} name="body" onChange={handleInput} />
      <Box>
        <Button onClick={handleSubmit}>Save</Button>
      </Box>
    </>
  );
}

export default Form;
