import {
  fetch,
  update,
  create,
  remove,
} from '../httpClient';

export const fetchCurrentUser = () => fetch('/user/me');

export const fetchCommonData = () => fetch('/common');

export const fetchNotifications = page => fetch('/user/notifications', { page });

export const sendNotificationRead = id => update('/user/markseen', { type: 'notification', id });

export const sendAllNotificationsRead = () => update('/user/markseen', { type: 'notification', id: 'all' });

export const fetchDashboardData = () => fetch('/user/dashboard');

export const fetchMeasurements = (page, from, to) => fetch('/user/measurements', { page, from_date: from, to_date: to });

export const createMeasurement = data => create('/user/measurements', data);

export const destroyMeasurement = id => remove(`/user/measurements/${id}`);

export const fetchUnlockedAchievements = () => fetch('/user/achievements');

export const fetchFavoriteItems = type => fetch(`/favorites/${type}`);

export const addFavorite = (
  type,
  id,
  note = '',
  difficulty = null,
) => create(`/favorites/${type}/${id}`, { note, difficulty });

export const updateFavorite = (
  id,
  note = '',
  difficulty = null,
) => update(`/favorites/${id}`, { note, difficulty });

export const deleteFavorite = (type, id) => remove(`/favorites/${id}`);

export const fetchPreferences = () => fetch('/user/iwant');

export const updatePreferences = data => update('/user/iwant', data);

export const like = (entityType, entityItemId) => fetch(`/like/${entityType}/${entityItemId}`);

export const unlike = (entityType, entityItemId) => remove(`/like/${entityType}/${entityItemId}`);

export const inviteFriends = (emails, msg) => create('/user/invite', { emails, msg });

export const fetchPricing = () => fetch('/pricing');

export const validateCoupon = (
  code,
  type = 'upgrade',
  contract_id = null,
) => create('checkcoupon', { code, type, contract_id });

export const startUpgradeProcess = (option, duration, payment) => create('/upgrade/start', { option, duration, payment });

export const submitSecondUpgradeStep = (
  gender,
  firstname,
  lastname,
  street,
  zip,
  city,
  country,
  coupon,
) => create(
  '/upgrade/data',
  {
    gender,
    firstname,
    lastname,
    street,
    zip,
    city,
    country,
    coupon,
  },
);

export const submitThirdUpgradeStep = (payment, iban, bic) => create(
  '/upgrade/payment',
  {
    payment,
    current_payment: 0,
    iban,
    bic,
  },
);

export const executeUpgrade = () => create('/upgrade/execute', { agb: 1 });
