import React from "react";
import { Container, Grid, Typography, Pagination } from "@mui/material";
import Court from "./Court";

const CourtList = ({ data, currentPage, getAllCourts }) => {
  console.log("CourtList data:", data); // Log received data
  console.log("Current Page:", currentPage); // Log current page

  const handlePageChange = (event, value) => {
    getAllCourts(value - 1); // Pagination component is 1-based, so subtract 1 for 0-based indexing
  };

  return (
    <Container>
      <main>
        {!data?.content?.length && (
          <Typography variant="h6" align="center">
            No Courts found.
          </Typography>
        )}

        <Grid container spacing={3}>
          {data?.content?.length > 0 &&
            data.content.map((court) => (
              <Grid item xs={12} sm={6} md={4} key={court.courtId}>
                <Court court={court} />
              </Grid>
            ))}
        </Grid>

        {data?.content?.length > 0 && data?.totalPages > 1 && (
          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Pagination
              count={data.totalPages}
              page={currentPage + 1}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              aria-label="pagination"
            />
          </Grid>
        )}
      </main>
    </Container>
  );
};

export default CourtList;
