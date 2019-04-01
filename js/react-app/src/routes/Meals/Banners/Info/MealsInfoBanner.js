import React from 'react';
import { PropTypes } from 'prop-types';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';

import { WhiteButton } from '../../../../common/customizedMaterialComponents';
import styles from './MealsInfoBanner.scss';

const MealsInfoBanner = ({ baseDomain }) => (
  <div className={styles.block}>
    <div className={styles.leftInnerWrapper}>
      <img
        src={`${baseDomain}/assets/js/react-app/src/assets/img/png/linda-avatar.png`}
        alt="Linda avatar"
        className={styles.avatar}
      />
      <img
        src={`${baseDomain}/assets/js/react-app/src/assets/img/png/larissa-avatar.png`}
        alt="Linda avatar"
        className={styles.avatar}
      />
    </div>
    <div className={styles.rightInnerWrapper}>
      <h2 className={styles.title}>
        Wir beraten dich gerne!
      </h2>
      <p className={styles.description}>
        Linda und Larissa sind für unsere Rezepte verantwortlich.
        Sie stehen Dir bei Fragen dazu gerne zur Verfügung!
      </p>
      <div className={styles.contactDetailsWrapper}>
        <div className={styles.contactDetailsBlock}>
          <div className={styles.iconWrapper}>
            <PhoneIcon color="inherit" fontSize="inherit" />
          </div>
          <a href="tel:+490 6471 50 60 81" className={styles.contactDetailsText}>
            +490 6471 50 60 81
          </a>
        </div>
        <div className={styles.contactDetailsBlock}>
          <div className={styles.iconWrapper}>
            <EmailIcon color="inherit" fontSize="inherit" />
          </div>
          <a href="mailto:linda@pur-life.de" className={styles.contactDetailsText}>
            linda@pur-life.de
          </a>
        </div>
        <div className={styles.contactDetailsBlock}>
          <div className={styles.iconWrapper}>
            <EmailIcon color="inherit" fontSize="inherit" />
          </div>
          <a href="mailto:larissa@pur-life.de" className={styles.contactDetailsText}>
            larissa@pur-life.de
          </a>
        </div>
      </div>
      <WhiteButton href={`${baseDomain}/contactform`}>Frag uns</WhiteButton>
    </div>
  </div>
);

MealsInfoBanner.propTypes = {
  baseDomain: PropTypes.string.isRequired,
};

export default MealsInfoBanner;
