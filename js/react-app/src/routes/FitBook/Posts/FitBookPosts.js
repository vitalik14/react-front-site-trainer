import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import TimeAgo from 'react-timeago';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButtonWithOutStyles from '@material-ui/core/IconButton/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import TextField from '@material-ui/core/TextField/TextField';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import SaveIcon from '@material-ui/icons/Save';
import { withStyles } from '@material-ui/core/styles/index';
import { shortnameToImage } from 'emojione';

import styles from './FitBookPosts.scss';
import Comments from '../../../common/components/Comments/Comments';
import comment from '../../../common/models/comment';
import Loader from '../../../common/components/Loaders/Layout/LayoutLoader';
import { PrimaryButton, TextBlueButton } from '../../../common/customizedMaterialComponents';
import { formatDateLong, formatter } from '../../../common/helpers';
import ButtonLoader from '../../../common/components/Loaders/Button/ButtonLoader';
import VideoGridItem from '../../../common/components/GridItems/Video/VideoGridItem';
import Lightbox from 'react-image-lightbox';

const IconButton = withStyles({
  root: {
    padding: 0
  },
})(IconButtonWithOutStyles);

export default class FitBookPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postIdBeingEdited: null,
      postBeingEditedOriginalContent: '',
      editingFieldValue: '',
      postToDeleteId: null,
      isDeleteConfirmDialogOpen: false,
      lightbox: null
    };

    this.handleEditingStart = this.handleEditingStart.bind(this);
    this.handleEditingCancel = this.handleEditingCancel.bind(this);
    this.handleEditingFieldChange = this.handleEditingFieldChange.bind(this);
    this.handleEditingSubmit = this.handleEditingSubmit.bind(this);
    this.handleEditingFieldKeyUp = this.handleEditingFieldKeyUp.bind(this);
    this.handleDeleteConfirmDialogOpen = this.handleDeleteConfirmDialogOpen.bind(this);
    this.handleDeleteConfirmDialogClose = this.handleDeleteConfirmDialogClose.bind(this);
    this.handleRemoval = this.handleRemoval.bind(this);
    this.handlePostPinChange = this.handlePostPinChange.bind(this);
  }

  handleEditingStart(postIdBeingEdited, content) {
    this.setState({
      postIdBeingEdited,
      editingFieldValue: content,
      postBeingEditedOriginalContent: content,
    });
  }

  handleEditingCancel() {
    this.setState({
      postIdBeingEdited: null,
      editingFieldValue: '',
      postBeingEditedOriginalContent: '',
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
      state: { postIdBeingEdited, editingFieldValue, postBeingEditedOriginalContent },
      props: { updatePost },
    } = this;
    if (editingFieldValue !== postBeingEditedOriginalContent) {
      updatePost(postIdBeingEdited, editingFieldValue);
    }
    this.setState({
      postIdBeingEdited: null,
      editingFieldValue: '',
      postBeingEditedOriginalContent: '',
    });
  }

  handleDeleteConfirmDialogOpen(postToDeleteId) {
    this.setState({ postToDeleteId, isDeleteConfirmDialogOpen: true });
  }

  handleDeleteConfirmDialogClose() {
    this.setState({ postToDeleteId: null, isDeleteConfirmDialogOpen: false });
  }

  handleRemoval() {
    const { state: { postToDeleteId }, props: { removePost } } = this;
    removePost(postToDeleteId);
    this.setState({ postToDeleteId: null, isDeleteConfirmDialogOpen: false });
  }

  handlePostPinChange(id) {
    const { props: { pinPost, unpinPost, pinnedPostId } } = this;
    if (id === pinnedPostId) {
      unpinPost(id);
    } else {
      pinPost(id);
    }
  }
  componentWillReceiveProps(nextProps) {
    const items = nextProps.items;
    if (items.length) {
      let arrSort = {};
      items.map(el => {
        let container = el.contentElement;
        if (container.type) {
          if (container.type === 'image' || container.type === 'gallery') {
            container.open = false;
            container.current = 0;
            arrSort[el.id] = container;
          }
        }
      });
      
      this.setState({lightbox: arrSort});
    }
  }

  render() {
    const {
      state: {
        postIdBeingEdited,
        editingFieldValue,
        isDeleteConfirmDialogOpen,
        postToDeleteId,
        lightbox,
      },
      props: {
        baseDomain,
        isFetching,
        hasFetchedAtLeastOnce,
        items,
        itemsCount,
        itemsCountPerPage,
        itemsCurrentPage,
        canPaginateItems,
        loadMoreItems,
        likePost,
        unlikePost,
        postIdsBeingUpdated,
        postIdsBeingRemoved,
        type,
        postIdsUpdatingLike,
        postIdUpdatingPinnedState,
        pinnedPostId,
        currentUserType,
      },
    } = this;

   
    if (isFetching && !hasFetchedAtLeastOnce) return <Loader />;

    if (!hasFetchedAtLeastOnce) return null;

    if (hasFetchedAtLeastOnce && !itemsCount) return <p className="placeholder">Keine Beiträge ¯\_(ツ)_/¯</p>;
     console.log(lightbox);
    return (
      <div className={styles.wrapper}>
        {items.map(({
          id,
          author,
          meta: {
            isLiked,
            likes,
            comments,
            sharedWith,
            isPostAuthor,
          },
          content,
          contentElement,
          createdAt,
          updatedAt,
        }) => (
          <div key={id} className={styles.postBlock}>
            <div className={styles.desktopAvatarWrapper}>
              {author instanceof Array
                ? (
                  <div className={styles.authorAvatarPlaceholderWrapper}>
                    <AccountCircleIcon color="inherit" fontSize="inherit" />
                  </div>
                )
                : (
                  <a href={`${baseDomain}/fitbook/profile/${author.id}`} className={styles.userAvatarLink}>
                    <img src={author.profilePicUrl} alt={`Avatar von ${author.name}`} className={styles.authorAvatar} />
                  </a>
                )
                }
            </div>
            <div className={styles.postMainInnerWrapper}>
              <div className={styles.postTopWrapper}>
                <div className={styles.mobileAvatarWrapper}>
                  {author instanceof Array
                    ? (
                      <div className={styles.authorAvatarPlaceholderWrapper}>
                        <AccountCircleIcon color="inherit" fontSize="inherit" />
                      </div>
                    )
                    : (
                      <a href={`${baseDomain}/fitbook/profile/${author.id}`} className={styles.userAvatarLink}>
                        <img src={author.profilePicUrl} alt={`Avatar von ${author.name}`} className={styles.authorAvatar} />
                      </a>
                    )
                    }
                </div>
                <div className={styles.postTopRightInnerWrapper}>
                  <h2 className={styles.authorName}>
                    {author instanceof Array
                      ? 'Gelöschter Benutzer'
                      : (
                          <>
                            <a href={`${baseDomain}/fitbook/profile/${author.id}`} className={styles.userNameLink}>
                              {author.name}
                            </a>
                            {author.type === 'trainer' && <span className="userTypeBadge">TRAINER</span>}
                            {author.type === 'team' && <span className="userTypeBadge">TEAM</span>}
                          </>
                      )
                      }
                  </h2>
                  <div className={styles.postInfoWrapper}>
                    {id === pinnedPostId && (
                      <div className={styles.isPinnedIconWrapper}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 53.011 53.011" style={{ enableBackground: 'new 0 0 53.011 53.011', transform: 'rotate(135deg)' }} xmlSpace="preserve" width="12" height="12">
                          <path d="M52.963,21.297c-0.068-0.329-0.297-0.603-0.609-0.727c-2.752-1.097-5.67-1.653-8.673-1.653  c-4.681,0-8.293,1.338-9.688,1.942L19.114,8.2c0.52-4.568-1.944-7.692-2.054-7.828C16.881,0.151,16.618,0.016,16.335,0  c-0.282-0.006-0.561,0.091-0.761,0.292L0.32,15.546c-0.202,0.201-0.308,0.479-0.291,0.765c0.016,0.284,0.153,0.549,0.376,0.726  c2.181,1.73,4.843,2.094,6.691,2.094c0.412,0,0.764-0.019,1.033-0.04l12.722,14.954c-0.868,2.23-3.52,10.27-0.307,18.337  c0.124,0.313,0.397,0.541,0.727,0.609c0.067,0.014,0.135,0.021,0.202,0.021c0.263,0,0.518-0.104,0.707-0.293l14.57-14.57  l13.57,13.57c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414l-13.57-13.57  l14.527-14.528C52.929,21.969,53.031,21.627,52.963,21.297z" fill="#D6D6D6" />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                        </svg>
                      </div>
                    )}
                    {createdAt !== updatedAt && (
                      <Tooltip title={formatDateLong(new Date(updatedAt))}>
                        <div className={styles.wasEditedIcon}>
                          <EditIcon color="inherit" fontSize="inherit" />
                        </div>
                      </Tooltip>
                    )}
                    <Tooltip title={formatDateLong(new Date(createdAt))}>
                      <a href={`${baseDomain}/fitbook/post/${id}`} className={styles.postLink}>
                        <TimeAgo
                          date={createdAt}
                          formatter={formatter}
                          title={null}
                        />
                      </a>
                    </Tooltip>
                    <span className={styles.divider}>·</span>
                    <p>
                        mit&nbsp;
                      {sharedWith}
                        &nbsp;geteilt
                    </p>
                  </div>
                </div>
              </div>
              {contentElement.type === 'image' && (
                <div className={styles.lightbox}>
                  {lightbox[id] && lightbox[id].open && 
                    (<Lightbox 
                      onCloseRequest={() => this.setState({ lightbox: {[id]: { open: false }}})} 
                      mainSrc={contentElement.url} 
                    />)}
                  <img onClick={() => this.setState({ lightbox: {[id]: { open: true }}})}
                    src={contentElement.url}
                    alt="Medienbild"
                    style={{ maxWidth: '100%', marginBottom: 20 }}
                  />
                </div>
              )}
              {contentElement.type === 'gallery' && (
                <div className={styles.lightbox}>
                  {lightbox[id] && lightbox[id].open && 
                    (<Lightbox 
                      onCloseRequest={() => this.setState({ lightbox: {[id]: { open: false }}})} 
                      mainSrc={((self, id) => {
                        return contentElement.urls[self.state.lightbox[id].current]})(this, id)}
                      nextSrc={((self, id) => {
                        return contentElement.urls[(self.state.lightbox[id].current + 1) % contentElement.urls.length]
                      })(this, id)}
                      prevSrc={((self, id) => {
                        return contentElement.urls[(self.state.lightbox[id].current + contentElement.urls.length - 1) % contentElement.urls.length]
                      })(this, id)}
                      onMovePrevRequest={() =>
                        this.setState({ lightbox: {[id]: { open: true, current: (this.state.lightbox[id].current + contentElement.urls.length - 1) % contentElement.urls.length }}})}
                      onMoveNextRequest={() =>
                        this.setState({ lightbox: {[id]: { open: true, current: (this.state.lightbox[id].current + 1) % contentElement.urls.length }}})}
                    />)}
                    {contentElement.urls.map((url, index) => (
                      <img
                        data-id={index}
                        onClick={(el) => {
                          this.setState({ lightbox: {[id]: { open: true, current: +el.currentTarget.dataset.id }}})}
                        }
                        key={Math.random()}
                        src={url}
                        alt="Medienbild"
                        className={styles.galleryImage}
                      />
                    ))}
                </div>
              )}
              {type === 'vidcomments' && (
                <VideoGridItem
                  id={contentElement.video.id}
                  baseDomain={baseDomain}
                  courseName={contentElement.video.course.name}
                  coachId={contentElement.video.trainer.user.id}
                  coachName={contentElement.video.trainer.user.name}
                  coachAvatarUrl={contentElement.video.trainer.user.profilePicUrl}
                  level={contentElement.video.level}
                  thumbnailURL={contentElement.video.course.banners.default}
                  tools={contentElement.video.course.tools}
                  kcal={contentElement.video.kcal}
                  duration={contentElement.video.duration}
                  playsAmount={contentElement.video.user.playAmount}
                  lastPlayedPercentage={contentElement.video.user.playedInPercent}
                  isFav={contentElement.video.meta.isFavorite}
                  favId={
                      contentElement.video.meta.isFavorite
                        ? contentElement.video.meta.favorite.id
                        : null
                    }
                  favNote={
                      contentElement.video.meta.isFavorite
                        ? contentElement.video.meta.favorite.data.note
                        : null
                    }
                  favDifficulty={
                      contentElement.video.meta.isFavorite
                        ? contentElement.video.meta.favorite.data.difficulty
                        : null
                    }
                  column
                />
              )}
              {postIdBeingEdited !== id && !postIdsBeingUpdated.includes(id) && (
                <div className={styles.contentWrapper}>
                  <div className={styles.postContentWrapper}>
                    <p
                      className={styles.postContent}
                      dangerouslySetInnerHTML={{
                        __html: shortnameToImage(content),
                      }}
                    />
                  </div>
                    {(isPostAuthor || currentUserType === 'team') && (
                      <div className={styles.actionsWrapper}>
                        {currentUserType === 'team' && (
                          <div className={styles.actionButtonWrapper} style={{ alignItems: 'center' }}>
                            {id === postIdUpdatingPinnedState && (
                              <div style={{ marginRight: 15 }}>
                                <ButtonLoader color="#9E9E9E" />
                              </div>
                            )}
                            <IconButton
                              style={{
                                width: 24, height: 24, fontSize: 'inherit', marginRight: 2,
                              }}
                              color="inherit"
                              disabled={
                                !!postIdsBeingUpdated.length || !!postIdsBeingRemoved.length
                              }
                              onClick={() => this.handlePostPinChange(id)}
                            >
                              {id !== pinnedPostId && (
                                <Tooltip title="Stecken Sie diesen Beitrag in die Fitbook-Seitenleiste">
                                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 53.011 53.011" style={{ enableBackground: 'new 0 0 53.011 53.011', transform: 'rotate(135deg)' }} xmlSpace="preserve" width="14" height="14">
                                    <path d="M52.963,21.297c-0.068-0.329-0.297-0.603-0.609-0.727c-2.752-1.097-5.67-1.653-8.673-1.653  c-4.681,0-8.293,1.338-9.688,1.942L19.114,8.2c0.52-4.568-1.944-7.692-2.054-7.828C16.881,0.151,16.618,0.016,16.335,0  c-0.282-0.006-0.561,0.091-0.761,0.292L0.32,15.546c-0.202,0.201-0.308,0.479-0.291,0.765c0.016,0.284,0.153,0.549,0.376,0.726  c2.181,1.73,4.843,2.094,6.691,2.094c0.412,0,0.764-0.019,1.033-0.04l12.722,14.954c-0.868,2.23-3.52,10.27-0.307,18.337  c0.124,0.313,0.397,0.541,0.727,0.609c0.067,0.014,0.135,0.021,0.202,0.021c0.263,0,0.518-0.104,0.707-0.293l14.57-14.57  l13.57,13.57c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414l-13.57-13.57  l14.527-14.528C52.929,21.969,53.031,21.627,52.963,21.297z" fill="#9e9e9e" />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                  </svg>
                                </Tooltip>
                              )}
                              {id === pinnedPostId && (
                                <Tooltip title="Diesen Pin aus der Fitbook-Sidebar entfernen">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -3 512.00023 512" width="14" height="14">
                                    <path d="m229.726562 50.316406c2.628907 0 5.210938-1.070312 7.070313-2.933594 1.859375-1.859374 2.929687-4.4375 2.929687-7.070312 0-2.640625-1.070312-5.207031-2.929687-7.070312-1.859375-1.867188-4.441406-2.929688-7.070313-2.929688-2.632812 0-5.210937 1.0625-7.070312 2.929688-1.863281 1.863281-2.933594 4.429687-2.933594 7.070312 0 2.632812 1.070313 5.210938 2.933594 7.070312 1.859375 1.863282 4.4375 2.933594 7.070312 2.933594zm0 0" fill="#9e9e9e" />
                                    <path d="m479.144531 32.910156c-21.222656-21.222656-49.4375-32.910156-79.449219-32.910156-30.011718 0-58.226562 11.6875-79.449218 32.910156l-53.585938 53.585938c-4.976562 4.976562-7.714844 11.589844-7.714844 18.625s2.738282 13.652344 7.714844 18.628906l31.898438 31.898438c10.273437 10.269531 26.980468 10.269531 37.253906 0l30.425781-30.425782c2.222657-2.222656 3.269531-5.363281 2.828125-8.476562-1.484375-10.449219 2.394532-20.835938 10.382813-27.789063 11.550781-10.046875 28.960937-10.042969 40.503906.011719 6.582031 5.730469 10.367187 13.65625 10.667969 22.316406.296875 8.671875-2.914063 16.824219-9.046875 22.953125-6.945313 6.945313-16.515625 10.132813-26.261719 8.75-3.109375-.441406-6.253906.605469-8.480469 2.832031l-30.425781 30.425782c-10.269531 10.269531-10.269531 26.980468 0 37.25l28.152344 28.152344-221.417969 221.417968c-11.316406 11.3125-25.179687 18.535156-39.753906 21.714844 3.171875-2.25 6.1875-4.765625 8.992187-7.570312 13.027344-13.027344 20.199219-30.347657 20.199219-48.769532s-7.171875-35.742187-20.199219-48.765625c-13.027344-13.027343-30.347656-20.203125-48.769531-20.203125s-35.738281 7.175782-48.765625 20.203125c-6.332031 6.328125-11.15625 13.605469-14.503906 21.367188-1.777344-22.0625 3.804687-44.734375 17.132812-64.082031l178.121094-258.511719c3.132812-4.546875 1.988281-10.777344-2.5625-13.910157-4.546875-3.132812-10.773438-1.984374-13.90625 2.5625l-178.121094 258.511719c-32.5625 47.257813-26.742187 111.011719 13.839844 151.597657 19.636719 19.632812 45.425781 29.453124 71.21875 29.453124s51.585938-9.820312 71.222656-29.453124l224.597656-224.601563c1.664063.324219 3.355469.488281 5.050782.488281 6.742187 0 13.488281-2.570312 18.625-7.703125l53.585937-53.585937c43.808594-43.808594 43.808594-115.089844 0-158.898438zm-430.15625 360.90625c9.246094-9.246094 21.542969-14.339844 34.621094-14.339844 13.082031 0 25.378906 5.09375 34.625 14.339844 9.25 9.25 14.34375 21.546875 14.34375 34.625s-5.09375 25.375-14.34375 34.625c-9.246094 9.25-21.542969 14.339844-34.625 14.339844-12.242187 0-23.796875-4.464844-32.8125-12.621094-.605469-.570312-1.21875-1.128906-1.8125-1.71875-19.089844-19.09375-19.089844-50.15625.003906-69.25zm416.011719-216.152344-53.585938 53.585938c-2.472656 2.472656-6.492187 2.472656-8.964843 0l-31.898438-31.898438c-2.472656-2.472656-2.472656-6.492187 0-8.964843l27.117188-27.117188c14.207031.59375 27.847656-4.6875 38.046875-14.886719 9.949218-9.949218 15.378906-23.71875 14.894531-37.785156-.492187-14.265625-6.714844-27.300781-17.519531-36.714844-19.027344-16.570312-47.734375-16.578124-66.773438-.015624-11.804687 10.269531-18.148437 25.121093-17.527344 40.511718l-27.125 27.121094c-2.46875 2.472656-6.492187 2.472656-8.964843 0l-31.898438-31.898438c-1.195312-1.195312-1.855469-2.789062-1.855469-4.480468 0-1.695313.660157-3.285156 1.855469-4.480469l53.585938-53.589844c17.445312-17.441406 40.636719-27.046875 65.308593-27.046875 24.667969 0 47.859376 9.605469 65.304688 27.046875 36.011719 36.011719 36.011719 94.605469 0 130.613281zm0 0" fill="#9e9e9e" />
                                  </svg>
                                </Tooltip>
                              )}
                            </IconButton>
                          </div>
                        )}
                        <div className={styles.actionButtonWrapper}>
                          <IconButton
                            style={{ width: 24, height: 24, fontSize: 'inherit' }}
                            color="inherit"
                            disabled={!!postIdsBeingUpdated.length}
                            onClick={() => this.handleEditingStart(id, content)}
                          >
                            <EditIcon color="inherit" fontSize="inherit" />
                          </IconButton>
                        </div>
                        {type !== 'vidcomments' && (
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
                                (isDeleteConfirmDialogOpen && id === postToDeleteId)
                                || postIdsBeingRemoved.includes(id)
                              }
                              onClose={this.handleDeleteConfirmDialogClose}
                              aria-labelledby="responsive-dialog-title"
                            >
                              <DialogTitle id="responsive-dialog-title">Beitrag löschen</DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  Bist du sicher? Diese Aktion kann nicht rückgängig gemacht werden.
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <TextBlueButton
                                  color="primary"
                                  disabled={postIdsBeingRemoved.includes(id)}
                                  onClick={this.handleDeleteConfirmDialogClose}
                                  autoFocus
                                >
                                  ABSÄGEN
                                </TextBlueButton>
                                <PrimaryButton
                                  color="primary"
                                  disabled={postIdsBeingRemoved.includes(id)}
                                  onClick={this.handleRemoval}
                                >
                                  LÖSCHEN
                                  {postIdsBeingRemoved.includes(id) && (
                                    <div style={{ height: 16, marginLeft: 15 }}>
                                      <CircularProgress color="inherit" size={16} />
                                    </div>
                                  )}
                                </PrimaryButton>
                              </DialogActions>
                            </Dialog>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              )}
              {(postIdBeingEdited === id || postIdsBeingUpdated.includes(id)) && (
                <TextField
                  fullWidth
                  multiline
                  autoFocus
                  defaultValue={content}
                  label="Neuer Inhalt"
                  disabled={postIdsBeingUpdated.includes(id)}
                  onChange={this.handleEditingFieldChange}
                  onKeyUp={this.handleEditingFieldKeyUp}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <div className={styles.actionButtonWrapper}>
                          {!postIdsBeingUpdated.includes(id) && (
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
                          {postIdsBeingUpdated.includes(id) && (
                          <CircularProgress color="inherit" size={16} />
                          )}
                        </div>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              <div className={styles.postActionsWrapper}>
                <div className={styles.postActionWrapper}>
                  <div className={styles.postActionIconWrapper}>
                    <IconButton
                      style={{
                        width: 28,
                        height: 28,
                        fontSize: 'inherit',
                        color: isLiked ? '#0336FF' : '#9E9E9E',
                      }}
                      disabled={postIdsUpdatingLike.includes(id)}
                      onClick={() => (isLiked ? unlikePost(id) : likePost(id))}
                    >
                      <ThumbUpIcon color="inherit" fontSize="inherit" />
                    </IconButton>
                  </div>
                  <p className={styles.postActionText}>
                    {likes}
                  </p>
                  {postIdsUpdatingLike.includes(id) && <ButtonLoader />}
                </div>
                <div className={styles.postActionWrapper}>
                  <div className={styles.postActionIconWrapper} style={{ height: 16 }}>
                    <CommentIcon color="inherit" fontSize="inherit" />
                  </div>
                  <p className={styles.postActionText}>
                    {comments}
                  </p>
                </div>
              </div>
              <Comments
                baseDomain={baseDomain}
                entityType="post"
                entityItemId={id}
                wrapped
                flexDirection="column-reverse"
                repliable
              />
            </div>
          </div>
        ))}
        {isFetching && <Loader />}
        {canPaginateItems && (
          <div className="paginationWrapper" style={{ paddingTop: 20 }}>
            <div>
              <p className="paginationCount">
                Zeige&nbsp;
                {Math.min(itemsCount, itemsCountPerPage * itemsCurrentPage)}
                &nbsp;Beiträge von&nbsp;
                {itemsCount}
              </p>
              <TextBlueButton
                variant="outlined"
                onClick={() => loadMoreItems(type, itemsCurrentPage + 1, false)}
                disabled={!canPaginateItems || isFetching}
              >
                Laden Sie mehr Daten
              </TextBlueButton>
            </div>
          </div>
        )}
      </div>
    );
  }
}

FitBookPosts.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasFetchedAtLeastOnce: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(comment).isRequired,
  itemsCount: PropTypes.number.isRequired,
  itemsCountPerPage: PropTypes.number.isRequired,
  itemsCurrentPage: PropTypes.number.isRequired,
  canPaginateItems: PropTypes.bool.isRequired,
  loadMoreItems: PropTypes.func.isRequired,
  type: PropTypes.string,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  postIdsUpdatingLike: PropTypes.arrayOf(PropTypes.number).isRequired,
  updatePost: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
  postIdsBeingUpdated: PropTypes.arrayOf(PropTypes.number).isRequired,
  postIdsBeingRemoved: PropTypes.arrayOf(PropTypes.number).isRequired,
  postIdUpdatingPinnedState: PropTypes.number,
  currentUserType: PropTypes.string.isRequired,
  pinnedPostId: PropTypes.number,
  pinPost: PropTypes.func.isRequired,
  unpinPost: PropTypes.func.isRequired,
};

FitBookPosts.defaultProps = {
  type: 'all',
  pinnedPostId: null,
  postIdUpdatingPinnedState: null,
};
