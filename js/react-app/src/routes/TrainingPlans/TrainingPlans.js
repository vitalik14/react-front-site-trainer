import React from 'react';
import { PropTypes } from 'prop-types';

import Banner from '../../common/components/UpgradeBanner/UpgradeBannerContainer';
import Filters from './Filters/TrainingPlansFiltersContainer';
import Grid from './Grid/TrainingPlansGridContainer';
import styles from './TrainingPlans.scss';

const TrainingPlans = ({
  baseDomain,
}) => (
  <>
    <div className={styles.bannerWrapper}>
      <Banner baseDomain={baseDomain} />
    </div>
    <div className={styles.flexWrapper}>
      <div className={styles.gridWrapper}>
        <Grid baseDomain={baseDomain} />
      </div>
      <div className={styles.filtersWrapper}>
        <Filters />
      </div>
    </div>
  </>
);

TrainingPlans.propTypes = {
  baseDomain: PropTypes.string.isRequired,
};

export default TrainingPlans;
