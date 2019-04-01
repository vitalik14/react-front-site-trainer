import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import SingleMealPlan from './SingleMealPlan';
import meal from '../../../common/models/meal';

export default class SingleMealPlanContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slider: {
        reference: null,
        canGoBack: false,
        canGoNext: false,
      },
    };

    this.sliderConfig = {
      dots: false,
      arrows: false,
      infinite: false,
      draggable: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 414,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };

    this.setSliderArrowsState = this.setSliderArrowsState.bind(this);
    this.setSliderReference = this.setSliderReference.bind(this);

    window.addEventListener('resize', () => this.setSliderArrowsState(null, 0));
  }

  setSliderArrowsState(oldIdx, newIdx, ref) {
    const { state: { slider } } = this;
    const reference = ref || slider.reference;
    if (!(reference && reference.state)) return;
    const { state: { breakpoint: currentBreakpoint } } = reference;
    let idxSlidesCount = null;
    const { props: { children: { length: slidesCount } } } = reference;
    if (currentBreakpoint) {
      const { props: { responsive: responsiveSettings } } = reference;
      ([{ settings: { slidesToShow: idxSlidesCount } }] = responsiveSettings
        .filter(({ breakpoint }) => currentBreakpoint === breakpoint));
    } else {
      ({ props: { slidesToShow: idxSlidesCount } } = reference);
    }
    this.setState(({ slider: prevSlider }) => ({
      slider: {
        ...prevSlider,
        canGoBack: !!newIdx,
        canGoNext: newIdx + idxSlidesCount < slidesCount,
      },
    }));
  }

  setSliderReference(reference) {
    this.setState(({ slider }) => ({
      slider: {
        ...slider,
        reference,
      },
    }));
    this.setSliderArrowsState(null, 0, reference);
  }

  render() {
    const {
      state: { slider: { reference, canGoBack, canGoNext } },
      props: { baseDomain, date, meals },
    } = this;

    return (
      <SingleMealPlan
        baseDomain={baseDomain}
        date={date}
        meals={meals}
        slider={reference}
        canGoBack={canGoBack}
        canGoNext={canGoNext}
        sliderConfig={this.sliderConfig}
        setSliderReference={this.setSliderReference}
        onBeforeChange={this.setSliderArrowsState}
      />
    );
  }
}

SingleMealPlanContainer.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  meals: PropTypes.arrayOf(meal).isRequired,
};
