import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../reducers/usersReducer";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Users = () => {
  const dispatch = useDispatch();

  // for fetching users
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const users = useSelector((state) => state.users.users);

  return (
    <div>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr key={"2"}>
            <th key={"6"}></th>
            <th key={"4"}>
              <b>blogs created</b>
            </th>
          </tr>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <th>
                  <Link to={user.id}>{user.name}</Link>
                </th>
                <th>{user.blogs.length}</th>
              </tr>
            );
          })}
        </thead>
      </Table>
    </div>
  );
};

export default Users;
