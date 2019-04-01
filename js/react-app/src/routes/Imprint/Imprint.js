/* eslint-disable */

import React from 'react';
import { PropTypes } from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import HelpOutliteIcon from '@material-ui/icons/HelpOutline';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import VideocamIcon from '@material-ui/icons/Videocam';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '../../common/components/Button/Button';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import red from '@material-ui/core/colors/red';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import DeleteIcon from '@material-ui/icons/Delete';
import Buttons from './Buttons';
const TrainingPlanFavIconButton = withStyles({
  root: {
    width: 30,
    height: 30,
  },
})(IconButton);


const Imprint = ({ samplePropMessage }) => (
  <div>
    <h1>
      Imprint page works!
    </h1>
    <p>{samplePropMessage}</p>
    <div>
      {/* Video Cards */}
      <div className='cards-container'>
        {/* Card  */}
        <div className="card-container video-card-container">
          <a href="" className="thumbnail-container">
            <img className="thumbnail" src={`http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/ipad.png`} alt="Plan thumbnail" />
            <div className="video-title">
              Lorem Ipsum
                </div>
            <div className="play-icon">
              <svg width="36" height="36" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-63.000000, -269.000000)">
                    <polygon points="63 269 99 269 99 305 63 305" />
                    <circle fill="#FFFFFF" opacity="0.700000048" cx="81" cy="287" r="18" />
                    <polygon fill="#EC407A" fillRule="nonzero" points="77.25 279.363636 77.25 294.636364 89.25 287" />
                  </g>
                </g>
              </svg>
            </div>
          </a>
          <div className="card-content">
            <div>
              <div className="coacher-container">
                <img className="card-avatar" src="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/ipad.png" alt="Trainer avatar" />
                <div>
                  <p className="coacher-name">
                    Coacher Name
                      </p>
                  <div className="item-container">
                    <span className="item-amount">
                      0 item(s)
                        </span>
                    <Tooltip title="lorem ipsum" placement="right">
                      <div className="icon-container">
                        <HelpOutliteIcon color="inherit" fontSize="inherit" />
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="icon-container" style={{ fontSize: 20 }}>
                <FitnessCenterIcon color="inherit" fontSize="inherit" />
              </div>
            </div>
            <div>
              <div className="info-container">
                <div>
                  <div className="info-container">
                    <WhatshotIcon color="inherit" fontSize="inherit" />
                  </div>
                  <span>
                    1500
                      &nbsp;
                      kcal
                      </span>
                </div>
                <div>
                  <div className="icon-container">
                    <AccessTimeIcon color="inherit" fontSize="inherit" />
                  </div>
                  <span>
                    10
                      &nbsp;
                      min
                      </span>
                </div>
              </div>
              <TrainingPlanFavIconButton>
                <div className="icon-container">
                  <FavoriteIcon color="inherit" fontSize="inherit" />
                </div>
              </TrainingPlanFavIconButton>
            </div>
          </div>
        </div>
        {/* END-Card */}
        {/* Card  */}
        <div className="card-container video-card-container">
          <a href="" className="thumbnail-container">
            <img className="thumbnail" src={`http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/ipad.png`} alt="Plan thumbnail" />
            <div className="video-title">
              Lorem Ipsum
                </div>
            <div className="play-icon">
              <svg width="36" height="36" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-63.000000, -269.000000)">
                    <polygon points="63 269 99 269 99 305 63 305" />
                    <circle fill="#FFFFFF" opacity="0.700000048" cx="81" cy="287" r="18" />
                    <polygon fill="#EC407A" fillRule="nonzero" points="77.25 279.363636 77.25 294.636364 89.25 287" />
                  </g>
                </g>
              </svg>
            </div>
          </a>
          <div className="card-content">
            <div>
              <div className="coacher-container">
                <img className="card-avatar" src="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/ipad.png" alt="Trainer avatar" />
                <div>
                  <p className="coacher-name">
                    Coacher Name
                      </p>
                  <div className="item-container">
                    <span className="item-amount">
                      0 item(s)
                        </span>
                    <Tooltip title="lorem ipsum" placement="right">
                      <div className="icon-container">
                        <HelpOutliteIcon color="inherit" fontSize="inherit" />
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="icon-container" style={{ fontSize: 20 }}>
                <FitnessCenterIcon color="inherit" fontSize="inherit" />
              </div>
            </div>
            <div>
              <div className="info-container">
                <div>
                  <div className="info-container">
                    <WhatshotIcon color="inherit" fontSize="inherit" />
                  </div>
                  <span>
                    1500
                      &nbsp;
                      kcal
                      </span>
                </div>
                <div>
                  <div className="icon-container">
                    <AccessTimeIcon color="inherit" fontSize="inherit" />
                  </div>
                  <span>
                    10
                      &nbsp;
                      min
                      </span>
                </div>
              </div>
              <TrainingPlanFavIconButton>
                <div className="icon-container">
                  <FavoriteIcon color="inherit" fontSize="inherit" />
                </div>
              </TrainingPlanFavIconButton>
            </div>
          </div>
        </div>
        {/* END-Card */}
        {/* Card  */}
        <div className="card-container video-card-container">
          <a href="" className="thumbnail-container">
            <img className="thumbnail" src={`http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/ipad.png`} alt="Plan thumbnail" />
            <div className="video-title">
              Lorem Ipsum
                </div>
            <div className="play-icon">
              <svg width="36" height="36" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-63.000000, -269.000000)">
                    <polygon points="63 269 99 269 99 305 63 305" />
                    <circle fill="#FFFFFF" opacity="0.700000048" cx="81" cy="287" r="18" />
                    <polygon fill="#EC407A" fillRule="nonzero" points="77.25 279.363636 77.25 294.636364 89.25 287" />
                  </g>
                </g>
              </svg>
            </div>
          </a>
          <div className="card-content">
            <div>
              <div className="coacher-container">
                <img className="card-avatar" src="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/ipad.png" alt="Trainer avatar" />
                <div>
                  <p className="coacher-name">
                    Coacher Name
                      </p>
                  <div className="item-container">
                    <span className="item-amount">
                      0 item(s)
                        </span>
                    <Tooltip title="lorem ipsum" placement="right">
                      <div className="icon-container">
                        <HelpOutliteIcon color="inherit" fontSize="inherit" />
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="icon-container" style={{ fontSize: 20 }}>
                <FitnessCenterIcon color="inherit" fontSize="inherit" />
              </div>
            </div>
            <div>
              <div className="info-container">
                <div>
                  <div className="info-container">
                    <WhatshotIcon color="inherit" fontSize="inherit" />
                  </div>
                  <span>
                    1500
                      &nbsp;
                      kcal
                      </span>
                </div>
                <div>
                  <div className="icon-container">
                    <AccessTimeIcon color="inherit" fontSize="inherit" />
                  </div>
                  <span>
                    10
                      &nbsp;
                      min
                      </span>
                </div>
              </div>
              <TrainingPlanFavIconButton>
                <div className="icon-container">
                  <FavoriteIcon color="inherit" fontSize="inherit" />
                </div>
              </TrainingPlanFavIconButton>
            </div>
          </div>
        </div>
        {/* END-Card */}
        {/* Card  */}
        <div className="card-container video-card-container">
          <a href="" className="thumbnail-container">
            <img className="thumbnail" src={`http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/ipad.png`} alt="Plan thumbnail" />
            <div className="video-title">
              Lorem Ipsum
                </div>
            <div className="play-icon">
              <svg width="36" height="36" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-63.000000, -269.000000)">
                    <polygon points="63 269 99 269 99 305 63 305" />
                    <circle fill="#FFFFFF" opacity="0.700000048" cx="81" cy="287" r="18" />
                    <polygon fill="#EC407A" fillRule="nonzero" points="77.25 279.363636 77.25 294.636364 89.25 287" />
                  </g>
                </g>
              </svg>
            </div>
          </a>
          <div className="card-content">
            <div>
              <div className="coacher-container">
                <img className="card-avatar" src="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/ipad.png" alt="Trainer avatar" />
                <div>
                  <p className="coacher-name">
                    Coacher Name
                      </p>
                  <div className="item-container">
                    <span className="item-amount">
                      0 item(s)
                        </span>
                    <Tooltip title="lorem ipsum" placement="right">
                      <div className="icon-container">
                        <HelpOutliteIcon color="inherit" fontSize="inherit" />
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="icon-container" style={{ fontSize: 20 }}>
                <FitnessCenterIcon color="inherit" fontSize="inherit" />
              </div>
            </div>
            <div>
              <div className="info-container">
                <div>
                  <div className="info-container">
                    <WhatshotIcon color="inherit" fontSize="inherit" />
                  </div>
                  <span>
                    1500
                      &nbsp;
                      kcal
                      </span>
                </div>
                <div>
                  <div className="icon-container">
                    <AccessTimeIcon color="inherit" fontSize="inherit" />
                  </div>
                  <span>
                    10
                      &nbsp;
                      min
                      </span>
                </div>
              </div>
              <TrainingPlanFavIconButton>
                <div className="icon-container">
                  <FavoriteIcon color="inherit" fontSize="inherit" />
                </div>
              </TrainingPlanFavIconButton>
            </div>
          </div>
        </div>
        {/* END-Card */}
        {/* Card  */}
        <div className="card-container video-card-container">
          <a href="" className="thumbnail-container">
            <img className="thumbnail" src={`http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/ipad.png`} alt="Plan thumbnail" />
            <div className="video-title">
              Lorem Ipsum
                </div>
            <div className="play-icon">
              <svg width="36" height="36" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-63.000000, -269.000000)">
                    <polygon points="63 269 99 269 99 305 63 305" />
                    <circle fill="#FFFFFF" opacity="0.700000048" cx="81" cy="287" r="18" />
                    <polygon fill="#EC407A" fillRule="nonzero" points="77.25 279.363636 77.25 294.636364 89.25 287" />
                  </g>
                </g>
              </svg>
            </div>
          </a>
          <div className="card-content">
            <div>
              <div className="coacher-container">
                <img className="card-avatar" src="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/ipad.png" alt="Trainer avatar" />
                <div>
                  <p className="coacher-name">
                    Coacher Name
                      </p>
                  <div className="item-container">
                    <span className="item-amount">
                      0 item(s)
                        </span>
                    <Tooltip title="lorem ipsum" placement="right">
                      <div className="icon-container">
                        <HelpOutliteIcon color="inherit" fontSize="inherit" />
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="icon-container" style={{ fontSize: 20 }}>
                <FitnessCenterIcon color="inherit" fontSize="inherit" />
              </div>
            </div>
            <div>
              <div className="info-container">
                <div>
                  <div className="info-container">
                    <WhatshotIcon color="inherit" fontSize="inherit" />
                  </div>
                  <span>
                    1500
                      &nbsp;
                      kcal
                      </span>
                </div>
                <div>
                  <div className="icon-container">
                    <AccessTimeIcon color="inherit" fontSize="inherit" />
                  </div>
                  <span>
                    10
                      &nbsp;
                      min
                      </span>
                </div>
              </div>
              <TrainingPlanFavIconButton>
                <div className="icon-container">
                  <FavoriteIcon color="inherit" fontSize="inherit" />
                </div>
              </TrainingPlanFavIconButton>
            </div>
          </div>
        </div>
        {/* END-Card */}
        {/* Card  */}
        <div className="card-container video-card-container">
          <a href="" className="thumbnail-container">
            <img className="thumbnail" src={`http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/ipad.png`} alt="Plan thumbnail" />
            <div className="video-title">
              Lorem Ipsum
                </div>
            <div className="play-icon">
              <svg width="36" height="36" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-63.000000, -269.000000)">
                    <polygon points="63 269 99 269 99 305 63 305" />
                    <circle fill="#FFFFFF" opacity="0.700000048" cx="81" cy="287" r="18" />
                    <polygon fill="#EC407A" fillRule="nonzero" points="77.25 279.363636 77.25 294.636364 89.25 287" />
                  </g>
                </g>
              </svg>
            </div>
          </a>
          <div className="card-content">
            <div>
              <div className="coacher-container">
                <img className="card-avatar" src="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/ipad.png" alt="Trainer avatar" />
                <div>
                  <p className="coacher-name">
                    Coacher Name
                      </p>
                  <div className="item-container">
                    <span className="item-amount">
                      0 item(s)
                        </span>
                    <Tooltip title="lorem ipsum" placement="right">
                      <div className="icon-container">
                        <HelpOutliteIcon color="inherit" fontSize="inherit" />
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="icon-container" style={{ fontSize: 20 }}>
                <FitnessCenterIcon color="inherit" fontSize="inherit" />
              </div>
            </div>
            <div>
              <div className="info-container">
                <div>
                  <div className="info-container">
                    <WhatshotIcon color="inherit" fontSize="inherit" />
                  </div>
                  <span>
                    1500
                      &nbsp;
                      kcal
                      </span>
                </div>
                <div>
                  <div className="icon-container">
                    <AccessTimeIcon color="inherit" fontSize="inherit" />
                  </div>
                  <span>
                    10
                      &nbsp;
                      min
                      </span>
                </div>
              </div>
              <TrainingPlanFavIconButton>
                <div className="icon-container">
                  <FavoriteIcon color="inherit" fontSize="inherit" />
                </div>
              </TrainingPlanFavIconButton>
            </div>
          </div>
        </div>
        {/* END-Card */}
        </div>
        <div style={{ marginTop: '20px' }}>
          <Card>
            <CardHeader
              action={
                <IconButton>
                  <FavoriteIcon />
                </IconButton>
              }
              title="Alergia"
            />
            <CardMedia
              className="text-card-media"
              image="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/ipad.png"
              title="Paella dish"
            />
            <CardContent style={{ padding: "10px 120px 10px 120px" }}>
              <Typography component="p" variant="body1" >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
            </CardContent>
            <CardMedia
              className="text-card-media"
              image="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/workout-plan.png"
              title="Paella dish"
            />
            <div style={{ padding: "10px 120px 10px 120px" }}>
              <ul className="text-card-list" >
                <li>
                  Sed ut perspiciatis
            </li>
                <li>
                  Nemo enim ipsam voluptatem
            </li>
                <li>
                  Et harum quidem rerum facilis est et
            </li>
              </ul>
            </div>
            <CardActions disableActionSpacing className="text-actions">
              <Avatar alt="Remy Sharp" src="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/avatar.png" />
              <h1 className="post-owner-name">Manuel</h1>
              <div className="social-networks" >
                <a href="" >
                  <img src="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/facebook.png" />
                </a>

                <a href="" >
                  <img src="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/twitter.png" />
                </a>

                <a href="" >
                  <img src="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/phone.png" />
                </a>

                <a href="" >
                  <img src="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/telegram.png" />
                </a>
              </div>
            </CardActions>
          </Card>
        </div>

        <div className="cards-container">
          <Card style={{ maxWidth: 300, margin: 10 }}>
            <CardActionArea>
              <CardMedia
                style={{ height: "169px", width: "300px" }}
                image="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/workout-plan.png"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography variant="h6">
                  Pur bounce
                </Typography>
                <Typography component="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className="text-actions" disableActionSpacing>
              <div className="text-actions-item">
                <IconButton aria-label="Add to favorites">
                  <VideocamIcon />
                </IconButton>
                <Typography variant="caption">
                  405
                </Typography>
              </div>
              <div className="text-actions-item right-side">
                <IconButton>
                  <ThumbUpAltIcon />
                </IconButton>
                <Typography variant="caption" color="textSecondary">
                  14.450
                </Typography>
              </div>
            </CardActions>
          </Card>

          <Card style={{ maxWidth: 300, margin: 10 }}>
            <CardActionArea>
              <CardMedia
                style={{ height: "169px", width: "300px" }}
                image="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/workout-plan.png"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography variant="h6" >
                  Pur bounce
                </Typography>
                <Typography component="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className="text-actions" disableActionSpacing>
              <div className="text-actions-item">
                <IconButton aria-label="Add to favorites">
                  <VideocamIcon />
                </IconButton>
                <Typography variant="caption">
                  405
                </Typography>
              </div>
              <div className="text-actions-item right-side">
                <IconButton>
                  <ThumbUpAltIcon />
                </IconButton>
                <Typography variant="caption" color="textSecondary">
                  14.450
                </Typography>
              </div>
            </CardActions>
          </Card>

          <Card style={{ maxWidth: 300, margin: 10 }}>
            <CardActionArea>
              <CardMedia
                style={{ height: "169px", width: "300px" }}
                image="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/workout-plan.png"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography variant="h6" >
                  Pur bounce
                </Typography>
                <Typography component="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className="text-actions" disableActionSpacing>
              <div className="text-actions-item">
                <IconButton aria-label="Add to favorites">
                  <VideocamIcon />
                </IconButton>
                <Typography variant="caption">
                  405
                </Typography>
              </div>
              <div className="text-actions-item right-side">
                <IconButton>
                  <ThumbUpAltIcon />
                </IconButton>
                <Typography variant="caption" color="textSecondary">
                  14.450
                </Typography>
              </div>
            </CardActions>
          </Card>

          <Card style={{ maxWidth: 300, margin: 10 }}>
            <CardActionArea>
              <CardMedia
                style={{ height: "169px", width: "300px" }}
                image="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/workout-plan.png"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography variant="h6" >
                  Pur bounce
                </Typography>
                <Typography component="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className="text-actions" disableActionSpacing>
              <div className="text-actions-item">
                <IconButton aria-label="Add to favorites">
                  <VideocamIcon />
                </IconButton>
                <Typography variant="caption">
                  405
                </Typography>
              </div>
              <div className="text-actions-item right-side">
                <IconButton>
                  <ThumbUpAltIcon />
                </IconButton>
                <Typography variant="caption" color="textSecondary">
                  14.450
                </Typography>
              </div>
            </CardActions>
          </Card>

          <Card style={{ maxWidth: 300, margin: 10 }}>
            <CardActionArea>
              <CardMedia
                style={{ height: "169px", width: "300px" }}
                image="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/workout-plan.png"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography variant="h6" >
                  Pur bounce
                </Typography>
                <Typography component="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className="text-actions" disableActionSpacing>
              <div className="text-actions-item">
                <IconButton aria-label="Add to favorites">
                  <VideocamIcon />
                </IconButton>
                <Typography variant="caption">
                  405
                </Typography>
              </div>
              <div className="text-actions-item right-side">
                <IconButton>
                  <ThumbUpAltIcon />
                </IconButton>
                <Typography variant="caption" color="textSecondary">
                  14.450
                </Typography>
              </div>
            </CardActions>
          </Card>

          <Card style={{ maxWidth: 300, margin: 10 }}>
            <CardActionArea>
              <CardMedia
                style={{ height: "169px", width: "300px" }}
                image="http://localhost:8080/pl-site/assets/js/react-app/src/assets/img/png/workout-plan.png"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography variant="h6" >
                  Pur bounce
                </Typography>
                <Typography component="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className="text-actions" disableActionSpacing>
              <div className="text-actions-item">
                <IconButton aria-label="Add to favorites">
                  <VideocamIcon />
                </IconButton>
                <Typography variant="caption">
                  405
                </Typography>
              </div>
              <div className="text-actions-item right-side">
                <IconButton>
                  <ThumbUpAltIcon />
                </IconButton>
                <Typography variant="caption" color="textSecondary">
                  14.450
                </Typography>
              </div>
            </CardActions>
          </Card>
        </div>
        <Card style={{ width: '100%' }}>
          <CardHeader title="Forms" />
          <CardContent>
            <Grid style={{ width: 280 }} container direction="column" justify="center" alignItems="center" >
              <Grid item>
                <TextField
                  id="standard-name"
                  label="Name"
                  margin="normal"
                />
              </Grid>
              <Grid>
                <TextField
                  id="standard-uncontrolled"
                  label="Uncontrolled"
                  defaultValue="foo"
                  margin="normal"
                />
              </Grid>
              <Grid>
                <TextField
                  error
                  id="standard-error"
                  label="Error"
                  defaultValue="Hello World"
                  margin="normal"
                  helperText="This is short description"
                />
              </Grid>
            </Grid>
            <Grid style={{ marginTop: 20 }} container>
              <Grid item md>
                <Typography style={{ borderBottom: "1px solid #ccc" }} variant="title" component="h1" >
                  Checkboxes
                </Typography>
                <Grid container direction="column">
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={true}
                          value="checkedA"
                        />
                      }
                      label="Secondary"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel control={<Checkbox value="checkedC" />} label="Uncontrolled" />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={true}
                          value="checkedF"
                          indeterminate
                        />
                      }
                      label="Indeterminate"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md>
                <Typography variant="title" style={{ borderBottom: "1px solid #ccc" }} component="h1" >
                  Radio buttons
                </Typography>
                <Grid container direction="column">
                  <Grid item>
                    <FormControlLabel value="first" control={<Radio />} label="Selected" />
                  </Grid>
                  <Grid item>
                    <FormControlLabel value="second" control={<Radio />} label="Normal" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            
            <Buttons></Buttons>

            <Grid container >
              <Grid item>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Datum</TableCell>
                      <TableCell align="right">Arm (cm)</TableCell>
                      <TableCell align="right">Burst (cm)</TableCell>
                      <TableCell align="right">Hufte (cm)</TableCell>
                      <TableCell align="right">Taille (cm)</TableCell>
                      <TableCell align="right">Bein (cm)</TableCell>
                      <TableCell align="right">Gewicht (kg)</TableCell>
                      <TableCell align="right">BMI</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className="custom-row"  >
                      <TableCell align="right">20.07.2018, 15:01</TableCell>
                      <TableCell align="right">40</TableCell>
                      <TableCell align="right">86</TableCell>
                      <TableCell align="right">93</TableCell>
                      <TableCell align="right">67</TableCell>
                      <TableCell align="right">54</TableCell>
                      <TableCell align="right">58</TableCell>
                      <TableCell align="right">100</TableCell>
                      <TableCell align="right"><DeleteIcon style={{ color: "#ccc" }} /></TableCell>
                    </TableRow>
                    <TableRow className="custom-row"  >
                      <TableCell align="right">20.07.2018, 15:01</TableCell>
                      <TableCell align="right">40</TableCell>
                      <TableCell align="right">86</TableCell>
                      <TableCell align="right">93</TableCell>
                      <TableCell align="right">67</TableCell>
                      <TableCell align="right">54</TableCell>
                      <TableCell align="right">58</TableCell>
                      <TableCell align="right">100</TableCell>
                      <TableCell align="right"><DeleteIcon style={{ color: "#ccc" }}  /></TableCell>
                    </TableRow>
                    <TableRow className="custom-row"  >
                      <TableCell align="right">20.07.2018, 15:01</TableCell>
                      <TableCell align="right">40</TableCell>
                      <TableCell align="right">86</TableCell>
                      <TableCell align="right">93</TableCell>
                      <TableCell align="right">67</TableCell>
                      <TableCell align="right">54</TableCell>
                      <TableCell align="right">58</TableCell>
                      <TableCell align="right">100</TableCell>
                      <TableCell align="right"><DeleteIcon style={{ color: "#ccc" }} /></TableCell>
                    </TableRow>
                    <TableRow className="custom-row"  >
                      <TableCell align="right">20.07.2018, 15:01</TableCell>
                      <TableCell align="right">40</TableCell>
                      <TableCell align="right">86</TableCell>
                      <TableCell align="right">93</TableCell>
                      <TableCell align="right">67</TableCell>
                      <TableCell align="right">54</TableCell>
                      <TableCell align="right">58</TableCell>
                      <TableCell align="right">100</TableCell>
                      <TableCell align="right"> <DeleteIcon style={{ color: "#ccc" }} /></TableCell>
                    </TableRow>
                    <TableRow className="custom-row"  >
                      <TableCell align="right">20.07.2018, 15:01</TableCell>
                      <TableCell align="right">40</TableCell>
                      <TableCell align="right">86</TableCell>
                      <TableCell align="right">93</TableCell>
                      <TableCell align="right">67</TableCell>
                      <TableCell align="right">54</TableCell>
                      <TableCell align="right">58</TableCell>
                      <TableCell align="right">100</TableCell>
                      <TableCell align="right"> <DeleteIcon style={{ color: "#ccc" }} /></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
);

Imprint.propTypes = {
  samplePropMessage: PropTypes.string.isRequired,
};

export default Imprint;
