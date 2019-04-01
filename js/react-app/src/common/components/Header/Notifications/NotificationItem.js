import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MemoryIcon from '@material-ui/icons/Memory';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TimeAgo from 'react-timeago';
import germanStrings from 'react-timeago/lib/language-strings/de';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import {
  StyledMenuItem,
} from '../customizedMaterialComponents';
import notification from '../notificationModel';
import styles from './NotificationItem.scss';

const formatter = buildFormatter(germanStrings);

const iconProps = {
  fontSize: 'inherit',
  color: 'inherit',
};

const notificationsIconsMapping = {
  thumb_up: () => <ThumbUpIcon {...iconProps} />,
  mail_outline: () => <MailOutlineIcon {...iconProps} />,
  comment: () => <CommentIcon {...iconProps} />,
  memory: () => <MemoryIcon {...iconProps} />,
  lock_open: () => <LockOpenIcon {...iconProps} />,
  person: () => <PersonIcon {...iconProps} />,
  person_add: () => <PersonAddIcon {...iconProps} />,
  'person.add': () => <PersonAddIcon {...iconProps} />,
};

export default class NotificationItem extends Component {
  constructor(props) {
    super(props);
    this.handleNotificationItemClick = this.handleNotificationItemClick.bind(this);
  }

  handleNotificationItemClick() {
    const {
      props: {
        areAllNotificationsMarkedAsRead,
        notificationItem: { id, url, read },
        onNotificationItemClick,
      },
    } = this;
    if (!read && !areAllNotificationsMarkedAsRead) {
      onNotificationItemClick(id, url);
    } else {
      window.location.href = url;
    }
  }

  render() {
    const { props: { notificationItem, areAllNotificationsMarkedAsRead } } = this;
    return (
      <StyledMenuItem
        unread={notificationItem.read || areAllNotificationsMarkedAsRead ? null : 'true'}
        onClick={this.handleNotificationItemClick}
      >
        <div className={styles.iconCont}>
          {
            notificationsIconsMapping[notificationItem.icon]
              ? notificationsIconsMapping[notificationItem.icon]()
              : <NotificationsIcon {...iconProps} />
          }
        </div>
        <div>
          <h3 className={styles.title}>{notificationItem.title}</h3>
          <p className={styles.description}>{notificationItem.description}</p>
          <TimeAgo
            className={styles.time}
            date={notificationItem.createdAt}
            formatter={formatter}
          />
        </div>
      </StyledMenuItem>
    );
  }
}

NotificationItem.propTypes = ({
  notificationItem: PropTypes.shape(notification).isRequired,
  onNotificationItemClick: PropTypes.func.isRequired,
  areAllNotificationsMarkedAsRead: PropTypes.bool.isRequired,
});
