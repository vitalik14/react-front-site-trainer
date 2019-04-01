import React from 'react';
import { PropTypes } from 'prop-types';

import { WhiteButton } from '../../customizedMaterialComponents';
import styles from './UpgradeBanner.scss';

const renderUpgradeToPremiumBanner = baseDomain => (
  <div className={styles.freeUserCont}>
    <p className={styles.freeUserSecondaryText}>
      Du bist aktuell Gratisnutzer, werde für 9,99 mntl. zum
    </p>
    <div className={styles.freeUserBottomCont}>
      <h3 className={styles.freeUserPrimaryText}>
        Premium User um so viele Kurse zu machen wie du willst!
      </h3>
      <div className={styles.freeUserButtonCont}>
        <WhiteButton color="inherit" href={`${baseDomain}/preise-leistungen`}>
          Upgrade
        </WhiteButton>
      </div>
    </div>
  </div>
);

const renderUpgradeToGoldBanner = baseDomain => (
  <div className={styles.premiumUserCont}>
    <div className={styles.premiumUserLeftCont}>
      <div>
        <h3 className={styles.premiumUserPrimaryText}>
          Jetzt Goldmitglied werden
        </h3>
        <p className={styles.premiumUserCountDown}>
          1 tag : 14 stunden : 43 minuten
        </p>
      </div>
      <div>
        <h2 className={styles.premiumUserDiscount}>-30%</h2>
      </div>
    </div>
    <div>
      <WhiteButton color="inherit" href={`${baseDomain}/preise-leistungen`}>
        Upgrade
      </WhiteButton>
    </div>
  </div>
);

const UpgradeBanner = ({ baseDomain, loading, currentUserPlan }) => {
  if (!currentUserPlan || loading ) return null;
  // return currentUserPlan === 'free'
  //   ? renderUpgradeToPremiumBanner(baseDomain)
  //   : renderUpgradeToGoldBanner(baseDomain);

  switch (currentUserPlan) {
    case 'gold': return null;
    case 'premium': return null;
    case 'free': return renderUpgradeToPremiumBanner(baseDomain);
    default: return null;
  }

};

UpgradeBanner.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  currentUserPlan: PropTypes.string,
};

UpgradeBanner.defaultProps = {
  currentUserPlan: null,
};

export default UpgradeBanner;
