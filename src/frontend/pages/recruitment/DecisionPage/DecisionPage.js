import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';

import EmailModal from 'frontend/components/EmailModal';
import PortalTemplate from '../components/PortalTemplate';
import { tabs, tableColumns, positionFields } from './Constants';
import { MIN_SUBTEAMS_SHOWN, CURRENT_TERM_YEAR } from '../components/Constants';
import {
  setCheckboxValues,
  setCheckboxesShown,
  oneTrue,
  getItemByName,
  formatTerm,
  makeTruthTable,
  createData,
  getItemById,
  getEmailSentForAppStatus,
} from 'frontend/utils';
import Button from 'frontend/components/Button';

import usePostings from 'frontend/hooks/postings';
import useApplications from 'frontend/hooks/applications';
import useConfiguration from 'frontend/hooks/configuration';
import useEmail from 'frontend/hooks/email';
import useTeams from 'frontend/hooks/teams';
import useProfileData from 'frontend/hooks/profileData';

const DecisionPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [emailData, setEmailData] = useState({});

  const { applications } = useApplications(CURRENT_TERM_YEAR);
  const { configuration } = useConfiguration();
  const { postings } = usePostings();
  const { updateEmailStatus } = useEmail();
  const { teams } = useTeams();
  const { profileData } = useProfileData();

  const handleButtonClick = (data) => {
    setEmailData(data);
    setModalOpen(true);
  };

  const makeButtonComponent = (data) => {
    const emailSentForAppStatus = getEmailSentForAppStatus(
      data.status,
      data.email_sent,
    );
    return (
      <Button
        tertiary={!emailSentForAppStatus}
        disabled={emailSentForAppStatus}
        label={emailSentForAppStatus ? 'Sent' : 'Send Email'}
        onClick={() => handleButtonClick(data)}
      />
    );
  };

  const tableRows = useMemo(
    () =>
      applications.map((application) => {
        if (application) {
          const posting = getItemById(postings, application.posting_id);
          if (posting) {
            const appValues = [
              `${application.first_name} ${application.last_name}`,
              application.email_address,
              posting.team,
              posting.title,
              makeButtonComponent({
                subteam: posting.team,
                position: posting.title,
                ...application,
              }),
              application.status,
            ];
            return createData(tableColumns, appValues);
          }
        }
        return createData(tableColumns, []);
      }),
    [applications, postings],
  );

  // Grab positions from applications data
  const allPositionNames = [];

  const positionOptions = tableRows
    .map((row) => {
      if (row.position && allPositionNames.indexOf(row.position) === -1) {
        allPositionNames.push(row.position);
        return createData(positionFields, [
          row.position,
          row.position,
          row.subteam,
        ]);
      }
      return createData(positionFields, []);
    })
    .filter((position) => position.name !== undefined);

  const [positionsChecked, setPositionsChecked] = useState({});
  const [subteamsChecked, setSubteamsChecked] = useState({});

  useEffect(() => {
    const formattedSubteams = makeTruthTable(
      teams.map((subteam) => subteam.name),
      false,
    );
    setSubteamsChecked(formattedSubteams);
  }, [teams]);

  const filterRows = (status) =>
    tableRows.filter(
      (row) =>
        row.status === status &&
        subteamsChecked[row.subteam] &&
        positionsChecked[row.position],
    );

  const filteredPositions = positionOptions.filter(
    (position) => subteamsChecked[position.team],
  );

  const MAX_SUBTEAMS_SHOWN = teams.length;

  const [subteamsShown, setSubteamsShown] = useState(MIN_SUBTEAMS_SHOWN);

  const filterCategories = [
    {
      name: 'subteams',
      formattedName: 'Subteam',
      currentShown: subteamsShown,
      checked: subteamsChecked,
      maxShown: MAX_SUBTEAMS_SHOWN,
      minShown: MIN_SUBTEAMS_SHOWN,
      options: teams,
      setCategoryChecked: (clickedOption) => {
        setCheckboxValues(clickedOption, subteamsChecked, setSubteamsChecked);
        setPositionsChecked((prevState) => ({
          ...prevState,
          ...makeTruthTable(
            allPositionNames.filter(
              (position) =>
                getItemByName(positionOptions, position).team ===
                clickedOption.target.name,
            ),
            true,
          ),
        }));
      },
      setCategoryShown: () =>
        setCheckboxesShown(
          subteamsShown,
          setSubteamsShown,
          MAX_SUBTEAMS_SHOWN,
          MIN_SUBTEAMS_SHOWN,
        ),
    },
    {
      name: 'positions',
      formattedName: 'Position',
      currentShown: filteredPositions.length,
      checked: positionsChecked,
      maxShown: allPositionNames.length,
      minShown: allPositionNames.length,
      options: filteredPositions,
      setCategoryChecked: (clickedOption) => {
        setCheckboxValues(clickedOption, positionsChecked, setPositionsChecked);
      },
      noEntriesDefaultText: !oneTrue(subteamsChecked)
        ? 'Please select a Subteam to view available positions'
        : 'No available positions',
    },
  ];

  const postingByID = (id) => {
    let posting = {};
    if (modalOpen) {
      posting = postings.find((posting) => posting.id === id);
    } else {
      posting = {
        team: '',
        position: '',
      };
    }
    return posting;
  };

  const handleModalSubmit = (email) => {
    updateEmailStatus({ id: emailData.id, ...email });
    setEmailData({});
    setModalOpen(false);
  };

  const userData = {
    // Extracted from Google OAuth.
    execName: profileData?.name || '',
    execEmail: profileData?.email || '',
    execPhoneNum: '(000) 000-0000',
    // Extracted from the configuration page database.
    interviewLink: configuration.interviewMeetingLink,
    interviewEndDate: moment(configuration.interviewFirstRoundDeadline).format(
      'dddd, MMMM Do',
    ),
    newMembersDate: moment(configuration.newMembersMeetingDate).format(
      'dddd, MMMM Do',
    ),
    newMembersTime: `${configuration.newMembersMeetingStartTime} - ${configuration.newMembersMeetingEndTime} EST`,
    newMembersMeetingLink: configuration.newMembersMeetingLink,
    newMembersFormLink: configuration.newMembersFormLink,
    newMembersFormDeadline: `${moment(
      configuration.newMembersFormDeadline,
    ).format('MMMM Do')}, 11:59 PM`,
  };

  return (
    <div>
      <PortalTemplate
        portalName="Decision Portal"
        tabs={tabs}
        tableColumns={tableColumns.slice(0, -1)}
        filterCategories={filterCategories}
        filterRows={filterRows}
      />
      <EmailModal
        status={emailData.status}
        data={{
          applicantEmail: emailData.email_address,
          applicantName: `${emailData.first_name} ${emailData.last_name}`,
          position: `${postingByID(emailData.posting_id).title}`,
          subteam: `${postingByID(emailData.posting_id).team}`,
          nextTerm: `${formatTerm(emailData.application_term)}`,
          ...userData,
        }}
        onSubmit={handleModalSubmit}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default DecisionPage;
