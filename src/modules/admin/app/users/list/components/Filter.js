import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Input,
  Card,
  colors,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import MultiSelect from '../../../../../../@apps/core/Components/MultiSelect/MultiSelect';
import getLabel from '../../../../../../@apps/utility/getLabel';
import {Context as UsersContext} from '../context/UsersContext';

const useStyles = makeStyles((theme) => ({
  root: {},
  keywords: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(2),
  },
  chips: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
  selects: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: colors.grey[50],
    padding: theme.spacing(1),
  },
  isActive: {
    marginLeft: 'auto',
  },
}));

const Filter = (props) => {
  const {className, ...rest} = props;
  const classes = useStyles();
  const selects = [
    {
      label: getLabel('roles'),
      options: ['ROLE_USER', 'ROLE_REPORT'],
    },
  ];

  const usersContext = useContext(UsersContext);
  const {
    roles,
    firstName,
    isActive,
    setRoles,
    setFirstName,
    setIsActive,
    setPage,
  } = usersContext;

  const handleSearchInputChange = (event) => {
    event.persist();
    setFirstName(event.target.value);
    setPage(0);
  };

  const handleIsActiveChange = (event) => {
    event.persist();
    const target = event.target;
    const value = target.checked ? true : false;
    setIsActive(value);
    setPage(0);
  };

  const handleRoleDelete = (role) => {
    setRoles((roles) => roles.filter((r) => role !== r));
    setPage(0);
  };

  const handleMultiSelectChange = (value) => {
    setRoles(value);
    setPage(0);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <div className={classes.keywords}>
        <SearchIcon className={classes.searchIcon} />
        <Input
          disableUnderline
          onChange={handleSearchInputChange}
          placeholder={getLabel('search_firstname')}
          value={firstName}
        />
      </div>
      <Divider />
      <div className={classes.chips}>
        {roles.map((role) => (
          <Chip
            className={classes.chip}
            deleteIcon={<CloseIcon />}
            key={role}
            label={role}
            onDelete={() => handleRoleDelete(role)}
          />
        ))}
      </div>
      <Divider />
      <div className={classes.selects}>
        {selects.map((select) => (
          <MultiSelect
            key={select.label}
            label={select.label}
            onChange={handleMultiSelectChange}
            options={select.options}
            value={roles}
          />
        ))}
        <FormControlLabel
          className={classes.isActive}
          control={
            <Checkbox
              color='primary'
              checked={isActive}
              onChange={handleIsActiveChange}
            />
          }
          label={getLabel('isactive')}
        />
      </div>
    </Card>
  );
};

Filter.propTypes = {
  className: PropTypes.string,
};

export default Filter;
