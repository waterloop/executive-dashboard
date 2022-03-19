import React from 'react';
import PortalTemplate from '../components/PortalTemplate';
import { rows, tabs, tableColumns } from './Constants'

const InterviewPage = () => (
  <PortalTemplate
    portalName='Interview Portal'
    tabs={tabs}
    tableColumns={tableColumns}
    rows = {rows}
  />
);

export default InterviewPage;
