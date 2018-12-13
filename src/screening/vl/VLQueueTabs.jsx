import React from 'react';
import { Label, Tabs, Tab } from 'react-bootstrap';
import VLQueue from './VLQueue';
import VLQueueComplete from './VLQueueComplete';
import VLQueueExpected from './VLQueueExpected';
import '../../assets/css/tabs.css';

const VLQueueTabs = () => (
  <div>
    <h3><Label>Viral Load Queue</Label></h3>

    <Tabs className="activeTab" defaultActiveKey="1" id="vl-tabs">
      <Tab eventKey="1" title={"expected"} >
        <VLQueueExpected />
      </Tab>
      <Tab eventKey="2" title={"in-progress"}>
        <VLQueue />
      </Tab>

      <Tab eventKey="3" title={"completed"}>
        <VLQueueComplete />
      </Tab>

    </Tabs>
  </div>
);

export default VLQueueTabs;
