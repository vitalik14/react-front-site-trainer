import { withStyles } from '@material-ui/core/styles/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import MenuList from '@material-ui/core/MenuList/index';
import IconButton from '@material-ui/core/IconButton';
import TextRotationNoneIcon from '@material-ui/icons/TextRotationNone';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar/index';
import Collapse from '@material-ui/core/Collapse/index';
import Paper from '@material-ui/core/Paper/index';
import Input from '@material-ui/core/Input/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const StyledAppBar = withStyles({
  root: {
    width: 'calc(100% - 310px)',
    padding: 20,
    left: 310,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#304FFE',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.5)',
    transition: 'left .2s, width .2s',
    '@media (max-width: 1024px)': {
      width: '100%',
      left: 0,
    },
  },
})(AppBar);

export const StyledCollapse = withStyles({
  container: {
    width: 0,
    height: 'auto !important',
    transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  entered: {
    width: 210,
  },
})(Collapse);

export const HamburgerIconButton = withStyles({
  root: {
    width: 24,
    height: 'auto',
    padding: 0,
  },
})(IconButton);

export const StyledInput = withStyles({
  root: {
    borderBottom: '2px solid #fff',
    color: '#fff',
    '@media (max-width: 428px)': {
      maxWidth: '100%',
    },
  },
  input: {
    width: 210,
    '&::-webkit-input-placeholder': {
      fontFamily: 'Roboto',
      color: '#fff',
      opacity: 0.7,
    },
    '&::-moz-placeholder': {
      fontFamily: 'Roboto',
      color: '#fff',
      opacity: 0.7,
    },
    '&:-ms-input-placeholder': {
      fontFamily: 'Roboto',
      color: '#fff',
      opacity: 0.7,
    },
    '&:-moz-placeholder': {
      fontFamily: 'Roboto',
      color: '#fff',
      opacity: 0.7,
    },
  },
})(Input);

export const OpaqueFontIcon = withStyles({
  root: {
    opacity: 0.5,
  },
})(TextRotationNoneIcon);

export const WhiteNotificationsIcon = withStyles({
  root: {
    color: '#fff',
  },
})(NotificationsNoneIcon);

export const NotificationsBadge = withStyles({
  badge: {
    backgroundColor: '#EC407A',
    color: '#FFFFFF',
  },
})(Badge);

export const StyledPaper = withStyles({
  root: {
    width: 286,
    minHeight: 140,
    position: 'absolute',
    top: 60,
    right: 20,
    maxHeight: 312,
    overflowY: 'auto',
    borderRadius: 2,
    willChange: 'opacity, visibility !important',
    transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, visibility 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms  !important',
    '&:before': {
      content: 'close-quote',
      width: 0,
      height: 0,
      borderBottom: '10px solid white',
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      position: 'absolute',
      top: -10,
      right: 14,
    },
  },
})(Paper);

export const StyledMenuList = withStyles({
  root: {
    padding: 0,
  },
})(MenuList);

export const StyledMenuItem = withStyles({
  root: {
    height: 'auto',
    alignItems: 'flex-start',
    boxShadow: 'inset 0 -1px 0 0 #EEEEEE',
    '&[unread]': {
      backgroundColor: '#f5f5f5',
      '&:hover': {
        backgroundColor: '#e4e4e4',
      },
    },
  },
})(MenuItem);

export const StyledFormControlLabel = withStyles({
  root: {
    marginLeft: 0,
    marginRight: 0,
  },
})(FormControlLabel);
