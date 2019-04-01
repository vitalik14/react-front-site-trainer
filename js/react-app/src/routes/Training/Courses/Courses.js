import React from 'react';
import { PropTypes } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import SliderContainer from '../../../common/components/Slider/SliderContainer';
import CourseGridItem from '../../../common/components/GridItems/Course/CourseGridItem';
import { TextBlueButton } from '../../../common/customizedMaterialComponents';
import { fullCourse } from '../../../common/models/course';
import routeStyles from '../Training.scss';
import componentStyles from './Courses.scss';

const Courses = ({
  baseDomain,
  isFetching,
  items,
}) => {
  if (isFetching) {
    return (
      <div className={routeStyles.loaderCont}>
        <CircularProgress />
      </div>
    );
  }

  if (!items.length) {
    return <p>Keine Kurse verfügbar ¯\_(ツ)_/¯</p>;
  }

  return (
    <div className={componentStyles.cont}>
      <SliderContainer
        title="Beliebte Kurse"
        buttons={[
          <TextBlueButton href={`${baseDomain}/kurse/kurse`} style={{ marginRight: 10 }}>
            ALLE KURSE
          </TextBlueButton>,
        ]}
        slides={
          items.map(({
            id,
            name,
            descriptions: { short },
            slug,
            banners: {
              default: thumbnailURL,
            },
            kcal,
            videos,
          }) => (
            <CourseGridItem
              key={id}
              id={id}
              baseDomain={baseDomain}
              name={name}
              description={short}
              slug={slug}
              thumbnailURL={thumbnailURL}
              kcal={kcal}
              videosCount={videos}
            />
          ))
        }
      />
    </div>
  );
};

Courses.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(fullCourse).isRequired,
};

export default Courses;
