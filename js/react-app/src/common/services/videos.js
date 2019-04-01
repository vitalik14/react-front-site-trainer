import { fetch, create } from '../httpClient';

export const fetchVideos = (
  page = 1,
  watched,
  course,
  durationFrom,
  durationTo,
  level,
  trainers,
) => fetch(
  '/videos',
  {
    page,
    watched,
    course,
    duration_from: durationFrom,
    duration_to: durationTo,
    level,
    trainers,
  },
);

export const fetchVideo = id => fetch(`/videos/${id}`);

export const fetchVideoDownloads = () => fetch('/videos/downloads');

export const sendVideoFeedback = (videoId, subject, message = '') => create(
  `/videos/${videoId}/feedback`,
  { source: 'Website', subject, message },
);
