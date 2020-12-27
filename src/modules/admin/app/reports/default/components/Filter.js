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
import {Context as SurveyUsersContext} from '../context/SurveyUsersContext';

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
  const surveyUsersContext = useContext(SurveyUsersContext);
  const {
    gender,
    segment,
    segmentOptions,
    status,
    maskParty,
    isActive,
    setGender,
    setSegment,
    setStatus,
    setMaskParty,
    setIsActive,
    setPage,
  } = surveyUsersContext;
  const genderSelects = [
    {
      label: getLabel('gender'),
      options: ['M', 'F'],
    },
  ];
  const segmentSelects = [
    {
      label: getLabel('segment'),
      options: segmentOptions,
    },
  ];
  const statusSelects = [
    {
      label: getLabel('status'),
      options: ['VIEWED', 'NOTVIEWED', 'PARTIAL', 'COMPLETED'],
    },
  ];
  const handleSearchInputChange = (event) => {
    event.persist();
    setMaskParty(event.target.value);
    setPage(0);
  };

  const handleIsActiveChange = (event) => {
    event.persist();
    const target = event.target;
    const value = target.checked ? true : false;
    setIsActive(value);
    setPage(0);
  };

  const handleGenderDelete = (g) => {
    setGender((gender) => gender.filter((e) => g !== e));
    setPage(0);
  };

  const handleSegmentDelete = (se) => {
    setSegment((segment) => segment.filter((e) => se !== e));
    setPage(0);
  };

  const handleStatusDelete = (st) => {
    setStatus((status) => status.filter((e) => st !== e));
    setPage(0);
  };

  const handleMultiGenderSelectChange = (value) => {
    setGender(value);
    setPage(0);
  };

  const handleMultiSegmentSelectChange = (value) => {
    setSegment(value);
    setPage(0);
  };

  const handleMultiStatusSelectChange = (value) => {
    setStatus(value);
    setPage(0);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <div className={classes.keywords}>
        <SearchIcon className={classes.searchIcon} />
        <Input
          disableUnderline
          onChange={handleSearchInputChange}
          placeholder={getLabel('search_maskparty')}
          value={maskParty}
        />
      </div>
      <Divider />
      <div className={classes.chips}>
        {gender.map((g) => (
          <Chip
            className={classes.chip}
            deleteIcon={<CloseIcon />}
            key={g}
            label={g}
            onDelete={() => handleGenderDelete(g)}
          />
        ))}
        {segment.map((se) => (
          <Chip
            className={classes.chip}
            deleteIcon={<CloseIcon />}
            key={se}
            label={se}
            onDelete={() => handleSegmentDelete(se)}
          />
        ))}
        {status.map((st) => (
          <Chip
            className={classes.chip}
            deleteIcon={<CloseIcon />}
            key={st}
            label={st}
            onDelete={() => handleStatusDelete(st)}
          />
        ))}
      </div>
      <Divider />
      <div className={classes.selects}>
        {genderSelects.map((select) => (
          <MultiSelect
            key={select.label}
            label={select.label}
            onChange={handleMultiGenderSelectChange}
            options={select.options}
            value={gender}
          />
        ))}
        {segmentSelects &&
          segmentSelects[0].options &&
          segmentSelects.map((select) => (
            <MultiSelect
              key={select.label}
              label={select.label}
              onChange={handleMultiSegmentSelectChange}
              options={select.options}
              value={segment}
            />
          ))}
        {statusSelects.map((select) => (
          <MultiSelect
            key={select.label}
            label={select.label}
            onChange={handleMultiStatusSelectChange}
            options={select.options}
            value={status}
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
