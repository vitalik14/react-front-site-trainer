import React from 'react';
import { PropTypes } from 'prop-types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
} from 'react-share';

import styles from './SinglePost.scss';
import ButtonLoader from '../../common/components/Loaders/Button/ButtonLoader';
import { BlueButton, PrimaryButton, SecondaryButton } from '../../common/customizedMaterialComponents';
import post from '../../common/models/post';
import Slider from '../../common/components/Slider/SliderContainer';
import Comments from '../../common/components/Comments/Comments';
import PostGridItem from '../../common/components/GridItems/Post/PostGridItem';

const parseContent = html => (
  html
    .replace(
      /(?<=\[\[)([^\[\]]*)(?=\]\])/, // eslint-disable-line no-useless-escape
      match => `<iframe
                title="PurLife Video"
                src="https://player.vimeo.com/video/${match.split(':')[2].replace(']]', '')}"
                frameBorder="0"
                allowFullScreen
              />`,
    )
    .replace('[[', '')
    .replace(']]', '')
);

const SinglePost = ({
  baseDomain,
  data,
  isFavorite,
  openFavModal,
  closeFavModal,
  isFavModalOpen,
  favLoading,
  note,
  updateNote,
  isDeletingFromFav,
  submitFav,
  isSubmittingFav,
  deleteFav,
}) => (
  <>
    <div className={styles.postBlock}>
      <div className={styles.postTopWrapper}>
        <h1 className={styles.postTitle}>{data.title}</h1>
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
              onClick={openFavModal}
            >
              <FavoriteIcon color="inherit" fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className={styles.postPictureWrapper}>
        {!!data.banners.wide && <img src={data.banners.wide} alt="Artikelbanner" className={styles.postPicture} />}
      </div>
      <p
        className={styles.postContent}
        dangerouslySetInnerHTML={{
          __html: data.metadata.hasVideo
            ? parseContent(data.content)
            : data.content,
        }}
      />
      <div className={styles.postBottomInnerWrapper}>
        <div className={styles.trainerInfoWrapper}>
          <a
            href={`${baseDomain}/fitbook/profile/${data.author.id}`}
            className={styles.trainerAvatarLink}
          >
            <img
              src={data.author.profilePicUrl}
              alt={`Avatar von ${data.author.name}`}
              className={styles.trainerAvatar}
            />
          </a>
          <a
            href={`${baseDomain}/fitbook/profile/${data.author.id}`}
            className={styles.trainerName}
          >
            {data.author.name}
          </a>
        </div>
        <div className={styles.socialSharingWrapper}>
          <FacebookShareButton url={data.url}>
            <FacebookIcon size={20} round />
          </FacebookShareButton>
          <TwitterShareButton url={data.url}>
            <TwitterIcon size={20} round />
          </TwitterShareButton>
          <WhatsappShareButton url={data.url}>
            <WhatsappIcon size={20} round />
          </WhatsappShareButton>
          <TelegramShareButton url={data.url}>
            <TelegramIcon size={20} round />
          </TelegramShareButton>
        </div>
      </div>
    </div>
    <div style={{ marginBottom: 20 }}>
      <Slider
        title="Sie werden interessiert sein"
        slides={
          data.similarPosts.map(({
            id,
            title,
            date,
            excerpt,
            banners: { default: thumbnailUrl },
            category: { name: category },
            url,
            metadata: {
              commentsCount,
              isFavorite: isFav,
              favorite: {
                id: favId = null,
                data: {
                  note: favNote = null,
                } = {},
              } = {},
            },
          }) => (
            <PostGridItem
              key={id}
              id={id}
              baseDomain={baseDomain}
              title={title}
              date={date}
              excerpt={excerpt}
              thumbnailUrl={thumbnailUrl}
              url={url}
              commentsCount={commentsCount}
              isFav={isFav}
              favId={favId}
              favNote={favNote}
              category={category}
              showFavoriteIcon
            />
          ))
        }
      />
    </div>
    <Comments
      baseDomain={baseDomain}
      entityType="cmspost"
      entityItemId={data.id}
    />
    <Dialog
      fullWidth
      fullScreen={window.innerWidth < 768}
      open={isFavModalOpen || favLoading}
      onClose={closeFavModal}
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
          value={note}
          onChange={updateNote}
          margin="normal"
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        {isFavorite && (
          <PrimaryButton
            disabled={favLoading}
            onClick={deleteFav}
          >
            Entfernen
            {isDeletingFromFav && <ButtonLoader color="#ffffff" />}
          </PrimaryButton>
        )}
        <SecondaryButton
          disabled={favLoading}
          onClick={closeFavModal}
        >
          Schließen
        </SecondaryButton>
        <BlueButton
          color="primary"
          disabled={favLoading}
          onClick={submitFav}
        >
          Speichern
          {isSubmittingFav && <ButtonLoader color="#ffffff" />}
        </BlueButton>
      </DialogActions>
    </Dialog>
  </>
);

SinglePost.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  data: post,
  isFavorite: PropTypes.bool.isRequired,
  openFavModal: PropTypes.func.isRequired,
  closeFavModal: PropTypes.func.isRequired,
  isFavModalOpen: PropTypes.bool.isRequired,
  favLoading: PropTypes.bool.isRequired,
  note: PropTypes.string.isRequired,
  updateNote: PropTypes.func.isRequired,
  isDeletingFromFav: PropTypes.bool.isRequired,
  submitFav: PropTypes.func.isRequired,
  isSubmittingFav: PropTypes.bool.isRequired,
  deleteFav: PropTypes.func.isRequired,
};

SinglePost.defaultProps = {
  data: null,
};

export default SinglePost;
