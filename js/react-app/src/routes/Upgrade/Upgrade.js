import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import AddIcon from '@material-ui/icons/Add';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DoneIcon from '@material-ui/icons/Done';

import styles from './Upgrade.scss';
import LayoutLoader from '../../common/components/Loaders/Layout/LayoutLoader';
import ButtonLoader from '../../common/components/Loaders/Button/ButtonLoader';
import {
  PrimaryButton,
  SecondaryButton,
  StyledRadio,
  TextBlueButton,
} from '../../common/customizedMaterialComponents';
import {
  fetchPricing,
  startUpgradeProcess,
  submitSecondUpgradeStep,
  submitThirdUpgradeStep,
  executeUpgrade,
} from '../../common/services/user';
import user from '../../common/models/user';
import handleError from '../../common/errorHandler';
import { camalizeKeys } from '../../common/helpers';

const StyledStepper = withStyles({
  root: {
    padding: 0,
    '& > div > div:first-child': {
      '@media (max-width: 767px)': {
        display: 'none',
      },
    },
  },
})(Stepper);

const StyledStepLabel = withStyles({
  iconContainer: {
    '& > svg': {
      color: '#EC407A',
    },
  },
})(StepLabel);

const TermsRadio = withStyles({
  root: {
    padding: 0,
    marginTop: -20,
  },
})(StyledRadio);

export default class Upgrade extends Component {
  state = {
    loadingPrices: true,
    loadingFirstStep: true,
    prices: {},
    firstStep: {},
    secondStep: null,
    plan: '',
    duration: '',
    option: '',
    activeStep: 0,
    submittingStep: false,
    gender: 0,
    firstName: '',
    lastName: '',
    street: '',
    zip: '',
    city: '',
    country: '',
    coupon: '',
    iban: '',
    bic: '',
    paymentMethod: 'debit',
    agb: false,
    firstStepErr: null,
    secondStepErr: null,
    thirdStepErr: null,
  };

  durations = {
    month: 1,
    quarter: 3,
    half: 6,
    year: 12,
  };

  premiumFeatures = [
    'Unbegrenzt Kursaufzeichnungen',
    'Gesundheits- und Figurprogramme',
    'Ratgeber',
    'Soziales Netzwerk',
    'Livekurse',
  ];

  goldFeatures = [...this.premiumFeatures, 'Gesundheits- und Figurprogramme', 'Ernährungspläne'];

  componentDidMount() {
    const params = window.location.search.split('&');
    const args = params.map(param => param.split('=')[1]);
    this.setState({
      plan: args[0].toLowerCase(),
      duration: args[1],
      option: args[2],
    });
    fetchPricing()
      .then(({ data: { prices } }) => this.setState({
        loadingPrices: false,
        prices: camalizeKeys(prices),
      }))
      .then(() => startUpgradeProcess(...args))
      .then(({ data }) => this.setState({
        loadingFirstStep: false,
        firstStep: camalizeKeys(data),
      }))
      .catch(handleError);
  }

  componentDidUpdate(prevProps, prevState) {
    const { props: { currentUser }, state: { secondStep } } = this;
    if (!Object.keys(prevProps.currentUser).length && Object.keys(currentUser).length) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        gender: currentUser.gender,
        firstName: currentUser.firstname,
        lastName: currentUser.lastname,
        street: currentUser.street,
        zip: currentUser.zip,
        city: currentUser.city,
        country: currentUser.country,
      });
    }
    if (!prevState.secondStep && secondStep) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        iban: secondStep.payment.bankData.currently.iban || '',
        bic: secondStep.payment.bankData.currently.bic || '',
      });
    }
  }

  submitStep = () => {
    const { state: { activeStep } } = this;
    this.setState({ submittingStep: true });
    if (activeStep === 0) {
      this.setState({ firstStepErr: null });
      const {
        state: {
          gender,
          firstName,
          lastName,
          street,
          zip,
          city,
          country,
          coupon,
        },
      } = this;
      submitSecondUpgradeStep(
        gender,
        firstName,
        lastName,
        street,
        zip,
        city,
        country,
        coupon,
      )
        .then(({ data }) => this.setState({
          activeStep: 1,
          submittingStep: false,
          secondStep: camalizeKeys(data),
        }))
        .catch(({ response: { data: { message } } }) => {
          this.setState({ firstStepErr: message, submittingStep: false });
        });
    }
    if (activeStep === 1) {
      this.setState({ secondStepErr: null });
      const { state: { paymentMethod, iban, bic } } = this;
      submitThirdUpgradeStep(paymentMethod, iban, bic)
        .then(({ data }) => this.setState({
          thirdStep: camalizeKeys(data),
          activeStep: 2,
          submittingStep: false,
        }))
        .catch(({ response: { data: { message } } }) => {
          this.setState({ secondStepErr: message, submittingStep: false });
        });
    }
    if (activeStep === 2) {
      this.setState({ thirdStepErr: null });
      executeUpgrade()
        .then(({ data }) => {
          if (data.show === 'success') {
            this.setState({ activeStep: 3, submittingStep: false });
          } else {
            window.open(data.show, '_blank');
          }
        })
        .catch(({ response: { data: { message } } }) => {
          this.setState({ thirdStepErr: message, submittingStep: false });
        });
    }
  };

  set = name => ({ target: { value } }) => this.setState({ [name]: value });

  isValidStep = idx => {
    if (idx === 0) {
      const {
        state: {
          gender,
          firstName,
          lastName,
          street,
          zip,
          city,
          country,
        },
      } = this;
      return (!!gender
        && !!firstName
        && !!lastName
        && !!street
        && !!zip
        && !!city
        && !!country);
    }
    if (idx === 1) {
      const { state: { iban, bic, paymentMethod } } = this;
      return paymentMethod !== 'debit' || (!!iban && !!bic);
    }
    if (idx === 2) {
      const { state: { agb } } = this;
      return agb;
    }
    return false;
  };

  render() {
    const {
      props: {
        baseDomain,
        isFetchingCurrentUser,
        currentUser,
      },
      state: {
        plan,
        duration,
        option,
        loadingPrices,
        prices,
        loadingFirstStep,
        firstStep,
        activeStep,
        submittingStep,
        gender,
        country,
        coupon,
        secondStep,
        paymentMethod,
        iban,
        bic,
        thirdStep,
        agb,
        firstStepErr,
        secondStepErr,
        thirdStepErr,
      },
    } = this;

    if (
      loadingPrices || loadingFirstStep || isFetchingCurrentUser || !Object.keys(currentUser).length
    ) return <LayoutLoader />;

    return (
      <div className={styles.pageWrapper}>
        <div className={styles.leftContent}>
          <h2 className={styles.blockTitle}>Upgrade Tarifplan</h2>
          <div className={styles.stepperBlock}>
            <div className={styles.stepsBlock}>
              <StyledStepper activeStep={activeStep} alternativeLabel>
                <Step active={activeStep === 0}>
                  <StyledStepLabel>
                    Deine Daten
                  </StyledStepLabel>
                </Step>
                <Step active={activeStep === 1}>
                  <StyledStepLabel>
                    Zahlungsart
                  </StyledStepLabel>
                </Step>
                <Step active={activeStep === 2}>
                  <StyledStepLabel>
                    Prufen
                  </StyledStepLabel>
                </Step>
                <Step active={activeStep === 3}>
                  <StyledStepLabel>
                    Danke
                  </StyledStepLabel>
                </Step>
              </StyledStepper>
            </div>
            <div className={styles.stepContentBlock}>
              {activeStep === 0 && (
                <>
                  <h3 className={styles.stepTitle}>Deine Daten</h3>
                  <div className={styles.inputsWrapper}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="gender">Geschlecht</InputLabel>
                      <Select
                        value={gender || currentUser.gender}
                        onChange={this.set('gender')}
                        inputProps={{
                          name: 'gender',
                          id: 'gender',
                        }}
                      >
                        <MenuItem value={0} disabled><em>Wahlen</em></MenuItem>
                        <MenuItem value={1}>Mann</MenuItem>
                        <MenuItem value={2}>Frau</MenuItem>
                      </Select>
                    </FormControl>
                    <div />
                  </div>
                  <div className={styles.inputsWrapper}>
                    <TextField
                      fullWidth
                      label="Vorname"
                      defaultValue={currentUser.firstname}
                      onChange={this.set('firstName')}
                    />
                    <TextField
                      fullWidth
                      label="Nachname"
                      defaultValue={currentUser.lastname}
                      onChange={this.set('lastName')}
                    />
                  </div>
                  <TextField
                    fullWidth
                    label="Straße, Nr."
                    defaultValue={currentUser.street}
                    onChange={this.set('street')}
                    style={{ marginBottom: 20 }}
                  />
                  <div className={styles.inputsWrapper}>
                    <TextField
                      fullWidth
                      label="PLZ"
                      defaultValue={currentUser.zip}
                      onChange={this.set('zip')}
                    />
                    <TextField
                      fullWidth
                      label="Ort"
                      defaultValue={currentUser.city}
                      onChange={this.set('city')}
                    />
                  </div>
                  <FormControl fullWidth style={{ marginBottom: 20 }}>
                    <InputLabel htmlFor="country">Land</InputLabel>
                    <Select
                      value={country || currentUser.country}
                      onChange={this.set('country')}
                      inputProps={{
                        name: 'country',
                        id: 'country',
                      }}
                    >
                      <MenuItem value={0} disabled><em>Wahlen</em></MenuItem>
                      {firstStep.countries.map(({ de }) => (
                        <MenuItem key={de} value={de} selected={country === de}>{de}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    value={coupon}
                    onChange={this.set('coupon')}
                    label="Gutscheincode (optional)"
                    placeholder="XXXX XXXX XXXX XXXX"
                  />
                  <p className={styles.error}>
                    {firstStepErr === 'InvalidFields' && 'Mindestens eines der Felder wurde falsch ausgefüllt'}
                    {firstStepErr === 'NoUpgradeToken' && 'Kein Upgrade-Token gefunden. Bitte starten Sie den Upgrade-Vorgang erneut.'}
                    {firstStepErr === 'UpgradeTokenExpired' && 'Das Upgrade-Token ist abgelaufen. Bitte starten Sie den Upgrade-Vorgang erneut.'}
                    {firstStepErr === 'ContractNotFound' && 'Der angegebene Vertrag konnte nicht gefunden werden. Bitte starten Sie den Upgrade-Vorgang erneut.'}
                    {firstStepErr === 'CouponNotFound' && 'Der bereitgestellte Gutscheincode wurde nicht gefunden.'}
                    {firstStepErr === 'CouponNotAllowedForSelectedContract' && 'Der angegebene Gutscheincode ist für den ausgewählten Vertrag nicht gültig'}
                  </p>
                </>
              )}
              {activeStep === 1 && (
                <>
                  <h3 className={styles.stepTitle}>Zahlungsart</h3>
                  {
                    (secondStep.payment.paypalAllowed
                    || secondStep.payment.transferAllowed)
                    && (
                      <FormControl component="fieldset">
                        <RadioGroup
                          className={styles.radioGroup}
                          name="payment-method"
                          value={paymentMethod}
                          onChange={this.set('paymentMethod')}
                          row
                        >
                          <FormControlLabel
                            value="debit"
                            label="Lastschrift"
                            control={<StyledRadio />}
                          />
                          {secondStep.payment.paypalAllowed && (
                            <FormControlLabel
                              value="paypal"
                              label="PayPal"
                              control={<StyledRadio />}
                            />
                          )}
                          {secondStep.payment.transferAllowed && (
                            <FormControlLabel
                              value="transfer"
                              label="Überweisung"
                              control={<StyledRadio />}
                            />
                          )}
                        </RadioGroup>
                      </FormControl>
                    )
                  }
                  {paymentMethod === 'debit' && (
                    <>
                      <TextField
                        fullWidth
                        label="IBAN"
                        value={iban}
                        onChange={this.set('iban')}
                        style={{ margin: '20px 0' }}
                      />
                      <TextField
                        fullWidth
                        label="BIC"
                        value={bic}
                        onChange={this.set('bic')}
                        style={{ marginBottom: 20 }}
                      />
                      <p className={styles.secondStepMessage}>
                        Hinweis: Mit dem Ändern deiner Bankdaten erteilst Du uns ein&nbsp;
                        <a
                          href="https://www.sparkasse.de/unsere-loesungen/firmenkunden/konten-karten/sepa-lastschrift.html"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          SEPA Lastschriftmandat
                        </a>
                      </p>
                    </>
                  )}
                  {paymentMethod === 'paypal' && (
                    <p className={styles.secondStepPaymentMessage}>
                      Es werden keine Daten mehr benötigt. Nach dem Ausführen
                      des Upgrades werden Sie zu PayPal weitergeleitet.
                    </p>
                  )}
                  {paymentMethod === 'transfer' && (
                    <p className={styles.secondStepPaymentMessage}>
                      Es werden keine Daten mehr benötigt. Nach dem Upgrade
                      erhalten Sie von uns eine Rechnung mit allen Bankdaten.
                    </p>
                  )}
                  <p className={styles.error}>
                    {secondStepErr === 'NoUpgradeToken' && 'Kein Upgrade-Token gefunden. Bitte starten Sie den Upgrade-Vorgang erneut.'}
                    {secondStepErr === 'UpgradeTokenExpired' && 'Das Upgrade-Token ist abgelaufen. Bitte starten Sie den Upgrade-Vorgang erneut.'}
                    {secondStepErr === 'InvalidIban' && 'Das eingegebene iban ist ungültig'}
                    {secondStepErr === 'InvalidBic' && 'Der eingegebene Bic ist ungültig'}
                    {secondStepErr === 'NoBankDataFound' && 'Aktuelle Lastschriftdaten sollten verwendet werden, werden aber nicht gefunden'}
                    {secondStepErr === 'InvalidCurrentData' && 'Aktuelle Lastschriftdaten sollten verwendet werden, werden gefunden, sind aber ungültig'}
                    {secondStepErr === 'ContractNotFound' && 'Der angegebene Vertrag aus dem ersten Schritt konnte nicht gefunden werden. Starten Sie den Aktualisierungsvorgang neu.'}
                  </p>
                </>
              )}
              {activeStep === 2 && (
                <>
                  <div className={styles.thirdStepWrapper}>
                    <div>
                      <h3 className={styles.stepTitle}>Diene Daten</h3>
                      <p className={styles.thirdStepInfo}>
                        {`${thirdStep.user.firstname} ${thirdStep.user.lastname}`}
                        <br />
                        {thirdStep.user.street}
                        <br />
                        {thirdStep.user.city}
                        <br />
                        {thirdStep.user.country}
                      </p>
                    </div>
                    <div>
                      <h3 className={styles.stepTitle}>Diene Zahlungsart</h3>
                      <p className={styles.thirdStepInfo}>
                        {thirdStep.payment.method === 'debit' && (
                          <>
                            <span>SEPA-Lastschrift</span>
                            <br />
                            IBAN: GB82 WESR 1234 5678 9012 3456
                            <br />
                            BIC: DEUT DE DB FRA
                          </>
                        )}
                        {thirdStep.payment.method === 'paypal' && 'PayPal'}
                        {thirdStep.payment.method === 'transfer' && 'Banküberweisung'}
                      </p>
                    </div>
                  </div>
                  <FormControlLabel
                    checked={agb}
                    label={(
                      <p className={styles.thirdStepCheckboxLabel}>
                        Ja, ich habe die&nbsp;
                        <a
                          href={`${baseDomain}/agb`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          allgemeinen Geschäftsbedingungen (AGB) und Datenschutzerklärung
                        </a>
                        &nbsp;gelesen, verstanden und stimme diesen zu
                      </p>
                    )}
                    control={<TermsRadio onChange={() => this.set('agb')({ target: { value: true } })} />}
                    style={{ marginTop: 20, marginLeft: -12 }}
                  />
                  <p className={styles.error}>
                    {thirdStepErr === 'NoUpgradeToken' && 'Kein Upgrade-Token gefunden. Bitte starten Sie den Upgrade-Vorgang erneut.'}
                    {thirdStepErr === 'UpgradeTokenExpired' && 'Das Upgrade-Token ist abgelaufen. Bitte starten Sie den Upgrade-Vorgang erneut.'}
                    {thirdStepErr === 'ContractNotFound' && 'Der angegebene Vertrag konnte nicht gefunden werden. Bitte starten Sie den Upgrade-Vorgang erneut.'}
                    {thirdStepErr === 'UpgradeWentWrong' && 'Beim Verarbeiten und Ausführen des Upgrades ist ein Fehler aufgetreten. Alle Daten werden zurückgesetzt, sodass der Prozess erneut gestartet werden kann.'}
                  </p>
                </>
              )}
              {activeStep === 3 && (
                <div className={styles.fourthStepWrapper}>
                  <div className={styles.fourthStepIconWrapper}>
                    <DoneIcon color="inherit" fontSize="inherit" />
                  </div>
                  <p className={styles.fourthStepMessage}>
                    Zahlung war erfolgreich!
                    <br />
                    Ihr Tarifplan wurde aktualisiert
                  </p>
                  <SecondaryButton href={`${baseDomain}/you`}>
                    ZUR HOME
                  </SecondaryButton>
                </div>
              )}
            </div>
            {activeStep !== 3 && (
              <div className={styles.stepperButtonsWrapper}>
                <SecondaryButton
                  disabled={activeStep === 0}
                  onClick={() => this.setState(prevState => ({
                    activeStep: prevState.activeStep - 1,
                  }))}
                >
                  ZURUK
                </SecondaryButton>
                <PrimaryButton
                  onClick={() => this.submitStep()}
                  disabled={!this.isValidStep(activeStep) || submittingStep}
                >
                  WEITER
                  {submittingStep && <ButtonLoader color="white" />}
                </PrimaryButton>
              </div>
            )}
          </div>
        </div>
        <div className={styles.rightContent}>
          <h2 className={styles.blockTitle}>Dein neuer Tarif</h2>
          <div className={styles.planBlock}>
            <div
              className={styles.planThumbnail}
              style={{
                backgroundImage: `url(${baseDomain}/assets/js/react-app/src/assets/img/png/${plan}-pricing-plan-bg.png)`,
              }}
            >
              <h3 className={styles.planThumbnailTitle}>
                {`${this.durations[duration]} MONATE ${plan.toUpperCase()}`}
              </h3>
              <p className={styles.planThumbnailSubTitle}>
                <span>
                  {prices[plan.toLowerCase()][`${duration}${option === 'monthly' ? '' : 'Prepaid'}`].regular}
                </span>
                &nbsp;/ Monat
              </p>
            </div>
            <ul className={styles.featuresList}>
              {this[`${plan.toLowerCase()}Features`].map(feature => (
                <li
                  key={Math.random()}
                  className={styles.featuresListItem}
                >
                  <span className={styles.featureText}>{feature}</span>
                  <div className={styles.featureIconWrapper}>
                    <AddIcon color="inherit" fontSize="inherit" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {!!firstStep.offer && (
            <div className={styles.offerBlock}>
              <h3 className={styles.offerTitle}>
                Spare jetzt&nbsp;
                {firstStep.offer.discount}
                %!
              </h3>
              <p className={styles.offerDescription}>
                Wechsel von monatlicher Zahlung auf eine einmalige
                Zahlung und spare dabei bares Geld!
                <br />
                <br />
                Du zahlst dann nur&nbsp;
                {firstStep.offer.price}
                &nbsp;€ und sparst somit ganze&nbsp;
                {firstStep.offer.discount}
                %.
              </p>
              <div className={styles.offerButtonWrapper}>
                <TextBlueButton
                  href={`${baseDomain}/doupgrade?plan=${plan}&duration=${duration}&option=prepaid`}
                >
                  JETZT WECHSELN
                </TextBlueButton>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Upgrade.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetchingCurrentUser: PropTypes.bool.isRequired,
  currentUser: user,
};

Upgrade.defaultProps = {
  currentUser: {},
};
