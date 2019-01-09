import React from 'react';
import PropTypes from 'prop-types';
import {Col, Grid, Row, Glyphicon} from "react-bootstrap";
import Swiper from 'react-id-swiper';
import { withRouter } from 'react-router-dom';
import {submit, isInvalid, isSubmitting} from 'redux-form';
import uuidv4 from 'uuid/v4';
import {selectors, formActions, FORM_STATES} from "@openmrs/react-components";
import 'react-id-swiper/src/styles/css/swiper.css';
import { centerTextAlign } from '../pwaStyles';
import Summary from "./Summary";
import Form from "./Form";
import connect from "react-redux/es/connect/connect";
import './styles/summary-and-form.css';

// TODO can we organize this at all better?  the idea that we are passing the form instance ID around everywhere, and doing enter/edit here is kind of painful
// TODO if we generally like the way this works, we can extract back out into react-components

export class SummaryAndForm extends React.Component {
  constructor(props) {
    super(props);
    this.enterEditMode = this.enterEditMode.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.getFormState = this.getFormState.bind(this);
    this.getFormSubmitting = this.getFormSubmitting.bind(this);
    this.getFormInvalid = this.getFormInvalid.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.summarySwiperButton = this.summarySwiperButton.bind(this);
    this.formSwiperButton = this.formSwiperButton.bind(this);
    this.swiper = null;
    this.formInstanceId = uuidv4();
    this.state = {
      currentView: ''
    };
  }
  
  goNext() {
    if (this.swiper) {
      this.setState({
        currentView: 'form'
      });
      this.swiper.slideNext();
    }
  }

  goPrev() {
    if (this.swiper) {
      this.setState({
        currentView: 'summary'
      });
      this.swiper.slidePrev();
    }
    ;
  }

  summarySwiperButton() {
    return (
      <span 
        className="summary-swiper-button" 
        onClick={() => this.goNext()}
      > Add New
      </span>
    );
  }

  formSwiperButton() {
    return (
      <div 
        className="form-swiper-button" 
        onClick={() => this.goPrev()}
      > 
        <Glyphicon
          glyph="menu-left"
        />
      </div>
    );
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

  render() {
    const params = {
      spaceBetween: 30,
    };
    const formViewIsActive = this.state.currentView === 'form';
    return (
      <div className="div-container summary-and-form">
        <Grid className="div-container">
          <Row className="row-container">
            <div>
              {!formViewIsActive &&
              (
                <span 
                  className="back-button" 
                  onClick={() => this.props.history.push('/screening')}
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
                    (<button disabled={this.getFormSubmitting() || this.getFormInvalid()}
                      onClick={this.submitForm}>Save</button>) :
                    (<button onClick={this.enterEditMode}>Edit</button>)
                  }
                </div>
              )
            }
          </Row>
          <Row className="show-grid summary-form-slider">
            <div className="summary-form">
              <Summary
                backLink={this.props.backLink}
                summary={this.props.summary}
              />
            </div>
            {this.props.patient.visit || !this.props.requireVisitForForm ? (
              <div className="form-summary ">
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
          </Row>
          <div className="swiping-summary-and-form">
            <Swiper {...params} ref={node => { if (node) {this.swiper = node.swiper;}}}>
              <div className="summary-form">
                <Summary
                  backLink={this.props.backLink}
                  sliderButton={this.summarySwiperButton}
                  summary={this.props.summary}
                />
              </div>
              {this.props.patient.visit || !this.props.requireVisitForForm ? (
                <div className="form-summary">
                  <Form
                    backLink={this.props.backLink}
                    form={this.props.form}
                    formInstanceId={this.formInstanceId}
                    sliderButton={this.formSwiperButton}
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
        </Grid>
      </div>

    );
  }
};

SummaryAndForm.propTypes = {
  backLink: PropTypes.string.isRequired,
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
    reduxForm: state.form   // TODO ugh that we have to map in the entire state.form... can we assign uuid earlier?
  };
};

export default withRouter(connect(mapStateToProps)(SummaryAndForm));
