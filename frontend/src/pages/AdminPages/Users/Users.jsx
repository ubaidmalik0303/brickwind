import React, { useEffect } from "react";
import UsersStyles from "./users.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllusers,
  changeUserRole,
  deleteUser,
  clearErrors,
} from "../../../store/Actions/UserActions";
import {
  CHANGE_USER_ROLE_RESET,
  DELETE_USER_RESET,
} from "../../../store/Constants/UserConstants";
import { useAlert } from "react-alert";
import SpinnerLoader from "../../../components/SpinnerLoader/SpinnerLoader";
import SEO from "../../../components/SEO/SEO";

const Users = () => {
  const { error, loading, users } = useSelector((state) => state.allusers);
  const {
    error: updateError,
    loading: updateLoading,
    isUpdated,
  } = useSelector((state) => state.adminuser);
  const {
    error: deleteError,
    loading: deleteLoading,
    isDeleted,
    message,
  } = useSelector((state) => state.adminuser);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();

  const changeUserRoleHandler = (e, id) => {
    e.preventDefault();
    dispatch(changeUserRole(id, { role: e.target.value }));
  };

  const deleteUserHandler = (e, id) => {
    e.preventDefault();
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Role Updated SuccessFully");
      dispatch({ type: CHANGE_USER_ROLE_RESET });
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllusers());
  }, [
    error,
    dispatch,
    alert,
    isUpdated,
    updateError,
    isDeleted,
    deleteError,
    message,
  ]);
  return (
    <>
      <SEO title="Users - BrickWind" />
      <div className={UsersStyles.users}>
        <h2 className="text-center my-3">All Users</h2>
        <div className={UsersStyles.usersoptions}>
          {/* <form>
          <input type="text" placeholder="Search By Email" />
          <input type="submit" value="Search" />
        </form> */}
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              {user.superAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading || updateLoading || deleteLoading ? (
              <SpinnerLoader />
            ) : (
              users &&
              users.map((item, i) => {
                return (
                  !item.superAdmin && (
                    <tr key={i}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        {user.superAdmin ? (
                          <select
                            onChange={(e) => changeUserRoleHandler(e, item._id)}
                          >
                            <option value={item.role}>{item.role}</option>
                            <option
                              value={item.role === "admin" ? "user" : "admin"}
                            >
                              {item.role === "admin" ? "user" : "admin"}
                            </option>
                          </select>
                        ) : (
                          item.role
                        )}
                      </td>
                      {user.superAdmin && (
                        <td>
                          <button
                            className={UsersStyles.userdeletebtn}
                            onClick={(e) => deleteUserHandler(e, item._id)}
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  )
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
