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

  const CHECK_IN_SCREENING = [
    {
      title: "Check-In",
      completed: checkInFilters.completed,
      link: '/checkin/checkInPage',
    }
  ];

  const TARGETED_SCREENINGS = [
    {
      title: "Viral Load",
      completed: vlFilters.completed,
      link: '/screening/vl/form',
      required: vlFilters.required,
    },
    {
      title: "Adherence Counseling",
      completed: adherenceFilters.completed,
      link: '/screening/adherence/form',
      required: adherenceFilters.required,
    },
    {
      title: "EID",
      completed: eidFilters.completed,
      link: '/screening/eid/form',
      required: eidFilters.required,
    },
    /*    {
          title: "A1C",
          completed: vlFilters.completed,
          link: '/screening/vl/form',
          required: vlFilters.required,
        },*/
    /* {
       title: "Creatinine",
       completed: htcFilters.completed,
       link: '/screening/htc/form',
       required: htcFilters.required,
     },*/
    /*  {
        title: "Cervical Cancer",
        completed: vlFilters.completed,
        link: '/screening/vl/form',
        required: vlFilters.required,
      }*/
  ];

  const ROUTINE_SCREENINGS = [
    {
      title: "Nutrition",
      completed: nutritionFilters.completed,
      link: '/screening/nutrition/form',
    },
    {
      title: "Blood Pressure",
      completed: bloodPressureFilters.completed,
      link: '/screening/bloodPressure/form',
      required: bloodPressureFilters.required,
    }, /*
        {
          title: "Glucose Check",
          completed: htcFilters.completed,
          link: '/screening/htc/form',
          required: htcFilters.required,
        },*/
    {
      title: "HTC",
      completed: htcFilters.completed,
      link: '/screening/htc/form',
      required: htcFilters.required,
    }/*,
        {
          title: "TB",
          completed: htcFilters.completed,
          link: '/screening/htc/form',
          required: htcFilters.required,
        },
        {
          title: "Family Planning",
          completed: htcFilters.completed,
          link: '/screening/htc/form',
          required: htcFilters.required,
        }*/
  ]


  const SCREENINGS = [
    {
      key: 1,
      title: <h3>IC3 Screening</h3>,
      tasks: CHECK_IN_SCREENING
    },
    {
      key: 2,
      title: "Targeted",
      tasks: TARGETED_SCREENINGS
    },
    {
      key: 3,
      title: "Routine",
      tasks: ROUTINE_SCREENINGS
    },
    {
      key: 4,
      title: "Optional",
      // the list of tasks is the targeted + routine combined but with their "required" function inversed
      // (... ie all those that are not required)
      tasks: [
        ...(TARGETED_SCREENINGS.map((screening) => {
          return {
            ...screening,
            required: (patient) => screening.required ? !screening.required(patient) : false
          };
        })),
        ...(ROUTINE_SCREENINGS.map((screening) => {
          return {
            ...screening,
            required: (patient) => screening.required ? !screening.required(patient) : false
          };
        })),
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
