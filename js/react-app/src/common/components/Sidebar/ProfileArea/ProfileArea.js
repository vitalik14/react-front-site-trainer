import React from 'react';
import { PropTypes } from 'prop-types';

import { ProfileButton } from '../customizedMaterialComponents';
import styles from './ProfileArea.scss';

const ProfileArea = ({ handleProfileNavExpansionToggle, currentUser, isFetchingCurrentUser }) => {
  const profilePicEl = isFetchingCurrentUser
    ? (
      <svg width="64" height="64" viewBox="0 0 140 140" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <circle id="path-1" cx="70" cy="70" r="70" />
        </defs>
        <g id="Assets" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Artboard-Copy" transform="translate(-38.000000, -442.000000)">
            <g id="Group-2" transform="translate(38.000000, 442.000000)">
              <mask id="mask-2" fill="white">
                <use xlinkHref="#path-1" />
              </mask>
              <use id="Mask" fill="#CFD8DC" xlinkHref="#path-1" />
              <path d="M92.96875,60.15625 C92.96875,72.865625 82.709375,83.125 70,83.125 C57.290625,83.125 47.03125,72.865625 47.03125,60.15625 C47.03125,47.446875 57.290625,37.1875 70,37.1875 C82.709375,37.1875 92.96875,47.446875 92.96875,60.15625 Z M70,97.671875 C85.3125,97.671875 115.9375,106.09375 115.9375,121.40625 L115.9375,142.1875 L24.0625,142.1875 L24.0625,121.40625 C24.0625,106.09375 54.6875,97.671875 70,97.671875 Z" id="Combined-Shape" fill="#FFFFFF" mask="url(#mask-2)" />
            </g>
          </g>
        </g>
      </svg>
    )
    : <img className={styles.profileImg} src={currentUser.profilePicUrl} alt="Your pic" />;
  return (
    <section className={styles.profileArea}>
      { profilePicEl }
      <div className={styles.bottomCont}>
        <span className={styles.profileName}>
          {isFetchingCurrentUser ? 'John Doe' : currentUser.name}
        </span>
        <ProfileButton variant="outlined" onClick={handleProfileNavExpansionToggle}>
          PROFIL
        </ProfileButton>
      </div>
    </section>
  );
};

ProfileArea.propTypes = {
  handleProfileNavExpansionToggle: PropTypes.func.isRequired,
  isFetchingCurrentUser: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    gender: PropTypes.number,
    profilePicUrl: PropTypes.string,
    privilege: PropTypes.string,
    enabled: PropTypes.number,
    street: PropTypes.bool,
    zip: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    birthday: PropTypes.string,
    videoSecondsLeft: PropTypes.number,
    contract: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      price: PropTypes.string,
      cancelled: PropTypes.bool,
      isPrepaid: PropTypes.number,
      paymentMethod: PropTypes.bool,
      credit: PropTypes.string,
    }),
    appSettings: PropTypes.bool,
  }).isRequired,
};

export default ProfileArea;
