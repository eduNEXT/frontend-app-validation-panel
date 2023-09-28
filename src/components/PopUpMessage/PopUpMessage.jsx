/* eslint-disable react/jsx-no-useless-fragment */
import { Alert } from '@edx/paragon';
import { Info } from '@edx/paragon/icons';
import { useDispatch, useSelector } from 'react-redux';
import { resetPopUpMessage } from '../../data/slices';

const codeMessages = {
  409: 'There is already a validation process in progress for this course.',
  400: 'This action cannot be completed at the moment. Please try refreshing the page and try again.',
  401: 'You are not authorized to do execute this action.',
  404: 'There was an error trying to find the register you are looking for.',
  500: 'An unknown error occurred. Please try again later.',
};

const getErrorMessage = (message) => {
  if (message) {
    const errCode = message?.match(/(\d+)/)?.[0];
    return codeMessages[errCode];
  }

  return '';
};

const PopUpMessage = () => {
  const dispatch = useDispatch();
  const { variant, message } = useSelector((state) => state.popUpMessage);

  const onClose = () => {
    dispatch(resetPopUpMessage());
  };

  return (
    <>
      { !message
        ? null
        : (
          <Alert
            stacked
            dismissible
            show={!!message}
            variant={variant}
            onClose={onClose}
            className="m-3"
            icon={Info}
            style={{ position: 'fixed', bottom: 0, zIndex: 1 }}
          >
            {getErrorMessage(message)}
          </Alert>
        )}
    </>

  );
};

export default PopUpMessage;
