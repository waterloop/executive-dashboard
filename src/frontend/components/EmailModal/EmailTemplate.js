const EmailTemplate = (status, data) => {
  switch (status) {
    case 'interview_pending':
      return {
        subject: 'Waterloop 1on1 Invitation',
        text: `Hello ${data.applicantName},<br /><br />Thank you for completing the written application. We enjoyed reading your responses, and would love to get to know you more through a short one-on-one.<br /><br />If you are still interested in the position of ${data.position}, please go to <a href="${data.interviewLink}">this link</a> and sign up for a time slot. Please ensure you do this before ${data.interviewEndDate}.<br /><br />I’m looking forward to talking to you soon!`,
      };
    case 'app_reject':
      return {
        subject: 'Waterloop Application',
        text: `Hello ${data.applicantName},<br /><br />Thank you for taking the time to complete the Waterloop application process. We enjoyed getting to know you better through your written application.<br /><br />All applicants were assessed based upon their skill fit, enthusiasm and willingness to contribute to the team. Though you were a very impressive candidate, we regret to inform you that you have not been selected to be a member of Waterloop for the ${data.nextTerm} term.<br /><br />Thank you for investing so much time into applying for Waterloop. We hope that you will still continue to support Waterloop in the future.`,
      };
    case 'final_accept':
      return {
        subject: 'Waterloop Acceptance',
        text: `Hello ${data.applicantName},<br /><br />Congratulations! Thank you for completing the application process. We enjoyed getting to know you, and would love to onboard you onto Waterloop as a ${data.position}.<br /><br />Our New Members Orientation will be held virtually on ${data.newMembersDate} from ${data.newMembersTime}. You can join with <a href="${data.newMembersMeetingLink}" target="_blank" style="text-decoration:none; color:blue">this link</a>.<br /><br />Please confirm that you are interested in taking the position by filling out <a href="${data.newMembersFormLink}" target="_blank" style="text-decoration:none; color:blue">this short form</a> by ${data.newMembersFormDeadline}. Upon completion, we will be providing you with more onboarding details and getting you set up with your very own @waterloop email! We look forward to working with you soon!`,
      };
    case 'interview_reject':
      return {
        subject: 'Waterloop Application',
        text: `Hello ${data.applicantName},<br /><br />Thank you for taking the time to complete the Waterloop application process. We enjoyed getting to know you better throughout the application and 1:1.<br /><br />All applicants were assessed based upon their enthusiasm and willingness to contribute and commit to the team. Though you were a very impressive candidate, we regret to inform you that you have not been selected to be a member of Waterloop for the ${data.nextTerm} term.<br /><br />Thank you for investing the time to apply for Waterloop. We hope that you will still continue to support Waterloop in the future.`,
      };
    default:
      return {
        subject: '',
        text: '',
      };
  }
};

export default EmailTemplate;
