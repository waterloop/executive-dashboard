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

/** When an email is sent and the application state is interview_pending or app_reject, this API is called */
const updateEmailStatus = (db) => (appID) =>
  db('interviews')
    .update({ email_sent: true }, [
      'id',
      'note',
      'application_id',
      'email_sent',
    ])
    .whereIn(
      'application_id',
      db('applications')
        .select('id')
        .where({ id: appID })
        .whereIn('status', ['interview_reject', 'final_accept']),
    )
    .then((response) => {
      // If response is empty, it could be because the status is invalid OR the id is invalid.
      if (response.length === 0) {
        return db('applications')
          .where({ id: appID })
          .then((resp2) => {
            if (resp2.length === 0) {
              return -1;
            }
            return -2;
          });
      }
      return response;
    })
    .catch((err) => {
      console.error(`Error in updateEmailStatus: ${err}`);
      throw err;
    });

export default (db) => ({
  getInterviewsByTerm: getInterviewsByTerm(db),
  getInterviewByApplicationId: getInterviewByApplicationId(db),
  updateOrAddInterview: updateOrAddInterview(db),
  updateEmailStatus: updateEmailStatus(db),
});
