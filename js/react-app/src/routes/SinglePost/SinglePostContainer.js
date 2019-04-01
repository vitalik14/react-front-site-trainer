import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { fetchPost } from '../../common/services/posts';
import SinglePost from './SinglePost';
import Loader from '../../common/components/Loaders/Layout/LayoutLoader';
import handleError from '../../common/errorHandler';
import { camalizeKeys } from '../../common/helpers';
import { addFavorite, deleteFavorite, updateFavorite } from '../../common/services/user';

export default class SinglePostContainer extends Component {
  state = {
    loading: true,
    data: null,
    isFavModalOpen: false,
    isAddedToFavorite: null,
    isSubmittingFav: false,
    isDeletingFromFav: false,
    note: '',
    newNote: '',
    changedFavorite: false,
    newFavId: null,
  };

  componentDidMount() {
    fetchPost(235)
      .then(({ data: { post } }) => this.setState({ loading: false, data: camalizeKeys(post) }))
      .catch(handleError);
  }

  componentDidUpdate(prevProps, { data: prevData }) {
    const { state: { data: nextData } } = this;
    if (!prevData && nextData) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        note: nextData.metadata.isFavorite ? nextData.metadata.favorite.data.note : '',
      });
    }
  }

  openFavModal = () => this.setState({ isFavModalOpen: true });

  submitFav = () => {
    const {
      state: {
        note,
        isAddedToFavorite,
        newFavId,
        data: { id, metadata: { isFav, favorite: { id: favId = null } = {} } },
      },
    } = this;

    const isFavorite = isAddedToFavorite === null
      ? isFav
      : isAddedToFavorite;

    this.setState({ isSubmittingFav: true });
    const request = isFavorite
      ? updateFavorite(newFavId || favId, note)
      : addFavorite('post', id, note);
    request
      .then(({ data }) => {
        this.setState({
          isFavModalOpen: false,
          isSubmittingFav: false,
          isAddedToFavorite: true,
          newNote: note,
          changedFavorite: true,
          newFavId: data.favorite_data.id,
        });
      })
      .catch(handleError);
  };

  deleteFav = () => {
    const {
      state: {
        newFavId,
        data: { metadata: { favorite: { id: favId = null } = {} } },
      },
    } = this;
    this.setState({ isDeletingFromFav: true });
    deleteFavorite('post', newFavId || favId)
      .then(() => {
        this.setState({
          isFavModalOpen: false,
          isDeletingFromFav: false,
          isAddedToFavorite: false,
          note: '',
          newNote: '',
          changedFavorite: true,
          newFavId: null,
        });
      })
      .catch(handleError);
  };

  updateNote = ({ target: { value } }) => this.setState({ note: value });

  closeFavModal = () => {
    const {
      state: {
        changedFavorite,
        newNote,
        isSubmittingFav,
        isDeletingFromFav,
        data: {
          metadata: {
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
        note,
      });
    }
  };

  render() {
    const {
      props: { baseDomain },
      state: {
        loading,
        data,
        isFavModalOpen,
        isAddedToFavorite,
        isSubmittingFav,
        isDeletingFromFav,
        note,
      },
    } = this;

    if (loading) return <Loader />;

    const isFavorite = isAddedToFavorite === null
      ? data.metadata.isFavorite
      : isAddedToFavorite;

    const favLoading = isSubmittingFav || isDeletingFromFav;

    return (
      <SinglePost
        baseDomain={baseDomain}
        data={data}
        isFavModalOpen={isFavModalOpen}
        isFavorite={isFavorite}
        favLoading={favLoading}
        isSubmittingFav={isSubmittingFav}
        isDeletingFromFav={isDeletingFromFav}
        note={note}
        closeFavModal={this.closeFavModal}
        openFavModal={this.openFavModal}
        deleteFav={this.deleteFav}
        submitFav={this.submitFav}
        updateNote={this.updateNote}
      />
    );
  }
}

SinglePostContainer.propTypes = {
  baseDomain: PropTypes.string.isRequired,
};
