/* eslint-disable */

import React, { Component, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PropTypes } from 'prop-types';
import ContentEditable from 'react-contenteditable';
import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';
import MoodIcon from '@material-ui/icons/Mood';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import EmojiPicker from 'emoji-picker-react';
import { shortnameToImage } from 'emojione';

import styles from './SingleChat.scss';
import LayoutLoader from '../../../common/components/Loaders/Layout/LayoutLoader';
import ButtonLoader from '../../../common/components/Loaders/Button/ButtonLoader';
import { TextPinkButton, TextBlueButton, PrimaryButton } from '../../../common/customizedMaterialComponents';
import { archiveChat, leaveGroupChat } from '../../../common/services/fitbook';
import handleError from '../../../common/errorHandler';
import { getCurrentPath } from '../Chat';

export default class SingleChat extends Component {
  constructor(props) {
    super(props);

    this.messageInput = React.createRef();

    this.state = {
      messageInputValue: '',
      isEmojiPickerVisible: false,
      friendsPopoverAnchorEl: null,
      selectedFriendIds: [],
      isEditingName: false,
      editingNameFieldValue: '',
      isArchiveConfirmDialogOpen: false,
      isLeaveConfirmDialogOpen: false,
      isDeleteConfirmDialogOpen: false,
      isArchiving: false,
      isLeaving: false,
      isDeleting: false,
    };

    this.handleMessageInputChange = this.handleMessageInputChange.bind(this);
    this.handleMessageInputKeyUp = this.handleMessageInputKeyUp.bind(this);
    this.handleMessageInputBlur = this.handleMessageInputBlur.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.toggleEmojiPicker = this.toggleEmojiPicker.bind(this);
    this.handleEmojiSelect = this.handleEmojiSelect.bind(this);
    this.handleFriendsPopoverOpen = this.handleFriendsPopoverOpen.bind(this);
    this.handleFriendsPopoverClose = this.handleFriendsPopoverClose.bind(this);
    this.handleFriendToggle = this.handleFriendToggle.bind(this);
    this.handleEditingNameStart = this.handleEditingNameStart.bind(this);
    this.handleEditingNameCancel = this.handleEditingNameCancel.bind(this);
    this.handleEditingNameSubmit = this.handleEditingNameSubmit.bind(this);
    this.handleEditingNameFieldChange = this.handleEditingNameFieldChange.bind(this);
    this.handleEditingNameFieldKeyUp = this.handleEditingNameFieldKeyUp.bind(this);
    this.handleUsersUpdate = this.handleUsersUpdate.bind(this);
    this.openArchiveConfirmDialog = this.openArchiveConfirmDialog.bind(this);
    this.openLeaveConfirmDialog = this.openLeaveConfirmDialog.bind(this);
    this.openDeleteConfirmDialog = this.openDeleteConfirmDialog.bind(this);
    this.closeArchiveConfirmDialog = this.closeArchiveConfirmDialog.bind(this);
    this.closeLeaveConfirmDialog = this.closeLeaveConfirmDialog.bind(this);
    this.closeDeleteConfirmDialog = this.closeDeleteConfirmDialog.bind(this);
    this.archive = this.archive.bind(this);
    this.leave = this.leave.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidUpdate({ match: { params: { id: prevId } }, isFetchingChatData: wasFetching, data: { messages: prevMessages } }) {
    const { props: { match: { params: { id } }, loadMessages, data: { messages } } } = this;
    if (id && !messages && id !== prevId) {
      loadMessages();
    }
    if ((wasFetching && !prevMessages) || (id && id !== prevId)) {
      if (document.getElementById('messages-outer-wrapper')) {
        document.getElementById('messages-outer-wrapper').scrollTop = document.getElementById('messages-outer-wrapper').scrollHeight
      }
    }
  }

  handleMessageInputChange({ target: { value } }) {
    this.setState({ messageInputValue: shortnameToImage(value) });
  }

  handleMessageInputKeyUp({ ctrlKey, key }) {
    if (ctrlKey && key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleMessageInputBlur() {
    this.setState(({ messageInputValue }) => ({
      messageInputValue: messageInputValue === '<br>' || messageInputValue === '<div><br></div>'
        ? ''
        : shortnameToImage(messageInputValue),
    }));
  }

  handleMessageSubmit() {
    const { props: { addMessage }, state: { messageInputValue } } = this;
    if (messageInputValue) {
      addMessage(messageInputValue);
      this.setState({ messageInputValue: '' });
    }
  }

  handleFriendsPopoverOpen({ currentTarget }) {
    const { props: { data: { users } } } = this;
    this.setState({
      friendsPopoverAnchorEl: currentTarget,
      selectedFriendIds: users.map(({ id }) => id),
    });
  }

  handleFriendsPopoverClose() {
    this.setState({
      friendsPopoverAnchorEl: null,
    });
  }

  handleFriendToggle(id) {
    this.setState(({ selectedFriendIds }) => ({
      selectedFriendIds: selectedFriendIds.indexOf(id) === -1
        ? selectedFriendIds.concat(id)
        : selectedFriendIds.filter(friendId => friendId !== id),
    }));
  }

  handleEditingNameStart() {
    this.setState({ isEditingName: true });
  }

  handleEditingNameCancel() {
    const { props: { data: { name } } } = this;
    this.setState({ isEditingName: false, editingNameFieldValue: name });
  }

  handleEditingNameSubmit() {
    const { props: { updateName, data: { users } }, state: { editingNameFieldValue } } = this;
    const userIds = users.map(({ id }) => id);
    updateName(editingNameFieldValue, userIds);
    this.setState({ isEditingName: false, editingNameFieldValue: '' });
  }

  handleEditingNameFieldChange({ target: { value: editingNameFieldValue } }) {
    this.setState({ editingNameFieldValue });
  }

  handleEditingNameFieldKeyUp({ key }) {
    switch (key) {
      case 'Enter':
        this.handleEditingNameSubmit();
        break;
      case 'Escape':
        this.handleEditingNameCancel();
        break;
      default:
        break;
    }
  }
  
  handleUsersUpdate() {
    const { props: { updateUsers, friends: { items: friends } }, state: { selectedFriendIds } } = this;
    const selectedFriends = friends
      .filter(({ user: { id } }) => selectedFriendIds.indexOf(id) !== -1)
      .map(({ user }) => user);
    updateUsers(selectedFriends);
    this.setState({ friendsPopoverAnchorEl: null });
  }
  
  toggleEmojiPicker() {
    this.setState(({ isEmojiPickerVisible }) => ({
      isEmojiPickerVisible: !isEmojiPickerVisible,
    }));
  }

  handleEmojiSelect({}, { name }) {
    this.setState(({ messageInputValue }) => ({
      isEmojiPickerVisible: false,
      messageInputValue: messageInputValue.concat(shortnameToImage(`:${name}:`)),
    }));
  }

  openArchiveConfirmDialog() {
    this.setState({ isArchiveConfirmDialogOpen: true });
  }

  openLeaveConfirmDialog() {
    this.setState({ isLeaveConfirmDialogOpen: true });
  }

  openDeleteConfirmDialog() {
    this.setState({ isDeleteConfirmDialogOpen: true });
  }

  closeArchiveConfirmDialog() {
    const { state: { isArchiving } } = this;
    if (!isArchiving) {
      this.setState({ isArchiveConfirmDialogOpen: false });
    }
  }

  closeLeaveConfirmDialog() {
    const { state: { isLeaving } } = this;
    if (!isLeaving) {
      this.setState({ isLeaveConfirmDialogOpen: false });
    }
  }

  closeDeleteConfirmDialog() {
    const { state: { isDeleting } } = this;
    if (!isDeleting) {
      this.setState({ isDeleteConfirmDialogOpen: false });
    }
  }

  archive() {
    const { props: { data: { id } } } = this;
    this.setState({ isArchiveConfirmDialogOpen: false, isArchiving: true });
    archiveChat(id)
      .then(() => {
        this.setState({ isArchiving: false });
        debugger;
        window.location.href = getCurrentPath();
      })
      .catch(err => {
        handleError(err);
        this.setState({ isArchiving: false });
        alert('Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut');
      });
  }

  leave() {
    const { props: { data: { id } } } = this;
    this.setState({ isLeaveConfirmDialogOpen: false, isLeaving: true });
    leaveGroupChat(id)
      .then(() => {
        this.setState({ isLeaving: false });
        window.location.href = getCurrentPath();
      })
      .catch(err => {
        handleError(err);
        this.setState({ isLeaving: false });
        alert('Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut');
      });
  }

  delete() {
    const { props: { data: { id } } } = this;
    this.setState({ isDeleteConfirmDialogOpen: false, isDeleting: true });
    leaveGroupChat(id)
      .then(() => {
        this.setState({ isDeleting: false });
        window.location.href = getCurrentPath();
      })
      .catch(err => {
        handleError(err);
        this.setState({ isDeleting: false });
        alert('Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut');
      });
  }

  render() {
    const {
      state: {
        messageInputValue,
        isEmojiPickerVisible,
        friendsPopoverAnchorEl,
        selectedFriendIds,
        isEditingName,
        editingNameFieldValue,
        isArchiveConfirmDialogOpen,
        isLeaveConfirmDialogOpen,
        isDeleteConfirmDialogOpen,
        isArchiving,
        isLeaving,
        isDeleting,
      },
      props: {
        baseDomain,
        data: {
          id,
          name,
          users,
          type,
          isChatOwner,
          messages,
          messagesCount,
          messagesCountPerPage,
          messagesCurrentPage,
          isFetching,
          hasFetchedAtLeastOnce,
        },
        friends: {
          items: friends = [],
        } = {},
        isFetchingChatData,
        isFetchingCurrentUser,
        currentUser,
        addMessage,
        chatIdUpdatingName,
        chatIdUpdatingUsers,
      },
    } = this;

    if (isFetchingChatData && !hasFetchedAtLeastOnce) return <LayoutLoader />;

    if (!hasFetchedAtLeastOnce) return null;

    let lastMessageUser = 'me';

    return (
      <>
        {!isEditingName && chatIdUpdatingName !== id && (
          <div className={styles.topWrapper}>
            <div className={styles.topLeftInnerWrapper}>
              <h2 className={styles.title}>
                {type === 'single' && !isFetchingCurrentUser
                  && (users.find(({ id: userId }) => userId !== currentUser.id) || users[0]).name.split(' ')[0]}
                {type === 'group'
                  && (name || users.reduce(
                    (acc, { name: userName }, idx, arr) => `
                                ${acc}${userName.split(' ')[0]}${idx === arr.length - 1 ? ' und du' : ', '}
                              `,
                    '',
                  ))
                }
              </h2>
              {type === 'group' && isChatOwner && (
                <div className={styles.actionIconWrapper}>
                  <IconButton
                    style={{ width: 36, height: 36, fontSize: 'inherit' }}
                    color="inherit"
                    onClick={this.handleEditingNameStart}
                  >
                    <EditIcon color="inherit" fontSize="inherit" />
                  </IconButton>
                </div>
              )}
            </div>
            {type === 'single' && (
              <TextPinkButton variant="outlined" onClick={this.openArchiveConfirmDialog}>
                Archiv
              </TextPinkButton>
            )}
            {type === 'group' && (
              <>
                {!isChatOwner && (
                  <TextPinkButton variant="outlined" onClick={this.openLeaveConfirmDialog}>
                    Verlassen
                  </TextPinkButton>
                )}
                {isChatOwner && (
                  <TextPinkButton variant="outlined" onClick={this.openDeleteConfirmDialog}>
                    Verlassen
                  </TextPinkButton>
                  )}
              </>
            )}
          </div>
        )}
        {(isEditingName || chatIdUpdatingName === id) && (
          <TextField
            fullWidth
            autoFocus
            defaultValue={name}
            label="Neuer Inhalt"
            disabled={chatIdUpdatingName === id}
            onChange={this.handleEditingNameFieldChange}
            onKeyUp={this.handleEditingNameFieldKeyUp}
            style={{ marginBottom: 20 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <div className={styles.actionSmallIconWrapper}>
                    {chatIdUpdatingName !== id && (
                      <div style={{ display: 'flex' }}>
                        <IconButton
                          style={{
                            width: 24,
                            height: 24,
                            fontSize: 'inherit',
                            marginRight: 5,
                          }}
                          color="inherit"
                          disabled={editingNameFieldValue === name}
                          onClick={this.handleEditingNameSubmit}
                        >
                          <SaveIcon color="inherit" fontSize="inherit" />
                        </IconButton>
                        <IconButton
                          style={{ width: 24, height: 24, fontSize: 'inherit' }}
                          color="inherit"
                          onClick={this.handleEditingNameCancel}
                        >
                          <CancelIcon color="inherit" fontSize="inherit" />
                        </IconButton>
                      </div>
                    )}
                    {chatIdUpdatingName === id && (
                      <CircularProgress color="inherit" size={24} />
                    )}
                  </div>
                </InputAdornment>
              ),
            }}
          />
        )}
        {type === 'group' && !!name && (
          <p className={styles.members}>
            {
              users.reduce(
                (acc, { name: userName }, idx, arr) => `
                                    ${acc}${userName.split(' ')[0]}${idx === arr.length - 1 ? ` ${isChatOwner ? ' und du' : ''}` : ', '}
                                  `,
                '',
              )}
          </p>
        )}
        <div className={styles.block}>
          <div className={styles.messagesOuterWrapper} id="messages-outer-wrapper">
            <div className={styles.messagesWrapper}>
              {hasFetchedAtLeastOnce && !messagesCount && <p className="placeholder">Noch keine Nachrichten</p>}
              {hasFetchedAtLeastOnce && !!messagesCount && messages.map(({
                id,
                content,
                date,
                user: { id: userId, name, profilePicUrl },
              }) => {
                const message = (
                  <Fragment key={id}>
                    {userId === currentUser.id && (
                      <div className={styles.ownMessageWrapper}>
                        <div className={styles.ownMessageInnerWrapper}>
                          <p className={styles.messageContent} dangerouslySetInnerHTML={{ __html: content }} />
                          <p className={styles.messageDate}>{date}</p>
                        </div>
                      </div>
                    )}
                    {userId !== currentUser.id && (
                      <div
                        className={styles.userMessageWrapper}
                        style={{ justifyContent: lastMessageUser === 'me' ? 'space-between' : 'flex-end' }}
                      >
                        {lastMessageUser === 'me' && (
                          <a href={`${baseDomain}/fitbook/profile/${userId}`}>
                            <img src={profilePicUrl} alt={`Avatar von ${name}`} className={styles.userAvatar} />
                          </a>
                        )}
                        <div className={styles.userMessageInnerWrapper}>
                          {lastMessageUser === 'me' && (
                            <a
                              href={`${baseDomain}/fitbook/profile/${userId}`}
                              className={styles.messageTitle}
                            >
                              {name}
                            </a>
                          )}
                          <p className={styles.messageContent} dangerouslySetInnerHTML={{ __html: content }} />
                          <p className={styles.messageDate}>{date}</p>
                        </div>
                      </div>
                    )}
                  </Fragment>
                );
                lastMessageUser = userId === currentUser.id ? 'me' : 'other';
                return message;
              })}
            </div>
          </div>
          <div className={styles.formWrapper}>
            <div className={styles.formTopInnerWrapper}>
              <div className={styles.actionsWrapper}>
                {type === 'group' && isChatOwner && (
                  <div className={styles.actionIconWrapper}>
                    <IconButton
                      style={{ width: 32, height: 32, padding: 0, fontSize: 'inherit' }}
                      color="inherit"
                      onClick={this.handleFriendsPopoverOpen}
                    >
                      <GroupAddIcon color="inherit" fontSize="inherit" />
                    </IconButton>
                    <Popover
                      open={!!friendsPopoverAnchorEl || chatIdUpdatingUsers === id}
                      anchorEl={friendsPopoverAnchorEl}
                      onClose={this.handleFriendsPopoverClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    >
                      <FormGroup component="fieldset" className={styles.friendsWrapper}>
                        {
                          friends.map(({ user: { id, name, profilePicUrl } }) => (
                            <FormControlLabel
                              key={id}
                              className={styles.checkboxCont}
                              control={(
                                <Checkbox
                                  checked={selectedFriendIds.indexOf(id) !== -1}
                                  onChange={() => this.handleFriendToggle(id)}
                                  name={name}
                                />
                              )}
                              label={name}
                            />
                          ))
                        }
                        <Tooltip
                          title="Gruppen-Chats müssen neben Ihnen mindestens 2 Benutzer enthalten"
                          open={selectedFriendIds.length < 2}
                        >
                          <TextBlueButton
                            variant="outlined"
                            onClick={this.handleUsersUpdate}
                            disabled={selectedFriendIds.length < 2}
                          >
                            AKTUALISIEREN
                            {chatIdUpdatingUsers === id && <ButtonLoader color="#304FFE" />}
                          </TextBlueButton>
                        </Tooltip>
                      </FormGroup>
                    </Popover>
                  </div>
                )}
                <div className={styles.actionIconWrapper}>
                  <IconButton
                    style={{ width: 32, height: 32, padding: 0, fontSize: 'inherit' }}
                    color="inherit"
                    onClick={this.toggleEmojiPicker}
                  >
                    <MoodIcon color="inherit" fontSize="inherit" />
                  </IconButton>
                  {isEmojiPickerVisible && (
                    <div className={styles.emojiPickerWrapper}>
                      <EmojiPicker onEmojiClick={this.handleEmojiSelect}/>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.textFieldWrapper}>
                <ContentEditable
                  innerRef={this.messageInput}
                  html={messageInputValue}
                  onChange={this.handleMessageInputChange}
                  onKeyUp={this.handleMessageInputKeyUp}
                  onBlur={this.handleMessageInputBlur}
                  className={styles.messageInput}
                  placeholder="Shreibe eine Nachricht"
                />
              </div>
            </div>
            <div className={styles.sendBtnWrapper}>
              <TextPinkButton
                style={{ height: 32 }}
                disabled={!messageInputValue}
                onClick={this.handleMessageSubmit}
              >
                SENDEN
              </TextPinkButton>
            </div>
          </div>
        </div>
        <Dialog
          fullScreen={window.innerWidth < 768}
          open={isArchiveConfirmDialogOpen || isArchiving}
          onClose={this.closeArchiveConfirmDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Chat archivieren</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bist du sicher? Diese Aktion kann nicht rückgängig gemacht werden.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <TextBlueButton
              color="primary"
              disabled={isArchiving}
              onClick={this.closeArchiveConfirmDialog}
              autoFocus
            >
              ABSÄGEN
            </TextBlueButton>
            <PrimaryButton
              color="primary"
              disabled={isArchiving}
              onClick={this.archive}
            >
              Archiv
              {isArchiving && (
                <div style={{ height: 16, marginLeft: 15 }}>
                  <CircularProgress color="inherit" size={16} />
                </div>
              )}
            </PrimaryButton>
          </DialogActions>
        </Dialog>
        <Dialog
          fullScreen={window.innerWidth < 768}
          open={isLeaveConfirmDialogOpen || isLeaving}
          onClose={this.closeLeaveConfirmDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Chat verlassen</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bist du sicher? Diese Aktion kann nicht rückgängig gemacht werden.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <TextBlueButton
              color="primary"
              disabled={isLeaving}
              onClick={this.closeLeaveConfirmDialog}
              autoFocus
            >
              ABSÄGEN
            </TextBlueButton>
            <PrimaryButton
              color="primary"
              disabled={isLeaving}
              onClick={this.leave}
            >
              Verlassen
              {isLeaving && (
                <div style={{ height: 16, marginLeft: 15 }}>
                  <CircularProgress color="inherit" size={16} />
                </div>
              )}
            </PrimaryButton>
          </DialogActions>
        </Dialog>
        <Dialog
          fullScreen={window.innerWidth < 768}
          open={isDeleteConfirmDialogOpen || isDeleting}
          onClose={this.closeDeleteConfirmDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Chat löschen</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bist du sicher? Diese Aktion kann nicht rückgängig gemacht werden.
              Beachten Sie, dass dieser Chat, seine Mitglieder und seine
              Nachrichten gelöscht werden, da Sie der Eigentümer sind.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <TextBlueButton
              color="primary"
              disabled={isDeleting}
              onClick={this.closeDeleteConfirmDialog}
              autoFocus
            >
              ABSÄGEN
            </TextBlueButton>
            <PrimaryButton
              color="primary"
              disabled={isDeleting}
              onClick={this.delete}
            >
              Verlassen und löschen
              {isDeleting && (
                <div style={{ height: 16, marginLeft: 15 }}>
                  <CircularProgress color="inherit" size={16} />
                </div>
              )}
            </PrimaryButton>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
