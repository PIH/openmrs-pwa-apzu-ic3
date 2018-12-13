import React from 'react';
import { connect } from "react-redux";
import { Label, Tabs, Tab } from 'react-bootstrap';
import CheckInQueue from './CheckInQueue';
import ActiveVisits from '../visit/ActiveVisits';
import CompletedVisits from '../visit/CompletedVisits';
import { default as tabsActions } from '../screening/actions/actions';
import * as R from 'ramda';
import '../assets/css/tabs.css';

const TAB_NAME = 'checkin-tabs';

class CheckInTabs extends React.Component {

  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: this.props.tabIndex ? this.props.tabIndex : 1,
    };
  }

  componentWillUnmount() {
    this.props.dispatch(tabsActions.save(TAB_NAME, this.state.key));
  }

  handleSelect(key) {
    this.setState({
      key: key
    });
  }

  render() {
    return (
      <div>
        <h3><Label>Check-In List</Label></h3>
        <h3><Label>{''}</Label></h3>
        <Tabs
          className="activeTab" 
          defaultActiveKey={this.state.key}
          id={TAB_NAME}
          onSelect={this.handleSelect}
        >
          <Tab eventKey={1} title={"expected"}>
            <CheckInQueue />
          </Tab>

          <Tab eventKey={2} title={"in-progress"}>
            <ActiveVisits />
          </Tab>

          <Tab eventKey={3} title={"completed"}>
            <CompletedVisits />
          </Tab>

        </Tabs>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    tabIndex: R.path(['gridtabs', TAB_NAME], state)
  };
};

export default connect(mapStateToProps)(CheckInTabs);
