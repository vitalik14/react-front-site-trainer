import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Switch from '@material-ui/core/Switch';
import NotificationsLoader from '../../Loaders/Layout/LayoutLoader';
import SwitchLoader from '../../Loaders/Button/ButtonLoader';

import {
  WhiteNotificationsIcon,
  NotificationsBadge,
  StyledMenuList,
  StyledPaper,
  StyledFormControlLabel,
} from '../customizedMaterialComponents';
import styles from './NotificationItem.scss';
import NotificationItem from './NotificationItem';
import notification from '../notificationModel';

export default class Notifications extends Component {
  constructor(props) {
    super(props);

    this.handleNotificationsScroll = this.handleNotificationsScroll.bind(this);
  }

  handleNotificationsScroll({ target: { scrollTop, scrollHeight, clientHeight } }) {
    const { props: { isFetchingNotifications, canPaginateNotifications } } = this;
    const shouldFetch = !isFetchingNotifications && canPaginateNotifications;
    if (shouldFetch && (scrollTop >= scrollHeight - clientHeight - 86)) {
      const { props: { getNotifications, notificationsCurrentPage } } = this;
      getNotifications(notificationsCurrentPage + 1);
    }
  }

  render() {
    const {
      props: {
        isFetchingNotifications,
        notifications,
        notificationsCount,
        isNotificationsPopoverShown,
        handleNotificationsPopoverClose,
        handleNotificationsBtnClick,
        onNotificationItemClick,
        onReadAllNotificationsClick,
        isMarkingAllNotificationsAsRead,
        commonData,
      },
    } = this;
    return (
      <ClickAwayListener onClickAway={handleNotificationsPopoverClose}>
        <div>
          <IconButton id="notifications-btn" onClick={handleNotificationsBtnClick}>
            {commonData && !!commonData.unreadNotifications && (
              <NotificationsBadge badgeContent={commonData.unreadNotifications || null}>
                <WhiteNotificationsIcon />
              </NotificationsBadge>
            )}
            {commonData && !commonData.unreadNotifications && (
              <WhiteNotificationsIcon />
            )}
          </IconButton>
          <Fade in={isNotificationsPopoverShown} timeout={200}>
            <StyledPaper onScroll={this.handleNotificationsScroll} style={{ visibility: isNotificationsPopoverShown ? 'visible' : 'hidden' }}>
              <div className={styles.switcherCont}>
                <Tooltip
                  title={
                    commonData.unreadNotifications
                      ? ''
                      : 'Herzlichen Glückwunsch, Sie sind auf dem neuesten Stand!'
                  }
                >
                  <StyledFormControlLabel
                    control={(
                      <Switch
                        checked={!!commonData.unreadNotifications}
                        disabled={!commonData.unreadNotifications}
                        onChange={onReadAllNotificationsClick}
                        color="primary"
                      />
                    )}
                    label="Alles als gelesen markieren"
                  />
                </Tooltip>
                {isMarkingAllNotificationsAsRead && <SwitchLoader color="#304FFE" />}
              </div>
              <StyledMenuList>
                {
                  notificationsCount
                    ? Object.values(notifications).map(notificationItem => (
                      <NotificationItem
                        key={notificationItem.id}
                        notificationItem={notificationItem}
                        onNotificationItemClick={onNotificationItemClick}
                        areAllNotificationsMarkedAsRead={!commonData.unreadNotifications}
                      />
                    ))
                    : !isFetchingNotifications && (
                      <h3 style={{ margin: '20px', color: '#4d4d4e', fontSize: 16 }}>
                        You have no notifications yet
                      </h3>
                    )
                }
              </StyledMenuList>
              {isFetchingNotifications ? <NotificationsLoader /> : null}
            </StyledPaper>
          </Fade>
        </div>
      </ClickAwayListener>
    );
  }
}

Notifications.propTypes = {
  commonData: PropTypes.shape({
    unreadNotifications: PropTypes.number,
    unreadMessages: PropTypes.number,
    friendshipRequests: PropTypes.number,
  }).isRequired,
  isFetchingNotifications: PropTypes.bool.isRequired,
  notifications: PropTypes.objectOf(PropTypes.shape(notification)).isRequired,
  notificationsCount: PropTypes.number.isRequired,
  notificationsCurrentPage: PropTypes.number.isRequired,
  canPaginateNotifications: PropTypes.bool.isRequired,
  isNotificationsPopoverShown: PropTypes.bool.isRequired,
  handleNotificationsPopoverClose: PropTypes.func.isRequired,
  handleNotificationsBtnClick: PropTypes.func.isRequired,
  onNotificationItemClick: PropTypes.func.isRequired,
  onReadAllNotificationsClick: PropTypes.func.isRequired,
  getNotifications: PropTypes.func.isRequired,
  isMarkingAllNotificationsAsRead: PropTypes.bool.isRequired,
};
