import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import MainNav from './MainNav';
import { shouldSidebarItemExpand } from '../../../helpers';

export default class MainNavContainer extends Component {
  constructor(props) {
    super(props);

    const { props: { currentPath } } = this;

    this.state = {
      expandedStatesMapping: {
        home: shouldSidebarItemExpand('home', currentPath),
        training: shouldSidebarItemExpand('training', currentPath),
        fitbook: shouldSidebarItemExpand('fitbook', currentPath),
        more: shouldSidebarItemExpand('more', currentPath),
      },
    };

    this.toggleItemExpansion = this.toggleItemExpansion.bind(this);
  }

  toggleItemExpansion(name) {
    this.setState(prevState => ({
      expandedStatesMapping: {
        ...prevState.expandedStatesMapping,
        [name]: !prevState.expandedStatesMapping[name],
      },
    }));
  }

  render() {
    const { baseDomain, commonData } = this.props;
    const { expandedStatesMapping } = this.state;
    return (
      <MainNav
        baseDomain={baseDomain}
        expandedStatesMapping={expandedStatesMapping}
        onExpandableItemClick={this.toggleItemExpansion}
        commonData={commonData}
      />
    );
  }
}

MainNavContainer.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  currentPath: PropTypes.string.isRequired,
  commonData: PropTypes.shape({
    unreadNotifications: PropTypes.number,
    unreadMessages: PropTypes.number,
    friendshipRequests: PropTypes.number,
  }).isRequired,
};
