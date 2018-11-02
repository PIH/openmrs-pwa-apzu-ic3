import React from 'react';
import { Label, Tabs, Tab } from 'react-bootstrap';
import '../assets/css/tabs.css';
import ScreeningQueue from './ScreeningQueue';

class ScreeningTabs extends React.Component {

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
        <h3><Label>{ this.props.title }</Label></h3>
        <Tabs defaultActiveKey="1" id="screening-tabs" className="activeTab">
          <Tab eventKey="1" title={ "in-progress(" + this.state.inProgress + ")" }>
            <ScreeningQueue
              columnDefs={ this.props.columnDefs }
              dispatch={ this.props.dispatch }
              filters={[this.props.filters.required, (patient) => !this.props.filters.completed(patient)]}
              rowData={ Object.values(this.props.rowData) }
              rowSelectedActionCreators={ this.props.rowSelectedActionCreators }
              onRowCount={ this.handleInProgressCount }
              title=""
            />
          </Tab>
          <Tab eventKey="2" title={ "completed(" + this.state.completed + ")" }>
            <ScreeningQueue
              columnDefs={ this.props.columnDefs }
              dispatch={ this.props.dispatch }
              filters={[this.props.filters.completed]}
              rowData={ Object.values(this.props.rowData) }
              rowSelectedActionCreators={ this.props.rowSelectedActionCreators }
              onRowCount={ this.handleCompletedCount }
              title=""
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default ScreeningTabs;
