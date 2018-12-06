import React from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from "react-bootstrap";
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/css/swiper.css';
import { littlePaddingLeft, divContainer, rowStyles, centerTextAlign } from '../pwaStyles';
import Summary from "./Summary";
import Form from "./Form";
import { selectors } from "@openmrs/react-components";
import connect from "react-redux/es/connect/connect";
import './styles/summary-and-form.css';

const SummaryAndForm = props => {
  const params = {
    spaceBetween: 30
  };


  return (
    <div className="div-container summary-and-form">
      <Grid className="div-container">
        <Row className="row-container">
          <Col
            className="pad-left"
            md={20}
            sm={20}
          >
            <span><h3>{props.title}</h3></span>
          </Col>
        </Row>
        <Row className="show-grid summary-form-slider">
          <div className="summary-form">
            <Summary
              backLink={props.backLink}
              summary={props.summary}
            />
          </div>
          {props.patient.visit || !props.requireVisitForForm ? (
            <div className="form-summary ">
              <Form
                backLink={props.backLink}
                form={props.form}
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
          <Swiper {...params}>
            <div className="summary-form">
              <Summary
                backLink={props.backLink}
                summary={props.summary}
              />
            </div>
            {props.patient.visit || !props.requireVisitForForm ? (
              <div className="form-summary">
                <Form
                  backLink={props.backLink}
                  form={props.form}
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
    patient: storePatient
  };
};

export default connect(mapStateToProps)(SummaryAndForm);
