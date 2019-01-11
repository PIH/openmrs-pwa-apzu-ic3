import React from "react";
import {EncounterFormPanel, encountersByEncounterTypeFilter, visitActions, selectors} from '@openmrs/react-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ACTIVE_VISITS_REP, ENCOUNTER_ROLES } from "../constants";
import { centerTextAlign } from "../pwaStyles";
import {format, isSameDay, parse} from 'date-fns';


class ScreeningForm extends React.Component {

  componentDidMount() {
    const location = this.props.sessionLocation ? this.props.sessionLocation.uuid : null;
    this.props.dispatch(visitActions.fetchPatientActiveVisit(this.props.patient.uuid, location, ACTIVE_VISITS_REP));
  }

  render() {
    const location = this.props.sessionLocation ? this.props.sessionLocation.uuid : null;
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
      () => props.patient && props.patient.uuid && visitActions.fetchPatientActiveVisit(props.patient.uuid, location, ACTIVE_VISITS_REP)
    ];

    return (
      <div>
        <div style={centerTextAlign}>
          <h2>{encounter && encounter.encounterDatetime && (isSameDay(parse(encounter.encounterDatetime), new Date()) ? 'Today' : format(parse(encounter.encounterDatetime), 'DD MMM YYYY'))}</h2>
        </div>
        <EncounterFormPanel
          backLink={props.backLink}
          defaultValues={props.defaultValues}
          encounter={encounter}
          encounterRole={ENCOUNTER_ROLES.UnknownEncounterRole}
          encounterType={props.encounterType}
          formContent={props.formContent}
          formId={props.formId}
          formInstanceId={props.formInstanceId}
          formSubmittedActionCreators={formSubmittedActionCreators}
          hideActionButtons={true}
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
  sessionLocation: PropTypes.object,
  toastMessage: PropTypes.string,
  title: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
    sessionLocation: state.openmrs.session.sessionLocation
  };
};

export default connect(mapStateToProps)(ScreeningForm);
