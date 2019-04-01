import mapKeysDeep from 'map-keys-deep-lodash';
import { camelCase } from 'lodash';
import germanStrings from 'react-timeago/lib/language-strings/de';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import moment from 'moment';

export const camalizeKeys = obj => mapKeysDeep(obj, (val, key) => camelCase(key));

export const getVimeoVideoURL = files => {
  const [{ linkSecure }] = files.filter(({ width }) => width === 640);
  return linkSecure;
};

export const shouldSidebarItemExpand = (title, currentPath) => {
  const paths = {
    profile: [
      '/fitbook/profile/me',
      '/you/settings',
      '/you/goal',
      '/preise-leistungen',
      '/doupgrade',
    ],
    home: [
      '/you',
      '/you/stats',
      '/you/achievements',
      '/you/favorites',
    ],
    training: [
      '/kurse',
      '/kurse/wochenplan',
      '/kurse/trainingplans',
      '/kurse/trainer',
      '/videos',
      '/videos/downloads',
      '/kurse/kurse',
    ],
    fitbook: [
      '/fitbook',
      '/fitbook/friends',
      '/fitbook/messages',
      '/fitbook/stats',
      '/fitbook/profile/',
    ],
    more: [
      '/apps',
      '/books',
      '/shop',
      '/hilfe',
    ],
  };

  return paths[title].some(path => currentPath.includes(path));
};

export const toDateString = date => {
  const yyyy = date.getFullYear();

  let mm = date.getMonth() + 1;

  if (mm < 10) {
    mm = `0${mm}`;
  }

  let dd = date.getDate();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  return `${yyyy}-${mm}-${dd}`;
};

moment.locale('de', {
  months: [
    'Januar',
    'Februar',
    'Marz',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ],
  weekdays: [
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
    'Sonntag',
  ],
});

moment.locale('de');

export const formatDateLong = date => moment(date).format('dddd, DD. MMMM  YYYY, HH:mm');

export const formatDateShort = date => moment(date).format('LL');

export const formatter = buildFormatter(germanStrings);

export const difficultyColors = ['#7ED321', '#F8CF1C', '#D0021B'];

export const difficultyLabels = ['Leichte Schwierigkeit', 'Mittlere Schwierigkeit', 'Harte Schwierigkeit'];
