import React from 'react';
import PortalTemplate from '../components/PortalTemplate';
import { rows, tabs, tableColumns } from './Constants';

// import useApplications from '../../../hooks/applications';
// import { createData } from '../../../utils';

const ApplicationPage = () => (
  /*   const { applications } = useApplications('FALL-2022');

  const tableRows = applications.map((application) => {
    let study = 'study';
    if (!application.in_school) {
      study = 'coop';
    }
    return createData(
      `${application.first_name} ${application.last_name}`,
      application.current_year,
      study,
      'web',
      'frontend',
      application.status.slice(4),
    );
  });
  console.log(tableRows);
  console.log(applications); */

  <PortalTemplate
    portalName="Applications Portal"
    tabs={tabs}
    tableColumns={tableColumns}
    rows={rows}
  />
);
export default ApplicationPage;
