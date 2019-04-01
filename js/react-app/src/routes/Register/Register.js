import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      gender: '',
      password: '',
      password_сonfirm: '',
      agb: false,
      newsletter: 1
    };
  }

  setValue = (name, event) => {
    this.setState({ [name]: event.target.value });
  };

  toggleValue = name => {
    const { [name]: value } = this.state;
    this.setState({ [name]: !value });
  };

  toggleNewsletter() {
    const { newsletter: value } = this.state;
    this.setState({ newsletter: value === 0 ? 1 : 0 });
  }

  render() {
    const {
      props: { registerUser, errorMessage }
    } = this;
    return (
      <div className="register-page">
        <div className="register-page__inner-block">
          <h1 className="register-page__title">Registrieren</h1>
          <div className="register-page__coupon-info-cont">
            <h3 className="register-page__coupon-info-title">
              7 Tage kostenlos Goldmitgliedschaft testen
            </h3>
            <p className="register-page__coupon-info-description">
              Teste unverbindlich und kostenlos sieben Tage pur-life mit allen
              Funktionen. Der Zugang wird danach automatisch wieder zu einem
              Gratiszugang zurückgestuft.
            </p>
          </div>
          {errorMessage ? <div>{errorMessage}</div> : null}
          <div className="register-page__form-top-inner-cont">
            <div className="register-page__field-cont register-page__select-cont">
              <label htmlFor="genre" className="register-page__label">
                Anrede
              </label>
              <select
                className="register-page__select"
                name="genre"
                id="genre"
                onChange={value => {
                  this.setValue('gender', value);
                }}
              >
                <option selected disabled>
                  Wählen
                </option>
                <option value="0">Mann</option>
                <option value="1">Frau</option>
              </select>
            </div>
            <div className="register-page__field-cont">
              <label htmlFor="first_name" className="register-page__label">
                Vorname
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="Vorname"
                className="register-page__input"
                onChange={value => {
                  this.setValue('firstname', value);
                }}
              />
            </div>
            <div className="register-page__field-cont">
              <label htmlFor="last_name" className="register-page__label">
                Nachname
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Nachname"
                className="register-page__input"
                onChange={value => {
                  this.setValue('lastname', value);
                }}
              />
            </div>
            <div className="register-page__field-cont">
              <label htmlFor="email" className="register-page__label">
                E-Mail Adresse
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Diene E-Mail Adresse"
                className="register-page__input"
                onChange={value => {
                  this.setValue('email', value);
                }}
              />
            </div>
            <div className="register-page__field-cont">
              <label htmlFor="password" className="register-page__label">
                Passwort
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Passwort"
                className="register-page__input"
                onChange={value => {
                  this.setValue('password', value);
                }}
              />
            </div>
            <div className="register-page__field-cont">
              <label
                htmlFor="password_confirm"
                className="register-page__label"
              >
                Passwort bestätigen
              </label>
              <input
                type="password"
                name="password_confirm"
                id="password_confirm"
                placeholder="Passwort bestätigen"
                className="register-page__input"
                onChange={value => {
                  this.setValue('password_сonfirm', value);
                }}
              />
            </div>
          </div>
          <div className="register-page__coupon-field-cont">
            <div className="register-page__field-cont">
              <label className="register-page__label">Gutschein</label>
              <input
                type="text"
                // name="password_confirm"
                // id="password_confirm"
                placeholder="Gutscheincode, wenn vorhanden"
                className="register-page__input"
              />
            </div>
            <button type="button" className="register-page__redeem-btn">
              EINLÖSEN
            </button>
          </div>
          <label className="register-page__checkbox-label" htmlFor="terms">
            <input
              type="checkbox"
              name="terms"
              onChange={() => {
                this.toggleValue('agb');
              }}
              id="terms"
            />
            Ja, ich habe die
            <a
              href="https://pur-life.net/agb"
              target="_blank"
              rel="noopener noreferrer"
            >
              allgemeinen Geschäftsbedingungen (AGB) und Datenschutzerklärung
            </a>
            gelesen, verstanden und stimme diesen zu
          </label>
          <label className="register-page__checkbox-label" htmlFor="newsletter">
            <input
              type="checkbox"
              name="newsletter"
              onChange={() => {
                this.toggleNewsletter();
              }}
              id="newsletter"
            />
            Ja, pur-life darf mir Angebote und Neuerungen bzgl. pur-life
            zukommen lassen. Dies kann jederzeit in den Einstellungen geändert
            werden
          </label>
          <button
            type="submit"
            onClick={() => {
              registerUser(this.state);
            }}
            className="register-page__submit-btn"
          >
            JETZT REGISTRIEREN
          </button>
          <p className="register-page__login">
            Schon ein Konto?
            <a href="/login">Jetzt einloggen</a>
          </p>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired
};
