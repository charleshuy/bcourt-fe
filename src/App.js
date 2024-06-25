import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./AdminPage";
import Login from "./components/Login";
import Home from "./Home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/*" element={<AdminPage />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
