frontend-app-validation-panel
#############################

|license-badge| |status-badge| |ci-badge| |codecov-badge|

Purpose
***************
The Validation Panel is a micro-frontend (MFE) that empowers course authors to initiate validation processes for the courses they intend to publish on the platform. These processes are routed to validator bodies for a thorough course review, feedback, and determination of approval or disapproval. This MFE offers a user-friendly interface, streamlining the course validation process for both authors and validators.

Getting Started
***************

Prerequisites
=============

#. It is currently recommended to use `Tutor`_ as the development environment for this MFE. You can refer to the `relevant tutor-mfe documentation`_ for guidance or follow these steps to get started quickly:

   #. Install TVM running 
       ``pip install git+https://github.com/eduNEXT/tvm.git``
   
   #. Initialize a new Tutor project
       .. code-block::

          tvm project init <project-name> <tutor-version>

          # For example:
          # tvm project init tvm-test v14.0.0

   #. Access the new Tutor project folder with ``cd <project-name>``
   
   #. Initialize the environment with ``source ./.tvm/bin/activate``
    
   #. Run ``tutor dev launch`` to install the necessary initial components
   
   #. Stop the Tutor containers using ``tutor dev stop``
    
#. Ensure you have installed the `platform-global-teacher-campus <https://github.com/eduNEXT/platform-global-teacher-campus>`_ plugin as per its documentation to have access to the endpoints required by this MFE

Developing
============

Cloning and Startup
-------------------
#. Clone this repository inside the new Tutor project:
    ``git clone git@github.com:openedx/frontend-app-validation-panel.git``
        
#. Use node v18.x.
    The current version of the micro-frontend build scripts support node 18. Using other major versions of node *may* work, but this is unsupported. For convenience, this repository includes an .nvmrc file to help in setting the correct node version via `nvm <https://github.com/nvm-sh/nvm>`_.
        
#. Install npm dependencies:
    ``cd frontend-app-validation-panel && npm install``

#. Create a ``docker-compose.override.yml`` file in the ``env > dev`` directory from the root of your new Tutor project

#. Add the following code to the YML file and adjust the path to your local clone of the frontend-app-validation-panel repository:
    .. code-block::

      version: '3.7'
      services:
        course-authoring:
          volumes:
            - 'path/to/frontend-app-validation-panel:/openedx/app'

#. Run ``tutor dev start`` and wait the containers to be mounted

#. After this, any changes you make to your local clone of the Validation Panel repository will be reflected at ``http://apps.local.overhang.io:2001/validation-panel``

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
