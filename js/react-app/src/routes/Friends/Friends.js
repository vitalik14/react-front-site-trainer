import React from 'react';
import { PropTypes } from 'prop-types';

import Existing from './Existing/ExistingFriendsContainer';
import Requests from './Requests/FriendRequestsContainer';
import Search from './Search/FriendsSearchContainer';
import styles from './Friends.scss';

const Friends = ({ baseDomain }) => (
  <div className={styles.flexWrapper}>
    <div className={styles.allFriendsWrapper}>
      <Search baseDomain={baseDomain} />
      <Existing baseDomain={baseDomain} />
    </div>
    <div className={styles.friendRequestsWrapper}>
      <Requests baseDomain={baseDomain} />
    </div>
  </div>
);

Friends.propTypes = {
  baseDomain: PropTypes.string.isRequired,
};

export default Friends;
