import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import CountUp from 'react-countup';
import TextField from '@material-ui/core/TextField/TextField';
import SwipeableViews from 'react-swipeable-views';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import styles from './Profile.scss';
import LayoutLoader from '../../common/components/Loaders/Layout/LayoutLoader';
import ButtonLoader from '../../common/components/Loaders/Button/ButtonLoader';
import {
  PrimaryButton,
  SecondaryButton,
  StyledTab,
  StyledTabs,
  TabsPaper,
  TextBlueButton,
  TextWhiteButton,
  WhiteButton,
} from '../../common/customizedMaterialComponents';
import Slider from '../../common/components/Slider/SliderContainer';
import CourseGridItem from '../../common/components/GridItems/Course/CourseGridItem';
import VideoGridItem from '../../common/components/GridItems/Video/VideoGridItem';
import user from '../../common/models/user';
import burntCalories from '../../common/models/burntCalories';
import { fullCourse } from '../../common/models/course';
import video from '../../common/models/video';
import { formatDateShort } from '../../common/helpers';
import { inviteFriends } from '../../common/services/user';
import handleError from '../../common/errorHandler';

const renderAchievements = data => (
  <div className={styles.tabContentWrapper}>
    <h2 className="title">Erreichte Errungenschaften dieses Benutzers</h2>
    {Object.keys(data).length
      ? (
        <div className="gridWrapper">
          {Object.entries(data).map(([achievementName, unlockDate]) => (
            <div className={`${styles.achievementBlock} gridItem`} key={achievementName}>
              <div className={styles.unlockedIconWrapper}>
                <LockOpenIcon color="inherit" fontSize="inherit" />
              </div>
              <h3 className={styles.achievementTitle}>{achievementName}</h3>
              <p className={styles.achievementUnlockDate}>
                {formatDateShort(new Date(unlockDate))}
              </p>
            </div>
          ))}
        </div>
      )
      : <p className="placeholder">Noch keine freigeschalteten Erfolge</p>
    }
  </div>
);

const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line

const isValidEmail = str => emailRegEx.test(String(str).toLowerCase());

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeleteConfirmDialogOpen: false,
      tabIdx: 0,
      isInviteFriendsModalOpen: false,
      inviteFriendsEmailFieldValue: '',
      inviteFriendsMessageFieldValue: `
Gerade wollte ich Dich in pur-life als FreundIn hinzufügen, um mit Dir gemeinsam zu trainieren, aber Du bist ja noch gar nicht dabei.

Melde Dich einfach kostenlos über den unten stehenden Link an.

Viele Grüße, Kyle`,
      friendsEmailsToInvite: [],
      isInvalidEmail: false,
      inviteesMaxAmountExceeded: false,
      isSendingInvites: false,
      invitesSent: false,
      addedCurrentEmail: false,
	    textErrorAddedCurrentEmail: 'Diese E-Mail wurde bereits hinzugefügt.',
    };

    this.handleDeleteConfirmDialogOpen = this.handleDeleteConfirmDialogOpen.bind(this);
    this.handleDeleteConfirmDialogClose = this.handleDeleteConfirmDialogClose.bind(this);
    this.handleRemoval = this.handleRemoval.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleTabSwipe = this.handleTabSwipe.bind(this);
	  this.handleEmailInputKeyDown = this.handleEmailInputKeyDown.bind(this);
	  this.handleEmailInputBlur = this.handleEmailInputBlur.bind(this);
    this.removeEmailInvite = this.removeEmailInvite.bind(this);
    this.submitInvites = this.submitInvites.bind(this);
  }

  handleDeleteConfirmDialogOpen() {
    this.setState({ isDeleteConfirmDialogOpen: true });
  }

  handleDeleteConfirmDialogClose() {
    this.setState({ isDeleteConfirmDialogOpen: false });
  }

  handleRemoval() {
    const { props: { removeFriend } } = this;
    removeFriend();
    this.setState({ isDeleteConfirmDialogOpen: false });
  }

  handleTabClick(event, value) {
    this.setState({ tabIdx: value });
  }

  handleTabSwipe(tabIdx) {
    this.setState({ tabIdx });
  }

  handleEmailInputBlur () {
    let error = false;

    if (!isValidEmail(this.state.inviteFriendsEmailFieldValue) && !!this.state.inviteFriendsEmailFieldValue ) {
      error = true;
    }
    this.setState(
      { inviteesMaxAmountExceeded: false, isInvalidEmail: error }
    )
  }
  
  handleEmailInputKeyDown({ key }) {
    const { state: { inviteFriendsEmailFieldValue, friendsEmailsToInvite } } = this;
    if (key === 'Enter' || key === 'Tab') {
      if (friendsEmailsToInvite.includes(inviteFriendsEmailFieldValue)) {
			  return this.setState({addedCurrentEmail: true});
		  }
      if (friendsEmailsToInvite.length === 25) {
        return this.setState({ inviteesMaxAmountExceeded: true });
      }
      if (!isValidEmail(inviteFriendsEmailFieldValue)) {
        return this.setState({ isInvalidEmail: true });
      }
      this.setState(({ friendsEmailsToInvite: prevEmails }) => {
        if (prevEmails.indexOf(inviteFriendsEmailFieldValue) <= -1) {
          return {
            friendsEmailsToInvite: prevEmails.concat(inviteFriendsEmailFieldValue),
            inviteFriendsEmailFieldValue: '',
          };
        }
        return {
          friendsEmailsToInvite: prevEmails,
          inviteFriendsEmailFieldValue: '',
        };
      });
    }
    return null;
  }

  removeEmailInvite(emailIdxToRemove) {
    this.setState(({ friendsEmailsToInvite }) => ({
      friendsEmailsToInvite: friendsEmailsToInvite
        .filter((email, idx) => idx !== emailIdxToRemove),
    }));
  }

  submitInvites() {
    const { state: { friendsEmailsToInvite, inviteFriendsMessageFieldValue } } = this;
    this.setState({ isSendingInvites: true });
    inviteFriends(friendsEmailsToInvite, inviteFriendsMessageFieldValue)
      .then(() => this.setState({
        isSendingInvites: false,
        invitesSent: true,
        isInviteFriendsModalOpen: false,
      }))
      .catch(handleError);
  }

  render() {
    const {
      state: {
        isDeleteConfirmDialogOpen,
        tabIdx,
        isInviteFriendsModalOpen,
        inviteFriendsEmailFieldValue,
        inviteFriendsMessageFieldValue,
        friendsEmailsToInvite,
        isSendingInvites,
        isInvalidEmail,
        inviteesMaxAmountExceeded,
        invitesSent,
        addedCurrentEmail,
		    textErrorAddedCurrentEmail
      },
      props: {
        baseDomain,
        loading,
        data,
        isCurrentUserProfile,
        acceptFriendRequest,
        rejectFriendRequest,
        sendFriendRequest,
        removeFriend,
        adding,
        accepting,
        rejecting,
        removing,
      },
    } = this;

    if (loading) return <LayoutLoader />;

    if (!Object.keys(data).length) return <p className="placeholder">Keine Daten ¯\_(ツ)_/¯</p>;

    return (
      <>
        <div className={styles.banner}>
          <img
            src={data.user.profilePicUrl}
            alt={`Avatar von ${data.user.name}`}
            className={styles.desktopUserAvatar}
          />
          <div>
            <div className={styles.userNameWrapper}>
              <img
                src={data.user.profilePicUrl}
                alt={`Avatar von ${data.user.name}`}
                className={styles.mobileUserAvatar}
              />
              <h1 className={styles.userName}>
                {data.user.name}
                {data.user.type === 'trainer' && ', trainer'}
                {data.user.type === 'team' && ', team'}
              </h1>
              {data.privacy.messages && !isCurrentUserProfile && (
                <div className={styles.mobileChatIconWrapper}>
                  <IconButton
                    style={{
                      width: 44,
                      height: 32,
                      fontSize: 'inherit',
                      backgroundColor: 'white',
                      borderRadius: 2,
                    }}
                    color="inherit"
                    href={`${baseDomain}/fitbook/messages/${data.user.id}`}
                  >
                    <EmailIcon color="inherit" fontSize="inherit" />
                  </IconButton>
                </div>
              )}
            </div>
            {!isCurrentUserProfile && (
              <div>
                {!data.friendship.type && (
                  <WhiteButton
                    onClick={sendFriendRequest}
                    disabled={adding}
                  >
                    Freundschaft angefragt
                    {adding && <ButtonLoader color="#4D4D4E" />}
                  </WhiteButton>
                )}
                {data.friendship.type === true && (
                  <TextWhiteButton
                    onClick={this.handleDeleteConfirmDialogOpen}
                    disabled={removing}
                  >
                    Entfreunden
                    {removing && <ButtonLoader color="white" />}
                  </TextWhiteButton>
                )}
                {data.friendship.type === 'requested' && (
                  <Tooltip title="Stornieren">
                    <WhiteButton
                      onClick={removeFriend}
                      disabled={removing}
                    >
                      Freundschaftsanfrage gesendet
                      {removing && <ButtonLoader color="#4D4D4E" />}
                    </WhiteButton>
                  </Tooltip>
                )}
                {data.friendship.type === 'got_request' && (
                  <div className={styles.friendRequestButtonsWrapper}>
                    <WhiteButton
                      onClick={acceptFriendRequest}
                      disabled={accepting || rejecting}
                    >
                      Freundschaftsanfrage akzeptieren
                      {accepting && <ButtonLoader color="#4D4D4E" />}
                    </WhiteButton>
                    <TextWhiteButton
                      onClick={rejectFriendRequest}
                      disabled={accepting || rejecting}
                    >
                      Freundschaftsanfrage ablehnen
                      {rejecting && <ButtonLoader color="white" />}
                    </TextWhiteButton>
                  </div>
                )}
                {data.privacy.messages && (
                  <div className={styles.desktopChatIconWrapper}>
                    <IconButton
                      style={{
                        width: 44,
                        height: 32,
                        fontSize: 'inherit',
                        backgroundColor: 'white',
                        borderRadius: 2,
                      }}
                      color="inherit"
                      href={`${baseDomain}/fitbook/messages/${data.user.id}`}
                    >
                      <EmailIcon color="inherit" fontSize="inherit" />
                    </IconButton>
                  </div>
                )}
              </div>
            )}
            {isCurrentUserProfile && (
              <div>
                <WhiteButton
                  style={{ marginRight: 10 }}
                  onClick={() => this.setState({
                    isInviteFriendsModalOpen: true,
                    invitesSent: false,
                  })}
                >
                  Freunde einladen
                </WhiteButton>
                <TextWhiteButton href={`${baseDomain}/you/settings`}>
                  Einstellungen
                </TextWhiteButton>
              </div>
            )}
          </div>
        </div>
        {!isCurrentUserProfile && (
          <>
            <TabsPaper square>
              <StyledTabs
                value={tabIdx}
                onChange={this.handleTabClick}
                fullWidth
              >
                <StyledTab label="ALLGEMEINE INFORMATION" />
                {data.user.type === 'trainer' && <StyledTab label="NEUE VIDEOS" />}
                <StyledTab label="ERFOLGE" />
              </StyledTabs>
            </TabsPaper>
            <SwipeableViews
              axis="x"
              index={tabIdx}
              onChangeIndex={this.handleTabSwipe}
            >
              {tabIdx === 0 ? (
                <div className={styles.tabContentWrapper}>
                  <div className={styles.generalInfoTopWrapper}>
                    <div>
                      <h2 className={styles.blockTitle}>Verbrannte Kalorien</h2>
                      {data.privacy.activity ? (
                        <div className={`${styles.block} ${styles.burntCaloriesWrapper}`}>
                          <div className={styles.burntCaloriesItem}>
                            <h4 className={styles.burntCaloriesTitle}>Heute</h4>
                            <CountUp start={0} end={+data.stats.today.value} delay={0}>
                              {({ countUpRef }) => (
                                <div>
                                  <p className={styles.burntCaloriesValue} ref={countUpRef} />
                                </div>
                              )}
                            </CountUp>
                          </div>
                          <div className={styles.burntCaloriesItem}>
                            <h4 className={styles.burntCaloriesTitle}>Woche</h4>
                            <CountUp start={0} end={+data.stats.week.value} delay={0}>
                              {({ countUpRef }) => (
                                <div>
                                  <p className={styles.burntCaloriesValue} ref={countUpRef} />
                                </div>
                              )}
                            </CountUp>
                          </div>
                          <div className={styles.burntCaloriesItem}>
                            <h4 className={styles.burntCaloriesTitle}>Monat</h4>
                            <CountUp start={0} end={+data.stats.month.value} delay={0}>
                              {({ countUpRef }) => (
                                <div>
                                  <p className={styles.burntCaloriesValue} ref={countUpRef} />
                                </div>
                              )}
                            </CountUp>
                          </div>
                        </div>
                      )
                        : <p className="placeholder" style={{ textAlign: 'left', margin: '25px 0 20px' }}>Die Daten sind ausgeblendet</p>
                      }
                    </div>
                    <div>
                      <h2 className={styles.blockTitle}>Ziel</h2>
                      {data.profileData instanceof Object && !!data.profileData.myGoal
                        ? (
                          <div className={styles.block}>
                            <p className={styles.userGoal}>{data.profileData.myGoal}</p>
                          </div>
                        )
                        : (
                          <p className="placeholder" style={{ textAlign: 'left', margin: '25px 0 20px' }}>Nicht eingestellt</p>
                        )}
                    </div>
                  </div>
                  {!data.popularCourses.length && (
                    <h2 className={styles.blockTitle}>Lieblingskurse</h2>
                  )}
                  {data.privacy.activity // eslint-disable-line no-nested-ternary
                    ? (
                      data.popularCourses.length
                        ? (
                          <Slider
                            title="Lieblingskurse"
                            slides={data.popularCourses.map(({
                              name,
                              slug,
                              descriptions: { short: shortDescription },
                              banners: { default: thumbnailUrl },
                              kcal,
                              videos,
                            }) => (
                              <CourseGridItem
                                key={Date.now()}
                                baseDomain={baseDomain}
                                name={name}
                                slug={slug}
                                description={shortDescription}
                                thumbnailUrl={thumbnailUrl}
                                kcal={kcal}
                                videosCount={videos}
                              />
                            ))}
                          />
                        )
                        : <p className="placeholder" style={{ textAlign: 'left', margin: '25px 0 20px' }}>Noch keine Lieblingskurse</p>
                    )
                    : <p className="placeholder" style={{ textAlign: 'left', margin: '25px 0 20px' }}>Die Daten sind ausgeblendet</p>
                  }
                </div>
              ) : <div />}
              {tabIdx === 1 // eslint-disable-line no-nested-ternary
                ? data.user.type === 'trainer' ? (
                  <div className={styles.tabContentWrapper}>
                    {data.videos.length ? (
                      <>
                        <h2 className={styles.blockTitle}>Die letzten 12 Videos dieses Trainers</h2>
                        <div className="gridWrapper">
                          {data.videos.map(({
                            id,
                            course: {
                              name: courseName,
                              tools,
                              banners: { default: thumbnailURL },
                            },
                            trainer: {
                              name: coachName,
                              user: {
                                id: coachId,
                                profilePicUrl: coachAvatarUrl,
                              },
                            },
                            level,
                            kcal,
                            duration,
                            user: { playAmount, playedInPercent },
                            meta: {
                              isFavorite,
                              favorite: {
                                id: favId = null,
                                data: {
                                  note: favNote = null,
                                  difficulty: favDifficulty = null,
                                } = {},
                              } = {},
                            },
                          }) => (
                            <div key={id} className="gridItem">
                              <VideoGridItem
                                baseDomain={baseDomain}
                                id={id}
                                courseName={courseName}
                                coachId={coachId}
                                coachName={coachName}
                                coachAvatarUrl={coachAvatarUrl}
                                level={level}
                                tools={tools}
                                thumbnailURL={thumbnailURL}
                                kcal={kcal}
                                duration={duration}
                                playsAmount={playAmount}
                                lastPlayedPercentage={playedInPercent}
                                isFav={isFavorite}
                                favId={favId}
                                favNote={favNote}
                                favDifficulty={favDifficulty}
                              />
                            </div>
                          ))}
                          <TextBlueButton variant="outlined" href={`${baseDomain}/videos`}>Mehr sehen</TextBlueButton>
                        </div>
                      </>
                    ) : <p className="placeholder">Noch keine Videos</p>}
                  </div>
                )
                  : (
                    <div className={styles.tabContentWrapper}>
                      {renderAchievements(data.achievements)}
                    </div>
                  ) : <div />}
              {tabIdx === 2 // eslint-disable-line no-nested-ternary
                ? data.user.type === 'trainer' ? renderAchievements(data.achievements) : <div />
                : <div />
              }
            </SwipeableViews>
            <Dialog
              fullScreen={window.innerWidth < 768}
              open={isDeleteConfirmDialogOpen}
              onClose={this.handleDeleteConfirmDialogClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">Freund entfernen</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Möchtest du&nbsp;
                  {data.user.name}
                  &nbsp;wirklich von deinen Freunden entfernen?
                  Diese Aktion kann nicht rückgängig gemacht werden.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <TextBlueButton
                  color="primary"
                  disabled={removing}
                  onClick={this.handleDeleteConfirmDialogClose}
                  autoFocus
                >
                  ABSÄGEN
                </TextBlueButton>
                <PrimaryButton
                  color="primary"
                  disabled={removing}
                  onClick={this.handleRemoval}
                >
                  LÖSCHEN
                </PrimaryButton>
              </DialogActions>
            </Dialog>
          </>
        )}
        {isCurrentUserProfile && (
          <>
            <div className={styles.generalInfoTopWrapper}>
              <div>
                <h2 className={styles.blockTitle}>Verbrannte Kalorien</h2>
                {!!data.stats && (
                  <div className={`${styles.block} ${styles.burntCaloriesWrapper}`}>
                    <div className={styles.burntCaloriesItem}>
                      <h4 className={styles.burntCaloriesTitle}>Heute</h4>
                      <CountUp start={0} end={+data.stats.today.value} delay={0}>
                        {({ countUpRef }) => (
                          <div>
                            <p className={styles.burntCaloriesValue} ref={countUpRef} />
                          </div>
                        )}
                      </CountUp>
                    </div>
                    <div className={styles.burntCaloriesItem}>
                      <h4 className={styles.burntCaloriesTitle}>Woche</h4>
                      <CountUp start={0} end={+data.stats.week.value} delay={0}>
                        {({ countUpRef }) => (
                          <div>
                            <p className={styles.burntCaloriesValue} ref={countUpRef} />
                          </div>
                        )}
                      </CountUp>
                    </div>
                    <div className={styles.burntCaloriesItem}>
                      <h4 className={styles.burntCaloriesTitle}>Monat</h4>
                      <CountUp start={0} end={+data.stats.month.value} delay={0}>
                        {({ countUpRef }) => (
                          <div>
                            <p className={styles.burntCaloriesValue} ref={countUpRef} />
                          </div>
                        )}
                      </CountUp>
                    </div>
                  </div>
                )}
                {!data.stats && (
                  <p
                    className="placeholder"
                    style={{ textAlign: 'left', margin: '25px 0 20px' }}
                  >
                    Noch keine Daten
                  </p>
                )}
              </div>
              <div>
                <h2 className={styles.blockTitle}>Ziel</h2>
                {data.profileData instanceof Object && !!data.profileData.myGoal
                  ? (
                    <div className={styles.block}>
                      <p className={styles.userGoal}>{data.profileData.myGoal}</p>
                    </div>
                  )
                  : (
                    <p className="placeholder" style={{ textAlign: 'left', margin: '25px 0 20px' }}>Nicht eingestellt</p>
                  )}
              </div>
            </div>
            {!data.popularCourses.length && (
              <h2 className={styles.blockTitle}>Lieblingskurse</h2>
            )}
            {data.popularCourses.length
              ? (
                <Slider
                  title="Lieblingskurse"
                  slides={data.popularCourses.map(({
                    name,
                    slug,
                    descriptions: { short: shortDescription },
                    banners: { default: thumbnailUrl },
                    kcal,
                    videos,
                  }) => (
                    <CourseGridItem
                      key={Date.now()}
                      baseDomain={baseDomain}
                      name={name}
                      slug={slug}
                      description={shortDescription}
                      thumbnailUrl={thumbnailUrl}
                      kcal={kcal}
                      videosCount={videos}
                    />
                  ))}
                />
              )
              : <p className="placeholder" style={{ textAlign: 'left', margin: '25px 0 20px' }}>Noch keine Lieblingskurse</p>
            }
            <Dialog
              fullWidth
              fullScreen={window.innerWidth < 768}
              open={isInviteFriendsModalOpen || isSendingInvites}
              onClose={() => this.setState({ isInviteFriendsModalOpen: false })}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">Freunde einladen</DialogTitle>
              <DialogContent>
                <Tooltip
                  open={inviteesMaxAmountExceeded || isInvalidEmail}
                  title={
                    inviteesMaxAmountExceeded
                      ? 'Sie können nicht mehr als 25 Freunde gleichzeitig einladen, um Spam zu verhindern'
                      : 'Ungültige E-Mail'
                  }
                >
                  <TextField
                    fullWidth
                    autoFocus
                    error={addedCurrentEmail}
					          helperText={addedCurrentEmail && textErrorAddedCurrentEmail}
                    id="note"
                    label="E-Mail deiner Freunde *"
                    value={inviteFriendsEmailFieldValue}
                    onChange={
                      ({ target: { value } }) => this.setState(
                        { inviteFriendsEmailFieldValue: value, addedCurrentEmail: false },
                      )
                    }
                    onKeyDown={this.handleEmailInputKeyDown}
                    onBlur={this.handleEmailInputBlur}
                    margin="normal"
                    variant="outlined"
                  />
                </Tooltip>
                <div className={styles.inviteEmailsWrapper}>
                  {friendsEmailsToInvite.map((email, idx) => (
                    <div className={styles.inviteEmail} key={Math.random()}>
                      <span>{email}</span>
                      <div className={styles.removeEmailIconWrapper}>
                        <IconButton
                          color="inherit"
                          style={{
                            fontSize: 'inherit',
                            width: 18,
                            height: 18,
                            paddingTop: 9,
                          }}
                          onClick={() => this.removeEmailInvite(idx)}
                        >
                          <CloseIcon color="inherit" fontSize="inherit" style={{ position: 'absolute' }} />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
                <p>Hallo!</p>
                <TextField
                  fullWidth
                  multiline
                  id="message"
                  label="Ihre Nachricht"
                  value={inviteFriendsMessageFieldValue}
                  onChange={
                    ({ target: { value } }) => this.setState(
                      { inviteFriendsMessageFieldValue: value },
                    )
                  }
                  margin="normal"
                  variant="outlined"
                />
                <p>
                  Schau einfach mal rein:
                  Du kannst hier aus tausenden Kursvideos,
                  Kursen und Trainingsplänen wählen, Dich im
                  Beratungsbereich über Ernährung, Gesundheit und vieles mehr informieren.
                  Gemeinsam mit mir und Deinen Freunden Erfolge teilen oder
                  Dich in den zahlreichen Statistiken mit uns messen.
                  Außerdem kannst Du Dich im Fitbook mit anderen
                  Mitgliedern austauschen und Teil der
                  Community werden. Und vieles mehr...
                  <br />
                  <br />
                  Melde Dich einfach kostenlos über den unten stehenden Link an.
                  <br />
                  <br />
                  Viele Grüße,
                  <br />
                  <br />
                  Dimitry
                </p>
              </DialogContent>
              <DialogActions>
                <SecondaryButton
                  disabled={isSendingInvites}
                  onClick={() => this.setState({ isInviteFriendsModalOpen: false })}
                >
                  Schließen
                </SecondaryButton>
                <PrimaryButton
                  color="primary"
                  disabled={isSendingInvites || !friendsEmailsToInvite.length}
                  onClick={this.submitInvites}
                >
                  Speichern
                  {isSendingInvites && <ButtonLoader color="#ffffff" />}
                </PrimaryButton>
              </DialogActions>
            </Dialog>
            <Snackbar
              className="successSnackbar"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              autoHideDuration={5000}
              open={invitesSent}
              onClose={() => this.setState({ invitesSent: false })}
              ContentProps={{
                'aria-describedby': 'invites-sent-message',
              }}
              message={(
                <>
                  <div className="successIconWrapper">
                    <CheckCircleIcon color="inherit" fontSize="inherit" />
                  </div>
                  <span id="invites-sent-message">Ihre Einladungen wurden erfolgreich versendet.</span>
                </>
              )}
              action={[
                <div key="close" className="closeSnackbarIconWrapper">
                  <IconButton
                    aria-label="Close"
                    color="inherit"
                    style={{
                      width: 30,
                      height: 30,
                      fontSize: 'inherit',
                    }}
                    onClick={() => this.setState({ invitesSent: false })}
                  >
                    <CloseIcon color="inherit" fontSize="inherit" />
                  </IconButton>
                </div>,
              ]}
            />
          </>
        )}
      </>
    );
  }
}

Profile.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    user,
    friendship: PropTypes.shape({
      type: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
      since: PropTypes.string,
    }),
    privacy: PropTypes.shape({
      messages: PropTypes.bool,
      activity: PropTypes.bool,
      friends: PropTypes.bool,
      search: PropTypes.bool,
    }),
    stats: PropTypes.oneOfType([burntCalories, PropTypes.bool]),
    popularCourses: PropTypes.arrayOf(fullCourse),
    profileData: PropTypes.oneOfType([
      PropTypes.shape({
        myGoal: PropTypes.string,
      }),
      PropTypes.array,
    ]),
    achievements: PropTypes.objectOf(PropTypes.string),
    videos: PropTypes.arrayOf(video),
  }).isRequired,
  isCurrentUserProfile: PropTypes.bool,
  acceptFriendRequest: PropTypes.func.isRequired,
  rejectFriendRequest: PropTypes.func.isRequired,
  sendFriendRequest: PropTypes.func.isRequired,
  removeFriend: PropTypes.func.isRequired,
  adding: PropTypes.bool.isRequired,
  accepting: PropTypes.bool.isRequired,
  rejecting: PropTypes.bool.isRequired,
  removing: PropTypes.bool.isRequired,
};

Profile.defaultProps = {
  isCurrentUserProfile: false,
};
