import CHECK_IN_TYPES from './checkInTypes';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_IN_TYPES.EXPECTED_TO_CHECK_IN:
      return Object.assign({}, state, {
        patients: action.results
      });

    case CHECK_IN_TYPES.CHECK_FOR_VISITS_FAILED:
      return {
        error: {
          message: "Failed to retrieve the appointment list"
        }
      };
    default:
      return state;
  }
};
