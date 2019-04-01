import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'material-ui-slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';

import { fetchCourse, fetchAllTrainers } from '../../common/services/training';
import { fetchVideos } from '../../common/services/videos';
import styles from './SingleCourse.scss';
import Loader from '../../common/components/Loaders/Layout/LayoutLoader';
import { camalizeKeys } from '../../common/helpers';
import VideoGridItem from '../../common/components/GridItems/Video/VideoGridItem';
import {
  StyledCheckbox,
  StyledRadio,
  TextBlueButton,
  TextDarkGreyButton,
  TextPinkButton,
} from '../../common/customizedMaterialComponents';

export default class SingleCourse extends Component {
  state = {
    loading: true,
    loadingMore: false,
    course: {},
    videos: [],
    videosTotalCount: 0,
    videosCountPerPage: 0,
    videosCurrentPage: 1,
    canPaginateVideos: false,
    durationRange: [20, 60],
    levels: [
      { value: 1, label: 'Einsteiger' },
      { value: 2, label: 'Fortgeschritten' },
      { value: 3, label: 'Profi' },
    ],
    selectedLevel: '',
    trainers: [],
    selectedTrainers: [],
    applyingFilters: false,
    fetchingFailed: false,
  };

  componentDidMount() {
    fetchCourse(28)
      .then(({ data: { course } }) => {
        this.setState({
          course: camalizeKeys(course),
        });
      })
      .then(() => {
        const { state: { course: { id } } } = this;
        return fetchVideos(1, null, id);
      })
      .then(({ data }) => camalizeKeys(data))
      .then(({
        data,
        total,
        perPage,
        nextPageUrl,
        currentPage,
      }) => this.setState({
        videos: data,
        videosTotalCount: +total,
        videosCountPerPage: +perPage,
        videosCurrentPage: +currentPage,
        canPaginateVideos: !!nextPageUrl,
      }))
      .then(fetchAllTrainers)
      .then(({ data: { trainer } }) => this.setState({
        trainers: camalizeKeys(trainer),
        loading: false,
      }))
      .catch(() => {
        this.setState({ fetchingFailed: true, loading: false });
      });
  }

  setDurationRange = durationRange => this.setState({ durationRange });

  handleCheckboxClick = type => ({ target: { value } }) => this.setState(prevState => ({
    ...prevState,
    [`selected${type}`]: prevState[`selected${type}`].includes(value)
      ? prevState[`selected${type}`].filter(el => el !== value)
      : prevState[`selected${type}`].concat(value),
  }));

  clearFilters = () => {
    this.setState({
      durationRange: [20, 60],
      selectedLevel: '',
      selectedTrainers: [],
    });
  };

  applyFilters = () => {
    this.setState({ applyingFilters: true });
    const {
      state: {
        course: { id },
        durationRange,
        selectedLevel,
        selectedTrainers,
      },
    } = this;
    fetchVideos(1, null, id, +durationRange[0], +durationRange[1], +selectedLevel, selectedTrainers)
      .then(({ data }) => camalizeKeys(data))
      .then(({
        data,
        total,
        perPage,
        nextPageUrl,
        currentPage,
      }) => this.setState({
        videos: data,
        videosTotalCount: +total,
        videosCountPerPage: +perPage,
        videosCurrentPage: +currentPage,
        canPaginateVideos: !!nextPageUrl,
        applyingFilters: false,
      }))
      .catch(() => {
        this.setState({ fetchingFailed: true, applyingFilters: false });
      });
  };

  loadMoreItems = () => {
    this.setState({ loadingMore: true });
    const {
      state: {
        course: {
          id,
        },
        videosCurrentPage,
        durationRange,
        selectedLevel,
        selectedTrainers,
      },
    } = this;
    fetchVideos(
      videosCurrentPage + 1,
      null,
      id,
      +durationRange[0],
      +durationRange[1],
      +selectedLevel,
      selectedTrainers,
    )
      .then(({ data }) => camalizeKeys(data))
      .then(({
        data,
        total,
        perPage,
        nextPageUrl,
      }) => this.setState(({ videos: prevVideos }) => ({
        videos: prevVideos.concat(data),
        videosTotalCount: total,
        videosCountPerPage: perPage,
        canPaginate: !!nextPageUrl,
        videosCurrentPage: videosCurrentPage + 1,
        loadingMore: false,
      })))
      .catch(() => {
        this.setState({ loadingMore: false, fetchingFailed: true });
      });
  };

  render() {
    const {
      props: { baseDomain },
      state: {
        loading,
        course,
        durationRange,
        levels,
        selectedLevel,
        trainers,
        selectedTrainers,
        applyingFilters,
        fetchingFailed,
        videos,
        videosTotalCount,
        videosCountPerPage,
        videosCurrentPage,
        canPaginateVideos,
        loadingMore,
      },
    } = this;

    if (loading) return <Loader />;

    if (fetchingFailed) {
      return (
        <p className="placeholder">
          Entschuldigung, etwas ist schief gelaufen. Bitte versuchen Sie es später erneut.
        </p>
      );
    }

    return (
      <>
        <div
          className={styles.banner}
          style={{
            backgroundImage: `url(${course.banners.default || `${baseDomain}/assets/images/default/plan.jpg`})`,
          }}
        >
          <h1 className={styles.title}>{course.name}</h1>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: course.descriptions.full }}
          />
        </div>
        <div className={styles.flexWrapper}>
          <div className={styles.leftContent}>
            {
              videosTotalCount
                ? (
                  <>
                    {applyingFilters && <Loader />}
                    {!applyingFilters && (
                      <>
                        <div className="gridWrapper">
                          {videos.map(({
                            id,
                            trainer: {
                              name: coachName,
                              user: {
                                id: coachId,
                                profilePicUrl: coachAvatarUrl,
                              },
                            },
                            level,
                            course: {
                              name: courseName,
                              banners: {
                                default: thumbnailURL,
                              },
                              tools,
                            },
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
                                thumbnailURL={thumbnailURL}
                                tools={tools}
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
                        </div>
                        {loadingMore && (
                          <div className="loaderWrapper">
                            <Loader />
                          </div>
                        )}
                        <div className="paginationWrapper">
                          <div>
                            <p className="paginationCount">
                              Zeigt&nbsp;
                              {Math.min(videosTotalCount, videosCountPerPage * videosCurrentPage)}
                              &nbsp;Videos von&nbsp;
                              {videosTotalCount}
                            </p>
                            <TextBlueButton
                              variant="outlined"
                              onClick={this.loadMoreItems}
                              disabled={!canPaginateVideos || loadingMore}
                            >
                              Laden Sie mehr Daten
                            </TextBlueButton>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )
                : <p className="placeholder">Keine Videos</p>
            }
          </div>
          <div className={styles.rightContent}>
            <div className={styles.filtersInnerWrapper}>
              <p className={styles.label}>{`DAUER: ${durationRange[0]} – ${durationRange[1]} MIN`}</p>
              <div className={styles.sliderWrapper}>
                <Slider
                  range
                  color="#304FFE"
                  min={20}
                  max={60}
                  value={[durationRange[0], durationRange[1]]}
                  onChange={this.setDurationRange}
                />
              </div>
              <p className={styles.label}>SCHWIERIGKEIT</p>
              <FormControl className={styles.checkboxesWrapper}>
                <RadioGroup
                  value={String(selectedLevel)}
                  onChange={({ target: { value } }) => this.setState({ selectedLevel: value })}
                >
                  {levels.map(({ value, label }) => (
                    <FormControlLabel
                      key={value}
                      value={String(value)}
                      label={label}
                      control={<StyledRadio />}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <p className={styles.label}>TRAINER</p>
              <FormControl className={styles.checkboxesWrapper}>
                {trainers.map(({ id, name }) => (
                  <FormControlLabel
                    key={id}
                    value={String(id)}
                    label={name}
                    control={<StyledCheckbox />}
                    onChange={this.handleCheckboxClick('Trainers')}
                    checked={selectedTrainers.includes(String(id))}
                  />
                ))}
              </FormControl>
            </div>
            <div className={styles.filterButtonsWrapper}>
              <TextDarkGreyButton
                onClick={this.clearFilters}
                disabled={loading}
              >
                ABSCHAFFEN
              </TextDarkGreyButton>
              <TextPinkButton
                onClick={this.applyFilters}
                disabled={loading}
              >
                FILTERN
              </TextPinkButton>
            </div>
          </div>
        </div>
      </>
    );
  }
}

SingleCourse.propTypes = {
  baseDomain: PropTypes.string.isRequired,
};
