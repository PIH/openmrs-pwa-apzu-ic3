import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES } from "../../constants";

// only patients due for EID test
/*

1. EID No DNA-PCR Test
- Alert = Due for EID DNA-PCR Test
- Action = Refer to HTC for DNA-PCR test

2. EID Due for 24 month rapid test
- Alert = Consider EID RT
- Action = If baby stopped breastfeeding 6w ago, refer to HTC for RT

3. EID Due for 12 month rapid test
- Alert = Due for EID Rapid Test
- Action = Refer to HTC for rapid test

4. EID Positive Rapid Test
- Alert: EID Positive RT
- Action = Confirm ART Enrollment, Refer for EID DNA-PCR Test (this is added)
 */
const eidFilter = patient => {
  return ( (typeof patient.alert !== 'undefined') && (patient.alert !== null) ) ? patient.alert.toLowerCase().includes(' eid ')  : false;
};


export default {
  required: [patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.DnaPcrEncounterType.uuid, 'exclude'), eidFilter],
  completed: [patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.DnaPcrEncounterType.uuid, 'include')]
};
