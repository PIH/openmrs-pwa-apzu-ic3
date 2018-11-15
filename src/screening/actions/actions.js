import TABS_TYPES from "./types";

const save = (name, key) => ( {
  type: TABS_TYPES.SAVE,
  name: name,
  key: key
});

export default { save };
