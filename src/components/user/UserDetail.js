import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../api/UserService";
import { getRoles } from "../../api/RoleService";

const UserDetail = ({ updateUser }) => {
  const [user, setUser] = useState({
    userId: "",
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
  const [roles, setRoles] = useState([]);

  const { userId } = useParams(); // Change `id` to `userId`

  const getAllRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data.content); // Assuming response.data.content contains the roles
    } catch (error) {
      console.log(error);
    }
  };
  const handleRoleChange = (event) => {
    const selectedRoleId = event.target.value;
    const selectedRole = roles.find((role) => role.roleId === selectedRoleId);
    setUser({
      ...user,
      role: {
        roleId: selectedRoleId,
        roleName: selectedRole ? selectedRole.roleName : "", // Update roleName based on selected role
      },
    });
  };
  const fetchUser = async (userId) => {
    // Change `id` to `userId`
    try {
      const response = await getUser(userId);
      setUser(response.data);
      console.log(response);
      console.log(user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    console.log(user);
  };

  const onUpdateUser = async (event) => {
    try {
      await updateUser(user);
      fetchUser(userId); // Change `id` to `userId`
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    fetchUser(userId);
    getAllRoles(); // Change `id` to `userId`
  }, []); // Change `id` to `userId`

  return (
    <>
      <Link to="/users" className="link">
        <i className="bi bi-arrow-left"></i> Back to User List
      </Link>
      <form onSubmit={onUpdateUser} className="form">
        <div className="user-details">
          <input type="hidden" value={user.userId} name="userId" required />
          <div className="input-box">
            <span className="details">Name</span>
            <input
              type="text"
              value={user.name}
              onChange={onChange}
              name="name"
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Email</span>
            <input
              type="text"
              value={user.email}
              onChange={onChange}
              name="email"
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input
              type="text"
              value={user.password}
              onChange={onChange}
              name="password"
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Address</span>
            <input
              type="text"
              value={user.address}
              onChange={onChange}
              name="address"
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Phone</span>
            <input
              type="text"
              value={user.phone}
              onChange={onChange}
              name="phone"
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Role</span>
            <select
              value={user.role.roleId} // Update to access roleId from role object
              onChange={handleRoleChange}
              name="role"
              required
            >
              <option value="">{user.role.roleName}</option>
              {roles.map((role) => (
                <option key={role.roleId} value={role.roleId}>
                  {role.roleName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form_footer">
          <button type="submit" className="btn">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default UserDetail;
