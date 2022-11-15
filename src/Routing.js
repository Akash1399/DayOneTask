import React from "react";
import { Routes, Route } from "react-router-dom";
import Table from "./Components/Table";
import Form from "./Components/Form";

function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/form/:id" element={<Form />} />
      </Routes>
    </>
  );
}

export default Routing;
