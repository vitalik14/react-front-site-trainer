import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const MeasurementTablesPagination = ({
  page,
  count,
  rowsPerPage,
  onBackBtnClick,
  onNextBtnClick,
}) => (
  <div>
    <IconButton
      onClick={onBackBtnClick}
      disabled={page === 0}
      aria-label="Previous Page"
    >
      <KeyboardArrowLeftIcon />
    </IconButton>
    <IconButton
      onClick={onNextBtnClick}
      disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      aria-label="Next Page"
    >
      <KeyboardArrowRightIcon />
    </IconButton>
  </div>
);

MeasurementTablesPagination.propTypes = {
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onBackBtnClick: PropTypes.func.isRequired,
  onNextBtnClick: PropTypes.func.isRequired,
};

export default MeasurementTablesPagination;
