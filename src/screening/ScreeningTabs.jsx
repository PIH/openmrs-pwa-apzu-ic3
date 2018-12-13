import React from 'react';
import { Label, Tabs, Tab } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import '../assets/css/tabs.css';
import ScreeningQueue from './ScreeningQueue';
import * as R from "ramda";
import {default as tabsActions} from "./actions/actions";

class ScreeningTabs extends React.Component {

  constructor(props) {
    super(props);

    let storeKey = null;
    if (this.props.gridtabs ) {
      storeKey = this.props.gridtabs[this.props.tabsId];
    }
    this.state = {
      key: storeKey ? storeKey : 1,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch(tabsActions.save(this.props.tabsId, this.state.key));
  }

  handleSelect(key) {
    this.setState({
      key: key
    });
  }

  render() {
    return (
      <div>
        <h3><Label>{ this.props.title }</Label></h3>
        <Tabs
          defaultActiveKey={ this.state.key }
          id={ this.props.tabsId }
          onSelect={ this.handleSelect }
          className="activeTab">
          <Tab eventKey={ 1 } title={ "in-progress" }>
            <ScreeningQueue
              dispatch={ this.props.dispatch }
              filters={[this.props.filters.required, (patient) => !this.props.filters.completed(patient)]}
              rowData={ Object.values(this.props.rowData) }
              rowSelectedActionCreators={ this.props.rowSelectedActionCreators }
              title=""
            />
          </Tab>
          <Tab eventKey={ 2 } title={ "completed" }>
            <ScreeningQueue
              dispatch={ this.props.dispatch }
              filters={[this.props.filters.completed]}
              rowData={ Object.values(this.props.rowData) }
              rowSelectedActionCreators={ this.props.rowSelectedActionCreators }
              title=""
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

ScreeningTabs.propTypes = {
  tabsId: PropTypes.string.isRequired
};

ScreeningTabs.defaultProps = {
  tabsId: "screening-tabs"
};

const mapStateToProps = (state) => {
  return {
    gridtabs: R.path(['gridtabs'], state)
  };
};

export default connect(mapStateToProps)(ScreeningTabs);
