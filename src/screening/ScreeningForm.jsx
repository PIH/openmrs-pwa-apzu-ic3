import React from "react";
import { EncounterFormPage, encountersByEncounterTypeFilter, visitActions, selectors } from '@openmrs/react-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ACTIVE_VISITS_REP, ENCOUNTER_ROLES } from "../constants";
import { centerTextAlign } from "../pwaStyles";
import moment from 'moment';


class ScreeningForm extends React.Component {

  componentDidMount() {
    this.props.dispatch(visitActions.fetchPatientActiveVisit(this.props.patient.uuid, ACTIVE_VISITS_REP));
  }

  render() {
    let encounter;
    let props = this.props;
    // find any matching encounter in the active visit
    // TODO what if there are multiple encounters of the same type?  this currently just shifts in the "first"
    if (props.patient && props.patient.visit && props.patient.visit.encounters) {

      // Sorts the encounters by encounterDatetime in Desc order
      let encounters = props.patient.visit.encounters.concat().sort((a,b) => {
        a = new Date(a.encounterDatetime);
        b = new Date(b.encounterDatetime);
        return a>b ? -1 : a<b ? 1 : 0;
      });
      
      encounter = encountersByEncounterTypeFilter(props.encounterType.uuid)(encounters).shift();
    }
    // we want to update the active visit for the current patient on submit
    const formSubmittedActionCreators = [
      () => props.patient && props.patient.uuid && visitActions.fetchPatientActiveVisit(props.patient.uuid, ACTIVE_VISITS_REP)
    ];

    return (
      <div>
        <div style={centerTextAlign}>
          <h2>{encounter && encounter.encounterDatetime && moment(`${encounter.encounterDatetime}`).format('DD MMM YYYY')}</h2>
          <h6>{encounter && encounter.encounterDatetime && moment(`${encounter.encounterDatetime}`).fromNow()}</h6>
        </div>
        <EncounterFormPage
          backLink={props.backLink}
          defaultValues={props.defaultValues}
          encounter={encounter}
          encounterRole={ENCOUNTER_ROLES.UnknownEncounterRole}
          encounterType={props.encounterType}
          formContent={props.formContent}
          formId={props.formId}
          formInstanceId={props.formInstanceId}
          formSubmittedActionCreators={formSubmittedActionCreators}
          title={props.title}
          toastMessage={props.toastMessage ? props.toastMessage : "Screening Form Saved"}
          visitType={props.visitType}
        />
      </div>
    );
  }
};

ScreeningForm.propTypes = {
  backLink: PropTypes.string,
  encounterType: PropTypes.object.isRequired,
  formContent: PropTypes.object.isRequired,
  formId: PropTypes.string.isRequired,
  toastMessage: PropTypes.string,
  title: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
};

export default connect(mapStateToProps)(ScreeningForm);
