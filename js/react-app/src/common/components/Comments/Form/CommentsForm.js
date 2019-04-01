import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PropTypes } from 'prop-types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import { shortnameToImage } from 'emojione';

import styles from './CommentsForm.scss';
import user from '../../../models/user';
import { PrimaryButton } from '../../../customizedMaterialComponents';
import ButtonLoader from '../../Loaders/Button/ButtonLoader';

export default class CommentsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contentFieldValue: '',
	    existsComment: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({ existsComment: !!value.trim() });
    this.setState({ contentFieldValue: shortnameToImage(value) });
  }

  handleKeyUp({ ctrlKey, key }) {
    if (ctrlKey && key === 'Enter' && this.state.existsComment) {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    const { state: { contentFieldValue }, props: { create } } = this;
    create(contentFieldValue);
    this.setState({ contentFieldValue: '' });
  }

  render() {
    const {
      state: { contentFieldValue, existsComment },
      props: {
        currentUser: { profilePicUrl },
        isCreating,
        isFetchingCurrentUser,
        wrapped,
      },
    } = this;
    return (
      <>
        {!wrapped && <h2 className={styles.title}>Komment</h2>}
        <div className={wrapped ? styles.wrappedBlock : styles.block}>
          {isFetchingCurrentUser && (
            <div className={styles.avatarPlaceholderWrapper}>
              <AccountCircleIcon color="inherit" fontSize="inherit" />
            </div>
          )}
          {!isFetchingCurrentUser && <img src={profilePicUrl} alt="Dein Avatar" className={styles.avatar} />}
          <div className={styles.leftInnerWrapper}>
            <TextField
              fullWidth
              multiline
              label="Dein Kommentar"
              style={{ marginBottom: 20 }}
              value={renderToStaticMarkup(renderToStaticMarkup(contentFieldValue))}
              disabled={isCreating}
              onChange={this.handleChange}
              onKeyUp={this.handleKeyUp}
            />
            <PrimaryButton onClick={this.handleSubmit} disabled={isCreating || !existsComment}>
              Teilen
              {isCreating && <ButtonLoader color="white" />}
            </PrimaryButton>
          </div>
        </div>
      </>
    );
  }
}

CommentsForm.propTypes = {
  currentUser: user,
  isFetchingCurrentUser: PropTypes.bool.isRequired,
  isCreating: PropTypes.bool,
  create: PropTypes.func.isRequired,
  wrapped: PropTypes.bool,
};

CommentsForm.defaultProps = {
  currentUser: {},
  isCreating: false,
  wrapped: false,
};
