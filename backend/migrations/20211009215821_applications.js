exports.up = (knex) =>
  knex.schema.createTable('applications', (table) => {
    table.increments('id').primary();
    table.timestamp('submitted_at').notNullable().defaultTo(knex.fn.now());
    table.string('status'); // Current application status
    table.string('first_name');
    table.string('last_name');
    table.string('email_address');
    table.boolean('email_sent').notNullable().defaultTo(false);
    table.string('current_year'); // 1A, 1B, 2A...
    table.string('program');
    table.string('application_term'); // values like <[WINTER, SPRING, FALL]>-<year>
    table.boolean('in_school'); // Whether the applicant's current term is a school term.
    table.string('resume_link');
    table.boolean('in_person_available'); // Whether the applicant is available in person.
    table.string('reason_to_join', 2500); //max of 2500 characters ~ 500 words
    table.string('additional_information', 2500).nullable(); // NOTE: Consider moving to separate table so that multiple custom fields are supported
    table.integer('posting_id'); // NOTE: references ids in postings table.
  });

exports.down = (knex) => knex.schema.dropTableIfExists('applications');
