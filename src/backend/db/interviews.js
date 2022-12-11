const getInterviewsByTerm = (db) => (application_term) =>
  db('applications')
    .where({
      application_term,
    })
    .join('interviews', 'interviews.application_id', '=', 'applications.id')
    .select(
      'interviews.id',
      'interviews.note',
      'interviews.application_id',
      'interviews.email_sent',
    )
    .then((data) => data)
    .catch((err) => {
      console.error(`Error in getInterviewsByTerm: ${err}`);
      throw err;
    });

const getInterviewByApplicationId = (db) => (application_id) =>
  db('interviews')
    .where({
      application_id,
    })
    .then((data) => data)
    .catch((err) => {
      console.error(`Error in getInterviewByApplicationId: ${err}`);
      throw err;
    });

const updateOrAddInterview = (db) => (interview) =>
  db('interviews')
    .insert({
      ...interview,
    })
    .returning(['id', 'note', 'application_id', 'email_sent'])
    .onConflict('application_id')
    .merge()
    .then((response) => response)
    .catch((err) => {
      console.error(`Error in updateOrAddInterview: ${err}`);
      throw err;
    });

export default (db) => ({
  getInterviewsByTerm: getInterviewsByTerm(db),
  getInterviewByApplicationId: getInterviewByApplicationId(db),
  updateOrAddInterview: updateOrAddInterview(db),
});
