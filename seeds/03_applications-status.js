// Statuses represent valid application statuses for both development and production environments.
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('application_status')
    .del()
    .then(() =>
      knex('application_status').insert([
        {
          key: 'app_pending',
          description:
            'Initial (first) state of application after its creation/submission by applicant.',
          name: 'Pending',
        },
        {
          key: 'app_undecided',
          description:
            'State of application after being reviewed, but before a decision has been made.',
          name: 'Undecided',
        },
        {
          key: 'app_reject',
          description:
            'Rejection of application without interview (after "app_pending")',
          name: 'Rejected',
        },
        {
          key: 'interview_pending',
          description: 'Interview already setup, awaiting interview session.',
          name: 'Pending',
        },
        {
          key: 'interview_undecided',
          description: 'Interview finished, but no decision has been made yet.',
          name: 'Undecided',
        },
        {
          key: 'interview_reject',
          description: 'Applicant rejected after being interviewed.',
          name: 'Rejected',
        },
        {
          key: 'final_accept',
          description: 'Applicant has been selected to join the team.',
          name: 'Accepted',
        },
      ]),
    );
};
