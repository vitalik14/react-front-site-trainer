import React from 'react';
import { PropTypes } from 'prop-types';
import IconButtonWithOutStyles from '@material-ui/core/IconButton';
import WhatsHotIcon from '@material-ui/icons/Whatshot';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import { withStyles } from '@material-ui/core/styles/index';
import TimeAgo from 'react-timeago';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { shortnameToImage } from 'emojione';

import styles from './FitBookSidebar.scss';
import { placesModel } from '../FitBook';
import fitBookPost from '../../../common/models/fitBookPost';
import { formatter, formatDateLong } from '../../../common/helpers';
import Comments from '../../../common/components/Comments/Comments';
import ButtonLoader from '../../../common/components/Loaders/Button/ButtonLoader';

const IconButton = withStyles({
  root: {
    padding: 0
  },
})(IconButtonWithOutStyles);

const FitBookSidebar = ({
  baseDomain,
  infoBoxes,
  popups,
  kcalStats,
  pinnedPost,
  likePost,
  unlikePost,
  isPinnedPostUpdatingLike,
  unpinPost,
  postIdUpdatingPinnedState,
  currentUserType,
}) => (
  <>
    {infoBoxes && infoBoxes.map(content => (
      <div
        key={Math.random()}
        className={styles.infoBox}
        dangerouslySetInnerHTML={{ __html: shortnameToImage(content) }}
      />
    ))}
    {popups && popups.map(({ id, title, content }) => (
      <div key={id} className={styles.popup}>
        <h3 className={styles.popupTitle}>{title}</h3>
        <p
          className={styles.popupContent}
          dangerouslySetInnerHTML={{ __html: shortnameToImage(content) }}
        />
      </div>
    ))}
    {pinnedPost && (
      <div className={styles.pinnedPostWrapper}>
        <div className={styles.pinnedPostTop}>
          <img
            src={pinnedPost.author.profilePicUrl}
            alt={`Avatar von ${pinnedPost.author.name}`}
            className={styles.userAvatar}
          />
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p className={styles.userName}>
                {pinnedPost.author.name}
                {pinnedPost.author.type === 'trainer' && <span className="userTypeBadge">TRAINER</span>}
                {pinnedPost.author.type === 'team' && <span className="userTypeBadge">TEAM</span>}
              </p>
              {currentUserType === 'team' && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {pinnedPost.id === postIdUpdatingPinnedState && <ButtonLoader color="#9E9E9E" />}
                  <IconButton
                    style={{
                      width: 24, height: 24, fontSize: 'inherit', marginLeft: 5,
                    }}
                    color="inherit"
                    onClick={() => unpinPost(pinnedPost.id)}
                  >
                    <Tooltip title="Diesen Pin aus der Fitbook-Sidebar entfernen">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -3 512.00023 512" width="14" height="14">
                        <path d="m229.726562 50.316406c2.628907 0 5.210938-1.070312 7.070313-2.933594 1.859375-1.859374 2.929687-4.4375 2.929687-7.070312 0-2.640625-1.070312-5.207031-2.929687-7.070312-1.859375-1.867188-4.441406-2.929688-7.070313-2.929688-2.632812 0-5.210937 1.0625-7.070312 2.929688-1.863281 1.863281-2.933594 4.429687-2.933594 7.070312 0 2.632812 1.070313 5.210938 2.933594 7.070312 1.859375 1.863282 4.4375 2.933594 7.070312 2.933594zm0 0" fill="#9e9e9e" />
                        <path d="m479.144531 32.910156c-21.222656-21.222656-49.4375-32.910156-79.449219-32.910156-30.011718 0-58.226562 11.6875-79.449218 32.910156l-53.585938 53.585938c-4.976562 4.976562-7.714844 11.589844-7.714844 18.625s2.738282 13.652344 7.714844 18.628906l31.898438 31.898438c10.273437 10.269531 26.980468 10.269531 37.253906 0l30.425781-30.425782c2.222657-2.222656 3.269531-5.363281 2.828125-8.476562-1.484375-10.449219 2.394532-20.835938 10.382813-27.789063 11.550781-10.046875 28.960937-10.042969 40.503906.011719 6.582031 5.730469 10.367187 13.65625 10.667969 22.316406.296875 8.671875-2.914063 16.824219-9.046875 22.953125-6.945313 6.945313-16.515625 10.132813-26.261719 8.75-3.109375-.441406-6.253906.605469-8.480469 2.832031l-30.425781 30.425782c-10.269531 10.269531-10.269531 26.980468 0 37.25l28.152344 28.152344-221.417969 221.417968c-11.316406 11.3125-25.179687 18.535156-39.753906 21.714844 3.171875-2.25 6.1875-4.765625 8.992187-7.570312 13.027344-13.027344 20.199219-30.347657 20.199219-48.769532s-7.171875-35.742187-20.199219-48.765625c-13.027344-13.027343-30.347656-20.203125-48.769531-20.203125s-35.738281 7.175782-48.765625 20.203125c-6.332031 6.328125-11.15625 13.605469-14.503906 21.367188-1.777344-22.0625 3.804687-44.734375 17.132812-64.082031l178.121094-258.511719c3.132812-4.546875 1.988281-10.777344-2.5625-13.910157-4.546875-3.132812-10.773438-1.984374-13.90625 2.5625l-178.121094 258.511719c-32.5625 47.257813-26.742187 111.011719 13.839844 151.597657 19.636719 19.632812 45.425781 29.453124 71.21875 29.453124s51.585938-9.820312 71.222656-29.453124l224.597656-224.601563c1.664063.324219 3.355469.488281 5.050782.488281 6.742187 0 13.488281-2.570312 18.625-7.703125l53.585937-53.585937c43.808594-43.808594 43.808594-115.089844 0-158.898438zm-430.15625 360.90625c9.246094-9.246094 21.542969-14.339844 34.621094-14.339844 13.082031 0 25.378906 5.09375 34.625 14.339844 9.25 9.25 14.34375 21.546875 14.34375 34.625s-5.09375 25.375-14.34375 34.625c-9.246094 9.25-21.542969 14.339844-34.625 14.339844-12.242187 0-23.796875-4.464844-32.8125-12.621094-.605469-.570312-1.21875-1.128906-1.8125-1.71875-19.089844-19.09375-19.089844-50.15625.003906-69.25zm416.011719-216.152344-53.585938 53.585938c-2.472656 2.472656-6.492187 2.472656-8.964843 0l-31.898438-31.898438c-2.472656-2.472656-2.472656-6.492187 0-8.964843l27.117188-27.117188c14.207031.59375 27.847656-4.6875 38.046875-14.886719 9.949218-9.949218 15.378906-23.71875 14.894531-37.785156-.492187-14.265625-6.714844-27.300781-17.519531-36.714844-19.027344-16.570312-47.734375-16.578124-66.773438-.015624-11.804687 10.269531-18.148437 25.121093-17.527344 40.511718l-27.125 27.121094c-2.46875 2.472656-6.492187 2.472656-8.964843 0l-31.898438-31.898438c-1.195312-1.195312-1.855469-2.789062-1.855469-4.480468 0-1.695313.660157-3.285156 1.855469-4.480469l53.585938-53.589844c17.445312-17.441406 40.636719-27.046875 65.308593-27.046875 24.667969 0 47.859376 9.605469 65.304688 27.046875 36.011719 36.011719 36.011719 94.605469 0 130.613281zm0 0" fill="#9e9e9e" />
                      </svg>
                    </Tooltip>
                  </IconButton>
                </div>
              )}
            </div>
            <div className={styles.pinnedPostInfo}>
              <Tooltip title={formatDateLong(new Date(pinnedPost.createdAt))}>
                <a href={`${baseDomain}/fitbook/post/${pinnedPost.id}`} className={styles.pinnedPostLink}>
                  <TimeAgo
                    date={pinnedPost.createdAt}
                    formatter={formatter}
                  />
                </a>
              </Tooltip>
              <span className={styles.divider}>·</span>
              <p>
                mit&nbsp;
                {pinnedPost.meta.sharedWith}
                &nbsp;geteilt
              </p>
            </div>
          </div>
        </div>
        <div className={styles.pinnedPostContentWrapper}>
          <p
            className={styles.pinnedPostContent}
            dangerouslySetInnerHTML={{ __html: shortnameToImage(pinnedPost.content) }}
          />
        </div>
        <div className={styles.pinnedPostActionsWrapper}>
          <div className={styles.pinnedPostActionWrapper}>
            <div className={styles.pinnedPostActionIconWrapper}>
              <IconButton
                style={{
                  width: 28,
                  height: 28,
                  fontSize: 'inherit',
                  color: pinnedPost.meta.isLiked ? '#0336FF' : '#9E9E9E',
                }}
                disabled={isPinnedPostUpdatingLike}
                onClick={pinnedPost.meta.isLiked ? unlikePost : likePost}
              >
                <ThumbUpIcon color="inherit" fontSize="inherit" />
              </IconButton>
            </div>
            <p className={styles.pinnedPostActionText}>
              {pinnedPost.meta.likes}
            </p>
            {isPinnedPostUpdatingLike && <ButtonLoader />}
          </div>
          <div className={styles.pinnedPostActionWrapper}>
            <div className={styles.pinnedPostActionIconWrapper} style={{ height: 16 }}>
              <CommentIcon color="inherit" fontSize="inherit" />
            </div>
            <p className={styles.pinnedPostActionText}>
              {pinnedPost.meta.comments}
            </p>
          </div>
        </div>
        <Comments
          baseDomain={baseDomain}
          entityType="post"
          entityItemId={pinnedPost.id}
          limit={3}
          showForm={false}
          wrapped
          repliable
          postType="pinned"
        />
      </div>
    )}
    <div className={styles.statsWrapper}>
      <h3 className={styles.statsTitle}>Aktivste Nutzer der Woche</h3>
      <ul className={styles.statsList}>
        {
          kcalStats && kcalStats.kcal.today
            .slice(0, 3)
            .map(({ user: { id, name, profilePicUrl }, kcal }) => (
              <li key={id} className={styles.statsListItem}>
                <div className={styles.statsUserWrapper}>
                  <img src={profilePicUrl} alt={`Avatar von ${name}`} className={styles.userAvatar} />
                  <p className={styles.userName}>{name}</p>
                </div>
                <div className={styles.statsKcalWrapper}>
                  <div className={styles.kcalIconWrapper}>
                    <WhatsHotIcon color="inherit" fontSize="inherit" />
                  </div>
                  <p className={styles.statsKcalAmount}>{kcal}</p>
                </div>
              </li>
            ))
        }
      </ul>
    </div>
  </>
);

FitBookSidebar.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  infoBoxes: PropTypes.arrayOf(PropTypes.string),
  popups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.String,
      title: PropTypes.String,
      content: PropTypes.String,
    }),
  ),
  kcalStats: PropTypes.shape({
    kcal: PropTypes.shape({
      today: placesModel,
      week: placesModel,
      month: placesModel,
    }),
  }),
  pinnedPost: fitBookPost,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  isPinnedPostUpdatingLike: PropTypes.bool.isRequired,
  unpinPost: PropTypes.func.isRequired,
  postIdUpdatingPinnedState: PropTypes.number,
  currentUserType: PropTypes.string.isRequired,
};

FitBookSidebar.defaultProps = {
  postIdUpdatingPinnedState: null,
};

export default FitBookSidebar;
