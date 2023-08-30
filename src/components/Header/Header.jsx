import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Container, Icon, IconButton, Stack,
} from '@edx/paragon';
import { ArrowBack } from '@edx/paragon/icons';
import messages from '../../i18n';

const Header = ({ intl }) => (
  <Stack className="bg-secondary-200">
    <Container>
      <IconButton
        className="my-3 mx-5"
        src={ArrowBack}
        iconAs={Icon}
        alt={intl.formatMessage(messages.goBack)}
      />
    </Container>
  </Stack>
);

Header.propTypes = {
  intl: useIntl.isRequired,
};

export default Header;
