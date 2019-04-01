import { withStyles } from '@material-ui/core/styles/index';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import TablePagination from '@material-ui/core/TablePagination';

export const StyledPaper = withStyles({
  root: {
    '& + div': {
      minHeight: 534,
    },
  },
})(Paper);

export const StyledButton = withStyles({
  root: {
    color: '#EC407A',
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.75,
    lineHeight: '16px',
  },
})(Button);

export const StyledTableHeadCell = withStyles({
  root: {
    padding: '4px 56px 4px 24px',
    border: 'none',
    color: '#000000',
    fontSize: 14,
  },
})(TableCell);

export const StyledTableHeadDateCell = withStyles({
  root: {
    fontSize: 16,
    fontWeight: 600,
  },
})(StyledTableHeadCell);

export const StyledTableHead = withStyles({
  root: {
    boxShadow: '0 1px 0 0 #EEEEEE',
  },
})(TableHead);

export const StyledTableRow = withStyles({
  root: {
    boxShadow: '0 1px 0 0 #EEEEEE',
    '&:nth-child(2n + 1)': {
      backgroundColor: '#F5F5F5',
    },
  },
})(TableRow);

export const StyledTableCell = withStyles({
  root: {
    border: 'none',
    color: '#4D4D4E',
    '&:last-child': {
      padding: '0 10px 0 20px',
    },
  },
})(TableCell);

export const DeleteIconButton = withStyles({
  root: {
    width: 30,
    height: 30,
    fontSize: 18,
    color: '#a2a2a2',
    paddingTop: 6,
  },
})(IconButton);

export const StyledLabel = withStyles({
  label: {
    fontSize: 13,
    lineHeight: '20px',
  },
})(FormControlLabel);

export const StyledRadio = withStyles({
  root: {
    fontSize: 13,
  },
})(Radio);

export const StyledTablePagination = withStyles({
  toolbar: {
    '& > div': {
      display: 'flex',
    },
  },
  spacer: {
    '@media (max-width: 767px)': {
      flexGrow: 0,
      flexBasis: 'unset',
    },
  },
})(TablePagination);

export const ModalYesButton = withStyles({
  root: {
    backgroundColor: '#EC407A',
    fontWeight: 'bold',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#ff0056',
    },
  },
})(Button);

export const ModalNoButton = withStyles({
  root: {
    backgroundColor: '#EEEEEE',
    fontWeight: 'bold',
    color: '#4D4D4E',
    marginRight: 10,
    '&:hover': {
      backgroundColor: '#d2d2d2',
    },
  },
})(Button);
