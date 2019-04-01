import {
  REQUEST_VIDEOS,
  RECEIVE_VIDEOS,
  REQUEST_VIDEO,
  RECEIVE_VIDEO
} from './actionsTypes';
import { fetchVideos, fetchVideo } from '../services/videos';
import { camalizeKeys } from '../helpers';
import handleError from '../errorHandler';

const requestVideos = progressState => ({
  type: REQUEST_VIDEOS,
  progressState
});

const receiveVideos = (
  { data, total, currentPage, nextPageUrl, perPage },
  progressState,
  shouldReplace
) => ({
  type: RECEIVE_VIDEOS,
  items: data,
  count: total,
  countPerPage: perPage,
  currentPage: +currentPage,
  canPaginate: !!nextPageUrl,
  progressState,
  shouldReplace
});

const requestVideo = { type: REQUEST_VIDEO };

const receiveVideo = ({ video }) => ({
  type: RECEIVE_VIDEO,
  video
});

export const getVideos = (
  page,
  progressState = 'all',
  shouldReplace = true
) => () => dispatch => {
  dispatch(requestVideos(progressState));

  return fetchVideos(page, progressState)
    .then(({ data }) =>
      dispatch(receiveVideos(camalizeKeys(data), progressState, shouldReplace))
    )
    .catch(handleError);
};

const getCheckboxData = data => {
  let result = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i].checked) {
      result = result.concat(`${data[i].id},`);
    }
  }
  return result.substring(0, result.length - 1);
};

const getDuration = (durationValue, durationRanges) => ({
  from: durationRanges[durationValue].from,
  to:
    durationRanges[durationValue].to === Infinity
      ? null
      : durationRanges[durationValue].to
});

export const filterVideos = (
  page = 1,
  { difficulty, course, trainer, durationRanges, durationValue },
  shouldReplace = true
) => dispatch => {
  dispatch(requestVideos('all'));

  const durations = getDuration(durationValue, durationRanges);

  return fetchVideos(
    page,
    'all',
    getCheckboxData(course),
    durations.from,
    durations.to,
    getCheckboxData(difficulty),
    getCheckboxData(trainer)
  )
    .then(({ data }) =>
      dispatch(receiveVideos(camalizeKeys(data), 'all', shouldReplace))
    )
    .catch(handleError);
};

export const getVideo = id => dispatch => {
  dispatch(requestVideo);

  return fetchVideo(id)
    .then(({ data }) => dispatch(receiveVideo(camalizeKeys(data))))
    .catch(handleError);
};
