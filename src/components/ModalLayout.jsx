import { ModalDialog, Tabs, Tab } from '@edx/paragon';
import PropTypes from 'prop-types';

/**
 * A modal layout component with optional tabs. For showing and hiding
 * the modal is recommended to use {@link https://paragon-openedx.netlify.app/components/hooks/usetoggle/ useToggle}
 *
 * @component
 * @param {string} title - The title to display in the modal.
 * @param {boolean} isOpen - A flag to show or hide the modal.
 * @param {function} onClose - A method to close/hide the modal.
 * @param {Array} tabs - An array of tab objects { name, label, component }.
 * @example
 *  const tabs = [
 *    {
 *      name: 'validation_process',
 *      label: 'Validation process',
 *      // Replace this with the actual component to show
 *      component: <h1>Validation Process</h1>,
 *    },
 *    {
 *      name: 'past_processes',
 *      label: 'Past process(es)',
 *      // Replace this with the actual component to show
 *      component: <h1>Past Processes</h1>,
 *    },
 *  ];
 * @param {React.ReactNode|Array<React.ReactNode>} children - The content of the modal body.
 * @returns {React.ReactNode} The rendered modal layout.
 *
 */
const ModalLayout = ({
  title, isOpen, onClose, tabs, children,
}) => (
  <ModalDialog
    isOpen={isOpen}
    onClose={onClose}
    hasCloseButton
    isFullscreenOnMobile
    size="lg"
  >
    <ModalDialog.Header className="p-4">
      <ModalDialog.Title>
        {title}
      </ModalDialog.Title>

      {!!tabs.length
        && (
          <Tabs variant="tabs">
            {tabs.map(({ name, label, component }) => (
              <Tab eventKey={name} title={label} className="p-4">
                {component}
              </Tab>
            ))}
          </Tabs>
        )}
    </ModalDialog.Header>

    <ModalDialog.Body>
      {children}
    </ModalDialog.Body>
  </ModalDialog>
);

ModalLayout.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    component: PropTypes.node,
  })),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

ModalLayout.defaultProps = {
  title: '',
  children: null,
  tabs: [],
};

export default ModalLayout;
