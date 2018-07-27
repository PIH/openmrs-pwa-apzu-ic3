import { Patient } from "@openmrs/react-components";

const visitRestRepToPatientObjConverter = () => {

  return (visit) => {
    return Patient.createFromRestRep(visit.patient, visit);
  };

};

export default visitRestRepToPatientObjConverter;
