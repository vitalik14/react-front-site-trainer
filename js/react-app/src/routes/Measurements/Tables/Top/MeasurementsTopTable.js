import React from 'react';
import { PropTypes } from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from '../Tables.scss';
import {
  StyledTableHead,
  StyledTableRow,
  StyledTableHeadCell,
  StyledTableHeadDateCell,
  StyledTableCell,
  DeleteIconButton,
} from '../../customizedMaterialComponents';

const MeasurementsTopTable = ({
  page,
  rowsPerPage,
  measurements,
  measurementBeingRemovedId,
  onModalDeletionOpen,
}) => (
  <div>
    <div className={styles.tableCont}>
      <Table>
        <StyledTableHead>
          <TableRow>
            <StyledTableHeadDateCell>
              Datum
            </StyledTableHeadDateCell>
            <StyledTableHeadCell>
              Arm (cm)
            </StyledTableHeadCell>
            <StyledTableHeadCell>
              Brust (cm)
            </StyledTableHeadCell>
            <StyledTableHeadCell>
              Hufte (cm)
            </StyledTableHeadCell>
            <StyledTableHeadCell>
              Taille (cm)
            </StyledTableHeadCell>
            <StyledTableHeadCell>
              Bein (cm)
            </StyledTableHeadCell>
            <StyledTableHeadCell>
              Gewicht (kg)
            </StyledTableHeadCell>
            <StyledTableHeadCell>
              BMI
            </StyledTableHeadCell>
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
                arm,
                chest,
                hip,
                waist,
                leg,
                weight,
                bmi,
              }) => (
                <StyledTableRow key={id}>
                  <StyledTableCell>
                    {measureDate}
                  </StyledTableCell>
                  <StyledTableCell>
                    {arm || '-'}
                  </StyledTableCell>
                  <StyledTableCell>
                    {chest || '-'}
                  </StyledTableCell>
                  <StyledTableCell>
                    {hip || '-'}
                  </StyledTableCell>
                  <StyledTableCell>
                    {waist || '-'}
                  </StyledTableCell>
                  <StyledTableCell>
                    {leg || '-'}
                  </StyledTableCell>
                  <StyledTableCell>
                    {weight || '-'}
                  </StyledTableCell>
                  <StyledTableCell>
                    {bmi || '-'}
                  </StyledTableCell>
                  { id === measurementBeingRemovedId && (
                    <StyledTableCell>
                      <CircularProgress />
                    </StyledTableCell>
                  )}
                  { id !== measurementBeingRemovedId && (
                    <StyledTableCell>
                      <DeleteIconButton onClick={() => onModalDeletionOpen(id)}>
                        <DeleteIcon fontSize="inherit" color="inherit" />
                      </DeleteIconButton>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))
          }
        </TableBody>
      </Table>
    </div>
  </div>
);

MeasurementsTopTable.propTypes = {
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

MeasurementsTopTable.defaultProps = {
  measurementBeingRemovedId: null,
};

export default MeasurementsTopTable;
