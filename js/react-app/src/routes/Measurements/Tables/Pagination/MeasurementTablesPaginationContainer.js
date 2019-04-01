import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import MeasurementTablesPagination from './MeasurementTablesPagination';

export default class MeasurementTablesPaginationContainer extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
  }

  handleBackButtonClick() {
    const { props: { onChangePage, page } } = this;
    onChangePage(page - 1);
  }

  handleNextButtonClick() {
    const { props: { onChangePage, page } } = this;
    onChangePage(page + 1);
  }

  render() {
    const { props: { count, page, rowsPerPage } } = this;

    return (
      <MeasurementTablesPagination
        page={page}
        count={count}
        rowsPerPage={rowsPerPage}
        onBackBtnClick={this.handleBackButtonClick}
        onNextBtnClick={this.handleNextButtonClick}
      />
    );
  }
}

MeasurementTablesPaginationContainer.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};
