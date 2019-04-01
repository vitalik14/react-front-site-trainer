import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from 'react-slick/lib';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import AssignmentIcon from '@material-ui/icons/Assignment';
import KitchenIcon from '@material-ui/icons/Kitchen';
import MoodIcon from '@material-ui/icons/Mood';
import QueueIcon from '@material-ui/icons/Queue';

import styles from './Landing.scss';
import {
  LargePrimaryButton,
  LargeWhiteButton,
  TextPinkButton,
  TextBlueButton,
} from '../../common/customizedMaterialComponents';
import SliderContainer from '../../common/components/Slider/SliderContainer';
import CourseGridItem from '../../common/components/GridItems/Course/CourseGridItem';
import TrainerGridItem from '../../common/components/GridItems/Trainer/TrainerGridItem';
import PostGridItem from '../../common/components/GridItems/Post/PostGridItem';

const trainers = [
  {
    key: 1,
    userId: 89478,
    name: 'Manuel',
    videosCount: 2933,
    profilePicUrl: 'https://pur-life.net/data/users/89478/avatar.jpg',
    trainerId: 1,
  },
  {
    key: 2,
    name: 'Andreas',
    profilePicUrl: 'https://pur-life.net/data/users/90282/avatar.jpg',
    trainerId: 2,
    userId: 90282,
    videosCount: 192,
  },
  {
    key: 3,
    name: 'Linda',
    profilePicUrl: 'https://pur-life.net/data/users/89518/avatar.jpg',
    trainerId: 3,
    userId: 89518,
    videosCount: 1304,
  },
  {
    key: 4,
    name: 'Birgit K.',
    profilePicUrl: 'https://pur-life.net/data/users/93238/avatar.jpg',
    trainerId: 5,
    userId: 93238,
    videosCount: 629,
  },
  {
    key: 5,
    name: 'Dr. Volker Zitzmann',
    profilePicUrl: 'https://pur-life.net/data/users/93314/avatar.jpg',
    trainerId: 9,
    userId: 93314,
    videosCount: 91,
  },
  {
    key: 5,
    name: 'Marco',
    profilePicUrl: 'https://pur-life.net/data/users/121959/avatar.jpg',
    trainerId: 27,
    userId: 121959,
    videosCount: 83,
  },
  {
    key: 6,
    name: 'Sabrina',
    profilePicUrl: 'https://pur-life.net/data/users/109104/avatar.jpg',
    trainerId: 28,
    userId: 109104,
    videosCount: 151,
  },
  {
    key: 7,
    name: 'Sven',
    profilePicUrl: 'https://pur-life.net/data/users/130588/avatar.jpg',
    trainerId: 30,
    userId: 130588,
    videosCount: 58,
  },
  {
    key: 8,
    name: 'Kerstin',
    profilePicUrl: 'https://pur-life.net/data/users/92492/avatar.jpg',
    trainerId: 32,
    userId: 92492,
    videosCount: 97,
  },
  {
    key: 9,
    name: 'Jana',
    profilePicUrl: 'https://pur-life.net/data/users/139793/avatar.jpg',
    trainerId: 34,
    userId: 139793,
    videosCount: 96,
  },
];

const posts = [
  {
    key: 1,
    commentsCount: 10,
    date: '2018-09-06',
    excerpt: 'Jetzt mal Ehrlich.. ein paar persönliche Worte von mir zu vielen Fragen der letzten Zeit.',
    thumbnailUrl: 'https://pur-life.net/resources/cms/2016/12/medizin-medikamente.jpg',
    title: 'Jetzt mal ehrlich..',
    url: 'https://pur-life.de/beratung/ernaehrungsratgeber/jetzt-mal-ehrlich-1',
  },
  {
    key: 2,
    commentsCount: 4,
    date: '2018-08-16',
    excerpt: 'Guter Schlaf ist wichtig: für die Regeneration, für die Bildung vom Wachstumshormon, für Muskelaufbau, das Immunsystem, das Gedächtnis uvm.',
    thumbnailUrl: 'https://pur-life.net/resources/cms/2018/08/sleep-melatonin.jpg',
    title: 'Melatonin – guter Schlaf und vieles mehr',
    url: 'https://pur-life.de/beratung/ernaehrungsratgeber/nahrungsergaenzungsmittel/melatonin-guter-schlaf-und-vieles-mehr',
  },
  {
    key: 3,
    commentsCount: 3,
    date: '2018-08-14',
    excerpt: 'Seminar über Grundlagen der Figurveränderung aus dem Mentalcoaching-Programm.',
    thumbnailUrl: 'https://pur-life.net/resources/cms/2018/08/abnehmen.jpg',
    title: 'Grundlagen: Abnehmen',
    url: 'https://pur-life.de/beratung/ernaehrungsratgeber/abnehmen/grundlagen-abnehmen',
  },
  {
    key: 4,
    commentsCount: 8,
    date: '2018-08-14',
    excerpt: 'Seminare über Stoffwechsel und Energie aus dem Mentalcoaching-Programm.',
    thumbnailUrl: 'https://pur-life.net/resources/cms/2018/08/energie.jpg',
    title: 'NEM\'s für mehr Energie',
    url: 'https://pur-life.de/beratung/ernaehrungsratgeber/nahrungsergaenzungsmittel/energy-nems',
  },
  {
    key: 5,
    commentsCount: 7,
    date: '2018-08-25',
    excerpt: 'Was haben hunderte von Diätprogrammen gemeinsam? Warum wird mit Ernährungsbüchern viel Schindluder getrieben? Was sind die Basics und worauf kommt es wirklich an?',
    thumbnailUrl: 'https://pur-life.net/share/public/img/default/post.jpg',
    title: 'Hokuspokus-Diäten',
    url: 'https://pur-life.de/beratung/medizinratgeber/allgemein-medizin/hokuspokus-diaeten',
  },
];

export default class Landing extends Component {
  state = {
    topDropdownAnchorEl: null,
    bottomDropdownAnchorEl: null,
  };

  render() {
    const {
      state: { topDropdownAnchorEl, bottomDropdownAnchorEl },
      props: { baseDomain },
    } = this;
    return (
      <>
        <div className={styles.banner}>
          <div className={styles.videoBg} />
          <video
            muted
            autoPlay
            src="https://player.vimeo.com/external/249390577.hd.mp4?s=78fc2019f440d2059563878a9ab25634be6d51ef&profile_id=175"
            poster="https://pur-life.net/share/public/img/welcome/video.jpg"
            className={styles.video}
          />
          <h1 className={styles.title}>Willkommen bei pur-life!</h1>
          <p className={styles.subtitle}>
            Dem ersten Live-Online-Fitnessstudio viel mehr als Online-Fitness
          </p>
          <LargeWhiteButton href={`${baseDomain}/you`} className={styles.bannerButton}>
            JETZT KOSTENLOS TRAINIEREN
          </LargeWhiteButton>
          <a className={styles.expandMoreIconWrapper} href="#info">
            <IconButton
              color="inherit"
              style={{
                width: 36,
                height: 36,
                padding: 0,
                fontSize: 'inherit',
              }}
            >
              <ExpandMoreIcon color="inherit" fontSize="inherit" />
            </IconButton>
          </a>
        </div>
        <div className={styles.menu} id="info">
          <a href={`${baseDomain}/you`} className={styles.logoWrapper}>
            <svg width="74px" height="24px" viewBox="0 0 74 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <g id="UI" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="00_00_00_00_LP" transform="translate(-170.000000, -740.000000)" fill="#4D4D4E">
                  <g id="header" transform="translate(0.000000, 720.000000)">
                    <path d="M176.083067,25.4067584 C178.874744,25.4067584 180.05179,25.9674537 181.25201,27.0888611 C182.580826,28.3304192 183.25594,29.9424181 183.277372,31.9249061 C183.277372,33.9274193 182.602258,35.5494306 181.25201,36.7909887 C180.008925,37.9123961 178.546178,38.4680852 176.863726,38.4580726 C175.181274,38.44806 173.686379,37.8222841 172.378996,36.5807259 L172.378996,42.8585732 C172.378996,43.1789753 172.266477,43.4493105 172.041436,43.669587 C171.816395,43.8898634 171.532418,44 171.189498,44 C170.846578,44 170.562602,43.8898634 170.33756,43.669587 C170.112519,43.4493105 170,43.1789753 170,42.8585732 L170,27.2991239 C170,26.7284105 173.29139,25.4067584 176.083067,25.4067584 Z M172.378996,34.5081352 C173.579217,35.7496933 174.972309,36.3604507 176.558315,36.3404255 C178.57297,36.3404255 179.912482,35.509395 180.57689,33.8473091 C180.791215,33.2866055 180.88766,32.6458109 180.866227,31.9249061 C180.866227,30.5231469 180.469732,29.4217812 179.676729,28.620776 C178.905159,27.8798461 177.39045,27.4192741 176.083067,27.4192741 C174.497061,27.4192741 173.122426,27.8798461 172.378996,28.620776 L172.378996,34.5081352 Z M191.05632,36.3704631 C192.599461,36.3704631 194.046133,35.5894947 195.396381,34.0275344 L195.396381,26.6382979 C195.396381,26.3379209 195.5089,26.0775981 195.733942,25.8573217 C195.958983,25.6370452 196.24296,25.5269086 196.58588,25.5269086 C196.907367,25.5269086 197.185986,25.632039 197.421743,25.8423029 C197.657501,26.0525668 197.775378,26.3178958 197.775378,26.6382979 L197.775378,37.1814768 C197.775378,37.5018789 197.662859,37.7722142 197.437818,37.9924906 C197.212776,38.2127671 196.9288,38.3229036 196.58588,38.3229036 C196.264392,38.3229036 195.985774,38.2127671 195.750016,37.9924906 C195.514258,37.7722142 195.396381,37.5018789 195.396381,37.1814768 L195.396381,36.1902378 C194.689109,36.8710923 194.078291,37.3516882 193.563911,37.6320401 C192.578016,38.1727186 191.629642,38.4430538 190.71876,38.4430538 C189.807878,38.4430538 189.057752,38.3128924 188.468358,38.0525657 C187.878964,37.792239 187.391382,37.4518169 187.005597,37.0312891 C186.191161,36.1301582 185.78395,34.9987552 185.78395,33.6370463 L185.78395,26.6382979 C185.78395,26.3379209 185.896469,26.0775981 186.12151,25.8573217 C186.346551,25.6370452 186.630528,25.5269086 186.973448,25.5269086 C187.294936,25.5269086 187.573554,25.632039 187.809312,25.8423029 C188.045069,26.0525668 188.162946,26.3178958 188.162946,26.6382979 L188.162946,33.3667084 C188.162946,34.2878644 188.387984,35.0187708 188.838067,35.5594493 C189.28815,36.1001279 190.02756,36.3704631 191.05632,36.3704631 Z M203.593261,27.0888611 C204.836347,25.546926 206.137364,25.5269086 207.659072,25.5269086 C208.375897,25.5269086 209.001507,25.6470588 209.107184,26.2616655 C209.212862,26.8762722 208.850319,27.2290353 208.614561,27.4192741 C208.457389,27.5460999 208.138893,27.4845808 207.659072,27.2347167 C206.78034,27.2347167 205.809486,27.464992 205.123646,27.8654947 C204.437806,28.2659973 204.064777,28.6107603 203.593261,29.2515645 L203.593261,37.2115144 C203.593261,37.5118914 203.475384,37.7722142 203.239627,37.9924906 C203.003869,38.2127671 202.725251,38.3229036 202.403763,38.3229036 C202.082276,38.3229036 201.803657,38.2127671 201.5679,37.9924906 C201.332142,37.7722142 201.214265,37.5118914 201.214265,37.2115144 L201.214265,26.6683354 C201.214265,26.3679584 201.326784,26.1026294 201.551825,25.8723404 C201.776867,25.6420514 202.060843,25.5269086 202.403763,25.5269086 C202.725251,25.5269086 203.003869,25.6370452 203.239627,25.8573217 C203.396799,26.0041726 203.514677,26.4146858 203.593261,27.0888611 Z M210.857832,21.2315394 C210.857832,20.9111373 210.975709,20.6458083 211.211467,20.4355444 C211.447224,20.2252806 211.736559,20.1201502 212.079479,20.1201502 C212.422399,20.1201502 212.706376,20.2252806 212.931417,20.4355444 C213.156458,20.6458083 213.268977,20.9111373 213.268977,21.2315394 L213.268977,37.2115144 C213.268977,37.5118914 213.156458,37.7722142 212.931417,37.9924906 C212.706376,38.2127671 212.422399,38.3229036 212.079479,38.3229036 C211.736559,38.3229036 211.447224,38.2127671 211.211467,37.9924906 C210.975709,37.7722142 210.857832,37.5118914 210.857832,37.2115144 L210.857832,21.2315394 Z M216.997202,26.6683354 C216.997202,26.3279082 217.115079,26.0525668 217.350836,25.8423029 C217.586594,25.632039 217.875928,25.5269086 218.218849,25.5269086 C218.561769,25.5269086 218.840387,25.632039 219.054712,25.8423029 C219.269037,26.0525668 219.376198,26.3279082 219.376198,26.6683354 L219.376198,37.2115144 C219.376198,37.5118914 219.269037,37.7722142 219.054712,37.9924906 C218.840387,38.2127671 218.561769,38.3229036 218.218849,38.3229036 C217.875928,38.3229036 217.586594,38.2127671 217.350836,37.9924906 C217.115079,37.7722142 216.997202,37.5118914 216.997202,37.2115144 L216.997202,26.6683354 Z M219.633387,21.8322904 C219.633387,22.1927427 219.504794,22.4931152 219.247604,22.7334168 C218.990414,22.9737183 218.668931,23.0938673 218.283146,23.0938673 L218.122403,23.0938673 C217.736618,23.0938673 217.420493,22.9737183 217.174019,22.7334168 C216.927545,22.4931152 216.80431,22.1927427 216.80431,21.8322904 L216.80431,21.7421777 C216.80431,21.3817254 216.932903,21.0813529 217.190093,20.8410513 C217.447283,20.6007497 217.75805,20.4806008 218.122403,20.4806008 L218.283146,20.4806008 C218.668931,20.4806008 218.990414,20.6007497 219.247604,20.8410513 C219.504794,21.0813529 219.633387,21.3817254 219.633387,21.7421777 L219.633387,21.8322904 Z M230.094668,22.2828536 C229.43729,21.9524406 228.887131,21.787234 228.444193,21.787234 C227.779785,21.787234 227.098045,21.8595764 226.776622,22.2828536 C226.455199,22.7061307 226.319283,23.4342886 226.319283,24.2953692 L226.319283,25.6470588 L229.630589,25.6470588 C229.930644,25.6470588 230.177114,25.7371706 230.370006,25.9173967 C230.562899,26.0976229 230.659344,26.3279085 230.659344,26.6082603 C230.659344,26.8886122 230.557541,27.1188977 230.353932,27.2991239 C230.150323,27.4793501 229.909211,27.5694618 229.630589,27.5694618 L226.319283,27.5694618 L226.319283,37.2115144 C226.319283,37.5118914 226.206764,37.7722142 225.981722,37.9924906 C225.756681,38.2127671 225.472705,38.3229036 225.129785,38.3229036 C224.786864,38.3229036 224.502888,38.2127671 224.277847,37.9924906 C224.052805,37.7722142 223.940286,37.5118914 223.940286,37.2115144 L223.940286,27.5694618 L222.365005,27.5694618 C222.06495,27.5694618 221.81848,27.4793501 221.625587,27.2991239 C221.432694,27.1188977 221.33625,26.8886122 221.33625,26.6082603 C221.33625,26.3279085 221.438053,26.0976229 221.641661,25.9173967 C221.84527,25.7371706 222.086382,25.6470588 222.365005,25.6470588 L223.940286,25.6470588 L223.940286,24.2052566 C223.940286,22.7834722 224.36893,21.6921189 225.22623,20.931164 C225.933503,20.3103849 226.812223,20 227.862416,20 C228.676851,20 229.930639,20.1601986 230.659344,20.4806008 C231.066561,20.6808521 231.200611,20.9311625 231.200611,21.2315394 C231.200611,21.5319164 230.99483,21.7822268 230.801937,21.9824781 C230.609045,22.1827294 230.37329,22.2828536 230.094668,22.2828536 Z M233.841042,32.7359199 C233.99107,33.8373021 234.446504,34.7133885 235.207358,35.3642053 C235.968212,36.015022 237.018389,36.3404255 238.357921,36.3404255 C239.697452,36.3404255 240.838716,36.1401772 241.781747,35.7396746 C242.081802,35.5994987 242.349704,35.5244056 242.585462,35.514393 C242.821219,35.5043804 243.435952,36.2387831 243.435952,36.4590595 C243.435952,36.8996124 243.362388,37.1214009 242.987319,37.301627 C242.61225,37.4818532 242.274693,37.6420519 241.974638,37.7822278 C241.674583,37.9224037 241.3531,38.0425527 241.01018,38.1426783 C240.217177,38.3429297 239.295593,38.4430538 238.2454,38.4430538 C236.080717,38.4430538 234.403649,37.8773523 233.214144,36.7459324 C232.02464,35.6145125 231.429897,34.0075198 231.429897,31.9249061 C231.429897,30.1226443 231.933553,28.620782 232.940881,27.4192741 C234.076804,26.0775903 235.673502,25.4067584 237.731023,25.4067584 C239.702814,25.4067584 241.256647,26.0275282 242.39257,27.2690864 C243.464195,28.430544 244,29.8823442 244,31.6245307 C244,31.9249076 243.887481,32.1852304 243.66244,32.4055069 C243.437398,32.6257833 243.153422,32.7359199 242.810502,32.7359199 L233.841042,32.7359199 Z M237.731023,27.2991239 C236.16645,27.2991239 235.030544,27.9499309 234.323271,29.2515645 C234.066081,29.7121425 233.90534,30.2628253 233.841042,30.9036295 L241.621004,30.9036295 C241.556706,29.7421719 241.095914,28.8210297 240.238614,28.1401752 C239.552773,27.5794715 238.716918,27.2991239 237.731023,27.2991239 Z" id="purlife_logo_dark" />
                  </g>
                </g>
              </g>
            </svg>
          </a>
          <ul className={styles.menuList}>
            <li className={styles.menuListItem}>
              <a className={styles.menuListItemLink} href={`${baseDomain}/training`}>Training</a>
            </li>
            <li className={styles.menuListItem}>
              <a className={styles.menuListItemLink} href={`${baseDomain}/beratung`}>Beratung</a>
            </li>
            <li className={styles.menuListItem}>
              <a className={styles.menuListItemLink} href={`${baseDomain}/news`}>News</a>
            </li>
            <li className={styles.menuListItem}>
              <a className={styles.menuListItemLink} href={`${baseDomain}/meals`}>Rezepte</a>
            </li>
            <li className={styles.menuListItem}>
              <a className={styles.menuListItemLink} href={`${baseDomain}/fitbook`}>Fitbook</a>
            </li>
            <li className={styles.menuListItem}>
              <a // eslint-disable-line
                className={styles.menuListItemLink}
                onClick={({ currentTarget }) => this.setState({
                  topDropdownAnchorEl: currentTarget,
                })}
              >
                Mehr
              </a>
            </li>
            <Menu
              anchorEl={topDropdownAnchorEl}
              open={!!topDropdownAnchorEl}
              onClose={() => this.setState({ topDropdownAnchorEl: null })}
            >
              <MenuItem className={styles.menuDropdownListItem}>
                <a href={`${baseDomain}/apps`} className={styles.menuDropdownLink}>
                  Apps
                </a>
              </MenuItem>
              <MenuItem className={styles.menuDropdownListItem}>
                <a href={`${baseDomain}/books`} className={styles.menuDropdownLink}>
                  Bucher
                </a>
              </MenuItem>
              <MenuItem className={styles.menuDropdownListItem}>
                <a href={`${baseDomain}/shop`} className={styles.menuDropdownLink}>
                  Shop
                </a>
              </MenuItem>
              <MenuItem className={styles.menuDropdownListItem}>
                <a href={`${baseDomain}/hilfe`} className={styles.menuDropdownLink}>
                  Hilfe
                </a>
              </MenuItem>
            </Menu>
          </ul>
          <TextPinkButton href={`${baseDomain}/login`}>
            LOG IN
          </TextPinkButton>
        </div>
        <div className={styles.sliderWrapper}>
          <SliderContainer
            title="Bekannt aus"
            titleStyles={{ opacity: 1, fontSize: 32 }}
            topContStyles={{ marginBottom: 36 }}
            buttonsBordered={false}
            slides={[
              <img
                key={1}
                src={`${baseDomain}/assets/js/react-app/src/assets/img/png/landing-logo-1.png`}
                alt="Guter rat"
              />,
              <img
                key={2}
                src={`${baseDomain}/assets/js/react-app/src/assets/img/png/landing-logo-2.png`}
                alt="Fit for Fun"
              />,
              <img
                key={3}
                src={`${baseDomain}/assets/js/react-app/src/assets/img/png/landing-logo-3.png`}
                alt="Tina"
              />,
              <img
                key={4}
                src={`${baseDomain}/assets/js/react-app/src/assets/img/png/landing-logo-4.png`}
                alt="Shape"
              />,
              <img
                key={5}
                src={`${baseDomain}/assets/js/react-app/src/assets/img/png/landing-logo-1.png`}
                alt="Guter rat"
              />,
              <img
                key={6}
                src={`${baseDomain}/assets/js/react-app/src/assets/img/png/landing-logo-2.png`}
                alt="Fit for Fun"
              />,
              <img
                key={7}
                src={`${baseDomain}/assets/js/react-app/src/assets/img/png/landing-logo-3.png`}
                alt="Tina"
              />,
              <img
                key={8}
                src={`${baseDomain}/assets/js/react-app/src/assets/img/png/landing-logo-4.png`}
                alt="Shape"
              />,
            ]}
          />
        </div>
        <div className={styles.wideSliderWrapper}>
          <Slider arrows={false} autoplay dots>
            <div className={styles.wideSlide}>
              <img
                width="100%"
                src={`${baseDomain}/assets/js/react-app/src/assets/img/png/landing-slider-img-1.png`}
                alt="TV"
              />
              <div className={styles.wideSlideTextWrapper} style={{ left: 170 }}>
                <h3 className={styles.wideSlideTitle}>
                  Über 6000 Videos in über 70 Kategorien
                </h3>
                <p className={styles.wideSlideDescription}>
                  Es erwarten Dich zahlreiche Videos zu den
                  unterschiedlichsten Themen. Und es werden täglich mehr
                </p>
              </div>
            </div>
            <div className={styles.wideSlide}>
              <img
                width="100%"
                src={`${baseDomain}/assets/js/react-app/src/assets/img/png/landing-slider-img-2.png`}
                alt="Tablet"
              />
              <div className={styles.wideSlideTextWrapper} style={{ right: 170, color: '#ffffff' }}>
                <h3 className={styles.wideSlideTitle}>
                  Medizinisch korrekte Videos und Seminare
                </h3>
                <p className={styles.wideSlideDescription}>
                  Sorgenlos Trainieren und Informieren! Alle Trainings - und
                  Dokumentations-Videos sind medizinisch korrekt
                </p>
              </div>
            </div>
            <div className={styles.wideSlide}>
              <img
                width="100%"
                src={`${baseDomain}/assets/js/react-app/src/assets/img/png/landing-slider-img-3.png`}
                alt="Sports uniform"
              />
              <div className={styles.wideSlideTextWrapper} style={{ left: 170 }}>
                <h3 className={styles.wideSlideTitle}>
                  Immer & Überall
                </h3>
                <p className={styles.wideSlideDescription} style={{ color: '#4D4D4E' }}>
                  Egal ob vor dem PC, Fernseher, Tablet oder
                  Smartphone - trainiere wann Du willst und wo Du willst.
                </p>
              </div>
            </div>
            <div className={styles.wideSlide} style={{ right: 0 }}>
              <img
                width="100%"
                src={`${baseDomain}/assets/js/react-app/src/assets/img/png/landing-slider-img-4.png`}
                alt="PC"
              />
              <div className={styles.wideSlideTextWrapper} style={{ right: 170, color: '#ffffff' }}>
                <h3 className={styles.wideSlideTitle}>
                  Live Training & Seminare
                </h3>
                <p className={styles.wideSlideDescription}>
                  Viele Trainings finden live statt, ebenso Seminare und Talkshows. Zum Wochenplan
                </p>
              </div>
            </div>
          </Slider>
        </div>
        <div className={styles.sliderWrapper} style={{ paddingBottom: 120 }}>
          <SliderContainer
            title="Beliebte Kurse"
            buttons={[<TextBlueButton key={1} href={`${baseDomain}/training`} style={{ marginRight: 10 }}>FANGE AN ZU TRAINIEREN</TextBlueButton>]}
            titleStyles={{ opacity: 1, fontSize: 32 }}
            topContStyles={{ marginBottom: 36 }}
            buttonsBordered={false}
            slides={[
              <CourseGridItem
                key={1}
                id={4180}
                baseDomain={baseDomain}
                name="Circuit Bodyworkout"
                description="Das Programm für alle, die sich gern in kurzen, knackigen Trainingseinheiten effektiv auspowern möchten. Kraft und Ausdauer werden trainiert in Form von HIT Trainings und vor allem den Purcircuit-Kursen. Starte jetzt & lass deine Muskeln brennen!"
                thumbnailUrl="http://localhost/purlife/assets/images/default/course.jpg"
                kcal="6.30"
                videosCount={218}
                slug="bauch-workout"
              />,
              <CourseGridItem
                key={2}
                id={4180}
                baseDomain={baseDomain}
                name="Aerobic Einsteiger"
                description="Klassische Aerobic für Einsteiger"
                thumbnailUrl="http://localhost/purlife/assets/images/default/course.jpg"
                kcal="7.00"
                videosCount={4}
                slug="aerobic-einsteiger"
              />,
              <CourseGridItem
                key={3}
                id={4180}
                baseDomain={baseDomain}
                name="Beckenbodengymnastik"
                description="Beckenbodenübungen auf dem Pezziball"
                thumbnailUrl="http://localhost/purlife/assets/images/default/course.jpg"
                kcal="4.30"
                videosCount={69}
                slug="beckenbodengym"
              />,
              <CourseGridItem
                key={4}
                id={4180}
                baseDomain={baseDomain}
                name="Circuit Bodyworkout"
                description="Das Programm für alle, die sich gern in kurzen, knackigen Trainingseinheiten effektiv auspowern möchten. Kraft und Ausdauer werden trainiert in Form von HIT Trainings und vor allem den Purcircuit-Kursen. Starte jetzt & lass deine Muskeln brennen!"
                thumbnailUrl="http://localhost/purlife/assets/images/default/course.jpg"
                kcal="6.30"
                videosCount={218}
                slug="bauch-workout"
              />,
              <CourseGridItem
                key={5}
                id={4180}
                baseDomain={baseDomain}
                name="Aerobic Einsteiger"
                description="Klassische Aerobic für Einsteiger"
                thumbnailUrl="http://localhost/purlife/assets/images/default/course.jpg"
                kcal="7.00"
                videosCount={4}
                slug="aerobic-einsteiger"
              />,
              <CourseGridItem
                key={6}
                id={4180}
                baseDomain={baseDomain}
                name="Beckenbodengymnastik"
                description="Beckenbodenübungen auf dem Pezziball"
                thumbnailUrl="http://localhost/purlife/assets/images/default/course.jpg"
                kcal="4.30"
                videosCount={69}
                slug="beckenbodengym"
              />,
              <CourseGridItem
                key={7}
                id={4180}
                baseDomain={baseDomain}
                name="Aerobic Einsteiger"
                description="Klassische Aerobic für Einsteiger"
                thumbnailUrl="http://localhost/purlife/assets/images/default/course.jpg"
                kcal="7.00"
                videosCount={8}
                slug="aerobic-einsteiger"
              />,
              <CourseGridItem
                key={8}
                id={4180}
                baseDomain={baseDomain}
                name="Beckenbodengymnastik"
                description="Beckenbodenübungen auf dem Pezziball"
                thumbnailUrl="http://localhost/purlife/assets/images/default/course.jpg"
                kcal="4.30"
                videosCount={69}
                slug="beckenbodengym"
              />,
            ]}
          />
        </div>
        <div className={styles.cta1}>
          <h2 className={styles.cta1Title}>Wir sind für Dich da!</h2>
          <p className={styles.cta1Subtitle}>Beratung und Betreuung inklusive!</p>
          <LargeWhiteButton href={`${baseDomain}/contactform`}>
            FRAG UNS
          </LargeWhiteButton>
          <img
            className={styles.cta1Img}
            src={`${baseDomain}/assets/js/react-app/src/assets/img/png/landing-cta-1-image.png`}
            alt=""
          />
        </div>
        <div className={styles.sliderWrapper}>
          <SliderContainer
            title="Dein Expertenteam"
            titleStyles={{ opacity: 1, fontSize: 32 }}
            topContStyles={{ marginBottom: 36 }}
            buttonsBordered={false}
            slides={trainers.map(({
              key,
              trainerId,
              name,
              videosCount,
              profilePicUrl,
              userId,
            }) => (
              <TrainerGridItem
                key={key}
                baseDomain={baseDomain}
                userId={userId}
                trainerId={trainerId}
                name={name}
                videosCount={videosCount}
                profilePicUrl={profilePicUrl}
              />
            ))}
          />
        </div>
        <div className={styles.featuresWrapper}>
          <div className={styles.featuresTopInnerWrapper}>
            <h3 className={styles.featuresTitle}>Was finden Sie im pur-life</h3>
            <TextPinkButton href={`${baseDomain}/register`}>Registrieren</TextPinkButton>
          </div>
          <div className={styles.featuresGridWrapper}>
            <a href={`${baseDomain}/training`} className={styles.featureGridItem}>
              <div className={styles.featureIconWrapper}>
                <FitnessCenterIcon color="inherit" fontSize="inherit" />
              </div>
              <h4 className={styles.featureTitle}>Training</h4>
              <p className={styles.featureDescription}>
                Unsere Trainings sind für jede Trainingsstufe
                und für Menschen mit unterschiedlichen Zielen konzipiert
              </p>
            </a>
            <a href={`${baseDomain}/beratung`} className={styles.featureGridItem}>
              <div className={styles.featureIconWrapper}>
                <ChatIcon color="inherit" fontSize="inherit" />
              </div>
              <h4 className={styles.featureTitle}>Beratung</h4>
              <p className={styles.featureDescription}>
                Unsere Trainings sind für jede Trainingsstufe
                und für Menschen mit unterschiedlichen Zielen konzipiert
              </p>
            </a>
            <a href={`${baseDomain}/news`} className={styles.featureGridItem}>
              <div className={styles.featureIconWrapper}>
                <AssignmentIcon color="inherit" fontSize="inherit" />
              </div>
              <h4 className={styles.featureTitle}>News</h4>
              <p className={styles.featureDescription}>
                Unsere Trainings sind für jede Trainingsstufe
                und für Menschen mit unterschiedlichen Zielen konzipiert
              </p>
            </a>
            <a href={`${baseDomain}/meals`} className={styles.featureGridItem}>
              <div className={styles.featureIconWrapper}>
                <KitchenIcon color="inherit" fontSize="inherit" />
              </div>
              <h4 className={styles.featureTitle}>Rezepte</h4>
              <p className={styles.featureDescription}>
                Unsere Trainings sind für jede Trainingsstufe
                und für Menschen mit unterschiedlichen Zielen konzipiert
              </p>
            </a>
            <a href={`${baseDomain}/fitbook`} className={styles.featureGridItem}>
              <div className={styles.featureIconWrapper}>
                <MoodIcon color="inherit" fontSize="inherit" />
              </div>
              <h4 className={styles.featureTitle}>Fitbook</h4>
              <p className={styles.featureDescription}>
                Unsere Trainings sind für jede Trainingsstufe
                und für Menschen mit unterschiedlichen Zielen konzipiert
              </p>
            </a>
            <a // eslint-disable-line
              onClick={({ currentTarget }) => this.setState({
                bottomDropdownAnchorEl: currentTarget,
              })}
              className={styles.featureGridItem}
            >
              <div className={styles.featureIconWrapper}>
                <QueueIcon color="inherit" fontSize="inherit" />
              </div>
              <h4 className={styles.featureTitle}>Mehr</h4>
              <p className={styles.featureDescription}>
                Unsere Trainings sind für jede Trainingsstufe
                und für Menschen mit unterschiedlichen Zielen konzipiert
              </p>
            </a>
            <Menu
              anchorEl={bottomDropdownAnchorEl}
              open={!!bottomDropdownAnchorEl}
              onClose={() => this.setState({ bottomDropdownAnchorEl: null })}
            >
              <MenuItem className={styles.menuDropdownListItem}>
                <a href={`${baseDomain}/apps`} className={styles.menuDropdownLink}>
                  Apps
                </a>
              </MenuItem>
              <MenuItem className={styles.menuDropdownListItem}>
                <a href={`${baseDomain}/books`} className={styles.menuDropdownLink}>
                  Bucher
                </a>
              </MenuItem>
              <MenuItem className={styles.menuDropdownListItem}>
                <a href={`${baseDomain}/shop`} className={styles.menuDropdownLink}>
                  Shop
                </a>
              </MenuItem>
              <MenuItem className={styles.menuDropdownListItem}>
                <a href={`${baseDomain}/hilfe`} className={styles.menuDropdownLink}>
                  Hilfe
                </a>
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className={styles.cta2}>
          <h2 className={styles.cta2Title}>In Form sein mit purlife!</h2>
          <LargePrimaryButton href={`${baseDomain}/you`}>
            JETZT KOSTENLOS TRAINIEREN
          </LargePrimaryButton>
        </div>
        <div className={styles.sliderWrapper}>
          <SliderContainer
            title="Spätestens in Beratung"
            titleStyles={{ opacity: 1, fontSize: 32 }}
            topContStyles={{ marginBottom: 36 }}
            buttonsBordered={false}
            slides={posts.map(post => (
              <PostGridItem
                baseDomain={baseDomain}
                showFavoriteIcon={false}
                {...post}
              />
            ))}
          />
        </div>
        <div className={styles.bottomDescriptionBlock}>
          <h3 className={styles.bottomDescriptionTitle}>What is pur-life?</h3>
          <p className={styles.bottomDescription}>
            In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam.
            Integer et elit eget elit facilisis tristique. Nam vel iaculis mauris.
            Sed ullamcorper tellus erat, non ultrices sem tincidunt euismod.
          </p>
        </div>
      </>
    );
  }
}

Landing.propTypes = {
  baseDomain: PropTypes.string.isRequired,
};
