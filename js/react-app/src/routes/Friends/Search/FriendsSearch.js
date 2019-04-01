import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import { PrimaryButton, TextBlueButton, TextLightGreyButton } from '../../../common/customizedMaterialComponents';
import { RejectButton, AcceptButton } from '../Requests/FriendRequests';
import Loader from '../../../common/components/Loaders/Button/ButtonLoader';
import routeStyles from '../Friends.scss';
import componentStyles from './FriendsSearch.scss';
import user from '../../../common/models/user';

const SearchInput = withStyles({
  root: {
    flexDirection: 'column-reverse',
    alignItems: 'flex-start',
    flexBasis: '90%',
    marginLeft: 0,
    marginRight: 20,
  },
  label: {
    marginBottom: 6,
    color: '#4D4D4E',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '20px',
  },
})(FormControlLabel);

const ValidationErrorTooltip = withStyles({
  tooltip: {
    backgroundColor: '#ff0000',
  },
})(Tooltip);

export default class FriendsSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      validationErrorMessage: '',
      friendToRemoveId: null,
      isDeleteConfirmDialogOpen: false,
    };

    this.updateTerm = this.updateTerm.bind(this);
    this.tryToSubmitWithKey = this.tryToSubmitWithKey.bind(this);
    this.search = this.search.bind(this);
    this.handleDeleteConfirmDialogOpen = this.handleDeleteConfirmDialogOpen.bind(this);
    this.handleDeleteConfirmDialogClose = this.handleDeleteConfirmDialogClose.bind(this);
    this.handleRemoval = this.handleRemoval.bind(this);
  }

  updateTerm({ target: { value } }) {
    this.setState({ term: value });
  }

  tryToSubmitWithKey({ key }) {
    if (key === 'Enter') {
      this.search();
    }
  }

  search() {
    const { state: { term } } = this;
    if (term.trim().length < 5) {
      this.setState({ validationErrorMessage: 'Mindestens 5 Symbole erforderlich' });
    } else if (!term.includes('@') && term.trim().split(' ').length !== 2) {
      this.setState({ validationErrorMessage: 'Es ist entweder eine gültige E-Mail-Adresse oder der Vor- und Nachname erforderlich' });
    } else {
      this.setState({ validationErrorMessage: '' });
      const { props: { loadSearchResults } } = this;
      loadSearchResults(term);
    }
  }

  handleDeleteConfirmDialogOpen(friendToRemoveId) {
    this.setState({ friendToRemoveId, isDeleteConfirmDialogOpen: true });
  }

  handleDeleteConfirmDialogClose() {
    this.setState({ friendToRemoveId: null, isDeleteConfirmDialogOpen: false });
  }

  handleRemoval() {
    const { state: { friendToRemoveId }, props: { removeFriend } } = this;
    removeFriend(friendToRemoveId);
    this.setState({ friendToRemoveId: null, isDeleteConfirmDialogOpen: false });
  }

  render() {
    const {
      state: {
        term,
        validationErrorMessage,
        isDeleteConfirmDialogOpen,
        friendToRemoveId,
      },
      props: {
        baseDomain,
        isFetchingFriendsSearchResults,
        friendsSearchResults,
        sendFriendRequest,
        removeFriend,
        friendBeingAddedId,
        friendIdBeingRemoved,
        acceptFriendRequest,
        rejectFriendRequest,
        friendIdBeingAccepted,
        friendIdBeingRejected,
        friendIdRequestBeingCancelled,
      },
    } = this;
    return (
      <>
        <h2 className={routeStyles.title}>Neue Freunde finden</h2>
        <div className={componentStyles.block}>
          <SearchInput
            label="Nach Name oder E-Mail Adresse suchen"
            control={(
              <TextField
                fullWidth
                placeholder="Suchbegriff"
                value={term}
                onChange={this.updateTerm}
                onKeyUp={this.tryToSubmitWithKey}
                onBlur={() => this.setState({ validationErrorMessage: '' })}
              />
            )}
          />
          <ValidationErrorTooltip title={validationErrorMessage} open={!!validationErrorMessage}>
            <PrimaryButton onClick={this.search}>
              SUCHEN
              {isFetchingFriendsSearchResults && <Loader color="white" />}
            </PrimaryButton>
          </ValidationErrorTooltip>
        </div>
        {friendsSearchResults && !!friendsSearchResults.length && (
          <div className={routeStyles.itemsWrapper}>
            {friendsSearchResults.map(({
              id,
              name,
              type,
              profilePicUrl,
              friendship,
            }) => (
              <div key={id} className={routeStyles.item}>
                <div className={routeStyles.itemTopWrapper}>
                  <a href={`${baseDomain}/fitbook/profile/${id}`} className={routeStyles.avatarLink}>
                    <img src={profilePicUrl} alt={`Pic von ${name}`} className={routeStyles.avatar} />
                  </a>
                  <a href={`${baseDomain}/fitbook/profile/${id}`} className={routeStyles.friendNameLink}>
                    <h4 className={routeStyles.friendName}>
                      {name}
                      {type === 'trainer' && <span className="userTypeBadge">TRAINER</span>}
                      {type === 'team' && <span className="userTypeBadge">TEAM</span>}
                    </h4>
                  </a>
                </div>
                {friendship === false && (
                  <TextLightGreyButton onClick={() => sendFriendRequest(id)}>
                    Freundschaft angefragt
                    {friendBeingAddedId === id && <Loader color="#9E9E9E" />}
                  </TextLightGreyButton>
                )}
                {friendship === true && (
                  <TextLightGreyButton
                    onClick={() => this.handleDeleteConfirmDialogOpen(id)}
                  >
                    Entfreunden
                    {friendIdBeingRemoved === id && <Loader color="#9E9E9E" />}
                  </TextLightGreyButton>
                )}
                {friendship === 'requested' && (
                  <TextLightGreyButton onClick={() => removeFriend(id, true)}>
                    Freundschaftsanfrage abbrechen
                    {friendIdRequestBeingCancelled === id && <Loader color="#9E9E9E" />}
                  </TextLightGreyButton>
                )}
                {friendship === 'got_request' && (
                  <div className={componentStyles.buttonsWrapper}>
                    <RejectButton
                      onClick={() => rejectFriendRequest(id)}
                      disabled={!!friendIdBeingAccepted}
                    >
                      Ablehnen
                      {id === friendIdBeingRejected && <Loader color="#4D4D4E" />}
                    </RejectButton>
                    <AcceptButton
                      onClick={() => acceptFriendRequest(id)}
                      disabled={!!friendIdBeingRejected}
                    >
                      Akzeptiren
                      {id === friendIdBeingAccepted && <Loader color="#EC407A" />}
                    </AcceptButton>
                  </div>
                )}
                <Dialog
                  fullScreen={window.innerWidth < 768}
                  open={
                    (isDeleteConfirmDialogOpen && id === friendToRemoveId)
                    || friendIdBeingRemoved === id
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
                      disabled={friendIdBeingRemoved === id}
                      onClick={this.handleDeleteConfirmDialogClose}
                      autoFocus
                    >
                      ABSÄGEN
                    </TextBlueButton>
                    <PrimaryButton
                      color="primary"
                      disabled={friendIdBeingRemoved === id}
                      onClick={this.handleRemoval}
                    >
                      LÖSCHEN
                      {friendIdBeingRemoved === id && <Loader color="white" />}
                    </PrimaryButton>
                  </DialogActions>
                </Dialog>
              </div>
            ))}
          </div>
        )}
        {
          !isFetchingFriendsSearchResults
          && friendsSearchResults
          && !friendsSearchResults.length
          && (
            <p className="placeholder">Es wurden keine Benutzer gefunden, die Ihrer Suchanfrage entsprechen ¯\_(ツ)_/¯</p>
          )
        }
      </>
    );
  }
}

FriendsSearch.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetchingFriendsSearchResults: PropTypes.bool.isRequired,
  friendsSearchResults: PropTypes.arrayOf(user),
  loadSearchResults: PropTypes.func.isRequired,
  sendFriendRequest: PropTypes.func.isRequired,
  removeFriend: PropTypes.func.isRequired,
  friendBeingAddedId: PropTypes.number,
  acceptFriendRequest: PropTypes.func.isRequired,
  rejectFriendRequest: PropTypes.func.isRequired,
  friendIdBeingRemoved: PropTypes.number,
  friendIdRequestBeingCancelled: PropTypes.number,
  friendIdBeingAccepted: PropTypes.number,
  friendIdBeingRejected: PropTypes.number,
};

FriendsSearch.defaultProps = {
  friendsSearchResults: null,
  friendBeingAddedId: null,
  friendIdBeingRemoved: null,
  friendIdBeingAccepted: null,
  friendIdBeingRejected: null,
  friendIdRequestBeingCancelled: null,
};
