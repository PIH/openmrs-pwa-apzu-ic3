import React from 'react';
import { Label, Tabs, Tab } from 'react-bootstrap';
import CheckInQueue from './CheckInQueue';
import ActiveVisits from '../visit/ActiveVisits';
import CompletedVisits from '../visit/CompletedVisits';
import '../assets/css/tabs.css';

class CheckInTabs extends React.Component {


  handleSelect(eventKey) {
    console.log("selected = " + eventKey);
  }

  render() {
    return (
      <div>
        <h3><Label>Check-In List</Label></h3>

        <Tabs defaultActiveKey="1" id="checkin-tabs" className="activeTab">
          <Tab eventKey="1" title="expected">
            <CheckInQueue />
          </Tab>

          <Tab eventKey="2" title="in-progress">
            <ActiveVisits />
          </Tab>

          <Tab eventKey="3" title="completed">
            <CompletedVisits />
          </Tab>

        </Tabs>
      </div>
    );
  }

}

export default CheckInTabs;
