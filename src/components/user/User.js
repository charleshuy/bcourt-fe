import React from "react";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <Link to={`/users/${user.userId}`} className="User__item">
      <div className="user__header">
        <div className="user__details">
          <p className="user_name">{user.name}</p>
        </div>
      </div>
      <div className="user__body">
        <p>
          <i className="bi bi-envelope"></i> {user.email}
        </p>
        <p>
          <i className="bi bi-geo"></i> {user.address}
        </p>
        <p>
          <i className="bi bi-telephone"></i> {user.phone}
        </p>
        <p>
          <strong>
            <i className="bi bi-wallet"></i>
          </strong>{" "}
          ${user.walletAmount}
        </p>
        <p>
          <strong>
            <i className="bi bi-person"></i>
          </strong>{" "}
          {user.roleName}
        </p>
      </div>
    </Link>
  );
};

export default User;
