import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal/Modal';
import CloseIcon from '@material-ui/icons/Close';

import styles from './MeasurementDeletionModal.scss';
import { ModalNoButton, ModalYesButton } from '../../customizedMaterialComponents';

const MeasurementDeletionModal = ({
  isShown,
  onClose,
  onConfirm,
}) => (
  <Modal
    open={isShown}
    onClose={onClose}
  >
    <div className={styles.modalCont}>
      <div className={styles.modalTopCont}>
        <h1 className={styles.modalTitle}>
          Bist Du Dir sicher?
        </h1>
        <div className={styles.modalCloseIconCont}>
          <CloseIcon fontSize="inherit" onClick={onClose} />
        </div>
      </div>
      <p className={styles.modalDesc}>
        Möchten Sie diese Messung wirklich entfernen?
      </p>
      <div className={styles.modalButtonsCont}>
        <ModalNoButton onClick={onClose}>NEIN</ModalNoButton>
        <ModalYesButton onClick={onConfirm}>JA</ModalYesButton>
      </div>
    </div>
  </Modal>
);

MeasurementDeletionModal.propTypes = {
  isShown: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default MeasurementDeletionModal;
