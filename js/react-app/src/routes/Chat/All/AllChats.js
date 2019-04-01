import React from 'react';
import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';
import GroupIcon from '@material-ui/icons/Group';

import styles from './AllChats.scss';
import Loader from '../../../common/components/Loaders/Layout/LayoutLoader';
import { getCurrentPath } from '../Chat';
import user from '../../../common/models/user';

const cut = str => (
  str.length > 20 ? str.slice(0, 20).trim().concat('...') : str
);

const AllChats = ({
  isFetchingCurrentUser,
  currentUser,
  chats: {
    isFetching,
    hasFetchedAtLeastOnce,
    items,
    itemsCount,
  },
}) => {
  if (isFetching && !hasFetchedAtLeastOnce) return <Loader />;

  if (!hasFetchedAtLeastOnce) return null;

  if (hasFetchedAtLeastOnce && !itemsCount) return <p className="placeholder">Noch keine Chats</p>;

  return (
    <div className={styles.wrapper}>
      {items.map(({
        id, type, name, lastMessage, users,
      }) => (
        <NavLink
          className={styles.item}
          activeClassName={styles.selected}
          key={id}
          to={`${getCurrentPath()}/${id}`}
        >
          {type === 'single' && !isFetchingCurrentUser && currentUser.id && (
            <img
              src={(users.find(({ id: userId }) => userId !== currentUser.id) || users[0]).profilePicUrl}
              alt="Avatar"
              className={styles.chatAvatar}
            />
          )}
          {type === 'group' && (
            <div className={styles.groupIconWrapper}>
              <GroupIcon color="inherit" fontSize="inherit" />
            </div>
          )}
          <div>
            <h3 className={styles.chatTitle}>
              {type === 'single' && !isFetchingCurrentUser
              && (users.find(({ id: userId }) => userId !== currentUser.id) || users[0]).name.split(' ')[0]}
              {type === 'group'
              && (name || users.reduce(
                (acc, { name: userName }, idx, arr) => `
                      ${acc}${userName.split(' ')[0]}${idx === arr.length - 1 ? '' : ', '}
                    `,
                '',
              ))
              }
            </h3>
            <p
              className={styles.lastMessage}
              dangerouslySetInnerHTML={{ __html: lastMessage ? cut(lastMessage) : 'Noch keine Nachrichten' }}
            />
          </div>
        </NavLink>
      ))}
    </div>
  );
};

AllChats.propTypes = {
  isFetchingCurrentUser: PropTypes.bool.isRequired,
  currentUser: user,
  chats: PropTypes.shape({
    isFetching: PropTypes.bool,
    hasFetchedAtLeastOnce: PropTypes.bool,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        lastMessage: PropTypes.string,
        name: PropTypes.string,
        owner: PropTypes.bool,
        type: PropTypes.string,
        users: PropTypes.arrayOf(user),
      }),
    ),
    itemsCount: PropTypes.number,
  }).isRequired,
};

AllChats.defaultProps = {
  currentUser: {},
};

export default AllChats;
