import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './Footer.scss';

const Footer = ({ baseDomain }) => (
  <div className={styles.cont}>
    <div className={styles.topCont}>
      <div className={styles.leftCont}>
        <ul className={styles.linksList}>
          <li>
            <a className={styles.link} href={`${baseDomain}/hilfe`}>Häufige Fragen</a>
          </li>
          <li>
            <a className={styles.link} href={`${baseDomain}/contactform`}>Kontakt</a>
          </li>
          <li>
            <a className={styles.link} href={`${baseDomain}/apps`}>Apps</a>
          </li>
        </ul>
        <ul className={styles.linksList}>
          <li>
            <a className={styles.link} href={`${baseDomain}/preise-leistungen`}>Preise & Leistungen</a>
          </li>
          <li>
            <a className={styles.link} href={`${baseDomain}/presse`}>Presse</a>
          </li>
          <li>
            <a className={styles.link} href={`${baseDomain}/agb`}>AGB</a>
          </li>
        </ul>
        <ul className={styles.linksList}>
          <li>
            <a className={styles.link} href={`${baseDomain}/impressum`}>Impressum</a>
          </li>
          <li>
            <a className={styles.link} href={`${baseDomain}/unternehmen`}>Unternehmen</a>
          </li>
          <li>
            <a className={styles.link} href={`${baseDomain}/partner`}>Partner</a>
          </li>
        </ul>
      </div>
      <div className={styles.courtesyCont}>
        <h4 className={styles.courtesyHeading}>Mit freundlicher Genehmigung der</h4>
        <div className={styles.courtesyImgsCont}>
          <img src={`${baseDomain}/assets/js/react-app/src/assets/img/png/gema-logo.png`} alt="Gemi logo" />
          <img src={`${baseDomain}/assets/js/react-app/src/assets/img/png/emi-logo.png`} alt="Emi logo" />
          <img src={`${baseDomain}/assets/js/react-app/src/assets/img/png/move-ya-logo.png`} alt="Move Ya logo" />
        </div>
      </div>
    </div>
    <div className={styles.bottomCont}>
      <div className={styles.bottomLeftCont}>
        <div className={styles.socialIconsCont}>
          <a href="https://www.facebook.com/purlifeonlinefitness/" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink}>
            <svg className={styles.socialIcon} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 510 510" style={{ enableBackground: 'new 0 0 510 510' }} xmlSpace="preserve">
              <g>
                <g id="post-facebook">
                  <path d="M459,0H51C22.95,0,0,22.95,0,51v408c0,28.05,22.95,51,51,51h408c28.05,0,51-22.95,51-51V51C510,22.95,487.05,0,459,0z M433.5,51v76.5h-51c-15.3,0-25.5,10.2-25.5,25.5v51h76.5v76.5H357V459h-76.5V280.5h-51V204h51v-63.75 C280.5,91.8,321.3,51,369.75,51H433.5z" />
                </g>
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
              </g>
            </svg>
          </a>
          <a href="https://www.instagram.com/purlife_onlinefitness/" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink}>
            <svg className={styles.socialIcon} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 169.063 169.063" style={{ enableBackground: 'new 0 0 169.063 169.063' }} xmlSpace="preserve">
              <g>
                <path d="M122.406,0H46.654C20.929,0,0,20.93,0,46.655v75.752c0,25.726,20.929,46.655,46.654,46.655h75.752 c25.727,0,46.656-20.93,46.656-46.655V46.655C169.063,20.93,148.133,0,122.406,0z M154.063,122.407 c0,17.455-14.201,31.655-31.656,31.655H46.654C29.2,154.063,15,139.862,15,122.407V46.655C15,29.201,29.2,15,46.654,15h75.752 c17.455,0,31.656,14.201,31.656,31.655V122.407z" />
                <path d="M84.531,40.97c-24.021,0-43.563,19.542-43.563,43.563c0,24.02,19.542,43.561,43.563,43.561s43.563-19.541,43.563-43.561 C128.094,60.512,108.552,40.97,84.531,40.97z M84.531,113.093c-15.749,0-28.563-12.812-28.563-28.561 c0-15.75,12.813-28.563,28.563-28.563s28.563,12.813,28.563,28.563C113.094,100.281,100.28,113.093,84.531,113.093z" />
                <path d="M129.921,28.251c-2.89,0-5.729,1.17-7.77,3.22c-2.051,2.04-3.23,4.88-3.23,7.78c0,2.891,1.18,5.73,3.23,7.78 c2.04,2.04,4.88,3.22,7.77,3.22c2.9,0,5.73-1.18,7.78-3.22c2.05-2.05,3.22-4.89,3.22-7.78c0-2.9-1.17-5.74-3.22-7.78 C135.661,29.421,132.821,28.251,129.921,28.251z" />
              </g>
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
            </svg>
          </a>
        </div>
        <img className={styles.purlifeStudioImg} src={`${baseDomain}/assets/js/react-app/src/assets/img/png/purlife-studio-logo.png`} alt="Purlife Studio logo" />
      </div>
      <div className={styles.copyCont}>
        <p className={styles.copy}>
          Copyright&nbsp;
          {new Date().getFullYear()}
          &nbsp;pur.AG. All rights reserved
        </p>
      </div>
    </div>
  </div>
);

Footer.propTypes = {
  baseDomain: PropTypes.string.isRequired,
};

export default Footer;
