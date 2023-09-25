import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';
import { Route, Routes } from 'react-router';

import messages from './i18n';
import ValidationPanelPage from './ValidationPanelPage';
import PermissionsGuard from './utils/PermissionsGuard';
import Head from './Head';

import './index.scss';
import store from './data/store';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={store}>
      <Head />
      <Routes>
        <Route element={<PermissionsGuard />}>
          <Route path="/validation-panel" element={<ValidationPanelPage />} />
        </Route>
      </Routes>
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages,
  requireAuthenticatedUser: true,
});
