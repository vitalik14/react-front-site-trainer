import { withStyles } from '@material-ui/core/styles/index';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton/index';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';

export const SliderArrIconButton = withStyles({
  root: {
    width: 32,
    height: 32,
    padding: 0,
    border: '1px solid #CFD8DC',
    borderRadius: 0,
    '&:first-child': {
      marginRight: -1,
    },
    '& > span': {
      borderRadius: 0,
      '& > span > span': {
        borderRadius: 0,
      },
    },
    '@media (max-width: 767px)': {
      display: 'none',
    },
  },
})(IconButton);

export const SliderArrIconButtonUnbordered = withStyles({
  root: {
    border: 'none',
    borderRadius: '50%',
    '& > span': {
      borderRadius: 0,
      '& > span > span': {
        borderRadius: 0,
      },
    },
  },
})(SliderArrIconButton);

export const SliderPrevIcon = withStyles({
  root: {
    width: 25,
    height: 25,
  },
})(KeyboardArrowLeftIcon);

export const SliderNextIcon = withStyles({
  root: {
    width: 25,
    height: 25,
  },
})(KeyboardArrowRightIcon);

export const TabsPaper = withStyles({
  root: {
    margin: '0 2px',
  },
})(Paper);

export const StyledTabs = withStyles({
  indicator: {
    backgroundColor: '#EC407A',
    '@media (max-width: 767px)': {
      display: 'none',
    },
  },
  flexContainer: {
    '@media (max-width: 767px)': {
      flexDirection: 'column',
    },
  },
})(Tabs);

export const StyledTab = withStyles({
  root: {
    minHeight: 56,
    color: '#9E9E9E',
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.75,
    lineHeight: '16px',
  },
  selected: {
    color: '#EC407A',
    '@media (max-width: 767px)': {
      borderBottom: '2px solid',
    },
  },
})(Tab);

export const StyledWideTabs = withStyles({
  indicator: {
    '@media (max-width: 1365px)': {
      display: 'none',
    },
  },
  flexContainer: {
    '@media (max-width: 1365px)': {
      flexDirection: 'column',
    },
  },
})(StyledTabs);

export const StyledWideTab = withStyles({
  selected: {
    '@media (max-width: 1365px)': {
      borderBottom: '2px solid',
    },
  },
})(StyledTab);

export const PrimaryButton = withStyles({
  root: {
    backgroundColor: '#EC407A',
    minHeight: 32,
    '&:hover': {
      backgroundColor: '#FF74A3',
    },
  },
  disabled: {
    backgroundColor: '#F6A0BD',
  },
  label: {
    color: '#fff',
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: 0.75,
    lineHeight: '16px',
  },
})(Button);

export const LargePrimaryButton = withStyles({
  root: {
    minHeight: 44,
    padding: '8px 16px',
  },
  label: {
    fontSize: 20,
    letterSpacing: 1.04,
    lineHeight: '24px',
  },
})(PrimaryButton);

export const SecondaryButton = withStyles({
  root: {
    backgroundColor: '#EEEEEE',
    minHeight: 32,
    '&:hover': {
      backgroundColor: '#CFD8DC',
    },
  },
  disabled: {
    backgroundColor: '#F7F7F7',
    opacity: 0.6,
    label: {
      color: '#A6A6A7',
    },
  },
  label: {
    color: '#4D4D4E',
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: 0.75,
    lineHeight: '16px',
  },
})(Button);

export const BlueButton = withStyles({
  root: {
    backgroundColor: '#304FFE',
    minHeight: 32,
    '&:hover': {
      backgroundColor: '#0020D4',
    },
  },
  disabled: {
    backgroundColor: '#9DACFF',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0.75,
    lineHeight: '16px',
  },
})(Button);

export const WhiteButton = withStyles({
  root: {
    backgroundColor: '#FFFFFF',
    minHeight: 32,
    '&:hover': {
      backgroundColor: '#FFFFFF',
      '& > span:first-child': {
        color: '#EC407A',
      },
    },
  },
  disabled: {
    backgroundColor: '#808080',
    label: {
      color: '#9E9E9E',
    },
  },
  label: {
    color: '#4D4D4E',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0.75,
    lineHeight: '16px',
  },
})(Button);

export const LargeWhiteButton = withStyles({
  root: {
    minHeight: 44,
    padding: '8px 16px',
  },
  label: {
    fontSize: 20,
    letterSpacing: 1.04,
    lineHeight: '24px',
  },
})(WhiteButton);

const TextButton = withStyles({
  root: {
    backgroundColor: 'transparent',
    minHeight: 32,
  },
  disabled: {
    opacity: 0.5,
  },
  outlined: {},
  label: {
    fontWeight: 900,
    fontSize: 14,
    letterSpacing: 0.75,
    lineHeight: '16px',
    transition: 'color 250ms',
  },
})(Button);

export const TextWhiteButton = withStyles({
  root: {
    border: '1px solid white',
  },
  label: {
    color: 'white',
  },
})(TextButton);

export const TextBlueButton = withStyles({
  root: {
    '&:hover': {
      backgroundColor: '#304FFE',
      '& > span:first-child': {
        color: '#fff',
      },
    },
  },
  outlined: {
    borderColor: '#304FFE',
  },
  label: {
    color: '#304FFE',
  },
})(TextButton);

const TextGreyButton = withStyles({
  root: {
    '&:hover': {
      backgroundColor: '#EEEEEE',
    },
  },
  disabled: {
    opacity: 0.5,
  },
  label: {},
})(TextButton);

export const TextLightGreyButton = withStyles({
  label: {
    color: '#9E9E9E',
  },
})(TextGreyButton);

export const TextDarkGreyButton = withStyles({
  root: {},
  label: {
    color: '#4D4D4E',
  },
})(TextGreyButton);

export const TextPinkButton = withStyles({
  root: {
    '&:hover': {
      backgroundColor: '#EC407A',
      '& > span:first-child': {
        color: '#FFFFFF',
      },
    },
  },
  outlined: {
    borderColor: '#EC407A',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: '#EC407A',
  },
})(TextButton);

export const StyledCheckbox = withStyles({
  root: {
    width: 32,
    height: 32,
    padding: 0,
    '& > span > svg': {
      fontSize: 16,
    },
  },
  checked: {
    color: '#EC407A !important',
  },
})(Checkbox);

export const StyledRadio = withStyles({
  root: {
    width: 32,
    height: 32,
    padding: 0,
    '& > span': {
      marginRight: -3,
      fontSize: 13,
      color: '#4D4D4E',
      '& > svg': {
        fontSize: 16,
      },
    },
  },
  checked: {
    '& > span > svg': {
      color: '#EC407A !important',
    },
  },
  disabled: {
    '& > span': {
      color: '#9e9e9e',
    },
  },
})(Radio);
