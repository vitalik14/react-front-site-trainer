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
} from './actionsTypes';
import {
  fetchCategories,
  fetchCategoryInfo,
  fetchCategoryItems,
  fetchSearchResults,
  fetchMeal,
  fetchMealPlan,
  fetchGroceryList,
  fetchGroceryListPDF,
} from '../services/meals';
import handleError from '../errorHandler';
import { camalizeKeys } from '../helpers';

const requestCategories = { type: REQUEST_MEAL_CATEGORIES };

const receiveCategories = ({ categories }) => ({
  type: RECEIVE_MEAL_CATEGORIES,
  categories,
});

const requestMealCategoryInfo = {
  type: REQUEST_MEALS_CATEGORY_INFO,
};

const receiveCategoryInfo = categoryInfo => ({
  type: RECEIVE_MEALS_CATEGORY_INFO,
  categoryInfo,
});

const requestMealCategoryItems = {
  type: REQUEST_MEALS_CATEGORY_ITEMS,
};

const receiveCategoryItems = ({
  data, total, perPage, currentPage, nextPageUrl,
}, replaceCategoryItems) => ({
  type: RECEIVE_MEALS_CATEGORY_ITEMS,
  categoryItems: data,
  categoryItemsCount: total,
  categoryItemsCountPerPage: perPage,
  categoryItemsCurrentPage: +currentPage,
  canPaginateCategoryItems: !!nextPageUrl,
  replaceCategoryItems,
});

const requestSearchResults = { type: REQUEST_MEAL_SEARCH_RESULTS };

const receiveSearchResults = ({
  data, total, perPage, currentPage, nextPageUrl,
}, replaceSearchResultItems) => ({
  type: RECEIVE_MEAL_SEARCH_RESULTS,
  searchResultItems: data,
  searchResultItemsCount: total,
  searchResultItemsCountPerPage: perPage,
  searchResultItemsCurrentPage: +currentPage,
  canPaginateSearchResultItems: !!nextPageUrl,
  replaceSearchResultItems,
});

const requestMeal = { type: REQUEST_MEAL };

const receiveMeal = meal => ({
  type: RECEIVE_MEAL,
  currentItem: meal,
});

const requestMealPlan = () => ({
  type: REQUEST_MEAL_PLAN,
});

const receiveMealPlan = plan => ({
  type: RECEIVE_MEAL_PLAN,
  plan,
});

const requestGroceryList = () => ({
  type: REQUEST_GROCERY_LIST,
});

const receiveGroceryList = ({ groceryList }) => ({
  type: RECEIVE_GROCERY_LIST,
  groceryList,
});

const requestGroceryListPDF = () => ({
  type: REQUEST_GROCERY_LIST_PDF,
});

const receiveGroceryListPDF = ({ fileUrl }) => ({
  type: RECEIVE_GROCERY_LIST_PDF,
  groceryListDownloadURL: fileUrl,
});

export const getMealCategories = () => dispatch => {
  dispatch(requestCategories);

  return fetchCategories()
    .then(({ data }) => dispatch(receiveCategories(camalizeKeys(data))))
    .catch(handleError);
};

export const getMealSearchResults = (term, page, replace) => dispatch => {
  dispatch(requestSearchResults);

  return fetchSearchResults(term, page)
    .then(({ data }) => dispatch(receiveSearchResults(camalizeKeys(data), replace)))
    .catch(handleError);
};

export const getMealCategoryInfo = id => dispatch => {
  dispatch(requestMealCategoryInfo);

  return fetchCategoryInfo(id)
    .then(({ data: { category } }) => dispatch(receiveCategoryInfo(camalizeKeys(category))))
    .catch(handleError);
};

export const getMealCategoryItems = (
  id, page, replace, type, kcal, carbs, protein, fat,
) => dispatch => {
  dispatch(requestMealCategoryItems);

  return fetchCategoryItems(
    id, page, type, kcal, carbs, protein, fat,
  )
    .then(({ data }) => dispatch(receiveCategoryItems(camalizeKeys(data), replace)))
    .catch(handleError);
};

export const getMeal = id => dispatch => {
  dispatch(requestMeal);

  return fetchMeal(id)
    .then(({ data: { recipe } }) => dispatch(receiveMeal(camalizeKeys(recipe))))
    .catch(handleError);
};

export const getMealPlan = () => dispatch => {
  dispatch(requestMealPlan());

  return fetchMealPlan()
    .then(({ data: { meals } }) => dispatch(receiveMealPlan(meals)))
    .catch(handleError);
};

export const getGroceryList = (from, to) => dispatch => {
  dispatch(requestGroceryList());

  return fetchGroceryList(from, to)
    .then(({ data }) => dispatch(receiveGroceryList(camalizeKeys(data))))
    .catch(handleError);
};

export const getGroceryListPDF = (from, to) => dispatch => {
  dispatch(requestGroceryListPDF());

  return fetchGroceryListPDF(from, to)
    .then(({ data }) => {
      dispatch(receiveGroceryListPDF(camalizeKeys(data)));
      window.open(data.file_url, '_blank');
    })
    .catch(handleError);
};
