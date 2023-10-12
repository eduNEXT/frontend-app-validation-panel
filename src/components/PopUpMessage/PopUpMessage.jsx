/* eslint-disable react/jsx-no-useless-fragment */
import { useIntl } from '@edx/frontend-platform/i18n';
import { Alert } from '@edx/paragon';
import { Info } from '@edx/paragon/icons';
import { useDispatch, useSelector } from 'react-redux';
import { resetPopUpMessage } from '../../data/slices';
import messages from './messages';

const getErrorMessage = (message, intl) => {
  if (message) {
    const errCode = message?.match(/(\d+)/)?.[0];
    return intl.formatMessage(messages[errCode]);
  }

  return '';
};

const PopUpMessage = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { variant, message } = useSelector((state) => state.popUpMessage);

  const onClose = () => {
    dispatch(resetPopUpMessage());
  };

  return (
    <>
      {!message
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
            {getErrorMessage(message, intl)}
          </Alert>
        )}
    </>

  );
};

export default PopUpMessage;
