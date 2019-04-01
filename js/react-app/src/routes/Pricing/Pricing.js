import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import LooksOneRoundedIcon from '@material-ui/icons/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@material-ui/icons/LooksTwoOutlined';
import Looks3RoundedIcon from '@material-ui/icons/Looks3Outlined';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import styles from './Pricing.scss';
import Loader from '../../common/components/Loaders/Layout/LayoutLoader';
import { fetchPricing, validateCoupon } from '../../common/services/user';
import handleError from '../../common/errorHandler';
import {
  StyledRadio,
  PrimaryButton,
  SecondaryButton,
  BlueButton,
} from '../../common/customizedMaterialComponents';
import { camalizeKeys } from '../../common/helpers';
import ButtonLoader from '../../common/components/Loaders/Button/ButtonLoader';

export default class Pricing extends Component {
  state = {
    loading: false,
    data: {},
    option: '',
    period: 'month',
    coupon: '',
    validatingCoupon: false,
    couponSuccessData: {},
    couponValidationError: null,
  };

  periods = {
    month: 'Monat',
    quarter: 'Quartal',
    half: 'Halbjahr',
    year: 'Jahr',
  };

  couponValidationMessages = {
    CouponNotFound: 'Der Code ist leider ungültig',
    CouponNotForSelectedContract: 'Der Code ist für Ihren Vertrag ungültig',
  };

  componentDidMount() {
    this.setState({ loading: true });

    fetchPricing()
      .then(({ data: { prices } }) => this.setState({ data: camalizeKeys(prices), loading: false }))
      .catch(handleError);
  }

  set = name => ({ target: { value } }) => this.setState({ [name]: value });

  validateCoupon = () => {
    this.setState({ validatingCoupon: true });

    const { state: { coupon } } = this;

    validateCoupon(coupon)
      .then(({ data }) => this.setState({
        validatingCoupon: false,
        couponSuccessData: camalizeKeys(data),
      }))
      .catch(({ response: { data: { message } } }) => this.setState({
        validatingCoupon: false,
        couponValidationError: message,
      }));
  };

  render() {
    const {
      state: {
        loading,
        data,
        option,
        period,
        coupon,
        validatingCoupon,
        couponSuccessData,
        couponValidationError,
      },
      props: {
        baseDomain,
      },
    } = this;

    if (loading || !Object.keys(data).length) return <Loader />;

    const {
      free: {
        regular: freeRegularPrice,
        discount: freeDiscountPrice,
      },
      premium: {
        [`${period}${option}`]: {
          regular: premiumRegularPrice,
          discount: premiumDiscountPrice,
        },
      },
      gold: {
        [`${period}${option}`]: {
          regular: goldRegularPrice,
          discount: goldDiscountPrice,
        },
      },
    } = data;

    return (
      <>
        <h1 className={styles.title}>Preise & Leistungen</h1>
        <div className={`${styles.block} ${styles.topBlock}`}>
          <div className={styles.topSubBlock}>
            <div>
              <div className={styles.stepIconWrapper}>
                <LooksOneRoundedIcon color="inherit" fontSize="inherit" />
              </div>
            </div>
            <div>
              <h2 className={styles.topSubBlockTitle}>Zahlweise</h2>
              <FormControl component="fieldset">
                <RadioGroup value={option} onChange={this.set('option')}>
                  <FormControlLabel
                    value=""
                    label="Monatlich"
                    control={<StyledRadio />}
                  />
                  <FormControlLabel
                    value="Prepaid"
                    label="Vorauszahlung"
                    control={<StyledRadio />}
                    disabled={period === 'month'}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className={styles.topSubBlock}>
            <div className={styles.stepIconWrapper}>
              <LooksTwoOutlinedIcon color="inherit" fontSize="inherit" />
            </div>
            <div>
              <h2 className={styles.topSubBlockTitle}>Laufzeit</h2>
              <div className={styles.periodControlsWrapper}>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={period}
                    onChange={this.set('period')}
                    className={styles.periodControlsWrapper}
                  >
                    <FormControlLabel
                      value="month"
                      label="1 monat"
                      control={<StyledRadio />}
                      disabled={option === 'Prepaid'}
                    />
                    <FormControlLabel
                      value="quarter"
                      label="3 monate"
                      control={<StyledRadio />}
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={period}
                    onChange={this.set('period')}
                    className={styles.periodControlsWrapper}
                  >
                    <FormControlLabel
                      value="half"
                      label="6 monate"
                      control={<StyledRadio />}
                    />
                    <FormControlLabel
                      value="year"
                      label="12 monate"
                      control={<StyledRadio />}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          <div className={styles.topSubBlock}>
            <div className={styles.stepIconWrapper}>
              <Looks3RoundedIcon color="inherit" fontSize="inherit" />
            </div>
            <div>
              <h2 className={styles.topSubBlockTitle}>Gutschein oder Promocode einlösen</h2>
              <div>
                <div className={styles.couponInputInnerWrapper}>
                  <TextField
                    fullWidth
                    value={coupon}
                    onChange={this.set('coupon')}
                    disabled={validatingCoupon}
                    label="Gutscheincode (optional)"
                    placeholder="XXXX XXXX XXXX XXXX"
                  />
                  <BlueButton
                    onClick={this.validateCoupon}
                    disabled={validatingCoupon || !coupon}
                  >
                    Prüfen
                    {validatingCoupon && <ButtonLoader color="#ffffff" />}
                  </BlueButton>
                </div>
                <div>
                  {couponValidationError && (
                    <p className={styles.couponValidationError}>
                      {this.couponValidationMessages[couponValidationError]}
                    </p>
                  )}
                  {!!Object.keys(couponSuccessData).length && (
                    <div className={styles.couponSuccessInfoWrapper}>
                      <p>
                        Ihr Gutschein wurde erfolgreich beantragt!
                        <br />
                        <br />
                        Kuponname:&nbsp;
                        {couponSuccessData.name}
                        <br />
                        <br />
                        Kuponbeschreibung:&nbsp;
                        {couponSuccessData.description}
                        {couponSuccessData.contract && (
                          <>
                            <br />
                            <br />
                            Vertragsname:&nbsp;
                            {couponSuccessData.contract.name}
                            <br />
                            <br />
                            Vertragsbeschreibung:&nbsp;
                            {couponSuccessData.contract.description}
                            <br />
                            <br />
                            Freie Tage:&nbsp;
                            {couponSuccessData.contract.freeDays}
                          </>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.plansWrapper}>
          <div className={`${styles.block} ${styles.planBlock}`}>
            <div className={styles.planThumbnail}>
              <h3 className={styles.planTitle}>Gratiszugang</h3>
              {freeRegularPrice === freeDiscountPrice && (
                <p className={styles.planPrice}>{freeRegularPrice}</p>
              )}
              {freeRegularPrice !== freeDiscountPrice && (
                <div className={`${styles.planPrice} ${styles.planPriceWithDiscount}`}>
                  <div className={styles.regularPrice}>
                    <span>{freeRegularPrice}</span>
                    <div className={styles.lineThrough} />
                  </div>
                  <span>{freeDiscountPrice}</span>
                </div>
              )}
              <p className={styles.planPer}>{this.periods[period]}</p>
            </div>
            <div className={styles.planInfoWrapper}>
              <p className={styles.planDescription}>
                Als Gratisnutzer von pur-life haben Sie Zugriff auf alle Kurse.
                Sie bekommen die Gelegenheit eine Woche lang unverbindlich
                pur-life Gold zu genießen. Darüber hinaus bekommen Sie
                von uns jede Woche 30 Freiminuten die sie abtrainieren können.
              </p>
              <div>
                <ul className={styles.optionsList}>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Livekurse</span>
                    <div className={styles.optionIconWrapper}>
                      <RemoveIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Unbegrenzt Kursaufzeichnungen</span>
                    <div className={styles.optionIconWrapper}>
                      <AddIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Gesundheits- und Figurprogramme</span>
                    <div className={styles.optionIconWrapper}>
                      <RemoveIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Ernährungspläne</span>
                    <div className={styles.optionIconWrapper}>
                      <RemoveIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Ratgeber</span>
                    <div className={styles.optionIconWrapper}>
                      <AddIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Soziales Netzwerk</span>
                    <div className={styles.optionIconWrapper}>
                      <AddIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                </ul>
                <div className={styles.planButtonWrapper}>
                  <SecondaryButton disabled>
                    AUSWÄHLEN
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.block} ${styles.planBlock}`}>
            <div className={styles.planThumbnail}>
              <h3 className={styles.planTitle}>Premium</h3>
              {premiumRegularPrice === premiumDiscountPrice && (
                <p className={styles.planPrice}>{premiumRegularPrice}</p>
              )}
              {premiumRegularPrice !== premiumDiscountPrice && (
                <div className={`${styles.planPrice} ${styles.planPriceWithDiscount}`}>
                  <div className={styles.regularPrice}>
                    <span>{premiumRegularPrice}</span>
                    <div className={styles.lineThrough} />
                  </div>
                  <span>{premiumDiscountPrice}</span>
                </div>
              )}
              <p className={styles.planPer}>{this.periods[period]}</p>
            </div>
            <div className={styles.planInfoWrapper}>
              <p className={styles.planDescription}>
                Als Premiumnutzer bekommen Sie grenzenlosen Zugang zu
                allen Kursen und Liveübertragungen. Sie können
                schauen was Sie wollen und so viel sie wollen!
              </p>
              <div>
                <ul className={styles.optionsList}>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Livekurse</span>
                    <div className={styles.optionIconWrapper}>
                      <AddIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Unbegrenzt Kursaufzeichnungen</span>
                    <div className={styles.optionIconWrapper}>
                      <AddIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Gesundheits- und Figurprogramme</span>
                    <div className={styles.optionIconWrapper}>
                      <RemoveIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Ernährungspläne</span>
                    <div className={styles.optionIconWrapper}>
                      <RemoveIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Ratgeber</span>
                    <div className={styles.optionIconWrapper}>
                      <AddIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Soziales Netzwerk</span>
                    <div className={styles.optionIconWrapper}>
                      <AddIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                </ul>
                <div className={styles.planButtonWrapper}>
                  <PrimaryButton
                    href={`${baseDomain}/doupgrade?plan=Premium&period=${period}&option=${option || 'monthly'}`}
                  >
                    AUSWÄHLEN
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.block} ${styles.planBlock}`}>
            <div className={styles.planThumbnail}>
              <h3 className={styles.planTitle}>Gold</h3>
              {goldRegularPrice === goldDiscountPrice && (
                <p className={styles.planPrice}>{goldRegularPrice}</p>
              )}
              {goldRegularPrice !== goldDiscountPrice && (
                <div className={`${styles.planPrice} ${styles.planPriceWithDiscount}`}>
                  <div className={styles.regularPrice}>
                    <span>{goldRegularPrice}</span>
                    <div className={styles.lineThrough} />
                  </div>
                  <span>{goldDiscountPrice}</span>
                </div>
              )}
              <p className={styles.planPer}>{this.periods[period]}</p>
              <span className={styles.popularLabel}>BELIEBT</span>
            </div>
            <div className={styles.planInfoWrapper}>
              <p className={styles.planDescription}>
                Als Gold-Mitglied von pur-life erhalten Sie zusätzlich Zugriff
                auf unseren Wissensbereich mit vielen Artikeln über die
                Themen Gesundheit, Ernährung, Training und vielem mehr.
                Sie können außerdem an unseren Gesundheits- und
                Figurprogrammen Teilnehmen. Darin enthalten
                sind abwechslungsreiche Trainings- und
                Ernährungspläne mit ständig wachsendem Inhalt.
              </p>
              <div>
                <ul className={styles.optionsList}>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Livekurse</span>
                    <div className={styles.optionIconWrapper}>
                      <AddIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Unbegrenzt Kursaufzeichnungen</span>
                    <div className={styles.optionIconWrapper}>
                      <AddIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Gesundheits- und Figurprogramme</span>
                    <div className={styles.optionIconWrapper}>
                      <AddIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Ernährungspläne</span>
                    <div className={styles.optionIconWrapper}>
                      <AddIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Ratgeber</span>
                    <div className={styles.optionIconWrapper}>
                      <AddIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                  <li className={styles.optionsListItem}>
                    <span className={styles.optionText}>Soziales Netzwerk</span>
                    <div className={styles.optionIconWrapper}>
                      <AddIcon color="inherit" fontSize="inherit" />
                    </div>
                  </li>
                </ul>
                <div className={styles.planButtonWrapper}>
                  <BlueButton
                    href={`${baseDomain}/doupgrade?plan=Gold&period=${period}&option=${option || 'monthly'}`}
                  >
                    AUSWÄHLEN
                  </BlueButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Pricing.propTypes = {
  baseDomain: PropTypes.string.isRequired,
};
