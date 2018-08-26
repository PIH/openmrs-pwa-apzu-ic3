import React from 'react';
import { ListGroupItem, ListGroup } from 'react-bootstrap';

import bloodPressureFilters from './bloodPressure/bloodPressureFilters';
import nutritionFilters from './nutrition/nutritionFilters';
import htcFilters from './htc/htcFilters';
import vlFilters from './vl/vlFilters';
import checkInFilters from "../checkin/checkInFilters";
import ScreeningListItem from './ScreeningListItem';


// TODO should this be named something more generic than "Screening" as we will resuse?
let ScreeningList = props => {

  // this should likely be exported to the constnat.js or some other config, but I was having a problem with this
  const SCREENINGS = [
    {
      key: 1,
      title: <h3>IC3 Screening</h3>,
      screenings: [
        {
          title: "Check-In",
          completedFilters: checkInFilters.completed,
          requiredFilters: checkInFilters.required
        }
      ]
    },
    {
      key: 2,
      title: "Targeted Screenings",
      screenings: [
        {
          title: "Viral Load",
          completedFilters: vlFilters.completed,
          entryLink: '/screening/vl/form',
          requiredFilters: vlFilters.required,
        }
      ]
    },
    {
      key: 3,
      title: "Routine Screenings",
      screenings: [
        {
          title: "Nutrition Screening",
          completedFilters: nutritionFilters.completed,
          entryLink: '/screening/nutrition/form',
          requiredFilters: nutritionFilters.required,
        },
        {
          title: "BP Screening",
          completedFilters: bloodPressureFilters.completed,
          entryLink: '/screening/bloodPressure/form',
          requiredFilters: bloodPressureFilters.required,
        },
        {
          title: "HTC Screening",
          completedFilters: htcFilters.completed,
          entryLink: '/screening/htc/form',
          requiredFilters: htcFilters.required,
        }
      ]

    }
  ];


  return (
    <div>
      <ListGroup>
        {SCREENINGS.map(screeningGroup => (
          <ListGroupItem key={screeningGroup.key} header={screeningGroup.title}>
            {screeningGroup.screenings.map(screening => (
              <ScreeningListItem
                completedFilters={screening.completedFilters}
                entryLink={screening.entryLink}
                key={screening.title}
                patient={props.patient}
                requiredFilters={screening.requiredFilters}
                summaryLink={screening.summmaryLink}
                title={screening.title}
              />
            ))}
          </ListGroupItem>
        ))};
      </ListGroup>
    </div>
  );

};

export default ScreeningList;
