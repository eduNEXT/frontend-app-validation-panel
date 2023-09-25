import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { waitFor, render } from '@testing-library/react';
import Head from './index';

describe('Head', () => {
  const props = {};
  it('should match render title tag and favicon with the site configuration values', async () => {
    render(<IntlProvider locale="en"> <Head {...props} /> </IntlProvider>);

    await waitFor(() => {
      expect(document.title).toEqual(`Validation Panel | ${getConfig().SITE_NAME}`);
      expect(document.querySelector('link').rel).toEqual('shortcut icon');
      expect(document.querySelector('link').href).toEqual(getConfig().FAVICON_URL);
    });
  });
});
