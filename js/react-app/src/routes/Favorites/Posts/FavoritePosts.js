import React from 'react';
import { PropTypes } from 'prop-types';

import styles from '../Favorites.scss';
import post from '../../../common/models/post';
import PostGridItem from '../../../common/components/GridItems/Post/PostGridItem';
import Loader from '../../../common/components/Loaders/Layout/LayoutLoader';

const FavoritePosts = ({
  baseDomain,
  data: { isFetching, items },
}) => (
  <div>
    {isFetching && <Loader />}
    {(!isFetching && !items.length) && (
      <h1 className={styles.noDataTitle}>Du hast noch keine Videos favorisiert.</h1>
    )}
    {(!isFetching && !!items.length) && (
      <div className={styles.gridCont}>
        {
          items.map(({
            entity: {
              id,
              title,
              date,
              excerpt,
              url,
              banners: { ['default']: thumbnailUrl }, // eslint-disable-line no-useless-computed-key
              metadata: { commentsCount },
              category: { name: categoryName },
            },
            fav: {
              id: favId,
              data: { note: favNote },
            },
          }) => (
            <div key={id} className={styles.gridItem}>
              <PostGridItem
                id={id}
                baseDomain={baseDomain}
                title={title}
                thumbnailUrl={thumbnailUrl}
                date={date}
                excerpt={excerpt}
                category={categoryName}
                commentsCount={commentsCount}
                url={url}
                favId={favId}
                favNote={favNote}
                showFavoriteIcon
                isFav
              />
            </div>
          ))
        }
      </div>
    )
    }
  </div>
);

FavoritePosts.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  data: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(post),
    count: PropTypes.number,
    countPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    canPaginate: PropTypes.bool,
  }).isRequired,
};

export default FavoritePosts;
