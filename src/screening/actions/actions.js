import TABS_TYPES, { SET_LAST_SCREENING_QUEUE } from "./types";

const save = (name, key) => ( {
  type: TABS_TYPES.SAVE,
  name: name,
  key: key
});

const setLastScreeningQueue = (url) => ( {
  type: SET_LAST_SCREENING_QUEUE,
  url
});

export default { save, setLastScreeningQueue };
