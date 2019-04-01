import React from 'react';
import { PropTypes } from 'prop-types';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

import { PrimaryButton, SecondaryButton } from '../customizedMaterialComponents';
import styles from './GroceryListModal.scss';


const GroceryListModal = ({
  isShown,
  isFetchingGroceryList,
  onClose,
  timeSpan,
  items,
  groceryListDownloadURL,
  isFetchingGroceryListPDF,
  onDownloadButtonClick,
  wasFileGenerated,
}) => (
  <Modal open={isShown}>
    <div className={styles.cont}>
      <div className={styles.topCont}>
        <h2 className={styles.title}>Einkaufsliste</h2>
        <div className={styles.closeIconCont}>
          <IconButton color="inherit" fontSize="inherit" onClick={onClose}>
            <CloseIcon color="inherit" fontSize="inherit" />
          </IconButton>
        </div>
      </div>
      <p className={styles.timeSpan}>{timeSpan}</p>
      {isFetchingGroceryList && (
        <div className={styles.loaderCont}>
          <CircularProgress />
        </div>
      )}
      {!isFetchingGroceryList && (
        <ul className={styles.list}>
          {
            items.map(({
              id,
              food,
              amount,
              unit,
            }) => (
              <li key={id} className={styles.listItem}>
                <div>
                  <span>
                    {food}
                  </span>
                </div>
                <div>
                  <span>
                    {`${amount} ${unit}`}
                  </span>
                </div>
              </li>
            ))
          }
        </ul>
      )}
      <div className={styles.btnsCont}>
        <div className={styles.downloadBtnCont}>
          <PrimaryButton disabled={isFetchingGroceryList} href={groceryListDownloadURL || null} target="_blan" onClick={onDownloadButtonClick}>
            {(groceryListDownloadURL && wasFileGenerated) ? 'PDF DATEILINK' : 'HERUNTERLADEN'}
          </PrimaryButton>
          {isFetchingGroceryListPDF && (
            <div className={styles.downloadLoaderCont}>
              <CircularProgress size={24} />
            </div>
          )}
        </div>
        <SecondaryButton
          disabled={isFetchingGroceryList}
          onClick={() => window.print()}
        >
          DRUCKEN
        </SecondaryButton>
      </div>
    </div>
  </Modal>
);

GroceryListModal.propTypes = {
  isShown: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  timeSpan: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      food: PropTypes.string,
      amount: PropTypes.number,
      unit: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
  isFetchingGroceryList: PropTypes.bool.isRequired,
  onDownloadButtonClick: PropTypes.func.isRequired,
  isFetchingGroceryListPDF: PropTypes.bool.isRequired,
  groceryListDownloadURL: PropTypes.string.isRequired,
  wasFileGenerated: PropTypes.bool.isRequired,
};

export default GroceryListModal;
