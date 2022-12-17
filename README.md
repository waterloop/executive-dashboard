# Executive Dashboard

The executive dashboard is an all-in-one ATS and member analytics tool used by anyone in a lead position. Its primary function is to help manage the application process to subteams at the beginning of each term.

# Setup - local environment:

<!-- TODO: refactor -->

1. Make sure you're on Node v16.10+ and have npm installed.
2. Make sure you have yarn installed (`npm install -g yarn`), then run `yarn install`
3. After running cms-server, run these 3 commands in succession to start the application:
   1. `yarn docker:dev`
   2. `yarn dev` in new terminal
   3. `yarn start:frontend` in new terminal
4. For more commmands please see `package.json` under the "scripts" section. `yarn start:frontend` to start the application.
5. (Optional): Download React Tools and Redux Devtools through your browser extension to debug components from your browser.

# Folder Directory Tree (+ description):

- .github: various config files for github
- .storybook: config files for storybook.
- node_modules: npm package library directory. Don't modify.
- public: contains meta info + index.html + favicons for website. Rarely need to touch.

- src: where all our code is stored.

  - backend

    - migrations: defines database schema, applied in order of file appearance.
    - seeds: defines initial data to fill tables with.
    - src: backend source code
      - api: backend API endpoints; this is what interfaces with the frontend. Also validates the data for correctness.
      - db: database table interface; acts as "controller" of data. Contains knex.js pseudo-SQL that performs specific SQL statements like queries and data updates..
      - tests: integration tests used to test overall behaviour of backend.

  - frontend
    - api: frontend-side API endpoints; this is what interfaces with the backend.
    - assets: where we store static assets, currently only SVG images.
    - components: React components, (usually) simpler in design + sophistication than Page components.
    - pages: Defined page components (which resemble an entire webpage). Normally you'd start looking here.
    - hooks: Redux callback handlers, normally used to "dispatch" a payload to update the redux store.
    - state: Utility code for the hooks folder that manages the actual Redux structure (`actions.js, reducers.js`), with the interface exposed by `selectors.js`.
    - stories: Used by Storybook.js -> lets you preview any defined components + test out their functionality in a library.
    - tests: Not yet fully implemented, but where we'd house Jest UI/UX tests in the future.

# General tips:

## GENERAL:

- index.js normally connects certain subfolders together, and is also the true entry point of the application.

## BACKEND:

- The docker commands will create containers (instances) of the image without deleting them afterwards. To reclaim space, please run `docker system prune` every once in a while.
