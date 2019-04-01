import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Paper from '@material-ui/core/Paper';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Slider from 'react-slick';

import {
  SliderArrIconButton,
  SliderPrevIcon,
  SliderNextIcon,
} from '../../common/customizedMaterialComponents';
import styles from './Achievements.scss';
import { sliderConfig, staticAchievements } from './config';

export default class Achievements extends Component {
  constructor(props) {
    super(props);

    this.sliders = {};

    this.state = {
      sliders: {
        Erfolge: {
          canGoBack: false,
          canGoNext: true,
        },
        Kurse: {
          canGoBack: false,
          canGoNext: true,
        },
        Programme: {
          canGoBack: false,
          canGoNext: true,
        },
        'Pur-life': {
          canGoBack: false,
          canGoNext: true,
        },
      },
    };

    this.months = [
      'Januar',
      'Februar',
      'Marz',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember',
    ];

    window.addEventListener('resize', () => this.setSliderArrowsState(null, 0));
  }

  getFormattedDate(dateStr) {
    const date = dateStr.getDate();
    const month = this.months[dateStr.getMonth() + 1];
    const year = dateStr.getFullYear();
    return `${date} ${month} ${year}`;
  }

  setSliderArrowsState(oldIdx, newIdx, type) {
    const { sliders: { [type]: { state: { breakpoint: currentBreakpoint } } } } = this;
    let idxSlidesCount = null;
    if (currentBreakpoint) {
      const { sliders: { [type]: { props: { responsive: responsiveSettings } } } } = this;
      ([{ settings: { slidesToShow: idxSlidesCount } }] = responsiveSettings
        .filter(({ breakpoint }) => currentBreakpoint === breakpoint));
    } else {
      ({ sliders: { [type]: { props: { slidesToShow: idxSlidesCount } } } } = this);
    }
    this.setState(({ sliders }) => ({
      sliders: {
        ...sliders,
        [type]: {
          canGoBack: !!newIdx,
          canGoNext: newIdx + idxSlidesCount < staticAchievements[type].length,
        },
      },
    }));
  }

  render() {
    const {
      state: { sliders },
      props: { unlockedAchievements },
    } = this;
    return (
      <div>
        <div className={styles.banner}>
          <h2 className={styles.bannerTitle}>Deine Erfolge / Achievements</h2>
          <p className={styles.bannerDescription}>
            Hier findest Du alle Erfolge, die Du durch das Erledigen bestimmter
            Aufgaben freischalten kannst. Freigeschaltete Erfolge sind grün
            hinterlegt und enthalten das Datum der Freischaltung.
            Achievements sind wie kleine Trophäen.
            Sie werden außerdem in deinem
            Profil angezeigt.
          </p>
        </div>
        {
          ['Erfolge', 'Kurse', 'Programme', 'Pur-life'].map(type => (
            <div key={type}>
              <div className={styles.subBlockTopCont}>
                <div className={styles.subBlockTopLeftCont}>
                  <h2 className={styles.subBlockTitle}>
                    {type}
                  </h2>
                  <span className={styles.subBlockProgress}>
                    {
                      staticAchievements[type]
                        .filter(
                          ({ shortName }) => !!unlockedAchievements[shortName],
                        )
                        .length
                    }
                    /
                    {staticAchievements[type].length}
                  </span>
                </div>
                <div>
                  <SliderArrIconButton
                    onClick={() => this.sliders[type].slickPrev()}
                    disabled={!sliders[type].canGoBack}
                  >
                    <SliderPrevIcon />
                  </SliderArrIconButton>
                  <SliderArrIconButton
                    onClick={() => this.sliders[type].slickNext()}
                    disabled={!sliders[type].canGoNext}
                  >
                    <SliderNextIcon />
                  </SliderArrIconButton>
                </div>
              </div>
              <Slider
                ref={slider => { this.sliders[type] = slider; }}
                {...sliderConfig}
                beforeChange={(oldIdx, newIdx) => this.setSliderArrowsState(oldIdx, newIdx, type)}
              >
                {
                  staticAchievements[type].map(({ shortName, name, description }) => (
                    <Paper className={styles.singleAchievement} key={shortName}>
                      <div>
                        {
                          unlockedAchievements[shortName]
                            ? (
                              <div className={styles.singleAchievementUnlockedIconCont}>
                                <LockOpenIcon color="inherit" fontSize="inherit" />
                              </div>
                            )
                            : (
                              <div className={styles.singleAchievementLockedIconCont}>
                                <LockIcon color="inherit" fontSize="inherit" />
                              </div>
                            )
                        }
                        <h3 className={styles.singleAchievementTitle}>
                          {name}
                        </h3>
                        <p className={styles.singleAchievementSubTitle}>
                          {description}
                        </p>
                      </div>
                      {
                        unlockedAchievements[shortName] && (
                          <span className={styles.singleAchievementDate}>
                            {
                              this.getFormattedDate(new Date(unlockedAchievements[shortName]))
                            }
                          </span>
                        )
                      }
                    </Paper>
                  ))
                }
              </Slider>
            </div>
          ))
        }
      </div>
    );
  }
}

Achievements.propTypes = {
  unlockedAchievements: PropTypes.objectOf(PropTypes.string).isRequired,
};
