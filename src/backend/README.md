# Purpose

This is the backend for the Executive Dashboard that houses the analytics and applicant tracking system.

By default, it locally runs on port # 9001 to prevent conflicts from simultaneously running waterloop-cms backend.

# Common Issues:

1. Migration tables are "locked".

If you're in the testing environment, make sure no test cases are currently still running, and then run `npm run test:unlock` Likewise for the development environment, run `npm run unlock`.
