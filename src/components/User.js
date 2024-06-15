import React from "react";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <Link to={`/users/${user.userId}`} className="User__item">
      <div className="user__header">
        <div className="user__details">
          <p className="user_name">{user.name.substring(0, 15)} </p>
        </div>
      </div>
      <div className="user__body">
        <p>
          <i className="bi bi-envelope"></i> {user.email.substring(0, 20)}{" "}
        </p>
        <p>
          <i className="bi bi-geo"></i> {user.address}
        </p>
        <p>
          <i className="bi bi-telephone"></i> {user.phone}
        </p>
      </div>
    </Link>
  );
};

export default User;
