import React from "react";
import User from "./User";

const UserList = ({ data, currentPage, getAllUsers }) => {
  return (
    <main className="main">
      {data?.content?.length === 0 && (
        <div>No Users. Please add a new user</div>
      )}

      <ul className="user__list">
        {data?.content?.length > 0 &&
          data.content.map((user) => <User user={user} key={user.userId} />)}
      </ul>

      {data?.content?.length > 0 && data?.totalPages > 1 && (
        <div className="pagination">
          <a
            onClick={() => getAllUsers(currentPage - 1)}
            className={0 === currentPage ? "disabled" : ""}
          >
            &laquo;
          </a>

          {data &&
            [...Array(data.totalPages).keys()].map((page, index) => (
              <a
                onClick={() => getAllUsers(page)}
                className={currentPage === page ? "active" : ""}
                key={page}
              >
                {page + 1}
              </a>
            ))}

          <a
            onClick={() => getAllUsers(currentPage + 1)}
            className={data.totalPages === currentPage + 1 ? "disabled" : ""}
          >
            &raquo;
          </a>
        </div>
      )}
    </main>
  );
};

export default UserList;
