import { useEffect, useState } from "react";
import Header from "./components/Header";
import UserList from "./components/UserList";
import "react-toastify/dist/ReactToastify.css";
import { getUsers } from "./api/UserService";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const getAllUsers = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getUsers(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleModal = (show) => {};

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Header toggleModal={toggleModal} nbOfUsers={data.totalElements} />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to={"/users"} />} />
            <Route
              path="/users"
              element={
                <UserList
                  data={data}
                  currentPage={currentPage}
                  getAllUsers={getAllUsers}
                />
              }
            />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
