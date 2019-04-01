import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Sidebar from './Sidebar';
import { setSidebarExpansionState } from '../../actions/layout';
import { shouldSidebarItemExpand } from '../../helpers';

class SidebarContainer extends Component {
  constructor(props) {
    super(props);

    const { props: { currentPath } } = this;

    this.state = {
      isProfileNavExpanded: shouldSidebarItemExpand('profile', currentPath),
    };

    this.toggleProfileNavExpansion = this.toggleProfileNavExpansion.bind(this);
  }

  toggleProfileNavExpansion() {
    this.setState(prevState => ({
      isProfileNavExpanded: !prevState.isProfileNavExpanded,
    }));
  }

  render() {
    const {
      props: {
        baseDomain,
        currentPath,
        isSidebarExpanded,
        isSidebarExpandedPersistently,
        changeSidebarExpansionState,
        commonData,
      },
      state: {
        isProfileNavExpanded,
      },
    } = this;

    return (
      <Sidebar
        toggleProfileNavExpansion={this.toggleProfileNavExpansion}
        setSidebarExpansionState={changeSidebarExpansionState}
        isProfileNavExpanded={isProfileNavExpanded}
        baseDomain={baseDomain}
        currentPath={currentPath}
        isSidebarExpanded={isSidebarExpanded}
        isSidebarExpandedPersistently={isSidebarExpandedPersistently}
        commonData={commonData}
      />
    );
  }
}

SidebarContainer.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  currentPath: PropTypes.string.isRequired,
  isSidebarExpanded: PropTypes.bool.isRequired,
  isSidebarExpandedPersistently: PropTypes.bool,
  changeSidebarExpansionState: PropTypes.func.isRequired,
  commonData: PropTypes.shape({
    unreadNotifications: PropTypes.number,
    unreadMessages: PropTypes.number,
    friendshipRequests: PropTypes.number,
  }).isRequired,
};

SidebarContainer.defaultProps = {
  isSidebarExpandedPersistently: null,
};

const mapStateToProps = ({
  layout: { isSidebarExpanded, isSidebarExpandedPersistently },
  user: { commonData },
}) => ({
  isSidebarExpanded,
  isSidebarExpandedPersistently,
  commonData,
});

const mapDispatchToProps = dispatch => ({
  changeSidebarExpansionState: state => dispatch(setSidebarExpansionState(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
