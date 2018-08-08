import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import CheckInQueue from './CheckInQueue';
import ActiveVisits from '../visit/ActiveVisits';
import CompletedVisits from '../visit/CompletedVisits';

class CheckInTabs extends React.Component {

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {

    const { value } = this.state;

    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="title">
              Check In Queue
            </Typography>

            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Expected" />
              <Tab label="Waiting" />
              <Tab label="Completed"/>
            </Tabs>

            {value === 0 && <CheckInQueue />}
            {value === 1 && <ActiveVisits />}
            {value === 2 && <CompletedVisits />}

          </CardContent>
        </Card>
      </div>
    );
  }

}

export default CheckInTabs;
