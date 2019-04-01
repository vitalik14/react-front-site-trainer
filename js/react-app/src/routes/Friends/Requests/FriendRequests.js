import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';

import componentStyles from './FriendRequests.scss';
import routeStyles from '../Friends.scss';
import user from '../../../common/models/user';
import LayoutLoader from '../../../common/components/Loaders/Layout/LayoutLoader';
import ButtonLoader from '../../../common/components/Loaders/Button/ButtonLoader';
import { TextBlueButton, TextDarkGreyButton, TextPinkButton } from '../../../common/customizedMaterialComponents';

const ActionButtonStyles = {
  root: {
    minHeight: 24,
  },
  label: {
    fontSize: 12,
  },
};

export const RejectButton = withStyles(ActionButtonStyles)(TextDarkGreyButton);
export const AcceptButton = withStyles(ActionButtonStyles)(TextPinkButton);

const FriendRequests = ({
  baseDomain,
  isFetching,
  hasFetchedAtLeastOnce,
  items,
  itemsCount,
  itemsCountPerPage,
  itemsCurrentPage,
  canPaginateItems,
  friendIdBeingAccepted,
  friendIdBeingRejected,
  accept,
  reject,
  loadMoreItems,
}) => {
  if (isFetching && !hasFetchedAtLeastOnce) return <LayoutLoader />;

  if (!hasFetchedAtLeastOnce) return null;

  if (hasFetchedAtLeastOnce && !itemsCount) return <p className="placeholder">Keine Freundschaftsanfragen ¯\_(ツ)_/¯</p>;

  return (
    <>
      <h2 className={routeStyles.title}>
        Freundschaftsanfragen&nbsp;
        <span className={componentStyles.count}>
          +&nbsp;
          {itemsCount || ''}
        </span>
      </h2>
      <div className={componentStyles.block}>
        <ul className={componentStyles.list}>
          {items.map(({
            user: {
              id,
              name,
              type,
              profilePicUrl,
            },
          }) => (
            <li key={id} className={routeStyles.listItem}>
              <div className={routeStyles.itemTopWrapper}>
                <a href={`${baseDomain}/fitbook/profile/${id}`} className={routeStyles.avatarLink}>
                  <img src={profilePicUrl} alt={`Pic von ${name}`} className={routeStyles.avatar} />
                </a>
                <a href={`${baseDomain}/fitbook/profile/${id}`} className={routeStyles.friendNameLink}>
                  <h4 className={routeStyles.friendName}>
                    {name}
                    {type === 'trainer' && <span className="userTypeBadge">TRAINER</span>}
                    {type === 'team' && <span className="userTypeBadge">TEAM</span>}
                  </h4>
                </a>
              </div>
              <div className={componentStyles.buttonsWrapper}>
                <RejectButton onClick={() => reject(id)} disabled={!!friendIdBeingAccepted}>
                  Ablehnen
                  {id === friendIdBeingRejected && <ButtonLoader color="#4D4D4E" />}
                </RejectButton>
                <AcceptButton onClick={() => accept(id)} disabled={!!friendIdBeingRejected}>
                  Akzeptiren
                  {id === friendIdBeingAccepted && <ButtonLoader color="#EC407A" />}
                </AcceptButton>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isFetching && <LayoutLoader />}
      {canPaginateItems && (
        <div className="paginationWrapper">
          <div>
            <p className="paginationCount">
              Zeige&nbsp;
              {Math.min(itemsCount, itemsCountPerPage * itemsCurrentPage)}
              &nbsp;Freunde von&nbsp;
              {itemsCount}
            </p>
            <TextBlueButton
              onClick={() => loadMoreItems(itemsCurrentPage + 1)}
              disabled={!canPaginateItems || isFetching}
            >
              Laden Sie mehr Daten
            </TextBlueButton>
          </div>
        </div>
      )}
    </>
  );
};

FriendRequests.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasFetchedAtLeastOnce: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string,
      friendsSince: PropTypes.string,
      user,
    }),
  ).isRequired,
  itemsCount: PropTypes.number.isRequired,
  itemsCountPerPage: PropTypes.number.isRequired,
  itemsCurrentPage: PropTypes.number.isRequired,
  canPaginateItems: PropTypes.bool.isRequired,
  loadMoreItems: PropTypes.func.isRequired,
  accept: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
};

export default FriendRequests;
