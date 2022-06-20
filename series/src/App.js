import React from "react";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Series from "./pages/Series";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path="/" element={<Homepage />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="*" element={<NotFound />}/>
          <Route path="series" element={<Series />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
