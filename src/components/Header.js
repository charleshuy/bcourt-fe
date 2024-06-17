import React from "react";

const Header = ({ toggleModal, nbOfUsers }) => {
  return (
    <header className="header">
      <div className="container">
        <h3>User List ({nbOfUsers})</h3>
      </div>
    </header>
  );
};

export default Header;
