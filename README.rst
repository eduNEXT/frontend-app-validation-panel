frontend-app-validation-panel
#############################

|license-badge| |status-badge| |ci-badge| |codecov-badge|

Purpose
***************
The Validation Panel is a micro-frontend (MFE) that enables course authors to initiate validation processes for the courses they intend to publish on the platform. These processes are routed to validators for a thorough review, feedback, and determination of approval or disapproval. This MFE offers a user-friendly interface, streamlining the course validation process for both authors and validators.
	
This application was designed for UNESCO's Open edX instance and depends on the
`Platform Global Teacher Campus Plugin <https://github.com/eduNEXT/platform-global-teacher-campus/tree/main#platform-global-teacher-campus-plugin>`_

Getting Started
***************

Prerequisites
=============

The `devstack`_ is currently recommended as a development environment for your
new MFE.  If you start it with ``make dev.up.lms`` that should give you
everything you need as a companion to this frontend.

Note that it is also possible to use `Tutor`_ to develop an MFE.  You can refer
to the `relevant tutor-mfe documentation`_ to get started using it.
    
Ensure you have installed the `Platform Global Teacher Campus Plugin <https://github.com/eduNEXT/platform-global-teacher-campus/tree/main#platform-global-teacher-campus-plugin>`_ as per its documentation to have access to the endpoints required by this MFE

Developing
============

Cloning and Startup
-------------------
1. Clone this repository to gain access to the project:

.. code-block::

	git clone git@github.com:openedx/frontend-app-validation-panel.git
        
2. Make sure are using Node version 18.x, as the micro-frontend build scripts support Node 18. This repository includes an **.nvmrc** file to helpset the correct Node version using `nvm <https://github.com/nvm-sh/nvm>`_.
        
3. Install the dependencies of the Validation Panel project:

.. code-block::

	cd frontend-app-validation-panel
    npm install
    
4. Update the application port to access the Validation Panel in development:
	* Update the line `PORT` line in your ``.env.development`` file and specify the desired (e.g. `PORT=9999`). 
    
	* By default, the app runs on `http://localhost:2001/validation_panel`, overriding the port used by the course-authoring MFE, unless otherwise specified in ``.env.development:PORT`` and ``.env.development:LMS_BASE_URL``.

5. Start the development server:

.. code-block::

	npm start

7. Next, enable the Validation Panel micro-frontend in `edx-platform` to make requests, adding the path to the Validation Panel app in `edx-platform`:
	* Go to your environment settings (e.g. `edx-platform/lms/envs/private.py`)
	* Add the environment variable, ``VALIDATION_PANEL_MICROFRONTEND_URL`` pointing to the Validation Panel App location considering the `PORT` determined in ``.env.development:PORT`` (e.g. ``http://localhost:2001``).

8. Restart the ``edx-platform`` ``lms`` by running the following command:
    
.. code-block::

    make dev.restart-container

Deployment
============
This component follows the standard deploy process for MFEs. For details, see
the `MFE production deployment guide`_

Now, if you prefer to use Tutor, you will need to create an image containing the new MFE. With this in mind, you have to execute the following steps:

1. Declare the new MFE in your config.yml by executing the following command line

.. code-block:: bash

    tutor config save --set MFE_VALIDATION_PANEL_MFE_APP="{'name': 'validation_panel', 'repository': 'https://github.com/eduNEXT/frontend-app-validation-panel.git', 'version': '< the wanted git branch or 'master' >', 'port': < any free port >}"

or by adding the following code directly in the config.yml 

.. code-block:: yml
	
    MFE_VALIDATION_PANEL_MFE_APP:
      name: validation_panel
      port: < any free port >
      repository: https://github.com/eduNEXT/frontend-app-validation-panel.git
      version: < the wanted git branch or 'master' >
      
* If you are using Tutor in a v16.X version or up, you will need to execute the steps given in `tutor-mfe documentation <https://github.com/overhangio/tutor-mfe/tree/v16.1.1#adding-new-mfes>`_

2. Apply the new settings with ``tutor config save``

3. Create the new image of the MFEs containing this new MFE usign ``tutor images build mfe``

4. Start the platform with the image recently created with ``tutor local launch``

License
=======

The code in this repository is licensed under the AGPLv3 unless otherwise
noted.

Please see `LICENSE <LICENSE>`_ for details.


.. |license-badge| image:: https://img.shields.io/github/license/eduNEXT/frontend-app-validation-panel.svg
    :target: https://github.com/eduNEXT/frontend-app-validation-panel/blob/master/LICENSE
    :alt: License

.. |status-badge| image:: https://img.shields.io/badge/Status-Maintained-brightgreen

.. |ci-badge| image:: https://github.com/eduNEXT/frontend-app-validation-panel/actions/workflows/ci.yml/badge.svg
    :target: https://github.com/eduNEXT/frontend-app-validation-panel/actions/workflows/ci.yml
    :alt: Continuous Integration

.. |codecov-badge| image:: https://codecov.io/github/eduNEXT/frontend-app-validation-panel/coverage.svg?branch=master
    :target: https://codecov.io/github/eduNEXT/frontend-appvalidation-panel?branch=master
    :alt: Codecov
.. _Devstack: https://github.com/openedx/devstack

.. _Tutor: https://github.com/overhangio/tutor

.. _relevant tutor-mfe documentation: https://github.com/overhangio/tutor-mfe#mfe-development
.. _MFE production deployment guide: https://openedx.github.io/frontend-platform/#production-deployment-strategy
