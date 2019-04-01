import {
  REQUEST_MEAL_CATEGORIES,
  RECEIVE_MEAL_CATEGORIES,
  REQUEST_MEALS_CATEGORY_INFO,
  RECEIVE_MEALS_CATEGORY_INFO,
  REQUEST_MEALS_CATEGORY_ITEMS,
  RECEIVE_MEALS_CATEGORY_ITEMS,
  REQUEST_MEAL_SEARCH_RESULTS,
  RECEIVE_MEAL_SEARCH_RESULTS,
  REQUEST_MEAL,
  RECEIVE_MEAL,
  REQUEST_MEAL_PLAN,
  RECEIVE_MEAL_PLAN,
  REQUEST_GROCERY_LIST,
  RECEIVE_GROCERY_LIST,
  REQUEST_GROCERY_LIST_PDF,
  RECEIVE_GROCERY_LIST_PDF,
} from '../actions/actionsTypes';

const initialState = {
  isFetchingCategories: false,
  categories: [],
  isFetchingCategoryInfo: false,
  categoryInfo: {},
  isFetchingCategoryItems: false,
  hasFetchedCategoryItems: false,
  categoryItems: [],
  categoryItemsCount: 0,
  categoryItemsCountPerPage: 0,
  categoryItemsCurrentPage: 0,
  canPaginateCategoryItems: false,
  isFetchingSearchResults: false,
  hasFetchedSearchResults: false,
  searchResultItems: [],
  searchResultItemsCount: 0,
  searchResultItemsCountPerPage: 0,
  searchResultItemsCurrentPage: 0,
  canPaginateSearchResultItems: false,
  isFetchingCurrentItem: false,
  currentItem: {},
  isFetchingMealPlan: false,
  plan: {},
  isFetchingGroceryList: false,
  groceryListItems: [],
  isFetchingGroceryListPDF: false,
  groceryListDownloadURL: '',
};

export default (
  state = initialState,
  {
    type,
    categories,
    categoryInfo,
    categoryItems,
    categoryItemsCount,
    categoryItemsCountPerPage,
    categoryItemsCurrentPage,
    canPaginateCategoryItems,
    replaceCategoryItems = true,
    searchResultItems,
    searchResultItemsCount,
    searchResultItemsCountPerPage,
    searchResultItemsCurrentPage,
    canPaginateSearchResultItems,
    replaceSearchResultItems = true,
    currentItem,
    plan,
    groceryList,
    groceryListDownloadURL,
  },
) => {
  switch (type) {
    case REQUEST_MEAL_CATEGORIES:
      return {
        ...state,
        isFetchingCategories: true,
      };
    case RECEIVE_MEAL_CATEGORIES:
      return {
        ...state,
        categories,
        isFetchingCategories: false,
      };
    case REQUEST_MEALS_CATEGORY_INFO:
      return {
        ...state,
        isFetchingCategoryInfo: true,
      };
    case RECEIVE_MEALS_CATEGORY_INFO:
      return {
        ...state,
        categoryInfo,
        isFetchingCategoryInfo: false,
      };
    case REQUEST_MEALS_CATEGORY_ITEMS:
      return {
        ...state,
        isFetchingCategoryItems: true,
      };
    case RECEIVE_MEALS_CATEGORY_ITEMS:
      return {
        ...state,
        categoryItems: replaceCategoryItems
          ? categoryItems
          : state.categoryItems.concat(categoryItems),
        categoryItemsCount,
        categoryItemsCountPerPage,
        categoryItemsCurrentPage,
        canPaginateCategoryItems,
        isFetchingCategoryItems: false,
        hasFetchedCategoryItems: true,
      };
    case REQUEST_MEAL_SEARCH_RESULTS:
      return {
        ...state,
        isFetchingSearchResults: true,
      };
    case RECEIVE_MEAL_SEARCH_RESULTS:
      return {
        ...state,
        searchResultItems: replaceSearchResultItems
          ? searchResultItems
          : state.searchResultItems.concat(searchResultItems),
        searchResultItemsCount,
        searchResultItemsCountPerPage,
        searchResultItemsCurrentPage,
        canPaginateSearchResultItems,
        hasFetchedSearchResults: true,
        isFetchingSearchResults: false,
      };
    case REQUEST_MEAL:
      return {
        ...state,
        isFetchingCurrentItem: true,
      };
    case RECEIVE_MEAL:
      return {
        ...state,
        currentItem,
        isFetchingCurrentItem: false,
      };
    case REQUEST_MEAL_PLAN:
      return {
        ...state,
        isFetchingMealPlan: true,
      };
    case RECEIVE_MEAL_PLAN:
      return {
        ...state,
        plan,
        isFetchingMealPlan: false,
      };
    case REQUEST_GROCERY_LIST:
      return {
        ...state,
        isFetchingGroceryList: true,
      };
    case RECEIVE_GROCERY_LIST:
      return {
        ...state,
        groceryListItems: Object.keys(groceryList).map(id => (
          {
            ...groceryList[id],
            id: +id,
          }
        )),
        isFetchingGroceryList: false,
      };
    case REQUEST_GROCERY_LIST_PDF:
      return {
        ...state,
        isFetchingGroceryListPDF: true,
      };
    case RECEIVE_GROCERY_LIST_PDF:
      return {
        ...state,
        groceryListDownloadURL,
        isFetchingGroceryListPDF: false,
      };
    default:
      return state;
  }
};
