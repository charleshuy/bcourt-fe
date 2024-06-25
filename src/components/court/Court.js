import React from "react";
import { Link } from "react-router-dom";

const Court = ({ court }) => {
  return (
    <Link to={`/courts/${court.courtId}`} className="user__item">
      <div className="user__header">
        <div className="user__details">
          <p className="user_name">{court.courtName}</p>
        </div>
      </div>
      <div className="user__body">
        <p>
          <i className="bi bi-geo"></i> {court.location}
        </p>
        <p>
          <strong>
            <i className=""></i>
          </strong>{" "}
          ${court.price}
        </p>
      </div>
    </Link>
  );
};

export default Court;
