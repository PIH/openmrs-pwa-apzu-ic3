import React from 'react';
import { Label, Tabs, Tab } from 'react-bootstrap';
import VLQueue from './VLQueue';
import VLQueueComplete from './VLQueueComplete';

class VLQueueTabs extends React.Component {


  render() {
    return (
      <div>
        <h3><Label>Viral Load Queue</Label></h3>

        <Tabs defaultActiveKey="1" id="vl-tabs">
          <Tab eventKey="1" title="Waiting">
            <VLQueue />
          </Tab>

          <Tab eventKey="2" title="Completed">
            <VLQueueComplete />
          </Tab>

        </Tabs>
      </div>
    );
  }

}

export default VLQueueTabs;
