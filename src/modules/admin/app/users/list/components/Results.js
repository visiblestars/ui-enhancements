import React, {useContext} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  colors,
} from '@material-ui/core';
import Label from '../../../../../../@apps/core/Components/Label/Label';
import moment from 'moment';

import ResultActions from './ResultActions';
import GenericMoreButton from '../../../../../../@apps/core/Components/GenericMoreButton/GenericMoreButton';
import getLabel from '../../../../../../@apps/utility/getLabel';
import {Context as UsersContext} from '../context/UsersContext';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 700,
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end',
  },
}));

const Results = (props) => {
  const {className} = props;
  const classes = useStyles();
  const usersContext = useContext(UsersContext);
  const {
    users,
    totalItems,
    totalPages,
    currentPage,
    rowsPerPageOptions,
    selectedUsers,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    setSelectedUsers,
  } = usersContext;

  const handleSelectAll = (event) => {
    const selectedUsers = event.target.checked
      ? users.map((user) => user.id)
      : [];

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1),
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Typography color='textSecondary' gutterBottom variant='body2'>
        {totalItems} Records found. Page {currentPage + 1} of {totalPages}
      </Typography>
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title={getLabel('all_users')}
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={selectedUsers.length === users.length}
                        color='primary'
                        indeterminate={
                          selectedUsers.length > 0 &&
                          selectedUsers.length < users.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>{getLabel('email')}</TableCell>
                    <TableCell>{getLabel('first_name')}</TableCell>
                    <TableCell>{getLabel('last_name')}</TableCell>
                    <TableCell>{getLabel('role')}</TableCell>
                    <TableCell>{getLabel('created_on')}</TableCell>
                    <TableCell>{getLabel('modified_on')}</TableCell>
                    <TableCell>{getLabel('status')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      hover
                      key={user.id}
                      selected={selectedUsers.indexOf(user.id) !== -1}>
                      <TableCell padding='checkbox'>
                        <Checkbox
                          checked={selectedUsers.indexOf(user.id) !== -1}
                          color='primary'
                          onChange={(event) => handleSelectOne(event, user.id)}
                          value={selectedUsers.indexOf(user.id) !== -1}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameCell}>
                          <div>
                            <Link
                              color='inherit'
                              component={RouterLink}
                              to={`app/management/users/view/${user.id}`}
                              variant='h6'>
                              {user.email}
                            </Link>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        {moment(user.createdOn).isValid()
                          ? moment(user.createdOn).format(
                              'MMM D YYYY, h:mm:ss a',
                            )
                          : '-'}
                      </TableCell>
                      <TableCell>
                        {moment(user.updatedOn).isValid()
                          ? moment(user.updatedOn).format(
                              'MMM D YYYY, h:mm:ss a',
                            )
                          : '-'}
                      </TableCell>
                      <TableCell>
                        <Label
                          color={
                            user.isActive === true
                              ? colors.green[600]
                              : colors.red[600]
                          }>
                          {user.isActive === true
                            ? getLabel('active')
                            : getLabel('inactive')}
                        </Label>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component='div'
            count={totalItems}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={currentPage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        </CardActions>
      </Card>
      <ResultActions />
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired,
};

Results.defaultProps = {
  users: [],
};

export default Results;
