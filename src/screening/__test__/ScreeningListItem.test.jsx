import React from 'react';
import { mount } from 'enzyme';
import {ListGroupItem} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScreeningListItem from '../ScreeningListItem';
import bloodPressureFilters from '../bloodPressure/bloodPressureFilters';
import { ENCOUNTER_TYPES} from "../../constants";

let props;
let mountedComponent;

const screening = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <ScreeningListItem {...props} />
    );
  }
  return mountedComponent;
};

describe('Component: Screening List Item', () => {

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('renders properly', () => {

    props = {
      title: "Blood Pressure",
      patient: {
        uuid: 'abcd',
        age: 20
      },
      requiredFilters: bloodPressureFilters.required,
      completedFilters: bloodPressureFilters.completed
    };

    expect(screening().find(ListGroupItem).length).toBe(1);
    expect(screening().find(ListGroupItem).text()).toContain("Blood Pressure");
  });

  it('renders checkmark when screening completed', () => {

    props = {
      title: "Blood Pressure",
      patient: {
        uuid: 'abcd',
        age: 20,
        visit: {
          encounters: [
            {
              encounterType: {
                uuid: ENCOUNTER_TYPES.CheckInEncounterType.uuid
              }
            },
            {
              encounterType: {
                uuid: ENCOUNTER_TYPES.BloodPressureEncounterType.uuid
              }
            }
          ]
        }
      },
      requiredFilters: bloodPressureFilters.required,
      completedFilters: bloodPressureFilters.completed
    };

    expect(screening().find(ListGroupItem).length).toBe(1);
    expect(screening().find(ListGroupItem).text()).toContain("Blood Pressure");
    expect(screening().find(FontAwesomeIcon).length).toBe(1);
    expect(screening().find(FontAwesomeIcon).props().icon).toBe("check");

  });

  it('renders arrow when screening required', () => {

    props = {
      title: "Blood Pressure",
      patient: {
        uuid: 'abcd',
        age: 20,
        visit: {
          encounters: [
            {
              encounterType: {
                uuid: ENCOUNTER_TYPES.CheckInEncounterType.uuid
              }
            }
          ]
        }
      },
      requiredFilters: bloodPressureFilters.required,
      completedFilters: bloodPressureFilters.completed
    };

    expect(screening().find(ListGroupItem).length).toBe(1);
    expect(screening().find(ListGroupItem).text()).toContain("Blood Pressure");
    expect(screening().find(FontAwesomeIcon).length).toBe(1);
    expect(screening().find(FontAwesomeIcon).props().icon).toBe("arrow-right");

  });

  it('renders no icon when screening not required and not completed', () => {

    // note that this patient is a child
    props = {
      title: "Blood Pressure",
      patient: {
        uuid: 'abcd',
        age: 10,
        visit: {
          encounters: [
            {
              encounterType: {
                uuid: ENCOUNTER_TYPES.CheckInEncounterType.uuid
              }
            }
          ]
        }
      },
      requiredFilters: bloodPressureFilters.required,
      completedFilters: bloodPressureFilters.completed
    };

    expect(screening().find(ListGroupItem).length).toBe(1);
    expect(screening().find(ListGroupItem).text()).toContain("Blood Pressure");
    expect(screening().find(FontAwesomeIcon).length).toBe(0);

  });


});
