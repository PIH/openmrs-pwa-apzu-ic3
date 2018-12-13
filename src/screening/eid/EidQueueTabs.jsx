import React from 'react';
import { Label, Tabs, Tab } from 'react-bootstrap';
import EidQueue from './EidQueue';
import EidQueueComplete from './EidQueueComplete';

class EidQueueTabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h3><Label>EID Queue</Label></h3>

        <Tabs defaultActiveKey="1" id="vl-tabs">
          <Tab eventKey="1" title={"in-progress"}>
            <EidQueue />
          </Tab>

          <Tab eventKey="2" title={"completed"}>
            <EidQueueComplete />
          </Tab>

        </Tabs>
      </div>
    );
  }

}

export default EidQueueTabs;
