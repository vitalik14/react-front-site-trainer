import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';

import styles from './PostGridItem.scss';
import { BlueButton, PrimaryButton, SecondaryButton } from '../../../customizedMaterialComponents';
import Loader from '../../Loaders/Button/ButtonLoader';
import { addFavorite, deleteFavorite, updateFavorite } from '../../../services/user';
import handleError from '../../../errorHandler';

const getFormattedDate = date => date.split('-').reverse().join('.');

export default class PostGridItem extends Component {
  state = {
    isFavModalOpen: false,
    isAddedToFavorite: null,
    isSubmitting: false,
    isDeleting: false,
    noteTextField: '',
    newNote: '',
    changedFavorite: false,
    newFavId: null,
  };

  componentDidMount() {
    const { props: { favNote } } = this;
    this.setState({ noteTextField: favNote || '' });
  }

  submitFav = () => {
    const {
      state: { noteTextField, isAddedToFavorite, newFavId },
      props: { id, favId, isFav },
    } = this;

    const isFavorite = isAddedToFavorite === null
      ? isFav
      : isAddedToFavorite;

    this.setState({ isSubmitting: true });
    const request = isFavorite
      ? updateFavorite(newFavId || favId, noteTextField)
      : addFavorite('post', id, noteTextField);
    request
      .then(({ data }) => {
        this.setState({
          isFavModalOpen: false,
          isSubmitting: false,
          isAddedToFavorite: true,
          newNote: noteTextField,
          changedFavorite: true,
          newFavId: data.favorite_data.id,
        });
      })
      .catch(handleError);
  };

  deleteFav = () => {
    const { state: { newFavId }, props: { favId } } = this;
    this.setState({ isDeleting: true });
    deleteFavorite('post', newFavId || favId)
      .then(() => {
        this.setState({
          isFavModalOpen: false,
          isDeleting: false,
          isAddedToFavorite: false,
          noteTextField: '',
          newNote: '',
          changedFavorite: true,
          newFavId: null,
        });
      })
      .catch(handleError);
  };

  updateNote = ({ target: { value } }) => this.setState({ noteTextField: value });

  closeFavModal = () => {
    const { state: { changedFavorite, newNote }, props: { favNote } } = this;
    const note = changedFavorite
      ? newNote
      : favNote || '';
    this.setState({ isFavModalOpen: false, noteTextField: note });
  };

  render() {
    const {
      state: {
        isFavModalOpen,
        isSubmitting,
        isDeleting,
        isAddedToFavorite,
        noteTextField,
      },
      props: {
        baseDomain,
        flexDirection,
        title,
        category,
        thumbnailUrl,
        excerpt,
        date,
        commentsCount,
        url,
        isFav,
        showFavoriteIcon,
      },
    } = this;

    const isFavorite = isAddedToFavorite === null
      ? isFav
      : isAddedToFavorite;

    const loading = isSubmitting || isDeleting;

    return (
      <div className={styles.cont} data-flex-direction={flexDirection}>
        <a href={url} className={styles.thumbnailLink}>
          <div
            className={styles.thumbnail}
            style={{
              backgroundImage: thumbnailUrl
                ? `url(${thumbnailUrl})`
                : `url(${baseDomain}/assets/images/default/meal.jpg`,
            }}
          />
        </a>
        <div className={styles.innerCont}>
          <div>
            <div className={styles.innerTopCont} style={{ justifyContent: category ? 'space-between' : 'flexEnd' }}>
              {category && <p className={styles.category}>{category}</p>}
              {showFavoriteIcon && (
                <div style={{ fontSize: 14, color: isFavorite ? '#EC407A' : '#CDD7DC' }}>
                  <IconButton
                    color="inherit"
                    style={{
                      width: 26,
                      height: 26,
                      padding: 0,
                      fontSize: 'inherit',
                    }}
                    onClick={() => this.setState({ isFavModalOpen: true })}
                  >
                    <FavoriteIcon color="inherit" fontSize="inherit" />
                  </IconButton>
                </div>
              )}
            </div>
            <a href={url} className={styles.title}>
              {title}
            </a>
            <p className={styles.excerpt}>{excerpt}</p>
          </div>
          <div className={styles.bottomCont}>
            <p className={styles.date}>{getFormattedDate(date)}</p>
            <div className={styles.commentsCont}>
              <div className={styles.commentIconCont}>
                <CommentIcon color="inherit" fontSize="inherit" />
              </div>
              <p className={styles.commentsCount}>{commentsCount}</p>
            </div>
          </div>
        </div>
        {showFavoriteIcon && (
          <Dialog
            fullWidth
            fullScreen={window.innerWidth < 768}
            open={isFavModalOpen || loading}
            onClose={this.closeFavModal}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {!isFavorite && 'Zu Favoriten hinzufügen'}
              {isFavorite && 'Favorit bearbeiten'}
            </DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                autoFocus
                multiline
                id="note"
                label="Dein Kommentar"
                value={noteTextField}
                onChange={this.updateNote}
                margin="normal"
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              {isFavorite && (
                <PrimaryButton
                  disabled={loading}
                  onClick={this.deleteFav}
                >
                  Entfernen
                  {isDeleting && <Loader color="#ffffff" />}
                </PrimaryButton>
              )}
              <SecondaryButton
                disabled={loading}
                onClick={this.closeFavModal}
              >
                Schließen
              </SecondaryButton>
              <BlueButton
                color="primary"
                disabled={loading}
                onClick={this.submitFav}
              >
                Speichern
                {isSubmitting && <Loader color="#ffffff" />}
              </BlueButton>
            </DialogActions>
          </Dialog>
        )}
      </div>
    );
  }
}

PostGridItem.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  flexDirection: PropTypes.string,
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  thumbnailUrl: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  isFav: PropTypes.bool,
  favId: PropTypes.number,
  favNote: PropTypes.string,
  showFavoriteIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
};

PostGridItem.defaultProps = {
  flexDirection: 'column',
  id: null,
  category: null,
  isFav: null,
  favId: null,
  favNote: '',
};
