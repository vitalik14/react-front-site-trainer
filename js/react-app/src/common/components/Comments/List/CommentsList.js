import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButtonWithOutStyles from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles/index';
import TimeAgo from 'react-timeago';
import { shortnameToImage } from 'emojione';

import Loader from '../../Loaders/Layout/LayoutLoader';
import comment from '../../../models/comment';
import { PrimaryButton, TextBlueButton } from '../../../customizedMaterialComponents';
import { formatter, formatDateLong } from '../../../helpers';
import styles from './CommentsList.scss';

const IconButton = withStyles({
  root: {
    padding: 0
  },
})(IconButtonWithOutStyles);
export default class CommentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemIdBeingEdited: null,
      itemBeingEditedOriginalContent: '',
      editingFieldValue: '',
      itemToDeleteId: null,
      isDeleteConfirmDialogOpen: false,
    };

    this.handleEditingStart = this.handleEditingStart.bind(this);
    this.handleEditingCancel = this.handleEditingCancel.bind(this);
    this.handleEditingFieldChange = this.handleEditingFieldChange.bind(this);
    this.handleEditingSubmit = this.handleEditingSubmit.bind(this);
    this.handleEditingFieldKeyUp = this.handleEditingFieldKeyUp.bind(this);
    this.handleDeleteConfirmDialogOpen = this.handleDeleteConfirmDialogOpen.bind(this);
    this.handleDeleteConfirmDialogClose = this.handleDeleteConfirmDialogClose.bind(this);
    this.handleRemoval = this.handleRemoval.bind(this);
  }

  componentDidMount() {
    const { props: { hasFetchedAtLeastOnce, loadItems } } = this;
    if (!hasFetchedAtLeastOnce) {
      loadItems();
    }
  }

  handleEditingStart(itemIdBeingEdited, content) {
    this.setState({
      itemIdBeingEdited,
      editingFieldValue: content,
      itemBeingEditedOriginalContent: content,
    });
  }

  handleEditingCancel() {
    this.setState({
      itemIdBeingEdited: null,
      editingFieldValue: '',
      itemBeingEditedOriginalContent: '',
    });
  }

  handleEditingFieldChange({ target: { value: editingFieldValue } }) {
    this.setState({ editingFieldValue });
  }

  handleEditingFieldKeyUp({ ctrlKey, key }) {
    if (ctrlKey && key === 'Enter') {
      this.handleEditingSubmit();
    }
    if (key === 'Escape') {
      this.handleEditingCancel();
    }
  }

  handleEditingSubmit() {
    const {
      state: { itemIdBeingEdited, editingFieldValue, itemBeingEditedOriginalContent },
      props: { update },
    } = this;
    if (editingFieldValue !== itemBeingEditedOriginalContent) {
      update(itemIdBeingEdited, editingFieldValue);
    }
    this.setState({
      itemIdBeingEdited: null,
      editingFieldValue: '',
      itemBeingEditedOriginalContent: '',
    });
  }

  handleDeleteConfirmDialogOpen(itemToDeleteId) {
    this.setState({ itemToDeleteId, isDeleteConfirmDialogOpen: true });
  }

  handleDeleteConfirmDialogClose() {
    this.setState({ itemToDeleteId: null, isDeleteConfirmDialogOpen: false });
  }

  handleRemoval() {
    const { state: { itemToDeleteId }, props: { remove } } = this;
    remove(itemToDeleteId);
    this.setState({ itemToDeleteId: null, isDeleteConfirmDialogOpen: false });
  }

  render() {
    const {
      state: {
        itemIdBeingEdited,
        editingFieldValue,
        isDeleteConfirmDialogOpen,
        itemToDeleteId,
      },
      props: {
        baseDomain,
        limit,
        isFetching,
        hasFetchedAtLeastOnce,
        items,
        itemsCount,
        itemsCountPerPage,
        itemsCurrentPage,
        canPaginateItems,
        itemIdBeingUpdated,
        itemIdBeingDeleted,
        loadItems,
        wrapped,
        // repliable,
      },
    } = this;

    if (isFetching && !hasFetchedAtLeastOnce) return <Loader />;

    if (!hasFetchedAtLeastOnce) return null;

    if (hasFetchedAtLeastOnce && !itemsCount) return null;

    return (
      <ul className={wrapped ? styles.wrappedList : styles.list}>
        {(limit ? items.slice(0, limit) : items).map(({
          id,
          createDate,
          updateDate,
          content,
          user,
          isAuthor,
        }) => (
          <li className={wrapped ? styles.wrappedListItem : styles.item} key={id}>
            {user && (
              <a
                href={`${baseDomain}/fitbook/profile/${user.id}`}
                className={styles.userLink}
              >
                <img src={user.profilePicUrl} alt="Benutzerbild" className={styles.avatar} />
              </a>
            )}
            {!user && (
              <div className={styles.avatarPlaceholderWrapper}>
                <AccountCircleIcon color="inherit" fontSize="inherit" />
              </div>
            )}
            <div className={styles.mainWrapper}>
              <div className={styles.mainTopInnerWrapper}>
                <div className={styles.titleWrapper}>
                  {user && (
                    <a
                      href={`${baseDomain}/fitbook/profile/${user.id}`}
                      className={styles.userLink}
                    >
                      <img
                        src={user.profilePicUrl}
                        alt="Benutzerbild"
                        className={wrapped ? styles.wrappedItemAvatar : styles.avatar}
                      />
                    </a>
                  )}
                  {!user && (
                    <div className={styles.avatarPlaceholderWrapper}>
                      <AccountCircleIcon color="inherit" fontSize="inherit" />
                    </div>
                  )}
                  <h2 className={styles.userName}>
                    {user
                      ? (
                        <>
                          <a
                            href={`${baseDomain}/fitbook/profile/${user.id}`}
                            className={styles.userLink}
                          >
                            {user.name}
                          </a>
                          {user.type === 'trainer' && <span className="userTypeBadge">TRAINER</span>}
                          {user.type === 'team' && <span className="userTypeBadge">TEAM</span>}
                        </>
                      )
                      : 'Gelöschter Benutzer'}
                  </h2>
                </div>
                <div className={styles.timeAgoCont}>
                  {createDate !== updateDate && (
                    <Tooltip title={formatDateLong(new Date(updateDate))}>
                      <div
                        className={styles.wasEditedIcon}
                      >
                        <EditIcon color="inherit" fontSize="inherit" />
                      </div>
                    </Tooltip>
                  )}
                  <Tooltip title={formatDateLong(new Date(createDate))}>
                    <TimeAgo
                      date={createDate}
                      formatter={formatter}
                      className={styles.timeAgo}
                      title={null}
                    />
                  </Tooltip>
                </div>
              </div>
              {itemIdBeingEdited !== id && itemIdBeingUpdated !== id && (
                <div className={styles.contentWrapper}>
                  <p
                    className={styles.content}
                    dangerouslySetInnerHTML={{
                      __html: content
                        ? shortnameToImage(content)
                        : 'Ein leerer Kommentar',
                    }}
                  />
                  {isAuthor && (
                    <div className={styles.actionsWrapper}>
                      <div className={styles.actionButtonWrapper}>
                        <IconButton
                          style={{ width: 24, height: 24, fontSize: 'inherit' }}
                          color="inherit"
                          disabled={!!itemIdBeingUpdated}
                          onClick={() => this.handleEditingStart(id, content)}
                        >
                          <EditIcon color="inherit" fontSize="inherit" />
                        </IconButton>
                      </div>
                      <div className={styles.actionButtonWrapper}>
                        <IconButton
                          style={{ width: 24, height: 24, fontSize: 'inherit' }}
                          color="inherit"
                          onClick={() => this.handleDeleteConfirmDialogOpen(id)}
                        >
                          <DeleteIcon color="inherit" fontSize="inherit" />
                        </IconButton>
                        <Dialog
                          fullScreen={window.innerWidth < 768}
                          open={
                            (isDeleteConfirmDialogOpen && id === itemToDeleteId)
                            || itemIdBeingDeleted === id
                          }
                          onClose={this.handleDeleteConfirmDialogClose}
                          aria-labelledby="responsive-dialog-title"
                        >
                          <DialogTitle id="responsive-dialog-title">Kommentar löschen</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Bist du sicher? Diese Aktion kann nicht rückgängig gemacht werden.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <TextBlueButton
                              color="primary"
                              disabled={itemIdBeingDeleted === id}
                              onClick={this.handleDeleteConfirmDialogClose}
                              autoFocus
                            >
                              ABSÄGEN
                            </TextBlueButton>
                            <PrimaryButton
                              color="primary"
                              disabled={itemIdBeingDeleted === id}
                              onClick={this.handleRemoval}
                            >
                              LÖSCHEN
                              {itemIdBeingDeleted === id && (
                                <div style={{ height: 16, marginLeft: 15 }}>
                                  <CircularProgress color="inherit" size={16} />
                                </div>
                              )}
                            </PrimaryButton>
                          </DialogActions>
                        </Dialog>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {(itemIdBeingEdited === id || itemIdBeingUpdated === id) && (
                <TextField
                  fullWidth
                  multiline
                  autoFocus
                  defaultValue={content}
                  label="Neuer Inhalt"
                  disabled={itemIdBeingUpdated === id}
                  onChange={this.handleEditingFieldChange}
                  onKeyUp={this.handleEditingFieldKeyUp}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <div className={styles.actionButtonWrapper}>
                          {itemIdBeingUpdated !== id && (
                            <div style={{ display: 'flex' }}>
                              <IconButton
                                style={{
                                  width: 24,
                                  height: 24,
                                  fontSize: 'inherit',
                                  marginRight: 5,
                                }}
                                color="inherit"
                                disabled={editingFieldValue === content}
                                onClick={this.handleEditingSubmit}
                              >
                                <SaveIcon color="inherit" fontSize="inherit" />
                              </IconButton>
                              <IconButton
                                style={{ width: 24, height: 24, fontSize: 'inherit' }}
                                color="inherit"
                                onClick={this.handleEditingCancel}
                              >
                                <CancelIcon color="inherit" fontSize="inherit" />
                              </IconButton>
                            </div>
                          )}
                          {itemIdBeingUpdated === id && (
                            <CircularProgress color="inherit" size={16} />
                          )}
                        </div>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </div>
          </li>
        ))}
        {isFetching && <Loader />}
        {canPaginateItems && (
          <div className="paginationWrapper" style={{ paddingBottom: 20, paddingTop: 20, borderTop: '1px solid #9E9E9E' }}>
            <div>
              <p className="paginationCount">
                Zeige&nbsp;
                {Math.min(itemsCount, itemsCountPerPage * itemsCurrentPage)}
                &nbsp;Kommentare von&nbsp;
                {itemsCount}
              </p>
              <TextBlueButton
                variant="outlined"
                onClick={() => loadItems(itemsCurrentPage + 1, false)}
                disabled={!canPaginateItems || isFetching}
              >
                Laden Sie mehr Daten
              </TextBlueButton>
            </div>
          </div>
        )}
      </ul>
    );
  }
}

CommentsList.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  limit: PropTypes.number,
  isFetching: PropTypes.bool,
  hasFetchedAtLeastOnce: PropTypes.bool,
  items: PropTypes.arrayOf(comment),
  itemsCount: PropTypes.number,
  itemsCountPerPage: PropTypes.number,
  itemsCurrentPage: PropTypes.number,
  canPaginateItems: PropTypes.bool,
  itemIdBeingUpdated: PropTypes.number,
  itemIdBeingDeleted: PropTypes.number,
  loadItems: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  wrapped: PropTypes.bool,
  // repliable: PropTypes.bool,
};

CommentsList.defaultProps = {
  isFetching: null,
  limit: null,
  hasFetchedAtLeastOnce: null,
  items: null,
  itemsCount: null,
  itemsCountPerPage: null,
  itemsCurrentPage: null,
  canPaginateItems: null,
  itemIdBeingUpdated: null,
  itemIdBeingDeleted: null,
  wrapped: false,
  // repliable: false,
};
