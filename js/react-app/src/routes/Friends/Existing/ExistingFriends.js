import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Dialog from '@material-ui/core/Dialog/Dialog';

import componentStyles from './ExistingFriends.scss';
import routeStyles from '../Friends.scss';
import user from '../../../common/models/user';
import LayoutLoader from '../../../common/components/Loaders/Layout/LayoutLoader';
import ButtonLoader from '../../../common/components/Loaders/Button/ButtonLoader';
import { formatDateShort } from '../../../common/helpers';
import { PrimaryButton, TextBlueButton, TextLightGreyButton } from '../../../common/customizedMaterialComponents';

export default class ExistingFriends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friendToRemoveId: null,
      isDeleteConfirmDialogOpen: false,
    };

    this.handleDeleteConfirmDialogOpen = this.handleDeleteConfirmDialogOpen.bind(this);
    this.handleDeleteConfirmDialogClose = this.handleDeleteConfirmDialogClose.bind(this);
    this.handleRemoval = this.handleRemoval.bind(this);
  }

  handleDeleteConfirmDialogOpen(friendToRemoveId) {
    this.setState({ friendToRemoveId, isDeleteConfirmDialogOpen: true });
  }

  handleDeleteConfirmDialogClose() {
    this.setState({ friendToRemoveId: null, isDeleteConfirmDialogOpen: false });
  }

  handleRemoval() {
    const { state: { friendToRemoveId }, props: { remove } } = this;
    remove(friendToRemoveId);
    this.setState({ friendToRemoveId: null, isDeleteConfirmDialogOpen: false });
  }

  render() {
    const {
      state: { friendToRemoveId, isDeleteConfirmDialogOpen },
      props: {
        baseDomain,
        isFetching,
        hasFetchedAtLeastOnce,
        items,
        itemsCount,
        itemsCountPerPage,
        itemsCurrentPage,
        canPaginateItems,
        itemIdBeingRemoved,
        loadMoreItems,
      },
    } = this;

    if (isFetching && !hasFetchedAtLeastOnce) return <LayoutLoader />;

    if (!hasFetchedAtLeastOnce) return null;

    if (hasFetchedAtLeastOnce && !itemsCount) return <p className="placeholder">Noch keine Freunde ¯\_(ツ)_/¯</p>;

    return (
      <>
        <h2 className={routeStyles.title}>
          Freunde&nbsp;
          <span className={componentStyles.count}>{itemsCount || ''}</span>
        </h2>
        <div className={routeStyles.itemsWrapper}>
          {items.map(({
            friendsSince,
            user: {
              id,
              name,
              type,
              profilePicUrl,
            },
          }) => (
            <div key={id} className={routeStyles.item}>
              <div className={routeStyles.itemTopWrapper}>
                <a href={`${baseDomain}/fitbook/profile/${id}`} className={routeStyles.avatarLink}>
                  <img src={profilePicUrl} alt={`Pic von ${name}`} className={routeStyles.avatar} />
                </a>
                <div>
                  <a href={`${baseDomain}/fitbook/profile/${id}`} className={routeStyles.friendNameLink}>
                    <h4 className={routeStyles.friendName}>
                      {name}
                      {type === 'trainer' && <span className="userTypeBadge">TRAINER</span>}
                      {type === 'team' && <span className="userTypeBadge">TEAM</span>}
                    </h4>
                  </a>
                  <p className={routeStyles.friendsSince}>
                    {`seit ${formatDateShort(new Date(friendsSince))}`}
                  </p>
                </div>
              </div>
              <TextLightGreyButton onClick={() => this.handleDeleteConfirmDialogOpen(id)}>
                Entfreunden
              </TextLightGreyButton>
              <Dialog
                fullScreen={window.innerWidth < 768}
                open={
                  (isDeleteConfirmDialogOpen && id === friendToRemoveId)
                  || itemIdBeingRemoved === id
                }
                onClose={this.handleDeleteConfirmDialogClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">Freund entfernen</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Möchtest du&nbsp;
                    {name}
                    &nbsp;wirklich von deinen Freunden entfernen?
                    Diese Aktion kann nicht rückgängig gemacht werden.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <TextBlueButton
                    color="primary"
                    disabled={itemIdBeingRemoved === id}
                    onClick={this.handleDeleteConfirmDialogClose}
                    autoFocus
                  >
                    ABSÄGEN
                  </TextBlueButton>
                  <PrimaryButton
                    color="primary"
                    disabled={itemIdBeingRemoved === id}
                    onClick={this.handleRemoval}
                  >
                    LÖSCHEN
                    {itemIdBeingRemoved === id && <ButtonLoader color="white" />}
                  </PrimaryButton>
                </DialogActions>
              </Dialog>
            </div>
          ))}
        </div>
        {isFetching && <LayoutLoader />}
        {canPaginateItems && (
          <div className="paginationWrapper">
            <div>
              <p className="paginationCount">
                Zeige&nbsp;
                {Math.min(itemsCount, itemsCountPerPage * itemsCurrentPage)}
                &nbsp;Freunde von&nbsp;
                {itemsCount}
              </p>
              <TextBlueButton
                variant="outlined"
                onClick={() => loadMoreItems(itemsCurrentPage + 1)}
                disabled={!canPaginateItems || isFetching}
              >
                Laden Sie mehr Daten
              </TextBlueButton>
            </div>
          </div>
        )}
      </>
    );
  }
}

ExistingFriends.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasFetchedAtLeastOnce: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string,
      friendsSince: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      user,
    }),
  ).isRequired,
  itemsCount: PropTypes.number.isRequired,
  itemsCountPerPage: PropTypes.number.isRequired,
  itemsCurrentPage: PropTypes.number.isRequired,
  canPaginateItems: PropTypes.bool.isRequired,
  loadMoreItems: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  itemIdBeingRemoved: PropTypes.number,
};

ExistingFriends.defaultProps = {
  itemIdBeingRemoved: null,
};
