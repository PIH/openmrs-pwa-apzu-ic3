import React from 'react';
import {TaskList} from '@openmrs/react-components';

import bloodPressureFilters from './bloodPressure/bloodPressureFilters';
import nutritionFilters from './nutrition/nutritionFilters';
import htcFilters from './htc/htcFilters';
import vlFilters from './vl/vlFilters';
import eidFilters from './eid/eidFilters';
import adherenceFilters from './adherence/adherenceFilters';
import checkInFilters from "../checkin/checkInFilters";

let ScreeningList = props => {

  const SCREENINGS = [
    {
      key: 1,
      title: <h3>IC3 Screening</h3>,
      tasks: [
        {
          title: "Check-In",
          completedFilters: checkInFilters.completed,
          link: '/checkin/checkInPage',
          requiredFilters: checkInFilters.required
        }
      ]
    },
    {
      key: 2,
      title: "Special",
      tasks: [
        {
          title: "Viral Load",
          completedFilters: vlFilters.completed,
          link: '/screening/vl/form',
          requiredFilters: vlFilters.required,
        },
        {
          title: "Adherence Counseling",
          completedFilters: adherenceFilters.completed,
          link: '/screening/adherence/form',
          requiredFilters: adherenceFilters.required,
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
      tasks: [
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
    <TaskList
      patient={props.patient}
      taskGroups={SCREENINGS}
    />
  );

};

export default ScreeningList;
