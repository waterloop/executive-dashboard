import React from 'react';
import PortalTemplate from '../components/PortalTemplate';

const tabs = ['pending', 'interview', 'rejected', 'undecided'];
const tableColumns = ['name', 'year', 'term', 'subteam', 'position'];

const ApplicationPage = () => (
  <PortalTemplate
    portalName="Applications"
    tabs={tabs}
    tableColumns={tableColumns}
  />
);

export default ApplicationPage;
