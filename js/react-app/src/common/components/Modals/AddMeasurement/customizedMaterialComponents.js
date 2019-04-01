import { withStyles } from '@material-ui/core/styles/index';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

export const StyledFormLabel = withStyles({
  root: {
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
})(FormLabel);

export const StyledFormControlLabel = withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'flex-start',
    marginLeft: 0,
    position: 'relative',
    margin: '0 15px 0 16px',
  },
  label: {
    color: '#4D4D4E',
    fontSize: 13,
  },
})(FormControlLabel);

export const AddButton = withStyles({
  root: {
    height: 32,
    width: 107,
    borderRadius: 2,
    backgroundColor: '#EC407A',
    padding: ' 7px 12px 9px',
    '&:hover': {
      backgroundColor: '#FF74A3',
    },
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.75,
  },
})(Button);
