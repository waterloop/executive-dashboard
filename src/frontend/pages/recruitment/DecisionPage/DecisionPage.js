import React, { useState, useEffect } from 'react';

import EmailModal from '../../../components/EmailModal';
import PortalTemplate from '../components/PortalTemplate';
import { tabs, tableColumns, positionFields } from './Constants';
import { makeTruthTable, createData, getItemById } from '../../../utils';
import { MIN_SUBTEAMS_SHOWN } from '../components/Constants';
import {
  setCheckboxValues,
  setCheckboxesShown,
  oneTrue,
  getItemByName,
} from '../utils';
import Button from '../../../components/Button';

import usePostings from '../../../hooks/postings';
import useApplications from '../../../hooks/applications';
import useEmail from '../../../hooks/email';
import useTeams from '../../../hooks/teams';

const DecisionPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [emailData, setEmailData] = useState({});

  const { applications } = useApplications('FALL-2022');
  const { postings } = usePostings();
  const { updateEmailSent } = useEmail();
  const { teams } = useTeams();

  const handleButtonClick = (data) => {
    setEmailData(data);
    setModalOpen(true);
  };

  const makeButtonComponent = (data) => (
    <Button
      tertiary={!data.email_sent}
      disabled={data.email_sent}
      label={data.email_sent ? 'Sent' : 'Send Email'}
      onClick={() => handleButtonClick(data)}
    />
  );

  const tableRows = applications.map((application) => {
    if (application) {
      const appPosting = getItemById(postings, application.posting_id);

      if (appPosting) {
        const appValues = [
          `${application.first_name} ${application.last_name}`,
          application.email_address,
          appPosting.team,
          appPosting.title,
          makeButtonComponent(application),
          application.status,
        ];
        return createData(tableColumns, appValues);
      }
    }
    return createData(tableColumns, []);
  });

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

  const subteamsUnformatted = teams.map((subteam) => subteam.name);

  const [subteamsChecked, setSubteamsChecked] = useState({});

  useEffect(() => {
    setSubteamsChecked(makeTruthTable(subteamsUnformatted, false));
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

  const handleModalSubmit = () => {
    updateEmailSent(emailData.id);
    setEmailData({});
    setModalOpen(false);
    // Force a reload of the browser so that the email status button states update.
    window.location.reload();
  };

  // TODO: Replace the mock data below with actual data taken from the appropriate sources.
  const mockData = {
    // Extracted from Google OAuth.
    execName: 'John Doe',
    execEmail: 'john.doe@waterloop.ca',
    execPhoneNum: '(000) 000-0000',
    // Extracted from the decision portal table row.
    position: 'Fullstack Developer',
    subteam: 'Web',
    nextTerm: 'Spring 2022',
    // Extracted from the configuration page database.
    interviewLink: 'https://meet.google.com',
    interviewEndDate: 'September 21',
    newMembersDate: 'September 21',
    newMembersTime: '4-5pm',
    newMembersMeetingLink: 'https://meet.google.com',
    newMembersFormLink: 'https://docs.google.com/forms',
    newMembersFormDeadline: 'September 21',
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
          ...mockData,
        }}
        onSubmit={handleModalSubmit}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default DecisionPage;
