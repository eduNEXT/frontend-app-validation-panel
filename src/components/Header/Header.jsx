import { useNavigate } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Icon, IconButton, Stack,
} from '@edx/paragon';
import { ArrowBack } from '@edx/paragon/icons';
import messages from '../../messages';

const Header = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  return (
    <header className="bg-secondary-200">
      <Stack className="container-lg">
        <IconButton
          className="my-3"
          src={ArrowBack}
          iconAs={Icon}
          alt={intl.formatMessage(messages.goBack)}
          onClick={() => navigate(-1)}
        />
      </Stack>
    </header>
  );
};
export default Header;
