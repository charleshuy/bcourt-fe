import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import UserList from "./components/user/UserList";
import UserDetail from "./components/user/UserDetail";
import "react-toastify/dist/ReactToastify.css";
import { getUsers, saveUser, updateUser } from "./api/UserService";
import { getRoles } from "./api/RoleService"; // Import the function to fetch roles
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  const modalRef = useRef();
  const [data, setData] = useState({});
  const [roles, setRoles] = useState([]); // State for roles
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    role: {
      roleId: "", // Initial state for roleId
      roleName: "", // Initial state for roleName
    },
  });

  // Fetch all users with optional search query
  const getAllUsers = async (page = 0, size = 10, query = "") => {
    try {
      setCurrentPage(page); // Set the current page for pagination
      const response = await getUsers(page, size, query); // Fetch users with the search query
      setData(response.data); // Set the fetched data
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all roles
  const getAllRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data.content); // Assuming response.data.content contains the roles
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle modal visibility
  const toggleModal = (show) =>
    show ? modalRef.current.showModal() : modalRef.current.close();

  // Fetch users and roles when component mounts
  useEffect(() => {
    getAllUsers();
    getAllRoles(); // Fetch roles when component mounts
  }, []);

  // Handle search input changes
  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update search query state
    getAllUsers(0, 10, event.target.value); // Fetch users based on search query
  };

  // Generic onChange handler for other inputs
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // Specific onChange handler for role select
  const handleRoleChange = (event) => {
    const selectedRoleId = event.target.value;
    const selectedRole = roles.find((role) => role.roleId === selectedRoleId);
    setValues({
      ...values,
      role: {
        roleId: selectedRoleId,
        roleName: selectedRole ? selectedRole.roleName : "", // Update roleName based on selected role
      },
    });
  };

  const handleNewUser = async (event) => {
    event.preventDefault();
    try {
      const data = await saveUser(values);
      console.log(data);
      toggleModal(false);
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };
  const updateUser = async (user) => {
    try {
      const { data } = await updateUser(user);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header toggleModal={toggleModal} nbOfUsers={data.totalElements} />
      <main className="main">
        <div className="container">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearch}
            className="search-bar"
          />
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
            <Route
              path="/users/:userId"
              element={<UserDetail updateUser={updateUser} />}
            />
          </Routes>
        </div>
      </main>
      {/* Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New User</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewUser}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  name="name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="text"
                  value={values.phone}
                  onChange={handleChange}
                  name="phone"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input
                  type="text"
                  value={values.address}
                  onChange={handleChange}
                  name="address"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Role</span>
                <select
                  value={values.role.roleId} // Update to access roleId from role object
                  onChange={handleRoleChange}
                  name="role"
                  required
                >
                  <option value="">Select Role</option>
                  {/* Populate dropdown with roles */}
                  {roles.map((role) => (
                    <option key={role.roleId} value={role.roleId}>
                      {role.roleName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form_footer">
              <button
                onClick={() => toggleModal(false)}
                type="button"
                className="btn btn-danger"
              >
                Cancel
              </button>
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </>
  );
}

export default App;
