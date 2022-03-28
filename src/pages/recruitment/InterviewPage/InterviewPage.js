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
} from '../components/Constants';
import { setCheckboxValues, setCheckboxesShown } from '../utils';

import useInterviews from '../../../hooks/interviews';
import usePostings from '../../../hooks/postings';
import useApplications from '../../../hooks/applications';

const InterviewPage = () => {
  const { interviews } = useInterviews('FALL-2022');
  const { applications } = useApplications('FALL-2022');
  const { postings } = usePostings();

  const tableRows = interviews.map((interview) => {
    const application = getItemById(applications, interview.application_id);
    let study = 'study';
    if (application) {
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
          `/recruitment/interviews/${interview.application_id}`,
        ];
        return createData(tableColumns, appValues);
      }
    }
    return createData(tableColumns, []);
  });

  const [subteamsChecked, setSubteamsChecked] = useState(
    makeTruthTable(SUBTEAM_OPTIONS, false),
  );

  const [termTypesChecked, setTermTypesChecked] = useState(
    makeTruthTable(TERM_TYPE_OPTIONS, true),
  );
  const [yearsChecked, setYearsChecked] = useState(
    makeTruthTable(YEAR_OPTIONS, true),
  );

  const filterRows = (status) =>
    tableRows.filter(
      (row) =>
        row.status === status &&
        subteamsChecked[row.subteam] &&
        termTypesChecked[row.term] &&
        yearsChecked[row['year of study']],
    );

  const MAX_SUBTEAMS_SHOWN = subteamsChecked.length;
  const MAX_YEARS_SHOWN = yearsChecked.length;

  const [subteamsShown, setSubteamsShown] = useState(MIN_SUBTEAMS_SHOWN);
  const [yearsShown, setYearsShown] = useState(MIN_YEARS_SHOWN);

  const filterCategories = [
    {
      name: 'subteams',
      formattedName: 'Subteams',
      currentShown: subteamsShown,
      checked: subteamsChecked,
      maxShown: MAX_SUBTEAMS_SHOWN,
      minShown: MIN_SUBTEAMS_SHOWN,
      options: SUBTEAM_OPTIONS,
      setCategoryChecked: (clickedOption) =>
        setCheckboxValues(clickedOption, subteamsChecked, setSubteamsChecked),
      setCategoryShown: () =>
        setCheckboxesShown(
          subteamsShown,
          setSubteamsShown,
          MAX_SUBTEAMS_SHOWN,
          MIN_SUBTEAMS_SHOWN,
        ),
    },
    {
      name: 'termTypes',
      formattedName: 'Term',
      currentShown: termTypesChecked.length,
      checked: termTypesChecked,
      maxShown: termTypesChecked.length,
      minShown: termTypesChecked.length,
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
      portalName="Interview Portal"
      tabs={tabs}
      tableColumns={tableColumns.slice(0, -2)}
      filterCategories={filterCategories}
      filterRows={filterRows}
    />
  );
};

export default InterviewPage;
