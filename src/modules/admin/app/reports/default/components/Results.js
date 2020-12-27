import React, {useContext} from 'react';
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
  Avatar,
} from '@material-ui/core';
import Label from '../../../../../../@apps/core/Components/Label/Label';
import moment from 'moment';

import ResultActions from './ResultActions';
import GenericMoreButton from '../../../../../../@apps/core/Components/GenericMoreButton/GenericMoreButton';
import getLabel from '../../../../../../@apps/utility/getLabel';
import {Context as SurveyUsersContext} from '../context/SurveyUsersContext';

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
  avatar_female: {
    height: 30,
    width: 30,
    marginRight: theme.spacing(1),
    color: theme.palette.getContrastText(colors.pink[500]),
    backgroundColor: colors.pink[500],
  },
  avatar_male: {
    height: 30,
    width: 30,
    marginRight: theme.spacing(1),
    color: theme.palette.getContrastText(colors.indigo[500]),
    backgroundColor: colors.indigo[500],
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end',
  },
}));

const Results = (props) => {
  const {className} = props;
  const classes = useStyles();
  const surveyUsersContext = useContext(SurveyUsersContext);
  const {
    surveyUsers,
    totalItems,
    totalPages,
    currentPage,
    rowsPerPageOptions,
    selectedSurveyUsers,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    setSelectedSurveyUsers,
  } = surveyUsersContext;

  const handleSelectAll = (event) => {
    const selectedSurveyUsers = event.target.checked
      ? surveyUsers.map((surveyUser) => surveyUsers.id)
      : [];

    setSelectedSurveyUsers(selectedSurveyUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedSurveyUsers.indexOf(id);
    let newSelectedSurveyUsers = [];

    if (selectedIndex === -1) {
      newSelectedSurveyUsers = newSelectedSurveyUsers.concat(
        selectedSurveyUsers,
        id,
      );
    } else if (selectedIndex === 0) {
      newSelectedSurveyUsers = newSelectedSurveyUsers.concat(
        selectedSurveyUsers.slice(1),
      );
    } else if (selectedIndex === selectedSurveyUsers.length - 1) {
      newSelectedSurveyUsers = newSelectedSurveyUsers.concat(
        selectedSurveyUsers.slice(0, -1),
      );
    } else if (selectedIndex > 0) {
      newSelectedSurveyUsers = newSelectedSurveyUsers.concat(
        selectedSurveyUsers.slice(0, selectedIndex),
        selectedSurveyUsers.slice(selectedIndex + 1),
      );
    }

    setSelectedSurveyUsers(newSelectedSurveyUsers);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const getStatusColor = (status) => {
    var result = colors.grey[600];
    switch (status) {
      case 'NOTVIEWED':
        result = colors.red[600];
        break;
      case 'VIEWED':
        result = colors.amber[600];
        break;
      case 'PARTIAL':
        result = colors.lightBlue[600];
        break;
      case 'COMPLETED':
        result = colors.green[600];
        break;
      default:
        result = colors.grey[600];
    }
    return result;
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Typography color='textSecondary' gutterBottom variant='body2'>
        {totalItems} Records found. Page {currentPage + 1} of {totalPages}
      </Typography>
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title={getLabel('all_survey_users')}
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
                        checked={
                          selectedSurveyUsers.length === surveyUsers.length
                        }
                        color='primary'
                        indeterminate={
                          selectedSurveyUsers.length > 0 &&
                          selectedSurveyUsers.length < surveyUsers.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>{getLabel('mask_party')}</TableCell>
                    <TableCell>{getLabel('branch_code')}</TableCell>
                    <TableCell>{getLabel('segment')}</TableCell>
                    <TableCell>{getLabel('trans_desc')}</TableCell>
                    <TableCell>{getLabel('served_by')}</TableCell>
                    <TableCell>{getLabel('expire_on')}</TableCell>
                    <TableCell>{getLabel('status')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {surveyUsers.map((surveyUser) => (
                    <TableRow
                      hover
                      key={surveyUser.id}
                      selected={
                        selectedSurveyUsers.indexOf(surveyUser.id) !== -1
                      }>
                      <TableCell padding='checkbox'>
                        <Checkbox
                          checked={
                            selectedSurveyUsers.indexOf(surveyUser.id) !== -1
                          }
                          color='primary'
                          onChange={(event) =>
                            handleSelectOne(event, surveyUser.id)
                          }
                          value={
                            selectedSurveyUsers.indexOf(surveyUser.id) !== -1
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameCell}>
                          {surveyUser.gender === 'M' ? (
                            <Avatar className={classes.avatar_male}>
                              {surveyUser.gender}
                            </Avatar>
                          ) : (
                            <Avatar className={classes.avatar_female}>
                              {surveyUser.gender}
                            </Avatar>
                          )}
                          <div>
                            <Link
                              color='inherit'
                              href={`${surveyUser.surveyUrl}&ro=true`}
                              target='_blank'
                              rel='noopener'
                              variant='h6'>
                              {surveyUser.maskParty}
                            </Link>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{surveyUser.branchCode}</TableCell>
                      <TableCell>{surveyUser.segment}</TableCell>
                      <TableCell>{surveyUser.transDesc}</TableCell>
                      <TableCell>{surveyUser.servedBy}</TableCell>
                      <TableCell>
                        {moment(surveyUser.expireOn).isValid()
                          ? moment(surveyUser.expireOn).format(
                              'MMM D YYYY, h:mm:ss a',
                            )
                          : '-'}
                      </TableCell>
                      <TableCell>
                        <Label color={getStatusColor(surveyUser.status)}>
                          {surveyUser.status}
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
  surveyUsers: PropTypes.array.isRequired,
};

Results.defaultProps = {
  surveyUsers: [],
};

export default Results;
