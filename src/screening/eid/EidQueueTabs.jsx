import React from 'react';
import { Label, Tabs, Tab } from 'react-bootstrap';
import EidQueue from './EidQueue';
import EidQueueComplete from './EidQueueComplete';

class EidQueueTabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expected: 0,
      inProgress: 0,
      completed: 0
    };
  }

  handleInProgressCount(count) {
    this.setState(() => ({
      inProgress: count
    }));
  }

  handleCompletedCount(count) {
    this.setState(() => ({
      completed: count
    }));
  }

  render() {
    return (
      <div>
        <h3><Label>EID List</Label></h3>

        <Tabs defaultActiveKey="1" id="vl-tabs">
          <Tab eventKey="1" title={ "in-progress(" + this.state.inProgress + ")" }>
            <EidQueue onRowCount={ this.handleInProgressCount.bind(this) }/>
          </Tab>

          <Tab eventKey="2" title={ "completed(" + this.state.completed + ")" }>
            <EidQueueComplete onRowCount={ this.handleCompletedCount.bind(this) }/>
          </Tab>

        </Tabs>
      </div>
    );
  }

}

export default EidQueueTabs;
