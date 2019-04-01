import Button from '@material-ui/core/Button/index';
import ListItem from '@material-ui/core/ListItem/index';
import { withStyles } from '@material-ui/core/styles/index';
import MenuList from '@material-ui/core/MenuList/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ButtonBase from '@material-ui/core/ButtonBase/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import ListItemIcon from '@material-ui/core/ListItemIcon/index';

export const ProfileButton = withStyles({
  root: {
    height: 24,
    width: 61,
    minHeight: 'auto',
    padding: 0,
    border: '1px solid #F5F5F5',
    borderRadius: 2,
    '& > span:last-child': {
      color: 'rgba(255, 255, 255, 0.8)',
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
  label: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 0.64,
    lineHeight: '14px',
  },
})(Button);

export const ProfileMenuList = withStyles({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
  },
})(MenuList);

export const ProfileListItem = withStyles({
  root: {
    paddingLeft: 10,
    paddingRight: 10,
  },
})(ListItem);

export const MainMenuList = withStyles({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
  },
})(MenuList);

export const MainMenuItem = withStyles({
  root: {
    width: '100%',
    paddingLeft: 0,
    paddingRight: 0,
    height: 26,
  },
})(MenuItem);

export const MainNavNestedListItemText = withStyles({
  root: {
    color: '#4d4d4e',
  },
})(ListItemText);

export const MainNavListItem = withStyles({
  root: {
    paddingLeft: 26,
    paddingRight: 10,
  },
})(ListItem);

export const MainNavButtonBase = withStyles({
  root: {
    width: 48,
    height: 48,
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
})(ButtonBase);

export const MainNavListItemArrIcon = withStyles({
  root: {
    marginRight: 0,
  },
})(ListItemIcon);

export const ArrowDropUpIconPink = withStyles({
  root: {
    color: '#ed4c7a',
  },
})(ArrowDropUpIcon);
