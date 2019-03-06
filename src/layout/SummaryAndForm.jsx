import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Col, Grid, Row, Glyphicon} from "react-bootstrap";
import { actions as toastrActions } from 'react-redux-toastr';
import Swiper from 'react-id-swiper';
import { withRouter } from 'react-router-dom';
import {submit, isInvalid, isSubmitting, isPristine } from 'redux-form';
import uuidv4 from 'uuid/v4';
import {
  selectors,
  formActions,
  FORM_STATES,
  visitActions,
  encountersByEncounterTypeFilter
} from "@openmrs/react-components";
import 'react-id-swiper/src/styles/css/swiper.css';
import { centerTextAlign } from '../pwaStyles';
import Summary from "./Summary";
import Form from "./Form";
import './styles/summary-and-form.css';
import {ACTIVE_VISITS_REP, ENCOUNTER_ROLES, ENCOUNTER_TYPES, CONCEPTS} from "../constants";
import patientActions from "../patient/patientActions";
import utils from '../utils';

// TODO can we organize this at all better?  the idea that we are passing the form instance ID around everywhere, and doing enter/edit here is kind of painful
// TODO if we generally like the way this works, we can extract back out into react-components

export class SummaryAndForm extends React.Component {

  constructor(props) {
    super(props);
    this.enterEditMode = this.enterEditMode.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.getFormState = this.getFormState.bind(this);
    this.getFormSubmitting = this.getFormSubmitting.bind(this);
    this.getFormPristine = this.getFormPristine.bind(this);
    this.getFormInvalid = this.getFormInvalid.bind(this);
    this.gotoForm = this.gotoForm.bind(this);
    this.gotoSummary = this.gotoSummary.bind(this);
    this.openFormForCurrentVisitButton = this.openFormForCurrentVisitButton.bind(this);
    this.handleFormForCurrentVisitButton = this.handleFormForCurrentVisitButton.bind(this);
    this.checkIn = this.checkIn.bind(this);
    this.swiper = null;
    this.formInstanceId = uuidv4();
    this.state = {
      currentView: ''
    };
  }

  componentDidMount() {
    const location = this.props.sessionLocation ? this.props.sessionLocation.uuid : null;
    this.props.dispatch(visitActions.fetchPatientActiveVisit(this.props.patient.uuid, location, ACTIVE_VISITS_REP));
    this.swiper.updateSize();
  }

  gotoForm() {
    if (this.swiper) {
      this.setState({
        currentView: 'form'
      });
      this.swiper.slideNext();
    }
  }

  gotoSummary() {
    if (this.swiper) {
      this.setState({
        currentView: 'summary'
      });
      this.swiper.slidePrev();
    }
    ;
  }

  checkIn() {
    let valuesPath = 'obs|path=referral|conceptPath=' + CONCEPTS.SOURCE_OF_REFERRAL.uuid;
    let valuesObj = {};
    valuesObj[valuesPath] = CONCEPTS.SOURCE_OF_REFERRAL.IC3_appointment.uuid;
    this.props.dispatch(formActions.formSubmitted({
      formId: "checkin-form",
      formInstanceId: this.formInstanceId,
      values: valuesObj,
      encounterRole: ENCOUNTER_ROLES.UnknownEncounterRole,
      encounterType: ENCOUNTER_TYPES.CheckInEncounterType,
      location: this.props.sessionLocation,
      patient: this.props.patient,
      formSubmittedActionCreator: [
        () => this.props.patient && this.props.patient.uuid && visitActions.fetchPatientActiveVisit(this.props.patient.uuid, this.props.sessionLocation.uuid, ACTIVE_VISITS_REP),
        () => this.props.patient && this.props.patient.uuid && patientActions.getIC3PatientScreeningData(this.props.patient),
        () => toastrActions.add({
          title: this.props.toastMessage ? this.props.toastMessage : "Data Saved",
          type: "success"
        })
      ]
    }));
  }

  formatNavMessage() {
    const { completed } = this.props;
    if (this.props.currentPathname.includes('checkin')) {
      return completed ?
        `View/Edit ${this.props.title} information` : 'Check-in Patient';
    } else {
      return completed ?
        `View/Edit ${this.props.title} information` : `Add ${this.props.title} information`;
    }
  }

  openFormForCurrentVisitButton() {
    return (
      <button
        className="summary-swiper-button"
        onClick={this.handleFormForCurrentVisitButton}
      > {this.formatNavMessage()}
      </button>
    );
  }

  handleFormForCurrentVisitButton() {
    const { completed } = this.props;
    if (this.props.currentPathname.includes('checkin')
      && utils.isSameDay(new Date(), new Date(this.props.patient.lastAppointmentDate))
      &&!completed) {
      //IS-106, If patient has an appointment then just check-in
      this.checkIn();

    } else {
      const encounter = this.getMatchingEncounterFromActiveVisit(this.props.encounterType);
      if (encounter && encounter.uuid) {
        this.props.dispatch(formActions.loadFormBackingEncounter(this.formInstanceId, encounter.uuid));
      }
      this.gotoForm();
    }
  }

  enterEditMode() {
    this.props.dispatch(formActions.setFormState(this.formInstanceId, FORM_STATES.EDITING));
  }

  submitForm() {
    this.props.dispatch(formActions.setFormState(this.formInstanceId, FORM_STATES.VIEWING));
    this.props.dispatch(submit(this.formInstanceId));
  }

  getFormState() {
    return this.props.forms && this.props.forms[this.formInstanceId] ? this.props.forms[this.formInstanceId].state : null;
  }

  // TODO these are ugly: preferrably this and getFormInvalid would happen in mapStatesToProps but we don't have access to form instance uuid there
  // TODO (reduxForm) => reduxForm is needed because we aren't passing in the full state, just the form component
  // TODO we should refactor all this when we pull some of the stuff into react-components
  // TODO could we potentially apply the FormContext sooner?
  getFormSubmitting() {
    return isSubmitting(this.formInstanceId, (reduxForm) => reduxForm)(this.props.reduxForm);
  }

  getFormInvalid() {
    return isInvalid(this.formInstanceId, (reduxForm) => reduxForm)(this.props.reduxForm);
  }

  getFormPristine() {
    return isPristine(this.formInstanceId, (reduxForm) => reduxForm)(this.props.reduxForm);
  }

  getMatchingEncounterFromActiveVisit(encounterType) {

    let encounter;
    let props = this.props;

    // TODO what if there are multiple encounters of the same type?  this currently just shifts in the "first"
    if (props.patient && props.patient.visit && props.patient.visit.encounters) {

      // Sorts the encounters by encounterDatetime in Desc order
      let encounters = props.patient.visit.encounters.concat().sort((a, b) => {
        a = new Date(a.encounterDatetime);
        b = new Date(b.encounterDatetime);
        return a > b ? -1 : a < b ? 1 : 0;
      });

      encounter = encountersByEncounterTypeFilter(encounterType.uuid)(encounters).shift();
    }

    return encounter;
  }

  render() {
    const params = {
      spaceBetween: 30,
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
    };
    const formViewIsActive = this.state.currentView === 'form';
    const isSaveDisabled = this.getFormSubmitting() || this.getFormInvalid() || this.getFormPristine();
    return (
      <div className="div-container summary-and-form">
        <Grid className="div-container">
          <Row className="row-container">
            <div className="glyph-back-button">
              {
                (
                  <span 
                    className="back-button" 
                    onClick={() => {
                      if (formViewIsActive) {
                        return this.gotoSummary();
                      } else {
                        return this.props.history.push('/screening');
                      }
                    }}
                  >
                    <Glyphicon
                      className="back-button-icon"
                      glyph="menu-left"
                    /></span>
                )
              }
            </div>
            <div>
              <span><h3>{this.props.title}</h3></span>
            </div>
            {formViewIsActive &&
              (
                <div className="form-action-btns">
                  {this.getFormState() === FORM_STATES.EDITING ?
                    (<button disabled={isSaveDisabled}
                      className={isSaveDisabled ? 'disabled-btn' : 'enabled-btn'}
                      onClick={this.submitForm}>Save</button>) :
                    (<button onClick={this.enterEditMode}>Edit</button>)
                  }
                </div>
              )
            }
          </Row>
          <Row>
            <div className="swiping-summary-and-form">
              <Swiper {...params} noSwiping={true} ref={node => { if (node) {this.swiper = node.swiper;}}}>
                <div className="summary-form">
                  <Summary
                    backLink={this.props.backLink}
                    formInstanceId={this.formInstanceId}
                    gotoForm={this.gotoForm}
                    openFormForCurrentVisitButton={this.openFormForCurrentVisitButton}
                    summary={this.props.summary}
                  />
                </div>
                {this.props.patient.visit || !this.props.requireVisitForForm ? (
                  <div className="form-summary">
                    <Form
                      backLink={this.props.backLink}
                      form={this.props.form}
                      formInstanceId={this.formInstanceId}
                    />
                  </div>
                ) : (
                  <div>
                    <Col sm={8}>
                      <div style={centerTextAlign}>
                        <h4>Please check-in patient</h4>
                      </div>
                    </Col>
                  </div>
                )}
              </Swiper>
            </div>
          </Row>
        </Grid>
      </div>

    );
  }
};

SummaryAndForm.propTypes = {
  backLink: PropTypes.string.isRequired,
  encounterType: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  patient: PropTypes.object,
  requireVisitForForm: PropTypes.bool.isRequired,
  summary: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

SummaryAndForm.defaultProps = {
  requireVisitForForm: true
};

const mapStateToProps = (state) => {
  let storePatient = selectors.getSelectedPatientFromStore(state);
  return {
    patient: storePatient,
    forms: state.openmrs.form,
    reduxForm: state.form,   // TODO ugh that we have to map in the entire state.form... can we assign uuid earlier?
    currentPathname: state.router.location.pathname,
    sessionLocation: state.openmrs.session.sessionLocation
  };
};

export default withRouter(connect(mapStateToProps)(SummaryAndForm));
