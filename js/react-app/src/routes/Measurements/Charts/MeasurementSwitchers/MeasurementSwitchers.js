import React from 'react';
import { PropTypes } from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

import styles from './MeasurementSwitchers.scss';

const switchers = [
  { name: 'Arm', color: '#3366cc' },
  { name: 'Brust', color: '#dc3912' },
  { name: 'Hüfe', color: '#ff9900' },
  { name: 'Taille', color: '#109618' },
  { name: 'Bein', color: '#990099' },
  { name: 'Fett', color: '#0099c6' },
  { name: 'Wasser', color: '#dd4477' },
  { name: 'Muskeln', color: '#66aa00' },
  { name: 'Knochen', color: '#b82e2e' },
];

const renderCheckboxes = (visibleMeasurements, handleChange, formGroupOptions) => (
  <FormGroup {...formGroupOptions} component="fieldset">
    {
      switchers.map(({ name, color }) => (
        <FormControlLabel
          key={name}
          control={(
            <div className={styles.checkboxCont}>
              <Checkbox
                checked={visibleMeasurements[name]}
                onChange={() => handleChange(name)}
                name={name}
              />
              <div className={styles.colorLabel} style={{ backgroundColor: color }} />
            </div>
          )}
          label={name}
        />
      ))
    }
  </FormGroup>
);

const MeasurementSwitchers = ({
  visibleMeasurements,
  isPopoverOpen,
  popoverAnchorEl,
  onToggle,
  onPopoverBtnClick,
  onPopoverClose,
}) => (
  <div>
    <div className={styles.desktopCont}>
      {renderCheckboxes(visibleMeasurements, onToggle, { row: true })}
    </div>
    <div className={styles.mobileCont}>
      <div className={styles.popoverOpenBtnCont}>
        <Button
          aria-owns={isPopoverOpen ? 'checkboxes-popover' : null}
          variant="contained"
          onClick={onPopoverBtnClick}
        >
          Messungen
        </Button>
      </div>
      <Popover
        id="checkboxes-popover"
        open={isPopoverOpen}
        anchorEl={popoverAnchorEl}
        onClose={onPopoverClose}
      >
        <div className={styles.mobileInnerCont}>
          {renderCheckboxes(visibleMeasurements, onToggle, { column: 'true' })}
          <div className={styles.popoverCloseBtnCont}>
            <Button onClick={onPopoverClose} variant="contained">
              Close
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  </div>
);

MeasurementSwitchers.propTypes = {
  visibleMeasurements: PropTypes.objectOf(PropTypes.bool).isRequired,
  isPopoverOpen: PropTypes.bool.isRequired,
  popoverAnchorEl: PropTypes.any,
  onToggle: PropTypes.func.isRequired,
  onPopoverBtnClick: PropTypes.func.isRequired,
  onPopoverClose: PropTypes.func.isRequired,
};

MeasurementSwitchers.defaultProps = {
  popoverAnchorEl: null,
};

export default MeasurementSwitchers;
