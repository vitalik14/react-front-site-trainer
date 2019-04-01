import React from 'react';
import { PropTypes } from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SettingsIcon from '@material-ui/icons/Settings';
import TimelineIcon from '@material-ui/icons/Timeline';
import PaymentIcon from '@material-ui/icons/Payment';
import InputIcon from '@material-ui/icons/Input';

import { ProfileMenuList, ProfileListItem } from '../customizedMaterialComponents';
import styles from './ProfileNav.scss';

const ProfileNav = ({ isVisible, baseDomain }) => (
  <Collapse component="section" className={styles.profileNavSection} in={isVisible} timeout="auto" unmountOnExit>
    <nav>
      <ProfileMenuList>
        <MenuItem>
          <ProfileListItem component="a" href={`${baseDomain}/fitbook/profile/me`}>
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText inset primary="Mein Profil" />
          </ProfileListItem>
        </MenuItem>
        <MenuItem>
          <ProfileListItem component="a" href={`${baseDomain}/you/settings`}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText inset primary="Einstellungen" />
          </ProfileListItem>
        </MenuItem>
        <MenuItem>
          <ProfileListItem component="a" href={`${baseDomain}/you/goal`}>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText inset primary="Mein Zeil" />
          </ProfileListItem>
        </MenuItem>
        <MenuItem>
          <ProfileListItem component="a" href={`${baseDomain}/preise-leistungen`}>
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText inset primary="Preise und Leistungen" />
          </ProfileListItem>
        </MenuItem>
        <MenuItem>
          <ProfileListItem component="a" href={`${baseDomain}/logout`}>
            <ListItemIcon>
              <InputIcon />
            </ListItemIcon>
            <ListItemText inset primary="Ausloggen" />
          </ProfileListItem>
        </MenuItem>
      </ProfileMenuList>
    </nav>
  </Collapse>
);

ProfileNav.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  baseDomain: PropTypes.string.isRequired,
};

export default ProfileNav;
