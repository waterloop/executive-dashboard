import React from 'react';
import PortalTemplate from '../components/PortalTemplate';
import { rows } from './Constants';

const tabs = ['pending', 'interview', 'rejected', 'undecided'];
const tableColumns = ['name', 'year', 'term', 'subteam', 'position'];

const ApplicationPage = () => (
  <PortalTemplate
    portalName='Application Portal'
    tabs={tabs}
    tableColumns={tableColumns}
    rows = {rows}
  />
);

export default ApplicationPage;
