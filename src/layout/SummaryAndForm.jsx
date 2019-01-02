import React from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Row, Glyphicon } from "react-bootstrap";
import Swiper from 'react-id-swiper';
import { withRouter } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import {selectors, formActions, FORM_STATES} from "@openmrs/react-components";
import 'react-id-swiper/src/styles/css/swiper.css';
import { centerTextAlign } from '../pwaStyles';
import Summary from "./Summary";
import Form from "./Form";
import connect from "react-redux/es/connect/connect";
import './styles/summary-and-form.css';

// TODO can we organize this at all better?  the idea that we are passing the form instance ID around everywhere, and doing enter/edit here is kind of painful

export class SummaryAndForm extends React.Component {
  constructor(props) {
    super(props);
    this.enterEditMode = this.enterEditMode.bind(this);
    this.exitEditMode = this.exitEditMode.bind(this);
    this.getForm = this.getForm.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.summarySwiperButton = this.summarySwiperButton.bind(this);
    this.formSwiperButton = this.formSwiperButton.bind(this);
    this.swiper = null;
    this.formInstanceId = uuidv4();
  }
  
  goNext() {
    if (this.swiper) {
      this.swiper.slideNext();
    }
  }

  goPrev() {
    if (this.swiper) {
      this.swiper.slidePrev();
    }
    ;
  }

  summarySwiperButton() {
    return (
      <span 
        className="summary-swiper-button" 
        onClick={() => this.goNext()}
      > Today
        <Glyphicon
          glyph="menu-right"
        />
      </span>
    );
  }

  formSwiperButton() {
    return (
      <span 
        className="form-swiper-button" 
        onClick={() => this.goPrev()}
      > 
        <Glyphicon
          glyph="menu-left"
        />Summary
      </span>
    );
  }

  enterEditMode() {
    this.props.dispatch(formActions.setFormState(this.formInstanceId, FORM_STATES.EDITING));
  }

  exitEditMode() {
    this.props.dispatch(formActions.setFormState(this.formInstanceId, FORM_STATES.VIEWING));
  }

  getForm() {
    return this.props.forms ? this.props.forms[this.formInstanceId] : null;
  }

  render() {
    const params = {
      spaceBetween: 30,
    };
    return (
      <div className="div-container summary-and-form">
        <Grid className="div-container">
          <Row className="row-container">
            <div>
              <span 
                className="back-button" 
                onClick={() => this.props.history.push('/screening')}
              >
                <Glyphicon
                  className="back-button-icon"
                  glyph="menu-left"
                /></span>
            </div>
            <div>
              <span><h3>{this.props.title}</h3></span>
            </div>
            {this.getForm() && this.getForm().state === FORM_STATES.EDITING ?
              (<button onClick={this.exitEditMode}>Save</button>) :
              (<button onClick={this.enterEditMode}>Edit</button>)
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
    forms: state.openmrs.form
  };
};

export default withRouter(connect(mapStateToProps)(SummaryAndForm));
