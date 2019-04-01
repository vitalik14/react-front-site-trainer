import React from 'react';
import { PropTypes } from 'prop-types';
import Table from '@material-ui/core/Table/Table';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableBody from '@material-ui/core/TableBody/TableBody';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from '../Tables.scss';
import {
  StyledTableCell,
  StyledTableHead,
  StyledTableHeadCell,
  StyledTableHeadDateCell,
  StyledTableRow,
  DeleteIconButton,
} from '../../customizedMaterialComponents';

const MeasurementsBottomTable = ({
  page,
  rowsPerPage,
  measurements,
  measurementBeingRemovedId,
  onModalDeletionOpen,
}) => (
  <div className={styles.tableCont}>
    <Table>
      <StyledTableHead>
        <TableRow>
          <StyledTableHeadDateCell>
            <div style={{ minWidth: 67 }} />
          </StyledTableHeadDateCell>
          <StyledTableHeadCell>
            Fat (cm)
          </StyledTableHeadCell>
          <StyledTableHeadCell>
            Wasser (cm)
          </StyledTableHeadCell>
          <StyledTableHeadCell>
            Muscles (cm)
          </StyledTableHeadCell>
          <StyledTableHeadCell>
            Bones (cm)
          </StyledTableHeadCell>
          <StyledTableHeadCell />
          <StyledTableHeadCell />
          <StyledTableHeadCell />
          <StyledTableHeadCell />
        </TableRow>
      </StyledTableHead>
      <TableBody>
        {
          measurements
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(({
              id,
              measureDate,
              fat,
              water,
              muscles,
              bones,
            }) => (
              <StyledTableRow key={id}>
                <StyledTableCell>
                  {measureDate}
                </StyledTableCell>
                <StyledTableCell>
                  {fat || '-'}
                </StyledTableCell>
                <StyledTableCell>
                  {water || '-'}
                </StyledTableCell>
                <StyledTableCell>
                  {muscles || '-'}
                </StyledTableCell>
                <StyledTableCell>
                  {bones || '-'}
                </StyledTableCell>
                <StyledTableCell />
                <StyledTableCell />
                <StyledTableCell />
                <StyledTableCell />
                { id === measurementBeingRemovedId && (
                  <StyledTableCell>
                    <CircularProgress />
                  </StyledTableCell>
                )}
                { id !== measurementBeingRemovedId && (
                  <StyledTableCell>
                    <DeleteIconButton onClick={() => onModalDeletionOpen(id)}>
                      <DeleteIcon fontSize="inherit" color="inherit" style={{ position: 'absolute' }} />
                    </DeleteIconButton>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))
        }
      </TableBody>
    </Table>
  </div>
);

MeasurementsBottomTable.propTypes = {
  measurements: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    ),
  ).isRequired,
  measurementBeingRemovedId: PropTypes.number,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onModalDeletionOpen: PropTypes.func.isRequired,
};

MeasurementsBottomTable.defaultProps = {
  measurementBeingRemovedId: null,
};

export default MeasurementsBottomTable;
