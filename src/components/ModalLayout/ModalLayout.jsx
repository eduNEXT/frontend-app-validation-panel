import PropTypes from 'prop-types';
import { ModalDialog, Tabs, Tab } from '@edx/paragon';

/**
 * A versatile modal layout component with optional tabs. For showing and hiding
 * the modal, it is recommended to use the {@link https://paragon-openedx.netlify.app/components/hooks/usetoggle/ `useToggle`} hook.
 *
 * @component
 * @param {string} title - The title to display in the modal.
 * @param {boolean} isOpen - A flag to show or hide the modal.
 * @param {function} onClose - A method to close/hide the modal.
 * @param {Array} tabs - An array of tab objects: `{ name, label, component }`.
 * @param {React.ReactNode|Array<React.ReactNode>} children - The content of the modal body; is not necessary
 * when is sent the component in the tabs prop.
 * @returns {React.ReactNode} The rendered modal layout.
 *
 * @example
 * // Example usage of ModalLayout
 * const tabs = [
 *   {
 *     name: 'validation_process',
 *     label: 'Validation process',
 *     component: <h1>Validation Process</h1>,
 *   },
 *   {
 *     name: 'past_processes',
 *     label: 'Past process(es)',
 *     component: <h1>Past Processes</h1>,
 *   },
 * ];
 *
 * <ModalLayout
 *   isOpen={true}
 *   title="Example Modal"
 *   onClose={() => {}}
 *   tabs={tabs}
 * >
 *   <p>This is a custom content for the modal.</p>
 * </ModalLayout>
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
    <ModalDialog.Header className="mx-5">
      <ModalDialog.Title>
        {title}
      </ModalDialog.Title>
    </ModalDialog.Header>

    <ModalDialog.Body className="mx-5">
      {!!tabs.length
        && (
          <Tabs variant="tabs">
            {tabs.map(({ name, label, component }) => (
              <Tab eventKey={name} title={label} className="py-4">
                {component}
              </Tab>
            ))}
          </Tabs>
        )}
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
