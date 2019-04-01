import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';

import TopBanner from '../Meals/Banners/Top/MealsTopBanner';
import InfoBanner from '../Meals/Banners/Info/MealsInfoBanner';
import styles from './MealsSearch.scss';
import { PrimaryButton, TextBlueButton } from '../../common/customizedMaterialComponents';
import Loader from '../../common/components/Loaders/Layout/LayoutLoader';
import MealGridItem from '../../common/components/GridItems/Meal/MealGridItem';
import meal from '../../common/models/meal';

const renderResultsGrid = (
  baseDomain,
  isFetchingSearchResults,
  hasFetchedSearchResults,
  searchResultItems,
  searchResultItemsCount,
  searchResultItemsCountPerPage,
  searchResultItemsCurrentPage,
  canPaginateSearchResultItems,
  loadMoreItems,
  currentTerm,
) => {
  if (isFetchingSearchResults && !hasFetchedSearchResults) return <Loader />;

  if (!hasFetchedSearchResults) return null;

  if (hasFetchedSearchResults && !searchResultItemsCount) {
    return (
      <p className="placeholder">
        Keine Suchergebnisse für Ihre Anfrage ¯\_(ツ)_/¯
      </p>
    );
  }

  return (
    <>
      <div className="gridWrapper">
        {
          searchResultItems.map(({
            id,
            name,
            banners: { default: thumbnailUrl },
            nutrients: {
              kcal, carbs, protein, fat,
            },
            types,
            meta: {
              isFavorite,
              favorite: {
                id: favId = null,
                data: { note: favNote = null } = {},
              } = {},
            },
          }) => (
            <div key={id} className="gridItem">
              <MealGridItem
                baseDomain={baseDomain}
                id={id}
                name={name}
                thumbnailUrl={thumbnailUrl}
                kcal={kcal}
                carbs={carbs}
                protein={protein}
                fat={fat}
                typeIds={types}
                isFav={isFavorite}
                favId={favId}
                favNote={favNote}
              />
            </div>
          ))
        }
      </div>
      {isFetchingSearchResults && <Loader />}
      <div className="paginationWrapper">
        <div>
          <p className="paginationCount">
            Zeige&nbsp;
            {
              Math.min(
                searchResultItemsCount,
                searchResultItemsCountPerPage * searchResultItemsCurrentPage,
              )
            }
            &nbsp;von&nbsp;
            {searchResultItemsCount}
            &nbsp;Treffern
          </p>
          <TextBlueButton
            variant="outlined"
            onClick={() => loadMoreItems(currentTerm, searchResultItemsCurrentPage + 1, false)}
            disabled={!canPaginateSearchResultItems || isFetchingSearchResults}
          >
            Laden Sie mehr Daten
          </TextBlueButton>
        </div>
      </div>
    </>
  );
};

export default class MealsSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInputValue: '',
      currentTerm: '',
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSearchInputKeyUp = this.handleSearchInputKeyUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { props: { currentTerm } } = this;
    if (currentTerm) {
      this.setState({ searchInputValue: currentTerm, currentTerm });
    }
  }

  handleSearchInputChange({ target: { value: searchInputValue } }) {
    this.setState({ searchInputValue });
  }

  handleSearchInputKeyUp({ ctrlKey, key }) {
    if (ctrlKey && key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    const { state: { searchInputValue }, props: { loadItems } } = this;
    if (searchInputValue) {
      loadItems(searchInputValue);
    }
    this.setState({ currentTerm: searchInputValue });
  }

  render() {
    const {
      state: { searchInputValue, currentTerm },
      props: {
        baseDomain,
        isFetchingSearchResults,
        hasFetchedSearchResults,
        searchResultItems,
        searchResultItemsCount,
        searchResultItemsCountPerPage,
        searchResultItemsCurrentPage,
        canPaginateSearchResultItems,
        loadItems,
      },
    } = this;
    return (
      <>
        <TopBanner baseDomain={baseDomain} />
        <InfoBanner baseDomain={baseDomain} />
        <div className={styles.searchBlock}>
          <TextField
            label="Suchen"
            value={searchInputValue}
            onChange={this.handleSearchInputChange}
            onKeyUp={this.handleSearchInputKeyUp}
          />
          <PrimaryButton
            style={{ height: 32 }}
            disabled={!searchInputValue}
            onClick={this.handleSubmit}
          >
            SUCHEN
          </PrimaryButton>
        </div>
        {renderResultsGrid(
          baseDomain,
          isFetchingSearchResults,
          hasFetchedSearchResults,
          searchResultItems,
          searchResultItemsCount,
          searchResultItemsCountPerPage,
          searchResultItemsCurrentPage,
          canPaginateSearchResultItems,
          loadItems,
          currentTerm,
        )}
      </>
    );
  }
}

MealsSearch.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetchingSearchResults: PropTypes.bool.isRequired,
  hasFetchedSearchResults: PropTypes.bool.isRequired,
  searchResultItems: PropTypes.arrayOf(meal).isRequired,
  searchResultItemsCount: PropTypes.number.isRequired,
  searchResultItemsCountPerPage: PropTypes.number.isRequired,
  searchResultItemsCurrentPage: PropTypes.number.isRequired,
  canPaginateSearchResultItems: PropTypes.bool.isRequired,
  loadItems: PropTypes.func.isRequired,
  currentTerm: PropTypes.string.isRequired,
};
