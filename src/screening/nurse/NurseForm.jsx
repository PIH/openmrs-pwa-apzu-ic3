import React from "react";
import { connect } from "react-redux";
import { addDays, addMonths } from "date-fns";
import { formValueSelector } from "redux-form";
import { Obs, selectors, formUtil } from "@openmrs/react-components";
import { Grid, Row, ControlLabel, Col } from "react-bootstrap";
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";
import "../../../src/assets/css/ClinicianForm.css";

const NurseForm = props => {
  const { clinicalNextAppointmentDate } = props;
  const formContent = (
    <Grid>
      <span>
        <Row>
          <Col componentClass={ControlLabel}>Appointment time</Col>
        </Row>
        <div style={{ display: "flex" }}>
          <Obs
            concept={CONCEPTS.Clinical.NextAppointmentDate.uuid}
            datatype="date"
            defaultDate={undefined}
            maxDate={addMonths(new Date(), 12)}
            minDate={addDays(new Date(), 1)}
            path="clinical-next-appointment-date"
            usePortalMode
          />
          <span style={{ marginLeft: "20px", marginTop: "1px" }}>
            <Obs
              concept={CONCEPTS.Clinical.QualitativeTime.uuid}
              conceptAnswers={FORM_ANSWERS.clinicalQualitativeTime}
              disabled={!clinicalNextAppointmentDate}
              path="clinical-qualitative-time"
            />
          </span>
        </div>
      </span>
    </Grid>
  );

  return (
    <ScreeningForm
      backLink={props.backLink}
      encounterType={ENCOUNTER_TYPES.ClinicalPlan}
      formContent={formContent}
      formId="nurse-form"
      formInstanceId={props.formInstanceId}
      toastMessage="Nursing Notes Saved"
    />
  );
};

export default connect((state, props) => {
  const selector = formValueSelector(props.formInstanceId);
  const clinicalNextAppointmentDateField = formUtil.obsFieldName(
    "clinical-next-appointment-date",
    CONCEPTS.Clinical.NextAppointmentDate.uuid
  );

  const clinicalNextAppointmentDate = selector(
    state,
    clinicalNextAppointmentDateField
  );

  return {
    clinicalNextAppointmentDate,
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(NurseForm);
