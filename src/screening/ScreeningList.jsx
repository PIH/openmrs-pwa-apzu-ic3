import React from 'react';
import { ListGroupItem, ListGroup } from 'react-bootstrap';

import bloodPressureFilters from './bloodPressure/bloodPressureFilters';
import nutritionFilters from './nutrition/nutritionFilters';
import htcFilters from './htc/htcFilters';
import vlFilters from './vl/vlFilters';
import eidFilters from './eid/eidFilters';
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
      title: "Special",
      screenings: [
        {
          title: "Viral Load",
          completedFilters: vlFilters.completed,
          link: '/screening/vl/form',
          requiredFilters: vlFilters.required,
        },
        {
          title: "Adherence Counseling",
          completedFilters: vlFilters.completed,
          link: '/screening/vl/form',
          requiredFilters: vlFilters.required,
        },
        {
          title: "EID",
          completedFilters: vlFilters.completed,
          link: '/screening/eid/form',
          requiredFilters: eidFilters.required,
        },
        {
          title: "A1C",
          completedFilters: vlFilters.completed,
          link: '/screening/vl/form',
          requiredFilters: vlFilters.required,
        },
        {
          title: "Creatinine",
          completedFilters: htcFilters.completed,
          link: '/screening/htc/form',
          requiredFilters: htcFilters.required,
        },
        {
          title: "Cervical Cancer",
          completedFilters: vlFilters.completed,
          link: '/screening/vl/form',
          requiredFilters: vlFilters.required,
        }
      ]
    },
    {
      key: 3,
      title: "Routine",
      screenings: [
        {
          title: "Nutrition",
          completedFilters: nutritionFilters.completed,
          link: '/screening/nutrition/form',
          requiredFilters: nutritionFilters.required,
        },
        {
          title: "Blood Pressure",
          completedFilters: bloodPressureFilters.completed,
          link: '/screening/bloodPressure/form',
          requiredFilters: bloodPressureFilters.required,
        },
        {
          title: "Glucose Check",
          completedFilters: htcFilters.completed,
          link: '/screening/htc/form',
          requiredFilters: htcFilters.required,
        },
        {
          title: "HTC",
          completedFilters: htcFilters.completed,
          link: '/screening/htc/form',
          requiredFilters: htcFilters.required,
        },
        {
          title: "TB",
          completedFilters: htcFilters.completed,
          link: '/screening/htc/form',
          requiredFilters: htcFilters.required,
        },
        {
          title: "Family Planning",
          completedFilters: htcFilters.completed,
          link: '/screening/htc/form',
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
                link={screening.link}
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
