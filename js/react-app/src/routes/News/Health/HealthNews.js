import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import PostGridItem from '../../../common/components/GridItems/Post/PostGridItem';
import post from '../../../common/models/post';
import componentStyles from './HealthNews.scss';
import Loader from '../../../common/components/Loaders/Layout/LayoutLoader';

const isPastDate = date => new Date(date).getTime() < Date.now();

const HealthNews = ({
  baseDomain,
  isFetching,
  items,
  currentUserType,
}) => {
  if (isFetching) return <Loader />;

  if (!items.length) {
    return <p>Keine Gesundheitsnachrichten ¯\_(ツ)_/¯</p>;
  }

  return (
    <div className={componentStyles.gridCont}>
      {
        items.map(({
          id,
          title,
          slug,
          banners: { default: thumbnailUrl },
          excerpt,
          metadata: { commentsCount },
          date,
        }) => (
          <Fragment key={id}>
            {
              isPastDate(date) || (isPastDate(date) && currentUserType === 'team')
                ? (
                  <div className={componentStyles.gridItem}>
                    <PostGridItem
                      key={id}
                      baseDomain={baseDomain}
                      title={title}
                      url={`${baseDomain.replace('staging.', '')}/beratung/${slug}`}
                      thumbnailUrl={thumbnailUrl}
                      excerpt={excerpt}
                      commentsCount={commentsCount}
                      date={date}
                      flexDirection="row"
                      showFavoriteIcon={false}
                    />
                  </div>
                )
                : null
            }
          </Fragment>
        ))
      }
    </div>
  );
};

HealthNews.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(post).isRequired,
  currentUserType: PropTypes.string,
};

HealthNews.defaultProps = {
  currentUserType: null,
};

export default HealthNews;
