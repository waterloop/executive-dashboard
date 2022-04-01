/* eslint-disable */
import React, { useState } from 'react';
import PortalTemplate from '../components/PortalTemplate';
import { tabs, tableColumns } from './Constants';
import { makeTruthTable, createData, getItemById } from '../../../utils';
import {
  SUBTEAM_OPTIONS,
  TERM_TYPE_OPTIONS,
  YEAR_OPTIONS,
  MIN_YEARS_SHOWN,
  MIN_SUBTEAMS_SHOWN,
  POSITION_OPTIONS, // REMOVE LATER
} from '../components/Constants';
import { setCheckboxValues, setCheckboxesShown, oneTrue } from '../utils';

import useApplications from '../../../hooks/applications';
import usePostings from '../../../hooks/postings';

const ApplicationPage = () => {
  const { applications } = useApplications('FALL-2022');
  const { postings } = usePostings();

  const tableRows = applications.map((application) => {
    let study = 'study';
    if (!application.in_school) {
      study = 'coop';
    }

    const appPosting = getItemById(postings, application.posting_id);

    if (appPosting) {
      const appValues = [
        `${application.first_name} ${application.last_name}`,
        application.current_year,
        study,
        appPosting.team,
        appPosting.title,
        application.status,
        `/recruitment/application/${application.id}`,
      ];
      return createData(tableColumns, appValues);
    }
    return createData(tableColumns, []);
  });

  //================================================================================
  // GRAB POSITIONS FROM APPLICATIONS DATA
  //================================================================================
  let allPositionNames = [];
  const positionCategories = ['name', 'formattedName', 'team'];

  let positionOptions = tableRows.map((row) => {
    if (allPositionNames.indexOf(row.position) === -1) {
      allPositionNames.push(row.position);
      return createData(positionCategories, [
        row.position,
        row.position,
        row.subteam,
      ]);
    }
  });
  positionOptions = positionOptions.slice(0, allPositionNames.length);

  console.log(positionOptions);
  console.log(allPositionNames);

  // HARD-CODED USING POSITION_OPTIONS from Constants.js
  const positionsUnformatted = POSITION_OPTIONS.map(
    (position) => position.name,
  );

  // Want to makeTruthTable using allPositionNames instead of positionsUnformatted,
  // but allPositionNames is empty on first render.
  const [positionsChecked, setPositionsChecked] = useState(
    makeTruthTable(positionsUnformatted, true),
  );

  const [positionsShown, setPositionsShown] = useState(0);

  //================================================================================
  // END OF POSITIONS STUFF
  //================================================================================

  const subteamsUnformatted = SUBTEAM_OPTIONS.map((subteam) => subteam.name);
  const termTypesUnformatted = TERM_TYPE_OPTIONS.map(
    (termType) => termType.name,
  );
  const yearsUnformatted = YEAR_OPTIONS.map((year) => year.name);

  const [subteamsChecked, setSubteamsChecked] = useState(
    makeTruthTable(subteamsUnformatted, false),
  );
  const [termTypesChecked, setTermTypesChecked] = useState(
    makeTruthTable(termTypesUnformatted, true),
  );
  const [yearsChecked, setYearsChecked] = useState(
    makeTruthTable(yearsUnformatted, true),
  );

  const filterRows = (status) =>
    tableRows.filter(
      (row) =>
        row.status === status &&
        subteamsChecked[row.subteam] &&
        positionsChecked[row.position] &&
        termTypesChecked[row.term] &&
        yearsChecked[row['year of study']],
    );
  const MAX_SUBTEAMS_SHOWN = SUBTEAM_OPTIONS.length;
  const MAX_YEARS_SHOWN = YEAR_OPTIONS.length;

  const [subteamsShown, setSubteamsShown] = useState(MIN_SUBTEAMS_SHOWN);

  const [yearsShown, setYearsShown] = useState(MIN_YEARS_SHOWN);

  const filterCategories = [
    {
      name: 'subteams',
      formattedName: 'Subteam',
      currentShown: subteamsShown,
      checked: subteamsChecked,
      maxShown: MAX_SUBTEAMS_SHOWN,
      minShown: MIN_SUBTEAMS_SHOWN,
      options: SUBTEAM_OPTIONS,
      setCategoryChecked: (clickedOption) => {
        setCheckboxValues(clickedOption, subteamsChecked, setSubteamsChecked);

        if (oneTrue(subteamsChecked, clickedOption)) {
          setPositionsShown(POSITION_OPTIONS.length);
        } else {
          setPositionsShown(0);
        }
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
      formattedName: 'Positions',
      currentShown: positionsShown,
      checked: positionsChecked,
      maxShown: POSITION_OPTIONS.length,
      minShown: POSITION_OPTIONS.length,
      options: POSITION_OPTIONS,
      subteamsChecked,
      setCategoryChecked: (clickedOption) =>
        setCheckboxValues(clickedOption, positionsChecked, setPositionsChecked),
      noEntriesDefaultText:
        'Please select a Subteam to view available positions',
    },
    {
      name: 'termTypes',
      formattedName: 'Term',
      currentShown: TERM_TYPE_OPTIONS.length,
      checked: termTypesChecked,
      maxShown: TERM_TYPE_OPTIONS.length,
      minShown: TERM_TYPE_OPTIONS.length,
      options: TERM_TYPE_OPTIONS,
      setCategoryChecked: (clickedOption) =>
        setCheckboxValues(clickedOption, termTypesChecked, setTermTypesChecked),
    },
    {
      name: 'years',
      formattedName: 'Year of Study',
      currentShown: yearsShown,
      checked: yearsChecked,
      maxShown: MAX_YEARS_SHOWN,
      minShown: MIN_YEARS_SHOWN,
      options: YEAR_OPTIONS,
      setCategoryChecked: (clickedOption) =>
        setCheckboxValues(clickedOption, yearsChecked, setYearsChecked),
      setCategoryShown: () =>
        setCheckboxesShown(
          yearsShown,
          setYearsShown,
          MAX_YEARS_SHOWN,
          MIN_YEARS_SHOWN,
        ),
    },
  ];

  return (
    <PortalTemplate
      portalName="Applications Portal"
      tabs={tabs}
      tableColumns={tableColumns.slice(0, -2)}
      filterCategories={filterCategories}
      filterRows={filterRows}
    />
  );
};
export default ApplicationPage;
