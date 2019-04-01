import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';

export const PrimaryButton = withStyles({
  root: {
    backgroundColor: '#EC407A',
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

export const SecondaryButton = withStyles({
  root: {
    backgroundColor: '#EEEEEE',
    '&:hover': {
      backgroundColor: '#CFD8DC',
    },
  },
  disabled: {
    backgroundColor: '#F7F7F7',
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
