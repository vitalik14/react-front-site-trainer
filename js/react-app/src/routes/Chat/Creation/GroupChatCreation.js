import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Tooltip from '@material-ui/core/Tooltip';

import { PrimaryButton, TextBlueButton } from '../../../common/customizedMaterialComponents';
import styles from './GroupChatCreation.scss';
import user from '../../../common/models/user';

export default class GroupChatCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      chatName: '',
      selectedFriendIds: [],
    };

    this.handleFriendToggle = this.handleFriendToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFriendToggle(id) {
    this.setState(({ selectedFriendIds }) => ({
      selectedFriendIds: selectedFriendIds.indexOf(id) === -1
        ? selectedFriendIds.concat(id)
        : selectedFriendIds.filter(friendId => friendId !== id),
    }));
  }

  handleSubmit() {
    const { props: { create }, state: { chatName, selectedFriendIds } } = this;
    create(selectedFriendIds, chatName);
    this.setState({ isModalOpen: false });
  }

  render() {
    const {
      state: { isModalOpen, chatName, selectedFriendIds },
      props: { loading, friends: { items: friends } },
    } = this;
    return (
      <>
        <PrimaryButton
          style={{ width: '100%', marginBottom: 12 }}
          onClick={() => this.setState({ chatName: '', selectedFriendIds: [], isModalOpen: true })}
        >
          Gruppenchat erstellen
        </PrimaryButton>
        <Dialog
          fullScreen={window.innerWidth < 768}
          open={isModalOpen || loading}
          onClose={() => this.setState({ isModalOpen: false })}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Gruppenchat-Erstellung</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name (wahlweise)"
              value={chatName}
              disabled={loading}
              onChange={({ target: { value } }) => this.setState({ chatName: value })}
              style={{ marginBottom: 40 }}
            />
            <FormGroup component="fieldset">
              {
                friends.map(({ user: { id, name } }) => (
                  <FormControlLabel
                    key={id}
                    className={styles.checkboxCont}
                    control={(
                      <Checkbox
                        checked={selectedFriendIds.indexOf(id) !== -1}
                        onChange={() => this.handleFriendToggle(id)}
                        name={name}
                      />
                    )}
                    label={name}
                  />
                ))
              }
            </FormGroup>
          </DialogContent>
          <DialogActions style={{ justifyContent: 'center !important' }}>
            <TextBlueButton
              color="primary"
              disabled={loading}
              onClick={() => this.setState({ isModalOpen: false })}
              autoFocus
            >
              Stornieren
            </TextBlueButton>
            <Tooltip
              title="Gruppen-Chats müssen neben Ihnen mindestens 2 Benutzer enthalten"
              open={selectedFriendIds.length < 2}
            >
              <PrimaryButton
                color="primary"
                disabled={loading || selectedFriendIds.length < 2}
                onClick={this.handleSubmit}
              >
                Erstellen
                {loading && (
                  <div style={{ height: 16, marginLeft: 15 }}>
                    <CircularProgress color="inherit" size={16} />
                  </div>
                )}
              </PrimaryButton>
            </Tooltip>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

GroupChatCreation.propTypes = {
  loading: PropTypes.bool.isRequired,
  create: PropTypes.func.isRequired,
  friends: PropTypes.shape({
    items: PropTypes.shape({
      friendsSince: PropTypes.string,
      status: PropTypes.string,
      user,
    }),
  }).isRequired,
};
