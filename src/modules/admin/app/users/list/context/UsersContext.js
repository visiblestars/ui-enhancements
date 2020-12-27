import React, {createContext, useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import UserService from '../../../../../../@apps/services/apis/survey/user.service';

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const {
    users: initialUsers,
    roles: initialRoles,
    isActive: initialIsActive,
    firstName: initialFirstName,
    totalItems: initialTotalItems,
    totalPages: initialTotalPages,
    currentPage: initialCurrentPage,
    page: initialPage,
    rowsPerPage: initialRowsPerPage,
    rowsPerPageOptions: initialRowsPerPageOptions,
    selectedUsers: initialSelectedUsers,
    children,
  } = props;

  // Use State to keep the values
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);
  const [isActive, setIsActive] = useState(initialIsActive);
  const [firstName, setFirstName] = useState(initialFirstName);
  const [totalItems, setTotalItems] = useState(initialTotalItems);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState(
    initialRowsPerPageOptions,
  );
  const [selectedUsers, setSelectedUsers] = useState(initialSelectedUsers);

  const onMarkActive = () => {
    console.log('selectedUsers: ' + selectedUsers);
    UserService.updateUserStatus(selectedUsers, true).then(
      (response) => {
        console.log(response);
        searchUser();
      },
      (error) => {
        console.log(JSON.stringify(error));
      },
    );
    setSelectedUsers([]);
  };

  const onMarkInActive = () => {
    console.log('selectedUsers: ' + selectedUsers);
    UserService.updateUserStatus(selectedUsers, false).then(
      (response) => {
        console.log(response);
        searchUser();
      },
      (error) => {
        console.log(JSON.stringify(error));
      },
    );
    setSelectedUsers([]);
  };

  const searchUser = useCallback(() => {
    let params = {};
    params['firstName'] = firstName;
    params['roles'] = roles.join(',');
    params['isActive'] = isActive;
    params['page'] = page;
    params['size'] = rowsPerPage;

    UserService.findUsers(params).then(
      (response) => {
        setUsers(response.users);
        setTotalItems(response.totalItems);
        setTotalPages(response.totalPages);
        setCurrentPage(response.currentPage);
      },
      (error) => {
        console.log(JSON.stringify(error));
      },
    );
  }, [firstName, roles, isActive, page, rowsPerPage]);

  useEffect(() => {
    searchUser();
  }, [searchUser]);

  // Make the context object:
  const usersContext = {
    users,
    roles,
    firstName,
    isActive,
    totalItems,
    totalPages,
    currentPage,
    page,
    rowsPerPage,
    rowsPerPageOptions,
    selectedUsers,
    setRoles,
    setIsActive,
    setFirstName,
    searchUser,
    setPage,
    setRowsPerPage,
    setSelectedUsers,
    onMarkActive,
    onMarkInActive,
  };

  // pass the value in provider and return
  return <Context.Provider value={usersContext}>{children}</Context.Provider>;
};

export const {Consumer} = Context;

Provider.propTypes = {
  users: PropTypes.array,
  roles: PropTypes.array,
  isActive: PropTypes.bool,
  firstName: PropTypes.string,
  totalItems: PropTypes.number,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.array,
  selectedUsers: PropTypes.array,
};

Provider.defaultProps = {
  users: [],
  firstName: '',
  roles: [],
  isActive: true,
  totalItems: 0,
  totalPages: 0,
  currentPage: 0,
  page: 0,
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 25],
  selectedUsers: [],
};
