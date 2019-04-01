import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import { PropTypes } from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButtonWithOutStyles from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MoodIcon from '@material-ui/icons/Mood';
import { withStyles } from '@material-ui/core/styles/index';
import EmojiPicker from 'emoji-picker-react';
import { shortnameToImage } from 'emojione';

import styles from './FitBookPostCreation.scss';
import { PrimaryButton, StyledRadio } from '../../../common/customizedMaterialComponents';
import Loader from '../../../common/components/Loaders/Button/ButtonLoader';

const sharedWithOptions = [
  { value: 0, label: 'Offentlich' },
  { value: 1, label: 'Purlife' },
  { value: 2, label: 'Freunde' },
];

const IconButton = withStyles({
  root: {
    padding: 0
  },
})(IconButtonWithOutStyles);

export default class FitBookPostCreation extends Component {
  static checkSpaces(str) {
    if (typeof str === 'string') {
      let spacesRemoved = str.trim();
      spacesRemoved = spacesRemoved.replace('&nbsp;', '');
      return spacesRemoved.length > 0;
    }
    return false;
  }

  constructor(props) {
    super(props);

    this.contentInput = React.createRef();

    this.state = {
      content: '',
      sharedWith: 0,
      uploadedFiles: [],
      totalFilesSize: 0,
      isEmojiPickerVisible: false,
    };

    this.fileInput = React.createRef();

    this.tryToSubmitWithKey = this.tryToSubmitWithKey.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.updateSharedWith = this.updateSharedWith.bind(this);
    this.submit = this.submit.bind(this);
    this.handleFilesChange = this.handleFilesChange.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.removeAllFiles = this.removeAllFiles.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.toggleEmojiPicker = this.toggleEmojiPicker.bind(this);
    this.handleEmojiSelect = this.handleEmojiSelect.bind(this);
  }

  updateContent({ target: { value } }) {
    if (this.checkSpaces(value)) {
      return;
    }
    this.setState({ content: shortnameToImage(value) });
  }

  handleBlur() {
    this.setState(({ content }) => ({
      content: this.constructor.checkSpaces(content) && (content === '<br>' || content === '<div><br></div>') ? '' : shortnameToImage(content),
    }));
  }

  tryToSubmitWithKey({ ctrlKey, key }) {
    if (ctrlKey && key === 'Enter') {
      this.submit();
    }
  }

  updateSharedWith({ target: { value } }) {
    this.setState({ sharedWith: value });
  }

  handleFilesChange() {
    const { length, ...uploadedFiles } = this.fileInput.current.files;
    let id = 0;
    this.setState({
      uploadedFiles: Object.values(uploadedFiles)
        .map(file => {
          const fileId = id++; // eslint-disable-line no-plusplus
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.setState(({ totalFilesSize, uploadedFiles: stateFiles }) => ({
              uploadedFiles: stateFiles.map(stateFile => {
                if (stateFile.id === fileId) {
                  Object.assign(stateFile, { data: reader.result });
                }
                return stateFile;
              }),
              totalFilesSize: totalFilesSize + file.size,
            }));
          };
          return { id: fileId, filename: file.name, size: file.size };
        }),
    });
  }

  removeFile(fileId, size) {
    this.setState(({ uploadedFiles, totalFilesSize }) => ({
      uploadedFiles: uploadedFiles.filter(({ id }) => id !== fileId),
      totalFilesSize: totalFilesSize - size,
    }));
  }

  removeAllFiles() {
    this.setState({ uploadedFiles: [], totalFilesSize: 0 });
  }

  toggleEmojiPicker() {
    this.setState(({ isEmojiPickerVisible }) => ({
      isEmojiPickerVisible: !isEmojiPickerVisible,
    }));
  }

  handleEmojiSelect(e, { name }) {
    this.setState(({ content }) => ({
      isEmojiPickerVisible: false,
      content: content.concat(shortnameToImage(`:${name}:`)),
    }));
  }

  submit() {
    const { state: { content, sharedWith, uploadedFiles }, props: { create } } = this;
    create(content, sharedWith, uploadedFiles);
    this.setState({ content: '', sharedWith: 0, uploadedFiles: [] });
  }

  render() {
    const {
      state: {
        content, sharedWith, uploadedFiles, totalFilesSize, isEmojiPickerVisible,
      },
      props: {
        loading, avatarURL, userType, isFetchingCurrentUser,
      },
      constructor: { checkSpaces },
    } = this;
    return (
      <>
        <h2 className={styles.title}>Neuer Beitrag</h2>
        <div className={styles.block}>
          {isFetchingCurrentUser && (
            <div className={styles.avatarPlaceholderWrapper}>
              <AccountCircleIcon color="inherit" fontSize="inherit" />
            </div>
          )}
          {!isFetchingCurrentUser && <img src={avatarURL} alt="Dein Avatar" className={styles.avatar} />}
          <div className={styles.leftInnerWrapper}>
            <ContentEditable
              innerRef={this.contentInput}
              html={content}
              disabled={!!loading}
              onChange={this.updateContent}
              onKeyUp={this.tryToSubmitWithKey}
              onBlur={this.handleBlur}
              className={styles.contentInput}
              placeholder="Was gibts neues?"
            />
            <div className={styles.radioOptionsWrapper}>
              <p className={styles.sharedWithLabel}>Teilen mit:</p>
              <RadioGroup
                className={styles.radioGroup}
                name="sharedWith"
                onChange={this.updateSharedWith}
                disabled={!!loading}
                value={String(sharedWith)}
                row
              >
                {
                  sharedWithOptions.map(({ value, label }) => (
                    <FormControlLabel
                      key={value}
                      value={String(value)}
                      label={label}
                      control={<StyledRadio />}
                    />
                  ))
                }
              </RadioGroup>
              <input
                onChange={this.handleFilesChange}
                ref={this.fileInput}
                className={styles.fileInput}
                name="files"
                id="files"
                type="file"
                accept={userType === 'user' ? '.png, .jpg, .jpeg' : null}
                multiple
              />
              <Tooltip
                title={
                  userType !== 'user'
                    ? 'Nur .jpg, .jpeg und .png. sind erlaubt'
                    : 'Wenn Sie mindestens eine Datei mit einer anderen Erweiterung als .jpg, .jpeg und .png auswählen. dann wird nur das erste von denen, die keine Bilder sind, eingereicht'
                }
              >
                <label id="files-label" htmlFor="files" className={styles.attachmentLabel}> { /* eslint-disable-line */ }
                  <div className={styles.attachmentIconWrapper}>
                    <AttachmentIcon color="inherit" fontSize="inherit" />
                  </div>
                  <span>FOTO HINZUFÜGEN</span>
                </label>
              </Tooltip>
              <div className={styles.emojiIconWrapper}>
                <IconButton
                  style={{ width: 32, height: 32, fontSize: 'inherit' }}
                  color="inherit"
                  onClick={this.toggleEmojiPicker}
                >
                  <MoodIcon color="inherit" fontSize="inherit" />
                </IconButton>
                {isEmojiPickerVisible && (
                  <div className={styles.emojiPickerWrapper}>
                    <EmojiPicker onEmojiClick={this.handleEmojiSelect} />
                  </div>
                )}
              </div>
            </div>
            {!!uploadedFiles.length && (
              <ul className={styles.filesList}>
                {uploadedFiles.map(({ id, filename, size }) => ((
                  <li
                    className={styles.filesListItem}
                    key={Math.random()}
                  >
                    <div className={styles.removeFileWrapper}>
                      <IconButton
                        color="inherit"
                        style={{ width: 20, height: 20, fontSize: 'inherit' }}
                        onClick={() => this.removeFile(id, size)}
                      >
                        <CloseIcon color="inherit" fontSize="inherit" />
                      </IconButton>
                    </div>
                    {filename}
                    &nbsp;
                    {(Math.round(size / 1000) / 1000).toFixed(2)}
                    &nbsp;MB
                  </li>
                )))
                }
                {uploadedFiles.length > 1 && (
                  <>
                    <div className={styles.removeAllWrapper}>
                      <IconButton
                        color="inherit"
                        style={{ width: 20, height: 20, fontSize: 'inherit' }}
                        onClick={() => this.removeAllFiles()}
                      >
                        <CancelIcon color="inherit" fontSize="inherit" />
                      </IconButton>
                      <span>Alles entfernen</span>
                    </div>
                    <p className={styles.sizeLabel}>
                      Gesamtgröße:&nbsp;
                      {(Math.round(totalFilesSize / 1000) / 1000).toFixed(2)}
                      &nbsp;MB
                    </p>
                  </>
                )}
                {totalFilesSize > 8000000 && (
                  <p
                    className={styles.invalidLabel}
                  >
                    Die maximal zulässige Dateigröße beträgt 8 MB
                  </p>
                )}
              </ul>
            )}
            <PrimaryButton
              style={{ marginTop: 10 }}
              onClick={this.submit}
              disabled={loading || !checkSpaces(content) || totalFilesSize > 8000000}
            >
              Teilen
              {loading && <Loader color="white" />}
            </PrimaryButton>
          </div>
        </div>
      </>
    );
  }
}

FitBookPostCreation.propTypes = {
  loading: PropTypes.bool.isRequired,
  avatarURL: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
  isFetchingCurrentUser: PropTypes.bool.isRequired,
  create: PropTypes.func.isRequired,
};
