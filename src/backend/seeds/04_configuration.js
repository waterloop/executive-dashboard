const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');

if (!ENV_IS_STAGING_OR_PROD) {
  exports.seed = (knex) => {
    // Deletes ALL existing entries
    return knex('configuration')
      .del()
      .then(() => {
        // Inserts seed entries
        return knex('configuration').insert([
          { id: 0, label: 'interviews:meeting_link', value: 'www.google.com' },
          {
            id: 1,
            label: 'interviews:first_round_deadline',
            value: '2022-02-22',
          },
          {
            id: 2,
            label: 'new_members_orientation:meeting_link',
            value: 'www.netflix.com',
          },
          {
            id: 3,
            label: 'member_status_confirmation:deadline',
            value: '2022-04-03',
          },
        ]);
      });
  };
} else {
  exports.seed = (knex) => {
    // Deletes ALL existing entries
    return knex('configuration')
      .del()
      .then(() => {
        // Inserts seed entries
        return knex('configuration').insert([
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
        ]);
      });
  };
}
