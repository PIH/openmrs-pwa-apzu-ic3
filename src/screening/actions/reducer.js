import TABS_TYPES from "./types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case TABS_TYPES.SAVE:
      var key = action.name;
      var tabObj = {};
      tabObj[key] = action.key;
      return Object.assign({}, state, tabObj);

    default:
      return state;
  }
};
