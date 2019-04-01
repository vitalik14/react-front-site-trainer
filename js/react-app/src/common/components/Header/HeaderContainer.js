import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { getNotifications, readNotification, readAllNotifications } from '../../actions/user';
import { setSidebarExpansionState, setSidebarPersistentExpansionState } from '../../actions/layout';
import Header from './Header';
import notification from './notificationModel';

class HeaderContainer extends Component {
  static handleSearchRequest({ keyCode, target: { value } }, baseDomain) {
    if (keyCode === 13) {
      window.location.href = `${baseDomain}/search?q=${value}`;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isSearchFieldExpanded: false,
      isNotificationsPopoverShown: false,
    };
    this.toggleSearchFieldExpansion = this.toggleSearchFieldExpansion.bind(this);
    this.toggleNotificationsPopoverVisibility = this.toggleNotificationsPopoverVisibility.bind(this); // eslint-disable-line max-len
    this.hideNotificationsPopover = this.hideNotificationsPopover.bind(this);
  }

  toggleSearchFieldExpansion() {
    this.setState(prevState => ({
      isSearchFieldExpanded: !prevState.isSearchFieldExpanded,
    }));
  }

  toggleNotificationsPopoverVisibility() {
    const { props: { hasFetchedNotifications } } = this;
    if (!hasFetchedNotifications) {
      const { props: { loadNotifications, notificationsCurrentPage } } = this;
      loadNotifications(notificationsCurrentPage);
    }
    this.setState(prevState => ({
      isNotificationsPopoverShown: !prevState.isNotificationsPopoverShown,
    }));
  }

  hideNotificationsPopover() {
    this.setState({
      isNotificationsPopoverShown: false,
    });
  }

  render() {
    const {
      state: {
        isSearchFieldExpanded,
        isNotificationsPopoverShown,
      },
      props: {
        baseDomain,
        currentPath,
        commonData,
        isFetchingNotifications,
        notifications,
        notificationsCount,
        unreadNotificationsCount,
        notificationsCurrentPage,
        canPaginateNotifications,
        onNotificationItemClick,
        onReadAllNotificationsClick,
        loadNotifications,
        isSidebarExpanded,
        isSidebarExpandedPersistently,
        toggleSidebarExpansionState,
        toggleSidebarPersistentExpansionState,
        isMarkingAllNotificationsAsRead,
      },
    } = this;

    const { innerWidth: screenWidth } = window;
    const isTabletOrMobile = screenWidth < 1025;
    const sidebarExpansionState = isSidebarExpandedPersistently === null
      ? isSidebarExpanded
      : isSidebarExpandedPersistently;
    const toggleSidebar = isSidebarExpandedPersistently === null
      ? toggleSidebarExpansionState
      : toggleSidebarPersistentExpansionState;

    return (
      <Header
        baseDomain={baseDomain}
        currentPath={currentPath}
        commonData={commonData}
        isSearchFieldExpanded={isSearchFieldExpanded}
        isNotificationsPopoverShown={isNotificationsPopoverShown}
        isFetchingNotifications={isFetchingNotifications}
        notifications={notifications}
        notificationsCount={notificationsCount}
        unreadNotificationsCount={unreadNotificationsCount}
        notificationsCurrentPage={notificationsCurrentPage}
        canPaginateNotifications={canPaginateNotifications}
        onSearchBtnClick={this.toggleSearchFieldExpansion}
        onNotificationsBtnClick={this.toggleNotificationsPopoverVisibility}
        onNotificationsPopoverOutsideClick={this.hideNotificationsPopover}
        onNotificationItemClick={onNotificationItemClick}
        onReadAllNotificationsClick={onReadAllNotificationsClick}
        getNotifications={loadNotifications}
        isMarkingAllNotificationsAsRead={isMarkingAllNotificationsAsRead}
        isSidebarExpanded={sidebarExpansionState}
        toggleSidebarExpansionState={toggleSidebar}
        onSearchRequest={this.constructor.handleSearchRequest}
        isTabletOrMobile={isTabletOrMobile}
      />
    );
  }
}

HeaderContainer.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  currentPath: PropTypes.string.isRequired,
  commonData: PropTypes.shape({
    unreadNotifications: PropTypes.number,
    unreadMessages: PropTypes.number,
    friendshipRequests: PropTypes.number,
  }).isRequired,
  isFetchingNotifications: PropTypes.bool.isRequired,
  hasFetchedNotifications: PropTypes.bool.isRequired,
  notifications: PropTypes.objectOf(PropTypes.shape(notification)).isRequired,
  notificationsCount: PropTypes.number.isRequired,
  unreadNotificationsCount: PropTypes.string.isRequired,
  notificationsCurrentPage: PropTypes.number.isRequired,
  canPaginateNotifications: PropTypes.bool.isRequired,
  onNotificationItemClick: PropTypes.func.isRequired,
  onReadAllNotificationsClick: PropTypes.func.isRequired,
  loadNotifications: PropTypes.func.isRequired,
  isMarkingAllNotificationsAsRead: PropTypes.bool.isRequired,
  isSidebarExpanded: PropTypes.bool.isRequired,
  isSidebarExpandedPersistently: PropTypes.bool,
  toggleSidebarExpansionState: PropTypes.func.isRequired,
  toggleSidebarPersistentExpansionState: PropTypes.func.isRequired,
};

HeaderContainer.defaultProps = {
  isSidebarExpandedPersistently: null,
};

const mapStateToProps = ({
  user: {
    isFetchingNotifications,
    commonData,
    hasFetchedNotifications,
    notifications,
    notificationsCount,
    notificationsCurrentPage,
    canPaginateNotifications,
    isMarkingAllNotificationsAsRead,
    areAllNotificationsMarkedAsRead,
  },
  layout: {
    isSidebarExpanded,
    isSidebarExpandedPersistently,
  },
}) => ({
  isFetchingNotifications,
  commonData,
  hasFetchedNotifications,
  notifications,
  notificationsCount,
  notificationsCurrentPage,
  canPaginateNotifications,
  isMarkingAllNotificationsAsRead,
  areAllNotificationsMarkedAsRead,
  isSidebarExpanded,
  isSidebarExpandedPersistently,
});

const mapDispatchToProps = dispatch => ({
  loadNotifications: page => dispatch(getNotifications(page)),
  onNotificationItemClick: (id, url) => dispatch(readNotification(id, url)),
  onReadAllNotificationsClick: () => dispatch(readAllNotifications()),
  toggleSidebarExpansionState: state => dispatch(setSidebarExpansionState(state)),
  toggleSidebarPersistentExpansionState: state => dispatch(
    setSidebarPersistentExpansionState(state),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
