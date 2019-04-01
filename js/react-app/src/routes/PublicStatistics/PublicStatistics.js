import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import WhatsHotIcon from '@material-ui/icons/Whatshot';
import VideoCamIcon from '@material-ui/icons/Videocam';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import styles from './PublicStatistics.scss';
import Loader from '../../common/components/Loaders/Layout/LayoutLoader';
import { StyledRadio } from '../../common/customizedMaterialComponents';


export default class PublicStatistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kcalChart: 'today',
      coursesChart: 'today',
    };

    this.updateChart = this.updateChart.bind(this);
  }

  updateChart(type) {
    return ({ target: { value } }) => {
      this.setState({ [`${type}Chart`]: value });
    };
  }

  render() {
    const {
      state: { kcalChart, coursesChart },
      props: { baseDomain, isFetching, data },
    } = this;

    if (isFetching || !Object.keys(data).length) return <Loader />;

    return (
      <>
        <div className={styles.banner}>
          <h1 className={styles.bannerTitle}>Über die Statistik</h1>
          <p className={styles.bannerSubTitle}>
            Hier siehst du die Statistik aller aktiven Nutzer von pur-life - stündlich aktualisiert.
            Ebenso findest Du hier die Statistiken von Dir und Deinen Freunden.
            Ob Du in der Statistik auftauchst, hängt davon ab, wer Deine Aktivitäten sehen darf.
            Das kannst Du hier einstellen.
          </p>
        </div>
        <div className={styles.chartHeadingWrapper}>
          <h2 className={styles.title}>Meist verbrannte Kalorien</h2>
          <RadioGroup
            className={styles.radioGroup}
            name="kcalChart"
            onChange={this.updateChart('kcal')}
            value={String(kcalChart)}
            row
          >
            {!!data.stats.kcal.today && (
              <FormControlLabel
                value="today"
                label="Heute"
                control={<StyledRadio />}
              />
            )}
            {!!data.stats.kcal.week && (
              <FormControlLabel
                value="week"
                label="Woche"
                control={<StyledRadio />}
              />
            )}
            {!!data.stats.kcal.month && (
              <FormControlLabel
                value="month"
                label="Monat"
                control={<StyledRadio />}
              />
            )}
          </RadioGroup>
        </div>
        <div className={`${styles.chart} ${styles.coursesChart}`}>
          {kcalChart === 'today' && !!data.stats.kcal.today && (
            <>
              <ul className={styles.chartScale}>
                <li className={styles.chartScaleDivision}>1500</li>
                <li className={styles.chartScaleDivision}>1400</li>
                <li className={styles.chartScaleDivision}>1300</li>
                <li className={styles.chartScaleDivision}>1200</li>
                <li className={styles.chartScaleDivision}>1100</li>
                <li className={styles.chartScaleDivision}>1000</li>
                <li className={styles.chartScaleDivision}>900</li>
                <li className={styles.chartScaleDivision}>800</li>
              </ul>
              {data.stats.kcal.today.map(({ kcal, user: { id, name, profilePicUrl } }, idx) => (
                <div
                  key={id}
                  style={{ left: `${idx * 10 + 7}%`, top: `${idx * 60 + 20}px` }}
                  className={styles.statsItem}
                >
                  <a href={`${baseDomain}/fitbook/profile/${id}`}>
                    <img src={profilePicUrl} alt={`Avatar von ${name}`} className={styles.statsUserAvatar} />
                  </a>
                  <a href={`${baseDomain}/fitbook/profile/${id}`} className={styles.statsUserName}>{name}</a>
                  <div className={styles.statsIconWrapper}>
                    <WhatsHotIcon color="inherit" fontSize="inherit" />
                  </div>
                  <p className={styles.statsAmount}>{kcal}</p>
                </div>
              ))}
            </>
          )}
          {kcalChart === 'week' && !!data.stats.kcal.week && (
            <>
              <ul className={styles.chartScale}>
                <li className={styles.chartScaleDivision}>5500</li>
                <li className={styles.chartScaleDivision}>5000</li>
                <li className={styles.chartScaleDivision}>4500</li>
                <li className={styles.chartScaleDivision}>4000</li>
                <li className={styles.chartScaleDivision}>3500</li>
                <li className={styles.chartScaleDivision}>3000</li>
                <li className={styles.chartScaleDivision}>2500</li>
                <li className={styles.chartScaleDivision}>2000</li>
              </ul>
              {data.stats.kcal.week.map(({ kcal, user: { id, name, profilePicUrl } }, idx) => (
                <div
                  key={id}
                  style={{ left: `${idx * 10 + 7}%`, top: `${idx * 60 + 20}px` }}
                  className={styles.statsItem}
                >
                  <a href={`${baseDomain}/fitbook/profile/${id}`}>
                    <img src={profilePicUrl} alt={`Avatar von ${name}`} className={styles.statsUserAvatar} />
                  </a>
                  <a href={`${baseDomain}/fitbook/profile/${id}`} className={styles.statsUserName}>{name}</a>
                  <div className={styles.statsIconWrapper}>
                    <WhatsHotIcon color="inherit" fontSize="inherit" />
                  </div>
                  <p className={styles.statsAmount}>{kcal}</p>
                </div>
              ))}
            </>
          )}
          {kcalChart === 'month' && !!data.stats.kcal.month && (
            <>
              <ul className={styles.chartScale}>
                <li className={styles.chartScaleDivision}>8000</li>
                <li className={styles.chartScaleDivision}>7500</li>
                <li className={styles.chartScaleDivision}>7000</li>
                <li className={styles.chartScaleDivision}>6500</li>
                <li className={styles.chartScaleDivision}>5500</li>
                <li className={styles.chartScaleDivision}>5000</li>
                <li className={styles.chartScaleDivision}>4500</li>
                <li className={styles.chartScaleDivision}>4000</li>
              </ul>
              {data.stats.kcal.month.map(({ kcal, user: { id, name, profilePicUrl } }, idx) => (
                <div
                  key={id}
                  style={{ left: `${idx * 10 + 7}%`, top: `${idx * 60 + 20}px` }}
                  className={styles.statsItem}
                >
                  <a href={`${baseDomain}/fitbook/profile/${id}`}>
                    <img src={profilePicUrl} alt={`Avatar von ${name}`} className={styles.statsUserAvatar} />
                  </a>
                  <a href={`${baseDomain}/fitbook/profile/${id}`} className={styles.statsUserName}>{name}</a>
                  <div className={styles.statsIconWrapper}>
                    <WhatsHotIcon color="inherit" fontSize="inherit" />
                  </div>
                  <p className={styles.statsAmount}>{kcal}</p>
                </div>
              ))}
            </>
          )}
        </div>
        <h2 className={styles.title}>Die beliebtesten Videos</h2>
        <div className={styles.popularVideosWrapper}>
          {!!data.stats.videosMostWatched.today && (
            <div className={styles.popularVideosBlock}>
              <p className={styles.popularVideosTitle}>Heute</p>
              <ul className={styles.popularVideosList}>
                {
                  data.stats.videosMostWatched.today
                    .map(({ video: { id, course: { name, banners: { default: bannerUrl } } } }) => (
                      <li key={id} className={styles.popularVideosListItem}>
                        <a href={`${baseDomain}/videos/${id}`} className={styles.popularVideoBannerLink}>
                          <img src={bannerUrl} alt="Banner" className={styles.popularVideoBanner} />
                        </a>
                        <a href={`${baseDomain}/videos/${id}`} className={styles.popularVideoName}>{name}</a>
                      </li>
                    ))
                }
              </ul>
            </div>
          )}
          {!!data.stats.videosMostWatched.week && (
            <div className={styles.popularVideosBlock}>
              <p className={styles.popularVideosTitle}>Woche</p>
              <ul className={styles.popularVideosList}>
                {
                  data.stats.videosMostWatched.week
                    .map(({ video: { id, course: { name, banners: { default: bannerUrl } } } }) => (
                      <li key={id} className={styles.popularVideosListItem}>
                        <a href={`${baseDomain}/videos/${id}`} className={styles.popularVideoBannerLink}>
                          <img src={bannerUrl} alt="Banner" className={styles.popularVideoBanner} />
                        </a>
                        <a href={`${baseDomain}/videos/${id}`} className={styles.popularVideoName}>{name}</a>
                      </li>
                    ))
                }
              </ul>
            </div>
          )}
          {!!data.stats.videosMostWatched.month && (
            <div className={styles.popularVideosBlock}>
              <p className={styles.popularVideosTitle}>Monat</p>
              <ul className={styles.popularVideosList}>
                {
                  data.stats.videosMostWatched.month
                    .map(({ video: { id, course: { name, banners: { default: bannerUrl } } } }) => (
                      <li key={id} className={styles.popularVideosListItem}>
                        <a href={`${baseDomain}/videos/${id}`} className={styles.popularVideoBannerLink}>
                          <img src={bannerUrl} alt="Banner" className={styles.popularVideoBanner} />
                        </a>
                        <a href={`${baseDomain}/videos/${id}`} className={styles.popularVideoName}>{name}</a>
                      </li>
                    ))
                }
              </ul>
            </div>
          )}
        </div>
        <div className={styles.chartHeadingWrapper}>
          <h2 className={styles.title}>Deine Freunde: Meist gemachte Kurse</h2>
          <RadioGroup
            className={styles.radioGroup}
            name="kcalChart"
            onChange={this.updateChart('courses')}
            value={String(coursesChart)}
            row
          >
            <FormControlLabel
              value="today"
              label="Heute"
              control={<StyledRadio />}
            />
            <FormControlLabel
              value="week"
              label="Woche"
              control={<StyledRadio />}
            />
            <FormControlLabel
              value="month"
              label="Monat"
              control={<StyledRadio />}
            />
          </RadioGroup>
        </div>
        <div className={`${styles.chart} ${styles.coursesChart}`}>
          {coursesChart === 'today' && (
            <>
              <ul className={styles.chartScale}>
                <li className={styles.chartScaleDivision}>400</li>
                <li className={styles.chartScaleDivision}>350</li>
                <li className={styles.chartScaleDivision}>300</li>
                <li className={styles.chartScaleDivision}>250</li>
                <li className={styles.chartScaleDivision}>200</li>
                <li className={styles.chartScaleDivision}>150</li>
                <li className={styles.chartScaleDivision}>100</li>
                <li className={styles.chartScaleDivision}>50</li>
              </ul>
              {data.friendsStats.usersMostWatched.today
                .map(({ videos, user: { id, name, profilePicUrl } }, idx) => (
                  <div
                    key={id}
                    style={{ left: `${idx * 10 + 7}%`, top: `${idx * 60 + 20}px` }}
                    className={styles.statsItem}
                  >
                    <a href={`${baseDomain}/fitbook/profile/${id}`}>
                      <img src={profilePicUrl} alt={`Avatar von ${name}`} className={styles.statsUserAvatar} />
                    </a>
                    <a href={`${baseDomain}/fitbook/profile/${id}`} className={styles.statsUserName}>{name}</a>
                    <div className={styles.statsIconWrapper}>
                      <VideoCamIcon color="inherit" fontSize="inherit" />
                    </div>
                    <p className={styles.statsAmount}>{videos}</p>
                  </div>
                ))}
            </>
          )}
          {coursesChart === 'week' && (
            <>
              <ul className={styles.chartScale}>
                <li className={styles.chartScaleDivision}>900</li>
                <li className={styles.chartScaleDivision}>800</li>
                <li className={styles.chartScaleDivision}>700</li>
                <li className={styles.chartScaleDivision}>600</li>
                <li className={styles.chartScaleDivision}>500</li>
                <li className={styles.chartScaleDivision}>400</li>
                <li className={styles.chartScaleDivision}>300</li>
                <li className={styles.chartScaleDivision}>200</li>
              </ul>
              {data.friendsStats.usersMostWatched.week
                .map(({ videos, user: { id, name, profilePicUrl } }, idx) => (
                  <div
                    key={id}
                    style={{ left: `${idx * 10 + 7}%`, top: `${idx * 60 + 20}px` }}
                    className={styles.statsItem}
                  >
                    <a href={`${baseDomain}/fitbook/profile/${id}`}>
                      <img src={profilePicUrl} alt={`Avatar von ${name}`} className={styles.statsUserAvatar} />
                    </a>
                    <a href={`${baseDomain}/fitbook/profile/${id}`} className={styles.statsUserName}>{name}</a>
                    <div className={styles.statsIconWrapper}>
                      <VideoCamIcon color="inherit" fontSize="inherit" />
                    </div>
                    <p className={styles.statsAmount}>{videos}</p>
                  </div>
                ))}
            </>
          )}
          {coursesChart === 'month' && (
            <>
              <ul className={styles.chartScale}>
                <li className={styles.chartScaleDivision}>1800</li>
                <li className={styles.chartScaleDivision}>1600</li>
                <li className={styles.chartScaleDivision}>1400</li>
                <li className={styles.chartScaleDivision}>1200</li>
                <li className={styles.chartScaleDivision}>1000</li>
                <li className={styles.chartScaleDivision}>800</li>
                <li className={styles.chartScaleDivision}>600</li>
                <li className={styles.chartScaleDivision}>400</li>
              </ul>
              {data.friendsStats.usersMostWatched.month
                .map(({ videos, user: { id, name, profilePicUrl } }, idx) => (
                  <div
                    key={id}
                    style={{ left: `${idx * 10 + 7}%`, top: `${idx * 60 + 20}px` }}
                    className={styles.statsItem}
                  >
                    <a href={`${baseDomain}/fitbook/profile/${id}`}>
                      <img src={profilePicUrl} alt={`Avatar von ${name}`} className={styles.statsUserAvatar} />
                    </a>
                    <a href={`${baseDomain}/fitbook/profile/${id}`} className={styles.statsUserName}>{name}</a>
                    <div className={styles.statsIconWrapper}>
                      <VideoCamIcon color="inherit" fontSize="inherit" />
                    </div>
                    <p className={styles.statsAmount}>{videos}</p>
                  </div>
                ))}
            </>
          )}
        </div>
        <h2 className={styles.title}>Die beliebtesten Kurse</h2>
        <div className={styles.popularVideosWrapper}>
          {!!data.stats.coursesMostWatched.today && (
            <div className={styles.popularVideosBlock}>
              <p className={styles.popularVideosTitle}>Heute</p>
              <ul className={styles.popularVideosList}>
                {
                  data.stats.coursesMostWatched.today
                    .map(({ plays, course: { id, name, banners: { default: bannerUrl } } }) => (
                      <li key={id} className={styles.popularVideosListItem}>
                        {bannerUrl && (
                          <a href={`${baseDomain}/courses/${id}`} className={styles.popularVideoBannerLink}>
                            <img src={bannerUrl} alt="Banner" className={styles.popularVideoBanner} />
                          </a>
                        )}
                        <a href={`${baseDomain}/courses/${id}`} className={styles.popularVideoName}>{name}</a>
                        <div className={styles.popularCourseCountWrapper}>
                          <div className={styles.popularCourseCountIconWrapper}>
                            <VideoCamIcon color="inherit" fontSize="inherit" />
                          </div>
                          <span className={styles.popularCourseCount}>{plays}</span>
                        </div>
                      </li>
                    ))
                }
              </ul>
            </div>
          )}
          {!!data.stats.coursesMostWatched.week && (
            <div className={styles.popularVideosBlock}>
              <p className={styles.popularVideosTitle}>Woche</p>
              <ul className={styles.popularVideosList}>
                {
                  data.stats.coursesMostWatched.week
                    .map(({ plays, course: { id, name, banners: { default: bannerUrl } } }) => (
                      <li key={id} className={styles.popularVideosListItem}>
                        {bannerUrl && (
                          <a href={`${baseDomain}/courses/${id}`} className={styles.popularVideoBannerLink}>
                            <img src={bannerUrl} alt="Banner" className={styles.popularVideoBanner} />
                          </a>
                        )}
                        <a href={`${baseDomain}/courses/${id}`} className={styles.popularVideoName}>{name}</a>
                        <div className={styles.popularCourseCountWrapper}>
                          <div className={styles.popularCourseCountIconWrapper}>
                            <VideoCamIcon color="inherit" fontSize="inherit" />
                          </div>
                          <span className={styles.popularCourseCount}>{plays}</span>
                        </div>
                      </li>
                    ))
                }
              </ul>
            </div>
          )}
          {!!data.stats.coursesMostWatched.month && (
            <div className={styles.popularVideosBlock}>
              <p className={styles.popularVideosTitle}>Monat</p>
              <ul className={styles.popularVideosList}>
                {
                  data.stats.coursesMostWatched.month
                    .map(({ plays, course: { id, name, banners: { default: bannerUrl } } }) => (
                      <li key={id} className={styles.popularVideosListItem}>
                        {bannerUrl && (
                          <a href={`${baseDomain}/courses/${id}`} className={styles.popularVideoBannerLink}>
                            <img src={bannerUrl} alt="Banner" className={styles.popularVideoBanner} />
                          </a>
                        )}
                        <a href={`${baseDomain}/courses/${id}`} className={styles.popularVideoName}>{name}</a>
                        <div className={styles.popularCourseCountWrapper}>
                          <div className={styles.popularCourseCountIconWrapper}>
                            <VideoCamIcon color="inherit" fontSize="inherit" />
                          </div>
                          <span className={styles.popularCourseCount}>{plays}</span>
                        </div>
                      </li>
                    ))
                }
              </ul>
            </div>
          )}
        </div>
        <h2 className={styles.title}>Trainer mit den meisten neuen Videos</h2>
        <div className={styles.popularVideosWrapper}>
          {!!data.stats.trainersWithNewVideos.week && (
            <div className={styles.popularVideosBlock}>
              <p className={styles.popularVideosTitle}>Dieses Woche</p>
              <ul className={styles.popularVideosList}>
                {
                  data.stats.trainersWithNewVideos.week
                    .map(({ videos, user: { id, name, profilePicUrl } }) => (
                      <li key={id} className={styles.trainerListItem}>
                        <div>
                          <a href={`${baseDomain}/fitbook/profile/${id}`} className={styles.popularVideoBannerLink}>
                            <img src={profilePicUrl} alt={`Avatar von ${name}`} className={styles.trainerAvatar} />
                          </a>
                          <a href={`${baseDomain}/fitbook/profile/${id}`} className={styles.popularVideoName}>{name}</a>
                        </div>
                        <div className={styles.popularCourseCountWrapper}>
                          <div className={styles.popularCourseCountIconWrapper}>
                            <VideoCamIcon color="inherit" fontSize="inherit" />
                          </div>
                          <span className={styles.popularCourseCount}>{videos}</span>
                        </div>
                      </li>
                    ))
                }
              </ul>
            </div>
          )}
          {!!data.stats.trainersWithNewVideos.month && (
            <div className={styles.popularVideosBlock}>
              <p className={styles.popularVideosTitle}>Dieses Monat</p>
              <ul className={styles.popularVideosList}>
                {
                  data.stats.trainersWithNewVideos.month
                    .map(({ videos, user: { id, name, profilePicUrl } }) => (
                      <li key={id} className={styles.trainerListItem}>
                        <div>
                          <a href={`${baseDomain}/fitbook/profile/${id}`} className={styles.popularVideoBannerLink}>
                            <img src={profilePicUrl} alt={`Avatar von ${name}`} className={styles.trainerAvatar} />
                          </a>
                          <a href={`${baseDomain}/fitbook/profile/${id}`} className={styles.popularVideoName}>{name}</a>
                        </div>
                        <div className={styles.popularCourseCountWrapper}>
                          <div className={styles.popularCourseCountIconWrapper}>
                            <VideoCamIcon color="inherit" fontSize="inherit" />
                          </div>
                          <span className={styles.popularCourseCount}>{videos}</span>
                        </div>
                      </li>
                    ))
                }
              </ul>
            </div>
          )}
          {!!data.stats.trainersWithNewVideos.year && (
            <div className={styles.popularVideosBlock}>
              <p className={styles.popularVideosTitle}>Dieses Jahr</p>
              <ul className={styles.popularVideosList}>
                {
                  data.stats.trainersWithNewVideos.year
                    .map(({ videos, user: { id, name, profilePicUrl } }) => (
                      <li key={id} className={styles.trainerListItem}>
                        <div>
                          <a href={`${baseDomain}/fitbook/profile/${id}`} className={styles.popularVideoBannerLink}>
                            <img src={profilePicUrl} alt={`Avatar von ${name}`} className={styles.trainerAvatar} />
                          </a>
                          <a href={`${baseDomain}/fitbook/profile/${id}`} className={styles.popularVideoName}>{name}</a>
                        </div>
                        <div className={styles.popularCourseCountWrapper}>
                          <div className={styles.popularCourseCountIconWrapper}>
                            <VideoCamIcon color="inherit" fontSize="inherit" />
                          </div>
                          <span className={styles.popularCourseCount}>{videos}</span>
                        </div>
                      </li>
                    ))
                }
              </ul>
            </div>
          )}
        </div>
      </>
    );
  }
}

PublicStatistics.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  data: PropTypes.shape({}).isRequired,
};
