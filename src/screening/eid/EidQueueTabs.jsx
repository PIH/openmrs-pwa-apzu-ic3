import React from 'react';
import { Label, Tabs, Tab } from 'react-bootstrap';
import EidQueue from './EidQueue';
import EidQueueComplete from './EidQueueComplete';

class EidQueueTabs extends React.Component {


  render() {
    return (
      <div>
        <h3><Label>EID List</Label></h3>

        <Tabs defaultActiveKey="1" id="vl-tabs">
          <Tab eventKey="1" title="Waiting">
            <EidQueue />
          </Tab>

          <Tab eventKey="2" title="Completed">
            <EidQueueComplete />
          </Tab>

        </Tabs>
      </div>
    );
  }

}

export default EidQueueTabs;
