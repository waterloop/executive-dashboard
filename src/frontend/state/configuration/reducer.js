import * as actionTypes from '../actionTypes';

const initialState = {
  interviewMeetingLink: '',
  interviewFirstRoundDeadline: '',
  interviewSecondRoundDeadline: '',
  newMembersMeetingLink: '',
  newMembersMeetingDate: '',
  newMembersMeetingStartTime: '',
  newMembersMeetingEndTime: '',
  newMembersFormLink: '',
  newMembersFormDeadline: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.CONFIGURATION_SET_CONFIGURATION:
      return {
        ...state,
        ...payload,
      };
    default:
      return { ...state };
  }
};
