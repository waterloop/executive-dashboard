const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');

if (!ENV_IS_STAGING_OR_PROD) {
  exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('interviews')
      .del()
      .then(() => {
        return knex('interviews').insert([
          {
            note: 'Strong candidate with experience in current tech stack used by team.',
            application_id: 1,
          },
          {
            note: 'Great leadership skills from other extra-curriculars, some experience in back-end.',
            application_id: 5,
          },
          {
            note: 'Candidate says most inspirational quote is ""',
            application_id: 6,
          },
          {
            note: 'Candidate apparently hates pineapple on pizza??? please reject this person PLEASE',
            application_id: 3,
          },
          {
            note: 'Candidate says they have "NIGHT FEVER", holds a world record for longest non-stop dancing, should i call emergency services?',
            application_id: 4,
          },
          {
            note: 'I love this dude, he gonna be part of our tea- NANIIIII???????',
            application_id: 12,
          },
        ]);
      });
  };
} else {
  exports.seed = function (knex) {};
}
