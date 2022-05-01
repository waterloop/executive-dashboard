# Purpose

This is the backend for the Executive Dashboard that houses the analytics and applicant tracking system.

By default, it locally runs on port # 9001 to prevent conflicts from simultaneously running cms-server.

# Setup: Running the dev server

1. Install node packages.
   `npm ci`
2. Install knex globally
   `npm install -g knex`
   This will allow you to run migrations from the cmd

3. Launch the docker development database with the following command: `npm run docker:dev`

4. Migrate the database (create the tables in database) by running the command `npm run migrate` or `knex migrate:latest`

5. Seed the database (populate with actual data) by running the command `npm run seed` or `knex seed:run`

6. run `npm run dev` to start the server

7. To run integration tests, run `npm run test:integration`

8. For a full list of commands, please see `package.json` under "scripts".

# Common Issues:

1. Migration tables are "locked".

If you're in the testing environment, make sure no test cases are currently still running, and then run `npm run test:unlock` Likewise for the development environment, run `npm run unlock`.
