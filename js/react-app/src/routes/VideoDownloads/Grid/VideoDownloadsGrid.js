import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import VideoGridItem from '../../../common/components/GridItems/Video/VideoGridItem';
import Loader from '../../../common/components/Loaders/Layout/LayoutLoader';
import { fetchVideoDownloads } from '../../../common/services/videos';
import { camalizeKeys } from '../../../common/helpers';

export default class VideoDownloadsGrid extends Component {
  state = {
    loading: true,
    expandedWeeks: [1],
  };

  componentDidMount() {
    fetchVideoDownloads()
      .then(({ data: { downloads } }) => this.setState({
        data: camalizeKeys(downloads),
        loading: false,
      }));
  }

  isExpanded = week => this.state.expandedWeeks.includes(+week); // eslint-disable-line

  toggleWeek = num => this.setState(({ expandedWeeks }) => ({
    expandedWeeks: expandedWeeks.includes(num)
      ? expandedWeeks.filter(week => week !== num)
      : [...expandedWeeks, num],
  }));

  render() {
    const {
      state: { loading, data },
      props: { baseDomain },
    } = this;

    if (loading) return <Loader />;

    return (
      <>
        {Object.entries(data).map(([week, videos]) => (
          <Fragment key={week}>
            <div className="weekTitleWrapper">
              <h2 className="weekTitle">{`Woche ${week}`}</h2>
              <div className="expandIconWrapper" data-expanded={this.isExpanded(week) ? 'true' : null}>
                <IconButton
                  color="inherit"
                  style={{ width: 32, height: 32, fontSize: 'inherit' }}
                  onClick={() => this.toggleWeek(+week)}
                >
                  {this.isExpanded(week) && (
                    <RemoveIcon color="inherit" fontSize="inherit" />
                  )}
                  {!this.isExpanded(week) && (
                    <AddIcon color="inherit" fontSize="inherit" />
                  )}
                </IconButton>
              </div>
            </div>
            <Collapse in={this.isExpanded(week)}>
              <div className="gridWrapper">
                {
                  videos.map(({
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
                    downloadUrl,
                    meta: {
                      isFavorite,
                      favorite: {
                        id: favId = null,
                        data: { note: favNote = null, difficulty: favDifficulty = null } = {},
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
                        downloadLink={downloadUrl}
                        isFav={isFavorite}
                        favId={favId}
                        favNote={favNote}
                        favDifficulty={favDifficulty}
                      />
                    </div>
                  ))
                }
              </div>
            </Collapse>
          </Fragment>
        ))}
      </>
    );
  }
}

VideoDownloadsGrid.propTypes = {
  baseDomain: PropTypes.string.isRequired,
};
