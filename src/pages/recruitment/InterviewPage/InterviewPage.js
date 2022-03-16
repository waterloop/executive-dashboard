import React from 'react';
import PortalTemplate from '../components/PortalTemplate';
import { rows } from './Constants';

const tabs = ['pending', 'accept', 'rejected', 'undecided'];
const tableColumns = ['name', 'year', 'term', 'subteam', 'position'];

const InterviewPage = () => (
  <PortalTemplate
    portalName='Interview Portal'
    tabs={tabs}
    tableColumns={tableColumns}
    rows = {rows}
  />
);

export default InterviewPage;
