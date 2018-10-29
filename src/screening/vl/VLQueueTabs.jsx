import React from 'react';
import { Label, Tabs, Tab } from 'react-bootstrap';
import VLQueue from './VLQueue';
import VLQueueComplete from './VLQueueComplete';
import VLQueueExpected from './VLQueueExpected';
import '../../assets/css/tabs.css';

class VLQueueTabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expected: 0,
      inProgress: 0,
      completed: 0
    };

    this.handleExpectedCount = this.handleExpectedCount.bind(this);
    this.handleInProgressCount = this.handleInProgressCount.bind(this);
    this.handleCompletedCount = this.handleCompletedCount.bind(this);
  }

  handleExpectedCount(count) {
    this.setState(() => ({
      expected: count
    }));
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
        <h3><Label>Viral Load Queue</Label></h3>

        <Tabs defaultActiveKey="1" id="vl-tabs" className="activeTab">
          <Tab eventKey="1" title={ "expected(" + this.state.expected + ")" } >
            <VLQueueExpected onRowCount={ this.handleExpectedCount }/>
          </Tab>
          <Tab eventKey="2" title={ "in-progress(" + this.state.inProgress + ")" }>
            <VLQueue onRowCount={ this.handleInProgressCount }/>
          </Tab>

          <Tab eventKey="3" title={ "completed(" + this.state.completed + ")" }>
            <VLQueueComplete onRowCount={ this.handleCompletedCount}/>
          </Tab>

        </Tabs>
      </div>
    );
  }

}

export default VLQueueTabs;
