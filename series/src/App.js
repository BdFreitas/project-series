import React from "react";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
