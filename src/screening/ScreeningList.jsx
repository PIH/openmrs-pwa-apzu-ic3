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
    const CORE_SCREENING = [
      {
        title: "Check-In",
        required: (patient) => !checkInFilters.completed(patient),
        completed: checkInFilters.completed,
        link: '/checkin/checkInPage',
      },
      {
        title: "Clinician",
        required: (patient) => !clinicianFilters.completed(patient),
        completed: clinicianFilters.completed,
        link: '/screening/clinician/form',
      }
    ];

    const SPECIAL_SCREENINGS = [
      {
        title: "Viral Load",
        completed: (patient) => vlFilters.completed(patient) && !vlFilters.required(patient),
        link: '/screening/vl/form',
        required: vlFilters.required,
      },
      {
        title: "Adherence",
        completed: (patient) => adherenceFilters.completed(patient) && !adherenceFilters.required(patient),
        link: '/screening/adherence/form',
        required: adherenceFilters.required,
      },
      {
        title: "EID",
        completed: (patient) => eidFilters.completed(patient) && !eidFilters.required(patient),
        link: '/screening/eid/form',
        required: eidFilters.required,
      },
      {
        title: "TB Test",
        completed: (patient) => tbTestFilters.completed(patient) && !tbTestFilters.required(patient),
        link: '/screening/tb-test/form',
        required: tbTestFilters.required
      }
    ];

    const ROUTINE_SCREENINGS = [
      {
        title: "Nutrition",
        completed: (patient) => nutritionFilters.completed(patient) && !nutritionFilters.required(patient),
        link: '/screening/nutrition/form',
        required: nutritionFilters.required,
      },
      {
        title: "Blood Pressure",
        completed: (patient) => bloodPressureFilters.completed(patient) && !bloodPressureFilters.required(patient),
        link: '/screening/bloodPressure/form',
        required: bloodPressureFilters.required,
      },
      {
        title: "HTC",
        completed: (patient) => htcFilters.completed(patient) && !htcFilters.required(patient),
        link: '/screening/htc/form',
        required: htcFilters.required,
      },
      {
        title: "TB Screening",
        completed: (patient) => tbFilters.completed(patient) && !tbFilters.required(patient),
        link: '/screening/tb/form',
        required: tbFilters.required,
      },
    ];


    const SCREENINGS = [
      {
        key: 1,
        title: "IC3 Screening",
        tasks: CORE_SCREENING
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
        title: "Completed",
        tasks: [...CORE_SCREENING, ...SPECIAL_SCREENINGS, ...ROUTINE_SCREENINGS].map((screening) => {
          return {
            ...screening,
            required: screening.completed
          };
        })
      },
      {
        key: 5,
        title: "Optional",
        // the list of tasks is the targeted + routine combined but with their "required" and "completed" functions inversed
        // (... ie all those that are not required but not completed)
        tasks: [...SPECIAL_SCREENINGS, ...ROUTINE_SCREENINGS].map((screening) => {
          return {
            ...screening,
            required: (patient) => !screening.required(patient) && !screening.completed(patient)
          };
        })
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
