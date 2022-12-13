const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');

if (!ENV_IS_STAGING_OR_PROD) {
  exports.seed = async (knex) => {
    // Deletes ALL existing entries
    const { id } = await knex('applications').orderBy('id').first('id');

    return knex('interviews')
      .del()
      .then(() =>
        knex('interviews').insert([
          {
            note: 'Strong candidate with experience in current tech stack used by team.',
            application_id: id,
          },
          {
            note: 'Great leadership skills from other extra-curriculars, some experience in back-end.',
            application_id: id + 4,
          },
          {
            note: 'Candidate says most inspirational quote is ""',
            application_id: id + 5,
          },
          {
            note: 'Candidate apparently hates pineapple on pizza??? please reject this person PLEASE',
            application_id: id + 2,
          },
          {
            note: 'Candidate says they have "NIGHT FEVER", holds a world record for longest non-stop dancing, should i call emergency services?',
            application_id: id + 3,
          },
          {
            note: 'I love this dude, he gonna be part of our tea- NANIIIII???????',
            application_id: id + 11,
          },
        ]),
      );
  };
} else {
  exports.seed = function () {};
}
