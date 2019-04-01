import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import componentStyles from './Search.scss';
import { PrimaryButton } from '../../../common/customizedMaterialComponents';
import { partialCourse } from '../../../common/models/course';

const StyledFormControl = withStyles({
  root: {
    width: '100%',
    flexBasis: '92%',
    marginRight: 20,
    '@media (max-width: 360px)': {
      flexBasis: '100%',
      marginRight: 0,
      marginBottom: 10,
    },
  },
})(FormControl);

const StyledFormControlLabel = withStyles({
  root: {
    width: '100%',
    flexDirection: 'column-reverse',
    alignItems: 'flex-start',
    margin: 0,
    position: 'relative',
    '& > div': {
      width: '100%',
    },
  },
  label: {
    color: '#4D4D4E',
    fontSize: 13,
  },
})(FormControlLabel);

const SearchResultsWrapper = withStyles({
  root: {
    width: '100%',
    maxHeight: 256,
    overflow: 'auto',
    position: 'absolute',
    top: 60,
    zIndex: 10,
  },
})(Paper);

const CloseIconButton = withStyles({
  root: {
    width: 24,
    height: 24,
  },
})(IconButton);

const Search = ({
  baseDomain,
  onSearchInputRefSet,
  onSearchKeyUp,
  onSearchFocus,
  onSearchClear,
  onSearchResultsOutsideClick,
  isFetchingResults,
  showSearchResults,
  searchInputValue,
  results,
  hasFetchedResultsAtLeastOnce,
  selectedSearchResultId,
  selectedSearchResultSlug,
  onSearchResultSelect,
  loadSearchResults,
}) => (
  <div>
    <h2 className={componentStyles.title}>
      Direkt zum kurs
    </h2>
    <div className={componentStyles.block}>
      <StyledFormControl>
        <ClickAwayListener onClickAway={onSearchResultsOutsideClick}>
          <div>
            <StyledFormControlLabel
              className={componentStyles.controlLabel}
              name="search"
              control={(
                <TextField
                  onChange={({ target: { value } }) => {
                    loadSearchResults(value);
                    onSearchKeyUp(value);
                  }}
                  onFocus={onSearchFocus}
                  label="Suche nach Kursen, Trainern usw."
                  value={searchInputValue}
                  inputRef={onSearchInputRefSet}
                />
              )}
            />
            {
              !!(results.length && showSearchResults
                && !selectedSearchResultId && !isFetchingResults) && (
                <SearchResultsWrapper>
                  <List>
                    {
                      results.map(({ id, name, slug }) => (
                        <ListItem
                          key={id}
                          button
                          onClick={() => onSearchResultSelect({ id, name, slug })}
                          selected={selectedSearchResultId === id}
                        >
                          <ListItemText primary={name} />
                        </ListItem>
                      ))
                    }
                  </List>
                </SearchResultsWrapper>
              )
            }
            {
              !!(!results.length && showSearchResults
                && searchInputValue && hasFetchedResultsAtLeastOnce) && (
                <SearchResultsWrapper>
                  <p className={componentStyles.noResultsText}>
                    Keine Kurse gefunden, die Ihren Suchkriterien entsprechen
                  </p>
                </SearchResultsWrapper>
              )
            }
            <div className={componentStyles.closeIconCont}>
              <CloseIconButton color="inherit" fontSize="inherit" onClick={onSearchClear} disabled={!searchInputValue}>
                <CloseIcon color="inherit" fontSize="inherit" />
              </CloseIconButton>
            </div>
          </div>
        </ClickAwayListener>
      </StyledFormControl>
      <PrimaryButton
        style={{ flexBasis: '8%', minWidth: 106, width: '100%' }}
        disabled={!selectedSearchResultId || !searchInputValue}
        href={selectedSearchResultSlug ? `${baseDomain}/kurse/${selectedSearchResultSlug}` : null}
      >
        ZUM KURS
      </PrimaryButton>
    </div>
  </div>
);

Search.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  onSearchInputRefSet: PropTypes.func.isRequired,
  onSearchKeyUp: PropTypes.func.isRequired,
  onSearchFocus: PropTypes.func.isRequired,
  onSearchClear: PropTypes.func.isRequired,
  onSearchResultsOutsideClick: PropTypes.func.isRequired,
  isFetchingResults: PropTypes.bool.isRequired,
  showSearchResults: PropTypes.bool.isRequired,
  searchInputValue: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(partialCourse).isRequired,
  hasFetchedResultsAtLeastOnce: PropTypes.bool.isRequired,
  selectedSearchResultId: PropTypes.number,
  selectedSearchResultSlug: PropTypes.string,
  onSearchResultSelect: PropTypes.func.isRequired,
  loadSearchResults: PropTypes.func.isRequired,
};

Search.defaultProps = {
  selectedSearchResultId: null,
  selectedSearchResultSlug: null,
};
export default Search;
