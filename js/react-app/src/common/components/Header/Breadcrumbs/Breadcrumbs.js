import React from 'react';
import { PropTypes } from 'prop-types';

import styles from './Breadcrumbs.scss';

const pathToBreadcrumbMapping = {
  you: 'Home',
  stats: 'Statistik',
  achievements: 'Erfolge',
  favorites: 'Favoriten',
  kurse: 'Training',
  wochenplan: 'Wochenplan',
  trainingplans: 'Trainingsplan finden',
  trainer: 'Trainer',
  videos: 'Videos',
  downloads: 'Video Downloads',
  search: 'Kurs Suchen',
  beratung: 'Beratung',
  news: 'News',
  meals: 'Rezepte',
  fitbook: 'Fitbook',
  friends: 'Freunde',
  messages: 'Nachrichten',
  more: 'Mehr',
  apps: 'Apps',
  books: 'Bücher',
  shop: 'Shop',
  hilfe: 'Hilfe',
  profile: 'Mein Profil',
  settings: 'Einstellungen',
  goal: 'Mein Ziel',
  contactform: 'Kontakt',
  presse: 'Presse',
  agb: 'AGB',
  imprint: 'Impressum',
  companies: 'Unternehmen',
  partner: 'Partner',
  grocerylist: 'Einkaufsliste',
  'preise-leistungen': 'Preise und Leistungen',
};

const exceptions = {
  '/fitbook/profile/me': [
    {
      path: '/fitbook/profile/me',
      title: 'Mein Profil',
    },
  ],
  '/you/settings': [
    {
      path: '/you/settings',
      title: 'Einstellungen',
    },
  ],
  '/you/goal': [
    {
      path: '/you/goal',
      title: 'Mein Zeil',
    },
  ],
  '/you/weekplan/meals': [
    {
      path: '/you',
      title: 'Home',
    },
    {
      path: '/you/weekplan/meals',
      title: 'Deine Mahlzeiten',
    },
  ],
  '/videos': [
    {
      path: '/kurse',
      title: 'Training',
    },
    {
      path: '/videos',
      title: 'Videos',
    },
  ],
  '/videos/downloads': [
    {
      path: '/kurse',
      title: 'Training',
    },
    {
      path: '/videos',
      title: 'Videos',
    },
    {
      path: '/videos/downloads',
      title: 'Downloads',
    },
  ],
  '/kurse/trainingplans': [
    {
      path: '/kurse',
      title: 'Training',
    },
    {
      path: '/kurse/trainingplans',
      title: 'Trainingspläne',
    },
  ],
  '/kurse/kurse': [
    {
      path: '/kurse',
      title: 'Training',
    },
    {
      path: '/kurse/kurse',
      title: 'Kurs Suchen',
    },
  ],
  '/fitbook/stats': [
    {
      path: '/fitbook',
      title: 'Fitbook',
    },
    {
      path: '/kurse/stats',
      title: 'Statistiken',
    },
  ],
  '/meals/category/2': [
    {
      path: '/meals',
      title: 'Rezepte',
    },
    {
      path: '/meals/category/2',
      title: 'Vegetarisch',
    },
  ],
  '/meals/category/3': [
    {
      path: '/meals',
      title: 'Rezepte',
    },
    {
      path: '/meals/category/3',
      title: 'Vegan',
    },
  ],
  '/meals/category/4': [
    {
      path: '/meals',
      title: 'Rezepte',
    },
    {
      path: '/meals/category/4',
      title: 'Meerestiere',
    },
  ],
  '/meals/category/5': [
    {
      path: '/meals',
      title: 'Rezepte',
    },
    {
      path: '/meals/category/5',
      title: 'Laktosefrei',
    },
  ],
  '/meals/category/6': [
    {
      path: '/meals',
      title: 'Rezepte',
    },
    {
      path: '/meals/category/6',
      title: 'Paleo',
    },
  ],
  '/meals/category/7': [
    {
      path: '/meals',
      title: 'Rezepte',
    },
    {
      path: '/meals/category/7',
      title: 'Geflügel',
    },
  ],
  '/meals/category/8': [
    {
      path: '/meals',
      title: 'Rezepte',
    },
    {
      path: '/meals/category/8',
      title: 'Carne',
    },
  ],
  '/meals/category/9': [
    {
      path: '/meals',
      title: 'Rezepte',
    },
    {
      path: '/meals/category/9',
      title: 'Glutenfrei',
    },
  ],
  '/meals/category/10': [
    {
      path: '/meals',
      title: 'Rezepte',
    },
    {
      path: '/meals/category/10',
      title: 'Salate',
    },
  ],
  '/meals/search': [
    {
      path: '/meals',
      title: 'Rezepte',
    },
    {
      path: 'meals/search',
      title: 'Suchen',
    },
  ],
};

const Breadcrumbs = ({ baseDomain, currentPath }) => {
  let breadcrumbs = exceptions[currentPath] || currentPath.split('/').reduce((pathTitleMapping, pathPart, idx) => {
    if (idx === 0) return pathTitleMapping;
    pathTitleMapping.push({
      path: `/${pathPart}`,
      title: pathToBreadcrumbMapping[pathPart],
    });
    return pathTitleMapping;
  }, []);
  if (currentPath.indexOf('/meals/recipe/') === 0) {
    breadcrumbs = [
      {
        path: '/meals',
        title: 'Rezepte',
      },
      {
        path: currentPath,
        title: 'Einzelrezept',
      },
    ];
  }
  if (currentPath.indexOf('/fitbook/profile/') === 0 && currentPath !== '/fitbook/profile/me') {
    breadcrumbs = [
      {
        path: '/fitbook',
        title: 'Fitbook',
      },
      {
        path: currentPath,
        title: 'Benutzerprofil',
      },
    ];
  }
  if (currentPath.indexOf('/fitbook/messages/') === 0) {
    breadcrumbs = [
      {
        path: '/fitbook',
        title: 'Fitbook',
      },
      {
        path: '/fitbook/messages',
        title: 'Nachrichten',
      },
    ];
  }
  if (currentPath.indexOf('/videos/watch/') === 0) {
    const paths = currentPath.split('/');
    const id = paths[paths.length - 1];

    breadcrumbs = [
      {
        path: '/videos',
        title: 'Videos',
      },
      {
        path: `/videos/watch/${id}`,
        title: 'Wache',
      },
    ];
  }
  if (currentPath.indexOf('/kurse/trainingplans/') === 0) {
    const paths = currentPath.split('/');
    const id = paths[paths.length - 1];

    breadcrumbs = [
      {
        path: '/kurse/trainingplans',
        title: 'Training',
      },
      {
        path: `/kurse/trainingplans/${id}`,
        title: 'Trainingspläne',
      },
    ];
  }
  if (currentPath.includes('/kurse/kurse/')) {
    const paths = currentPath.split('/');
    const slug = paths[paths.length - 1];

    breadcrumbs = [
      {
        path: '/training',
        title: 'Training',
      },
      {
        path: `/kurse/kurse/${slug}`,
        title: 'Kurse',
      },
    ];
  }
  return (
    <div className={styles.cont}>
      {breadcrumbs.map((breadcrumb, idx, arr) => {
        if (idx === arr.length - 1) {
          return (
            <span key={breadcrumb.path}>
              {breadcrumb.title}
            </span>
          );
        }
        return (
          <div key={breadcrumb.path}>
            <a href={`${baseDomain}${breadcrumb.path}`} className={styles.link}>
              {breadcrumb.title}
            </a>
            <span className={styles.divider}>·</span>
          </div>
        );
      })}
    </div>
  );
};

Breadcrumbs.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  currentPath: PropTypes.string.isRequired,
};

export default Breadcrumbs;
