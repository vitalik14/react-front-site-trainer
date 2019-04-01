import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';

import LayoutLoader from '../../common/components/Loaders/Layout/LayoutLoader';
import ButtonLoader from '../../common/components/Loaders/Button/ButtonLoader';
import SimilarMeals from './SimilarMeals/SimilarMealsContainer';
import Comments from '../../common/components/Comments/Comments';
import styles from './SingleMeal.scss';
import meal from '../../common/models/meal';
import { addFavorite, deleteFavorite, updateFavorite } from '../../common/services/user';
import handleError from '../../common/errorHandler';
import { BlueButton, PrimaryButton, SecondaryButton } from '../../common/customizedMaterialComponents';

export default class SingleMeal extends Component {
  state = {
    isFavModalOpen: false,
    isAddedToFavorite: null,
    isSubmittingFav: false,
    isDeletingFromFav: false,
    noteTextField: '',
    newNote: '',
    changedFavorite: false,
    newFavId: null,
  };

  componentWillReceiveProps({ data: { meta } }) {
    if (meta) {
      this.setState({
        noteTextField: meta.isFavorite ? meta.favorite.data.note : '',
      });
    }
  }

  submitFav = () => {
    const {
      state: {
        noteTextField,
        isAddedToFavorite,
        newFavId,
      },
      props: {
        data: { id, meta: { isFavorite: isFav, favorite: { id: favId = null } = {} } },
      },
    } = this;

    const isFavorite = isAddedToFavorite === null
      ? isFav
      : isAddedToFavorite;

    this.setState({ isSubmittingFav: true });
    const request = isFavorite
      ? updateFavorite(newFavId || favId, noteTextField)
      : addFavorite('video', id, noteTextField);
    request
      .then(({ data }) => {
        this.setState({
          isFavModalOpen: false,
          isSubmittingFav: false,
          isAddedToFavorite: true,
          newNote: noteTextField,
          changedFavorite: true,
          newFavId: data.favorite_data.id,
        });
      })
      .catch(handleError);
  };

  deleteFav = () => {
    const {
      props: {
        data: { meta: { favorite: { id: favId = null } = {} } },
      },
      state: { newFavId },
    } = this;
    this.setState({ isDeletingFromFav: true });
    deleteFavorite('video', newFavId || favId)
      .then(() => {
        this.setState({
          isFavModalOpen: false,
          isDeletingFromFav: false,
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
    const {
      state: {
        changedFavorite,
        newNote,
        isSubmittingFav,
        isDeletingFromFav,
      },
      props: {
        data: {
          meta: {
            favorite: {
              data: {
                note: favNote = null,
              } = {},
            } = {},
          },
        },
      },
    } = this;
    if (!isSubmittingFav && !isDeletingFromFav) {
      const note = changedFavorite
        ? newNote
        : favNote || '';
      this.setState({
        isFavModalOpen: false,
        noteTextField: note,
      });
    }
  };

  render() {
    const {
      state: {
        isFavModalOpen,
        isSubmittingFav,
        isDeletingFromFav,
        isAddedToFavorite,
        noteTextField,
      },
      props: { isFetching, data, baseDomain },
    } = this;

    if (isFetching && !Object.keys(data).length) return <LayoutLoader />;

    const isFavorite = isAddedToFavorite === null
      ? data.meta.isFavorite
      : isAddedToFavorite;

    const favLoading = isSubmittingFav || isDeletingFromFav;

    return (
      <>
        <div className={styles.block}>
          <div className={styles.topWrapper}>
            <h1 className={styles.title}>{data.name}</h1>
            <div className={styles.topIconsWrapper}>
              <div className={styles.printIconWrapper}>
                <IconButton color="inherit" fontSize="inherit" onClick={() => window.print()}>
                  <PrintIcon color="inherit" fontSize="inherit" />
                </IconButton>
              </div>
              <div className={styles.favoriteIconWrapper} data-red={isFavorite ? 'true' : null}>
                <Tooltip
                  title={
                    isFavorite
                      ? 'Favoritendetails bearbeiten oder aus Favoriten entfernen'
                      : 'Zu meinen Favoriten hinzufügen'
                  }
                >
                  <IconButton
                    style={{ fontSize: 'inherit' }}
                    color="inherit"
                    onClick={() => this.setState({ isFavModalOpen: true })}
                  >
                    <FavoriteIcon color="inherit" fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className={styles.pictureWrapper}>
            {data.banners.wide && <img src={data.banners.wide} alt="Mahlzeit Bild" className={styles.picture} />}
          </div>
          <div className={styles.infoWrapper}>
            <div className={styles.nutrientsWrapper}>
              <div className={styles.nutrientItem}>
                <h4 className={styles.nutrientAmount}>
                  {data.nutrients.carbs}
                  &nbsp;g
                </h4>
                <p className={styles.nutrientName}>Kohlenhydrate</p>
              </div>
              <div className={styles.nutrientItem}>
                <h4 className={styles.nutrientAmount}>
                  {data.nutrients.protein}
                  &nbsp;g
                </h4>
                <p className={styles.nutrientName}>Proteine</p>
              </div>
              <div className={styles.nutrientItem}>
                <h4 className={styles.nutrientAmount}>
                  {data.nutrients.fat}
                  &nbsp;g
                </h4>
                <p className={styles.nutrientName}>Fett</p>
              </div>
              <div className={styles.nutrientItem}>
                <h4 className={styles.nutrientAmount}>
                  {data.nutrients.kcal}
                  &nbsp;kcal
                </h4>
                <p className={styles.nutrientName}>Kaloriengehalt</p>
              </div>
            </div>
            <h3 className={styles.infoTitle}>Zutaten</h3>
            <ul className={styles.ingredientsList}>
              {data.ingredients.map(({ name, amount, unit }) => (
                <li key={Math.random()} className={styles.ingredientsListItem}>
                  <div>
                    <span>
                      {name}
                    </span>
                  </div>
                  <div>
                    <span>
                      {`${amount} ${unit}`}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className={styles.infoTitle}>Zubereitung</h3>
            <div
              className={styles.preparationContent}
              dangerouslySetInnerHTML={{ __html: data.preparation }}
            />
          </div>
        </div>
        <SimilarMeals
          baseDomain={baseDomain}
          id={data.categories[Math.floor(Math.random() * data.categories.length)].id}
        />
        <Comments baseDomain={baseDomain} entityType="recipe" entityItemId={data.id} />
        <Dialog
          fullWidth
          fullScreen={window.innerWidth < 768}
          open={isFavModalOpen || favLoading}
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
                disabled={favLoading}
                onClick={this.deleteFav}
              >
                Entfernen
                {isDeletingFromFav && <ButtonLoader color="#ffffff" />}
              </PrimaryButton>
            )}
            <SecondaryButton
              disabled={favLoading}
              onClick={this.closeFavModal}
            >
              Schließen
            </SecondaryButton>
            <BlueButton
              color="primary"
              disabled={favLoading}
              onClick={this.submitFav}
            >
              Speichern
              {isSubmittingFav && <ButtonLoader color="#ffffff" />}
            </BlueButton>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

SingleMeal.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  baseDomain: PropTypes.string.isRequired,
  data: meal,
};

SingleMeal.defaultProps = {
  data: {},
};
