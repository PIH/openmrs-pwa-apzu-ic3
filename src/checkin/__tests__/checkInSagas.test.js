import SagaTester from 'redux-saga-tester';
import { visitRest } from '@openmrs/react-components';
import checkInSagas from '../checkInSagas';
import checkInActions from '../checkInActions';


jest.mock('@openmrs/react-components');

describe('check-in sagas', () => {

  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(checkInSagas);
    visitRest.createVisit = jest.fn(visitRest.createVisit);  // wrap the mocked create visit
  });

  it('check-in should call create visit and return success action when elements passed as objects', () => {

    const patient = {
      uuid: "patient_uuid"
    };

    const visitType = {
      uuid: "visit_type_uuid"
    };

    const encounterType = {
      uuid: "encounter_type_uuid"
    };
    const obs = {
      concept: 'some_uuid',
      value: 'some_value'
    };

    const location = {
      uuid: "location_uuid"
    };

    const formSubmittedActionCreator = jest.fn();

    sagaTester.dispatch(checkInActions.checkInSubmitted(patient, visitType, encounterType, obs, location, formSubmittedActionCreator));
    expect(sagaTester.getCalledActions()).toContainEqual(checkInActions.checkInSucceeded());
    expect(visitRest.createVisit).toHaveBeenCalledTimes(1);  // would be great to test what is actually called here
    expect(formSubmittedActionCreator).toHaveBeenCalledTimes(1);
    expect(sagaTester.getCalledActions()).not.toContainEqual(checkInActions.checkInFailed("Unable to Submit"));
  });

  it('check-in should call create visit and return success action when elements passed as uuids', () => {

    const patient = "patient_uuid";

    const visitType = "visit_type_uuid";

    const encounterType = "encounter_type_uuid";
    const obs = "obs_uuid";

    const location = "location_uuid";

    const formSubmittedActionCreator = jest.fn();

    sagaTester.dispatch(checkInActions.checkInSubmitted(patient, visitType, encounterType, obs, location, formSubmittedActionCreator));
    expect(sagaTester.getCalledActions()).toContainEqual(checkInActions.checkInSucceeded());
    expect(visitRest.createVisit).toHaveBeenCalledTimes(1);  // would be great to test what is actually called here
    expect(formSubmittedActionCreator).toHaveBeenCalledTimes(1)
    expect(sagaTester.getCalledActions()).not.toContainEqual(checkInActions.checkInFailed("Unable to Submit"));
  });

  it('check-in should fail if invalid data passed in', () => {

    sagaTester.dispatch(checkInActions.checkInSubmitted());
    expect(sagaTester.getCalledActions()).toContainEqual(checkInActions.checkInFailed("Cannot read property 'uuid' of undefined"));
    expect(sagaTester.getCalledActions()).not.toContainEqual(checkInActions.checkInSucceeded());
    expect(visitRest.createVisit).not.toHaveBeenCalled();
  });


});
