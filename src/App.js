import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./AdminPage";
import Auth from "./components/Auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/*" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
