import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';

import { getMealSearchResults } from '../../common/actions/meals';
import MealsSearch from './MealsSearch';

const [, term] = window.location.search.split('=');

const getItems = () => getMealSearchResults(term, 1, true);

const mapStateToProps = ({
  meals: {
    isFetchingSearchResults,
    hasFetchedSearchResults,
    searchResultItems,
    searchResultItemsCount,
    searchResultItemsCountPerPage,
    searchResultItemsCurrentPage,
    canPaginateSearchResultItems,
  },
}) => ({
  isFetchingSearchResults,
  hasFetchedSearchResults,
  searchResultItems,
  searchResultItemsCount,
  searchResultItemsCountPerPage,
  searchResultItemsCurrentPage,
  canPaginateSearchResultItems,
  currentTerm: term,
});

const mapDispatchToProps = dispatch => ({
  loadItems: (query, page, replace) => dispatch(getMealSearchResults(query, page, replace)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(onComponentDidMount(getItems)(MealsSearch));
