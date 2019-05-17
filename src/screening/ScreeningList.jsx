import React from 'react';
import { TaskList, selectors } from '@openmrs/react-components';
import { connect } from "react-redux";

import bloodPressureFilters from './bloodPressure/bloodPressureFilters';
import nutritionFilters from './nutrition/nutritionFilters';
import htcFilters from './htc/htcFilters';
import vlFilters from './vl/vlFilters';
import eidFilters from './eid/eidFilters';
import adherenceFilters from './adherence/adherenceFilters';
import checkInFilters from "../checkin/checkInFilters";
import clinicianFilters from "./clinician/clinicianFilters";
import tbFilters from "./tb/tbFilters";
import tbTestFilters from './tbTest/tbTestFilters';

export class ScreeningList extends React.Component {
  render() {
    const CHECK_IN_SCREENING = [
      {
        title: "Check-In",
        completed: checkInFilters.completed,
        link: '/checkin/checkInPage',
      },
      {
        title: "Clinician",
        completed: clinicianFilters.completed,
        link: '/screening/clinician/form',
      }
    ];

    const SPECIAL_SCREENINGS = [
      {
        title: "Viral Load",
        completed: vlFilters.completed,
        link: '/screening/vl/form',
        required: vlFilters.required,
      },
      {
        title: "Adherence",
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
      {
        title: "TB Test",
        completed: tbTestFilters.completed,
        link: '/screening/tb-test/form',
        required: tbTestFilters.required,
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
        required: nutritionFilters.required,
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
      },
      {
        title: "TB Screening",
        link: '/screening/tb/form',
        required: tbFilters.required,
        completed: tbFilters.completed,
      },/*
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
    ];


    const SCREENINGS = [
      {
        key: 1,
        title: "IC3 Screening",
        tasks: CHECK_IN_SCREENING
      },
      {
        key: 2,
        title: "Special",
        tasks: SPECIAL_SCREENINGS
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
          ...(SPECIAL_SCREENINGS.map((screening) => {
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
        patient={this.props.patient}
        taskGroups={SCREENINGS}
      />
    );
  }

};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
  };
};

export default connect(mapStateToProps)(ScreeningList);
