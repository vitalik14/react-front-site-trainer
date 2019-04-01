import { withStyles } from '@material-ui/core/styles/index';
import IconButton from '@material-ui/core/IconButton';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import Button from '@material-ui/core/Button';

export const GreyQuoteIcon = withStyles({
  root: {
    fontSize: 36,
    color: '#CDD7DC',
  },
})(FormatQuoteIcon);

export const StyledButton = withStyles({
  label: {
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.75,
    lineHeight: '16px',
  },
  textPrimary: {
    color: '#0336FF',
  },
  textSecondary: {
    color: '#4D4D4E',
    '&:hover': {
      backgroundColor: 'rgba(63, 81, 181, 0.08)',
    },
  },
})(Button);

export const UpgradeButton = withStyles({
  root: {
    backgroundColor: '#fff',
    color: '#4D4D4E',
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 1.07,
    lineHeight: '24px',
    '&:hover': {
      backgroundColor: '#efefef',
    },
  },
})(Button);

export const TrainingPlanFavIconButton = withStyles({
  root: {
    width: 30,
    height: 30,
  },
})(IconButton);
