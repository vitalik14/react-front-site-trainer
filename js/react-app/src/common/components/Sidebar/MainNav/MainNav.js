import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import HomeIcon from '@material-ui/icons/Home';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import AssignmentIcon from '@material-ui/icons/Assignment';
import KitchenIcon from '@material-ui/icons/Kitchen';
import MoodIcon from '@material-ui/icons/Mood';
import QueueIcon from '@material-ui/icons/Queue';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import {
  MainMenuList,
  MainMenuItem,
  MainNavNestedListItemText,
  MainNavListItem,
  MainNavButtonBase,
  MainNavListItemArrIcon,
  ArrowDropUpIconPink,
} from '../customizedMaterialComponents';
import styles from './MainNav.scss';

export default class MainNav extends Component {
  constructor(props) {
    super(props);
    this.handleExpandableItemClick = this.handleExpandableItemClick.bind(this);
  }

  handleExpandableItemClick(name) {
    const { props: { onExpandableItemClick } } = this;
    onExpandableItemClick(name);
  }

  render() {
    const { props: { baseDomain, expandedStatesMapping, commonData } } = this;
    return (
      <section className={styles.section}>
        <nav>
          <MainMenuList>
            <li className={styles.expandableMenuItem}>
              <MainMenuItem component="div">
                <MainNavListItem component="a" href={`${baseDomain}/you`}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Home" />
                </MainNavListItem>
              </MainMenuItem>
              <MainNavButtonBase onClick={() => this.handleExpandableItemClick('home')}>
                <MainNavListItemArrIcon>
                  {expandedStatesMapping.home ? <ArrowDropUpIconPink /> : <ArrowDropDownIcon />}
                </MainNavListItemArrIcon>
              </MainNavButtonBase>
            </li>
            <Collapse component={MainMenuList} in={expandedStatesMapping.home} timeout="auto" unmountOnExit>
              <MainMenuItem>
                <MainNavListItem component="a" href={`${baseDomain}/you/stats`}>
                  <MainNavNestedListItemText inset disableTypography primary="Statistik" />
                </MainNavListItem>
              </MainMenuItem>
              <MainMenuItem>
                <MainNavListItem component="a" href={`${baseDomain}/you/achievements`}>
                  <MainNavNestedListItemText inset disableTypography primary="Erfolge" />
                </MainNavListItem>
              </MainMenuItem>
              <MainMenuItem>
                <MainNavListItem component="a" href={`${baseDomain}/you/favorites`}>
                  <MainNavNestedListItemText inset disableTypography primary="Favoriten" />
                </MainNavListItem>
              </MainMenuItem>
            </Collapse>
            <li className={styles.expandableMenuItem}>
              <MainMenuItem component="div">
                <MainNavListItem component="a" href={`${baseDomain}/kurse`}>
                  <ListItemIcon>
                    <FitnessCenterIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Training" />
                </MainNavListItem>
              </MainMenuItem>
              <MainNavButtonBase onClick={() => this.handleExpandableItemClick('training')}>
                <MainNavListItemArrIcon>
                  {expandedStatesMapping.training ? <ArrowDropUpIconPink /> : <ArrowDropDownIcon />}
                </MainNavListItemArrIcon>
              </MainNavButtonBase>
            </li>
            <Collapse component={MainMenuList} in={expandedStatesMapping.training} timeout="auto" unmountOnExit>
              <MainMenuItem>
                <MainNavListItem component="a" href={`${baseDomain}/kurse/wochenplan`}>
                  <MainNavNestedListItemText inset disableTypography primary="Wochenplan" />
                </MainNavListItem>
              </MainMenuItem>
              <MainMenuItem>
                <MainNavListItem component="a" href={`${baseDomain}/kurse/trainingplans`}>
                  <MainNavNestedListItemText inset disableTypography primary="Trainingspläne" />
                </MainNavListItem>
              </MainMenuItem>
              <MainMenuItem>
                <MainNavListItem component="a" href={`${baseDomain}/kurse/trainer`}>
                  <MainNavNestedListItemText inset disableTypography primary="Trainer" />
                </MainNavListItem>
              </MainMenuItem>
              <MainMenuItem>
                <MainNavListItem component="a" href={`${baseDomain}/videos`}>
                  <MainNavNestedListItemText inset disableTypography primary="Videos" />
                </MainNavListItem>
              </MainMenuItem>
              <MainMenuItem>
                <MainNavListItem component="a" href={`${baseDomain}/videos/downloads`}>
                  <MainNavNestedListItemText inset disableTypography primary="Video Downloads" />
                </MainNavListItem>
              </MainMenuItem>
              <MainMenuItem>
                <MainNavListItem component="a" href={`${baseDomain}/kurse/kurse`}>
                  <MainNavNestedListItemText inset disableTypography primary="Kurs Suchen" />
                </MainNavListItem>
              </MainMenuItem>
            </Collapse>
            <MainMenuItem>
              <MainNavListItem component="a" href={`${baseDomain}/beratung`}>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText inset primary="Beratung" />
              </MainNavListItem>
            </MainMenuItem>
            <MainMenuItem>
              <MainNavListItem component="a" href={`${baseDomain}/news`}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText inset primary="News" />
              </MainNavListItem>
            </MainMenuItem>
            <MainMenuItem>
              <MainNavListItem component="a" href={`${baseDomain}/meals`}>
                <ListItemIcon>
                  <KitchenIcon />
                </ListItemIcon>
                <ListItemText inset primary="Rezepte" />
              </MainNavListItem>
            </MainMenuItem>
            <li className={styles.expandableMenuItem}>
              <MainMenuItem component="div">
                <MainNavListItem component="a" href={`${baseDomain}/fitbook`}>
                  <ListItemIcon>
                    <MoodIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Fitbook" />
                </MainNavListItem>
              </MainMenuItem>
              <MainNavButtonBase onClick={() => this.handleExpandableItemClick('fitbook')}>
                <MainNavListItemArrIcon>
                  {expandedStatesMapping.fitbook ? <ArrowDropUpIconPink /> : <ArrowDropDownIcon />}
                </MainNavListItemArrIcon>
              </MainNavButtonBase>
            </li>
            <Collapse component={MainMenuList} in={expandedStatesMapping.fitbook} timeout="auto" unmountOnExit>
              <MainMenuItem>
                <MainNavListItem component="a" href={`${baseDomain}/fitbook/friends`}>
                  <MainNavNestedListItemText inset disableTypography primary="Freunde" />
                  {commonData && !!commonData.friendshipRequests && (
                    <div className={styles.notificationsBadge}>
                      <span>
                        +&nbsp;
                        {commonData.friendshipRequests}
                      </span>
                    </div>
                  )}
                </MainNavListItem>
              </MainMenuItem>
              <MainMenuItem>
                <MainNavListItem component="a" href={`${baseDomain}/fitbook/messages`}>
                  <MainNavNestedListItemText inset disableTypography primary="Nachrichten" />
                  {commonData && !!commonData.unreadMessages && (
                    <div className={styles.notificationsBadge}>
                      <span>
                        +&nbsp;
                        {commonData.unreadMessages}
                      </span>
                    </div>
                  )}
                </MainNavListItem>
              </MainMenuItem>
              <MainMenuItem>
                <MainNavListItem component="a" href={`${baseDomain}/fitbook/stats`}>
                  <MainNavNestedListItemText inset disableTypography primary="Statistiken" />
                </MainNavListItem>
              </MainMenuItem>
            </Collapse>
            <li className={styles.expandableMenuItem}>
              <MainMenuItem component="div" onClick={() => this.handleExpandableItemClick('more')}>
                <MainNavListItem component="div">
                  <ListItemIcon>
                    <QueueIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Mehr" />
                </MainNavListItem>
                <MainNavButtonBase>
                  <MainNavListItemArrIcon>
                    {expandedStatesMapping.more ? <ArrowDropUpIconPink /> : <ArrowDropDownIcon />}
                  </MainNavListItemArrIcon>
                </MainNavButtonBase>
              </MainMenuItem>
            </li>
            <Collapse component={MainMenuList} in={expandedStatesMapping.more} timeout="auto" unmountOnExit>
              <MainMenuItem>
                <MainNavListItem component="a" href={`${baseDomain}/apps`}>
                  <MainNavNestedListItemText inset disableTypography primary="Apps" />
                </MainNavListItem>
              </MainMenuItem>
              <MainMenuItem>
                <MainNavListItem component="a" href={`${baseDomain}/books`}>
                  <MainNavNestedListItemText inset disableTypography primary="Bücher" />
                </MainNavListItem>
              </MainMenuItem>
              <MainMenuItem>
                <MainNavListItem component="a" href={`${baseDomain}/shop`}>
                  <MainNavNestedListItemText inset disableTypography primary="Shop" />
                </MainNavListItem>
              </MainMenuItem>
              <MainMenuItem>
                <MainNavListItem component="a" href={`${baseDomain}/hilfe`}>
                  <MainNavNestedListItemText inset disableTypography primary="Hilfe" />
                </MainNavListItem>
              </MainMenuItem>
            </Collapse>
          </MainMenuList>
        </nav>
      </section>
    );
  }
}

MainNav.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  expandedStatesMapping: PropTypes.shape({
    home: PropTypes.bool.isRequired,
    training: PropTypes.bool.isRequired,
    fitbook: PropTypes.bool.isRequired,
    more: PropTypes.bool.isRequired,
  }).isRequired,
  onExpandableItemClick: PropTypes.func.isRequired,
  commonData: PropTypes.shape({
    unreadNotifications: PropTypes.number,
    unreadMessages: PropTypes.number,
    friendshipRequests: PropTypes.number,
  }).isRequired,
};
