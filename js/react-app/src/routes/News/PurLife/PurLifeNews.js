import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import TimeAgo from 'react-timeago';
import germanStrings from 'react-timeago/lib/language-strings/de';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import post from '../../../common/models/post';
import styles from './PurLifeNews.scss';
import Loader from '../../../common/components/Loaders/Layout/LayoutLoader';

const formatter = buildFormatter(germanStrings);

const isPastDate = date => new Date(date).getTime() < Date.now();

const PurLifeNews = ({
  isFetching,
  items,
  loadPurLifePosts,
  currentUserType,
}) => {
  loadPurLifePosts();

  if (isFetching) return <Loader />;

  if (!items.length) {
    return <p>Keine Gesundheitsnachrichten ¯\_(ツ)_/¯</p>;
  }

  return (
    <div className={styles.gridCont}>
      {
        items.map(({
          title,
          postDate,
          content,
        }) => (
          <Fragment key={Math.random()}>
            {
              isPastDate(postDate) || (isPastDate(postDate) && currentUserType === 'team')
                ? (
                  <div className={styles.gridItem}>
                    <div className={styles.topCont}>
                      <h3 className={styles.title}>{title}</h3>
                      <TimeAgo
                        className={styles.timeAgo}
                        date={postDate}
                        formatter={formatter}
                      />
                    </div>
                    <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
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

PurLifeNews.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(post).isRequired,
  loadPurLifePosts: PropTypes.func.isRequired,
  currentUserType: PropTypes.string,
};

PurLifeNews.defaultProps = {
  currentUserType: null,
};

export default PurLifeNews;
