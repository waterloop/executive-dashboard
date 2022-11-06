const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');

if (!ENV_IS_STAGING_OR_PROD) {
  exports.seed = (knex) =>
    // Deletes ALL existing entries
    knex('configuration')
      .del()
      .then(() =>
        // Inserts seed entries
        knex('configuration').insert([
          { id: 0, label: 'interview_meeting_link', value: 'www.google.com' },
          {
            id: 1,
            label: 'interview_first_round_deadline',
            value: '2022-02-22',
          },
          {
            id: 2,
            label: 'interview_second_round_deadline',
            value: '2022-02-22',
          },
          {
            id: 3,
            label: 'new_members_meeting_link',
            value: 'www.netflix.com',
          },
          {
            id: 4,
            label: 'new_members_meeting_date',
            value: '2022-02-23',
          },
          {
            id: 5,
            label: 'new_members_meeting_start_time',
            value: '06:45',
          },
          {
            id: 6,
            label: 'new_members_meeting_end_time',
            value: '06:45',
          },
          {
            id: 7,
            label: 'new_members_form_link',
            value: 'www.amazon.com',
          },
          {
            id: 8,
            label: 'new_members_form_deadline',
            value: '2022-04-04',
          },
        ]),
      );
} else {
  exports.seed = (knex) =>
    // Deletes ALL existing entries
    knex('configuration')
      .del()
      .then(() =>
        // Inserts seed entries
        knex('configuration').insert([
          { label: 'interviews:meeting_link', value: '' },
          {
            label: 'interviews:first_round_deadline',
            value: '',
          },
          {
            label: 'interviews:second_round_deadline',
            value: '',
          },
          {
            label: 'new_members_orientation:meeting_link',
            value: '',
          },
          {
            label: 'new_members_orientation:date',
            value: '',
          },
          {
            label: 'new_members_orientation:start_time',
            value: '',
          },
          {
            label: 'new_members_orientation:end_time',
            value: '',
          },
          {
            label: 'member_status_confirmation:form_link',
            value: '',
          },
          {
            label: 'member_status_confirmation:deadline',
            value: '',
          },
        ]),
      );
}
