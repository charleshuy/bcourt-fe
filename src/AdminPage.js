import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import UserList from "./components/user/UserList";
import UserDetail from "./components/user/UserDetail";
import {
  getUsers,
  saveUser,
  updateUser as updateUserAPI,
} from "./api/UserService";
import { getRoles } from "./api/RoleService";
import { logout } from "./api/AuthService"; // Import logout function

function AdminPage() {
  const [data, setData] = useState({});
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    role: {
      roleId: "",
      roleName: "",
    },
  });
  const [open, setOpen] = useState(false);

  const getAllUsers = async (page = 0, size = 10, query = "") => {
    try {
      setCurrentPage(page);
      const response = await getUsers(page, size, query);
      setData(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users.");
    }
  };

  const getAllRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data.content);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch roles.");
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllRoles();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    getAllUsers(0, 10, event.target.value);
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleRoleChange = (event) => {
    const selectedRoleId = event.target.value;
    const selectedRole = roles.find((role) => role.roleId === selectedRoleId);
    setValues({
      ...values,
      role: {
        roleId: selectedRoleId,
        roleName: selectedRole ? selectedRole.roleName : "",
      },
    });
  };

  const handleNewUser = async (event) => {
    event.preventDefault();
    try {
      await saveUser(values);
      setOpen(false);
      getAllUsers();
      toast.success("User saved successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save user.");
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      await updateUserAPI(user);
      toast.success("User updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user.");
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Admin Page</Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
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
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              New User
            </Button>
          </Grid>
        </Grid>
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
            element={<UserDetail updateUser={handleUpdateUser} />}
          />
        </Routes>
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleNewUser}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  name="name"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  value={values.phone}
                  onChange={handleChange}
                  name="phone"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  value={values.address}
                  onChange={handleChange}
                  name="address"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={values.role.roleId}
                    onChange={handleRoleChange}
                    name="role"
                  >
                    <MenuItem value="">
                      <em>Select Role</em>
                    </MenuItem>
                    {roles.map((role) => (
                      <MenuItem key={role.roleId} value={role.roleId}>
                        {role.roleName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );
}

export default AdminPage;
