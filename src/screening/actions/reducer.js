import TABS_TYPES, { SET_LAST_SCREENING_QUEUE } from "./types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case TABS_TYPES.SAVE:
      var key = action.name;
      var tabObj = {};
      tabObj[key] = action.key;
      return Object.assign({}, state, tabObj);

    case SET_LAST_SCREENING_QUEUE:
      return {
        'LAST_SCREENING_QUEUE': action.url
      };

    default:
      return state;
  }
};
