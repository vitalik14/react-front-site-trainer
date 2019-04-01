import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick/lib';

import {
  SliderArrIconButton,
  SliderArrIconButtonUnbordered,
  SliderPrevIcon,
  SliderNextIcon,
} from '../../customizedMaterialComponents';
import styles from './Slider.scss';

const SliderComponent = ({
  title,
  buttons,
  sliderRef,
  sliderConfig,
  canGoBack,
  canGoNext,
  setSliderReference,
  onBeforeChange,
  slides,
  buttonsBordered,
  titleStyles,
  topContStyles,
}) => {
  const ArrIconButton = buttonsBordered ? SliderArrIconButton : SliderArrIconButtonUnbordered;

  return (
    <div className={styles.cont}>
      <div className={styles.topCont} style={topContStyles}>
        <h2 className={styles.title} style={titleStyles}>{title}</h2>
        {sliderRef && (
          <div>
            {buttons || null}
            <ArrIconButton
              onClick={sliderRef.slickPrev}
              disabled={!canGoBack}
            >
              <SliderPrevIcon />
            </ArrIconButton>
            <ArrIconButton
              onClick={sliderRef.slickNext}
              disabled={!canGoNext}
            >
              <SliderNextIcon />
            </ArrIconButton>
          </div>
        )}
      </div>
      <Slider
        ref={setSliderReference}
        {...sliderConfig}
        beforeChange={onBeforeChange}
      >
        {slides}
      </Slider>
    </div>
  );
};

SliderComponent.propTypes = {
  title: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.node),
  slides: PropTypes.arrayOf(PropTypes.node).isRequired,
  canGoBack: PropTypes.bool.isRequired,
  canGoNext: PropTypes.bool.isRequired,
  buttonsBordered: PropTypes.bool.isRequired,
  titleStyles: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
  topContStyles: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
};

SliderComponent.defaultProps = {
  buttons: null,
};

export default SliderComponent;
