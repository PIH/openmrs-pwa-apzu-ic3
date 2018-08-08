import React from 'react';
import { Label, Tabs, Tab } from 'react-bootstrap';
import CheckInQueue from './CheckInQueue';
import ActiveVisits from '../visit/ActiveVisits';
import CompletedVisits from '../visit/CompletedVisits';

class CheckInTabs extends React.Component {


  handleSelect(eventKey) {
    console.log("selected = " + eventKey);
  }

  render() {
    return (
      <div>
        <h3><Label>Check In Queue</Label></h3>

        <Tabs defaultActiveKey="1" id="checkin-tabs">
          <Tab eventKey="1" title="Expected">
            <CheckInQueue />
          </Tab>

          <Tab eventKey="2" title="Waiting">
            <ActiveVisits />
          </Tab>

          <Tab eventKey="3" title="Completed">
            <CompletedVisits />
          </Tab>

        </Tabs>
      </div>
    );
  }

}

export default CheckInTabs;
