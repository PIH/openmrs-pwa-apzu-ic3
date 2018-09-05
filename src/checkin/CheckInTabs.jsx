import React from 'react';
import { Label, Tabs, Tab } from 'react-bootstrap';
import CheckInQueue from './CheckInQueue';
import ActiveVisits from '../visit/ActiveVisits';
import CompletedVisits from '../visit/CompletedVisits';
import '../assets/css/tabs.css';

class CheckInTabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expected: 0,
      inProgress: 0,
      completed: 0
    };
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
        <h3><Label>Check-In List</Label></h3>

        <Tabs defaultActiveKey="1" id="checkin-tabs" className="activeTab">
          <Tab eventKey="1" title={ "expected(" + this.state.expected + ")" }>
            <CheckInQueue onRowCount={ this.handleExpectedCount.bind(this) }/>
          </Tab>

          <Tab eventKey="2" title={ "in-progress(" + this.state.inProgress + ")" }>
            <ActiveVisits onRowCount={ this.handleInProgressCount.bind(this) }/>
          </Tab>

          <Tab eventKey="3" title={ "completed(" + this.state.completed + ")" }>
            <CompletedVisits onRowCount={ this.handleCompletedCount.bind(this) }/>
          </Tab>

        </Tabs>
      </div>
    );
  }

}

export default CheckInTabs;
