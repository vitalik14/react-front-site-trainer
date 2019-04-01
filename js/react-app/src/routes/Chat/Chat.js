import React from 'react';
import { PropTypes } from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import styles from './Chat.scss';
import AllChats from './All/AllChatsContainer';
import GroupChatCreation from './Creation/GroupChatCreationContainer';
import SingleChat from './Single/SingleChatContainer';

export const getCurrentPath = () => {
  const { location: { pathname } } = window;
  const paths = pathname.split('/');
  
  if (!Number.isNaN(parseFloat(paths[paths.length-1]))) {
    return paths.slice(0, paths.length-1).join('/');
  }

  if (paths[paths.length-1] !== 'messages') {
    return paths.slice(0, paths.length-1).join('/');
  }
  return paths.join('/');
};

const Chat = ({ baseDomain, friends }) => (
  <Router>
    <div className={styles.flexWrapper}>
      <div className={styles.rightInnerWrapper}>
        <GroupChatCreation friends={friends} />
        <AllChats />
      </div>
      <div className={styles.leftInnerWrapper}>
        <Route
          path={`${getCurrentPath()}/:id`}
          render={props => (
            <SingleChat
              {...props}
              baseDomain={baseDomain}
              friends={friends}
            />
          )}
        />
        <Route
          exact
          path={`${getCurrentPath()}`}
          render={() => <p className="placeholder">Wählen Sie einen Chat aus</p>}
        />
      </div>
    </div>
  </Router>
);

Chat.propTypes = {
  baseDomain: PropTypes.string.isRequired,
};

export default Chat;
