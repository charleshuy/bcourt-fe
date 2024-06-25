import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser, updateUser } from "../../api/UserService";
import { getRoles } from "../../api/RoleService";

const UserDetail = () => {
  const [user, setUser] = useState({
    userId: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    role: {
      roleId: "",
      roleName: "",
    },
  });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);

  const { userId } = useParams();

  const getAllRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data.content);
    } catch (error) {
      console.log(error);
      setError("Failed to load roles.");
    }
  };

  const handleRoleChange = (event) => {
    const selectedRoleId = event.target.value;
    const selectedRole = roles.find((role) => role.roleId === selectedRoleId);
    setUser((prevUser) => ({
      ...prevUser,
      role: {
        roleId: selectedRoleId,
        roleName: selectedRole ? selectedRole.roleName : "",
      },
    }));
  };

  const fetchUser = async (userId) => {
    try {
      const response = await getUser(userId);
      const fetchedUser = response.data;

      setUser({
        userId: fetchedUser.userId || "",
        name: fetchedUser.name || "",
        email: fetchedUser.email || "",
        phone: fetchedUser.phone || "",
        address: fetchedUser.address || "",
        role: {
          roleId: fetchedUser.role.roleId || "",
          roleName: fetchedUser.role.roleName || "",
        },
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Failed to load user details.");
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onUpdateUser = async (event) => {
    event.preventDefault();
    try {
      console.log("Updating user with data:", user); // Log the payload
      await updateUser(user);
      fetchUser(userId);
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user.");
    }
  };

  useEffect(() => {
    fetchUser(userId);
    getAllRoles();
  }, [userId]);

  return (
    <>
      <Link to="/users" className="link">
        <i className="bi bi-arrow-left"></i> Back to User List
      </Link>
      {error && <div className="error-message">{error}</div>}
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
              value={user.role.roleId}
              onChange={handleRoleChange}
              name="role"
              required
            >
              <option value="" disabled>
                Select Role
              </option>
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
