import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Grid,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import debounce from "lodash.debounce";
import CourtList from "./components/court/CourtList";
import { getCourts } from "./api/CourtService";

function Home() {
  const [data, setData] = useState({ content: [], totalPages: 0 });
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const getAllCourts = async (page = 0, size = 10, query = "") => {
    try {
      setCurrentPage(page);
      const response = await getCourts(page, size, query);
      console.log("Fetched data:", response.data); // Log fetched data
      setData(response.data);
    } catch (error) {
      console.error("Error fetching courts:", error);
      toast.error("Failed to fetch courts.");
    }
  };

  useEffect(() => {
    getAllCourts();
  }, []);

  const debouncedGetAllCourts = useCallback(
    debounce((page, size, query) => getAllCourts(page, size, query), 300),
    []
  );

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedGetAllCourts(0, 10, query);
  };

  useEffect(() => {
    console.log("Updated data state:", data); // Log state update
  }, [data]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Home Page</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          style={{ marginTop: "16px", marginBottom: "16px" }}
        >
          <Grid item xs={8}>
            <TextField
              label="Search by name"
              value={searchQuery}
              onChange={handleSearch}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Routes>
          <Route path="/" element={<Navigate to="/courts" />} />
          <Route
            path="/courts"
            element={
              <>
                {console.log("Rendering CourtList with data:", data)}{" "}
                {/* Log before rendering */}
                <CourtList
                  data={data}
                  currentPage={currentPage}
                  getAllCourts={getAllCourts}
                />
              </>
            }
          />
          <Route path="/courts/:courtId" />
        </Routes>
      </Container>
      <ToastContainer />
    </>
  );
}

export default Home;
