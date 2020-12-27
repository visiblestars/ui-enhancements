import React, {createContext, useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import SurveyService from '../../../../../../@apps/services/apis/survey/survey.service';

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const {
    surveyUsers: initialSurveyUsers,
    gender: initialGender,
    segment: initialSegment,
    segmentOptions: initialSegmentOptions,
    status: initialStatus,
    isActive: initialIsActive,
    maskParty: initialMaskParty,
    totalItems: initialTotalItems,
    totalPages: initialTotalPages,
    currentPage: initialCurrentPage,
    page: initialPage,
    rowsPerPage: initialRowsPerPage,
    rowsPerPageOptions: initialRowsPerPageOptions,
    selectedSurveyUsers: initialSelectedSurveyUsers,
    children,
  } = props;

  // Use State to keep the values
  const [surveyUsers, setSurveyUsers] = useState(initialSurveyUsers);
  const [gender, setGender] = useState(initialGender);
  const [segment, setSegment] = useState(initialSegment);
  const [segmentOptions, setSegmentOptions] = useState(initialSegmentOptions);
  const [status, setStatus] = useState(initialStatus);
  const [isActive, setIsActive] = useState(initialIsActive);
  const [maskParty, setMaskParty] = useState(initialMaskParty);
  const [totalItems, setTotalItems] = useState(initialTotalItems);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState(
    initialRowsPerPageOptions,
  );
  const [selectedSurveyUsers, setSelectedSurveyUsers] = useState(
    initialSelectedSurveyUsers,
  );

  const onSendMessage = () => {
    console.log('selectedSurveyUsers: ' + selectedSurveyUsers);
    setSelectedSurveyUsers([]);
  };

  const loadSegments = useCallback(() => {
    SurveyService.fetchSurveyUsersDistinctSegments().then(
      (response) => {
        setSegmentOptions(response);
      },
      (error) => {
        console.log(JSON.stringify(error));
      },
    );
  }, []);
  const searchSurveyUser = useCallback(() => {
    let params = {};
    params['maskParty'] = maskParty;
    params['gender'] = gender.join(',');
    params['segment'] = segment.join(',');
    params['status'] = status.join(',');
    params['isActive'] = isActive;
    params['page'] = page;
    params['size'] = rowsPerPage;

    SurveyService.searchSurveyUsers(params).then(
      (response) => {
        setSurveyUsers(response.surveyUsers);
        setTotalItems(response.totalItems);
        setTotalPages(response.totalPages);
        setCurrentPage(response.currentPage);
      },
      (error) => {
        console.log(JSON.stringify(error));
      },
    );
  }, [maskParty, gender, segment, status, isActive, page, rowsPerPage]);

  useEffect(() => {
    searchSurveyUser();
  }, [searchSurveyUser]);

  useEffect(() => {
    loadSegments();
  }, [loadSegments]);

  // Make the context object:
  const usersContext = {
    surveyUsers,
    gender,
    segment,
    segmentOptions,
    status,
    maskParty,
    isActive,
    totalItems,
    totalPages,
    currentPage,
    page,
    rowsPerPage,
    rowsPerPageOptions,
    selectedSurveyUsers,
    setGender,
    setSegment,
    setStatus,
    setIsActive,
    setMaskParty,
    searchSurveyUser,
    setPage,
    setRowsPerPage,
    setSelectedSurveyUsers,
    onSendMessage,
  };

  // pass the value in provider and return
  return <Context.Provider value={usersContext}>{children}</Context.Provider>;
};

export const {Consumer} = Context;

Provider.propTypes = {
  surveyUsers: PropTypes.array,
  gender: PropTypes.array,
  segment: PropTypes.array,
  status: PropTypes.array,
  isActive: PropTypes.bool,
  maskParty: PropTypes.number,
  totalItems: PropTypes.number,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.array,
  selectedSurveyUsers: PropTypes.array,
};

Provider.defaultProps = {
  surveyUsers: [],
  gender: [],
  segment: [],
  segmentOptions: [],
  status: [],
  isActive: true,
  totalItems: 0,
  totalPages: 0,
  currentPage: 0,
  page: 0,
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 25],
  selectedSurveyUsers: [],
};
