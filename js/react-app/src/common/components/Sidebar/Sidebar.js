import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Slide from '@material-ui/core/Slide';

import styles from './Sidebar.scss';
import ProfileAreaConnected from './ProfileArea/ProfileAreaContainer';
import ProfileNav from './ProfileNav/ProfileNav';
import MainNavContainer from './MainNav/MainNavContainer';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    const { props: { isSidebarExpanded } } = this;

    this.state = { isSidebarExpanded };

    this.handleWindowResize = this.handleWindowResize.bind(this);

    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillReceiveProps({ isSidebarExpanded }) {
    this.setState({ isSidebarExpanded });
  }

  componentDidUpdate(
    { isSidebarExpanded: storeState },
    { isSidebarExpanded: newState, isSidebarExpandedPersistently },
  ) {
    if (storeState !== newState && !isSidebarExpandedPersistently) {
      const { props: { setSidebarExpansionState } } = this;
      setSidebarExpansionState(newState);
    }
  }

  handleWindowResize({ currentTarget: { innerWidth } }) {
    const { props: { isSidebarExpandedPersistently } } = this;
    if (!isSidebarExpandedPersistently) {
      this.setState({
        isSidebarExpanded: innerWidth > 1024,
      });
    }
  }

  render() {
    const {
      props: {
        toggleProfileNavExpansion,
        isProfileNavExpanded,
        baseDomain,
        currentPath,
        isSidebarExpandedPersistently,
        commonData,
      },
      state: {
        isSidebarExpanded,
      },
    } = this;

    return (
      <div>
        {
          isSidebarExpanded && <div className={styles.dimmedBackground} />
        }
        <Slide
          direction="right"
          in={
            isSidebarExpandedPersistently === null
              ? isSidebarExpanded
              : isSidebarExpandedPersistently
          }
          mountOnEnter
          unmountOnExit
        >
          <div className={styles.cont}>
            <ProfileAreaConnected
              onProfileBtnClick={toggleProfileNavExpansion}
              baseDomain={baseDomain}
            />
            <ProfileNav
              isVisible={isProfileNavExpanded}
              baseDomain={baseDomain}
              currentPath={currentPath}
            />
            <MainNavContainer
              baseDomain={baseDomain}
              currentPath={currentPath}
              commonData={commonData}
            />
          </div>
        </Slide>
      </div>);
  }
}

Sidebar.propTypes = {
  toggleProfileNavExpansion: PropTypes.func.isRequired,
  setSidebarExpansionState: PropTypes.func.isRequired,
  isProfileNavExpanded: PropTypes.bool.isRequired,
  baseDomain: PropTypes.string.isRequired,
  currentPath: PropTypes.string.isRequired,
  isSidebarExpanded: PropTypes.bool.isRequired,
  isSidebarExpandedPersistently: PropTypes.bool,
  commonData: PropTypes.shape({
    unreadNotifications: PropTypes.number,
    unreadMessages: PropTypes.number,
    friendshipRequests: PropTypes.number,
  }).isRequired,
};

Sidebar.defaultProps = {
  isSidebarExpandedPersistently: null,
};
