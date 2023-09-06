import { useNavigate } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Container, Icon, IconButton, Stack,
} from '@edx/paragon';
import { ArrowBack } from '@edx/paragon/icons';
import messages from '../../messages';

const Header = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  return (
    <Stack className="bg-secondary-200">
      <Container>
        <IconButton
          className="my-3 mx-5"
          src={ArrowBack}
          iconAs={Icon}
          alt={intl.formatMessage(messages.goBack)}
          onClick={() => navigate(-1)}
        />
      </Container>
    </Stack>
  );
};
export default Header;
