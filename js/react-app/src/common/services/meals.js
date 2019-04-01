import { fetch, update, remove } from '../httpClient';

export const fetchCategories = () => fetch('/recipes');

export const fetchCategoryInfo = id => fetch(`/recipes/category/${id}`);

export const fetchCategoryItems = (
  id, page = 1, type = 0, kcal = '', carbs = '', protein = '', fat = '',
) => fetch(
  `/recipes/category/${id}/recipes`,
  {
    page, type, kcal, carbs, protein, fat,
  },
);

export const fetchSearchResults = (q = '', page = 1) => fetch('/recipes', { q, page });

export const fetchMeal = id => fetch(`/recipes/${id}`);

export const fetchMealPlan = () => fetch('/user/mealplan');

export const fetchGroceryList = (from, to) => fetch('/user/grocerylist', { start_date: from, end_date: to });

export const fetchGroceryListPDF = (from, to) => fetch('/user/grocerylist/download', { start_date: from, end_date: to });

export const stopMealPlan = () => remove('/user/mealplan');

export const swapMeal = (id, type) => update('/user/mealplan', { meal_id: id, meal_type: type });
