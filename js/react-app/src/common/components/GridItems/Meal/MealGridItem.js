import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Paper from '@material-ui/core/Paper/Paper';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';

import styles from './MealGridItem.scss';
import { PrimaryButton, SecondaryButton, BlueButton } from '../../../customizedMaterialComponents';
import Loader from '../../Loaders/Button/ButtonLoader';
import { addFavorite, updateFavorite, deleteFavorite } from '../../../services/user';
import { swapMeal } from '../../../services/meals';
import handleError from '../../../errorHandler';
import { camalizeKeys } from '../../../helpers';

export default class MealGridItem extends Component {
  types = ['Frühstück', 'Mittagessen', 'Abendessen', 'Snack'];

  state = {
    isFavModalOpen: false,
    isAddedToFavorite: null,
    isSubmitting: false,
    isDeleting: false,
    noteTextField: '',
    newNote: '',
    changedFavorite: false,
    isSwapping: false,
    newMeal: null,
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
      : addFavorite('recipe', id, noteTextField);
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
    deleteFavorite('recipe', newFavId || favId)
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

  swapMeal = () => {
    const { props: { id, typeIds } } = this;
    this.setState({ isSwapping: true });
    swapMeal(id, typeIds[Math.floor(Math.random() * typeIds.length)])
      .then(({ data }) => this.setState({
        isSwapping: false,
        newMeal: camalizeKeys(data).newMeal,
      }))
      .catch(handleError);
  };

  render() {
    const {
      state: {
        isFavModalOpen,
        isSubmitting,
        isDeleting,
        isAddedToFavorite,
        noteTextField,
        newMeal,
        isSwapping,
      },
    } = this;

    const loading = isSubmitting || isDeleting;

    const props = newMeal === null
      ? this.props
      : {
        ...newMeal,
        ...newMeal.nutrients,
        thumbnailUrl: newMeal.banners.default,
        typeIds: newMeal.types,
        isFav: newMeal.meta.isFavorite,
        showSwapIcon: true,
        baseDomain: this.props.baseDomain, // eslint-disable-line react/destructuring-assignment
      };

    const isFavorite = isAddedToFavorite === null
      ? props.isFav
      : isAddedToFavorite;

    return (
      <div className={styles.cont}>
        <Paper>
          <a className={styles.thumbnailLink} href={`${props.baseDomain}/meals/recipe/${props.id}`}>
            <div
              className={styles.thumbnail}
              style={{
                backgroundImage: props.thumbnailUrl
                  ? `url(${props.thumbnailUrl})`
                  : `url(${props.baseDomain}/assets/images/default/meal.jpg`,
              }}
            />
          </a>
          <div className={styles.innerCont}>
            <div>
              <p className={styles.types}>
                {props.typeIds.map((typeId, idx) => (
                  <span key={typeId}>
                    {idx > 0 && ' · '}
                    {this.types[+typeId - 1]}
                  </span>
                ))}
              </p>
              <a className={styles.link} href={`${props.baseDomain}/meals/recipe/${props.id}`}>
                {props.name}
              </a>
              <Table padding="none">
                <TableBody>
                  <TableRow>
                    <TableCell>Kaloriengehalt</TableCell>
                    <TableCell align="right">
                      {props.kcal}
                      &nbsp;kcal
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Proteine</TableCell>
                    <TableCell align="right">
                      {props.protein}
                      &nbsp;g
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fett</TableCell>
                    <TableCell align="right">
                      {props.fat}
                      &nbsp;g
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Kohlenhydrate</TableCell>
                    <TableCell align="right">
                      {props.carbs}
                      &nbsp;g
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className={styles.bottomCont} data-justify-space-between={props.showSwapIcon ? 'true' : null}>
              {props.showSwapIcon && (
                <div className={styles.swapWrapper}>
                  <div className={styles.swapIconCont}>
                    <IconButton
                      style={{ fontSize: 'inherit', marginRight: -15 }}
                      color="inherit"
                      disabled={isSwapping}
                      onClick={this.swapMeal}
                    >
                      <RefreshIcon color="inherit" fontSize="inherit" />
                    </IconButton>
                  </div>
                  {isSwapping && <Loader color="#9E9E9E" />}
                </div>
              )}
              <div className={styles.favoriteIconCont} data-red={isFavorite ? 'true' : null}>
                <IconButton
                  onClick={() => this.setState({ isFavModalOpen: true })}
                  style={{ fontSize: 'inherit' }}
                  color="inherit"
                >
                  <FavoriteIcon color="inherit" fontSize="inherit" />
                </IconButton>
              </div>
            </div>
          </div>
        </Paper>
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
      </div>
    );
  }
}

MealGridItem.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  typeIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFav: PropTypes.bool,
  favId: PropTypes.number,
  favNote: PropTypes.string,
};

MealGridItem.defaultProps = {
  isFav: false,
  favId: null,
  favNote: '',
};
