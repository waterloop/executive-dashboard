export const APP_COLUMNS = [
  'id',
  'submitted_at',
  'first_name',
  'last_name',
  'email_address',
  'email_sent',
  'current_year',
  'program',
  'application_term',
  'in_school',
  'in_person_available',
  'posting_id',
  'status',
  'reason_to_join',
  'resume_link',
  'additional_information',
];

export const STATUSES = [
  'app_pending',
  'app_reject',
  'app_undecided',
  'interview_pending',
  'interview_reject',
  'interview_undecided',
  'final_accept',
];

export const EMAIL_SENT_FLAGS = {
  INTERVIEW_PENDING: 0b1,
  APP_REJECT: 0b10,
  FINAL_ACCEPT: 0b100,
  INTERVIEW_REJECT: 0b1000,
};
