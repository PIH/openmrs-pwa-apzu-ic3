import React from 'react';
import { ListGroupItem, ListGroup } from 'react-bootstrap';

import ScreeningListItem from './ScreeningListItem';
import bloodPressureFilters from './bloodPressure/bloodPressureFilters';
import nutritionFilters from './nutrition/nutritionFilters';

let ScreeningList = props => {

  return (
    <div>
      <ListGroup>
        <ListGroupItem>
          <ScreeningListItem
            completedFilters={nutritionFilters.completed}
            title="Nutrition Screening"
            patient={props.patient}
            requiredFilters={nutritionFilters.required}
          />
        </ListGroupItem>
        <ListGroupItem>
          <ScreeningListItem
            completedFilters={bloodPressureFilters.completed}
            title="BP Screening"
            patient={props.patient}
            requiredFilters={bloodPressureFilters.required}
          />
        </ListGroupItem>
      </ListGroup>
    </div>
  );

};

export default ScreeningList;
