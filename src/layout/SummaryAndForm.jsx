import React from 'react';
import PropTypes from 'prop-types';
import {Col, Grid, Row} from "react-bootstrap";
import {littlePaddingLeft, divContainer, rowStyles, centerTextAlign} from '../pwaStyles';
import Summary from "./Summary";
import Form from "./Form";
import {selectors} from "@openmrs/react-components";
import connect from "react-redux/es/connect/connect";

const SummaryAndForm = props => {

  return (
    <div style={divContainer}>
      <Grid style={divContainer}>
        <Row style={rowStyles}>
          <Col sm={20} md={20} style={littlePaddingLeft}>
            <span><h3>{props.title}</h3></span>
          </Col>
        </Row>
        <Row className="show-grid">
          <Summary
            backLink={props.backLink}
            summary={props.summary}
          />
          {props.patient.visit || !props.requireVisitForForm ? (
            <Form
              backLink={props.backLink}
              form={props.form}
            />
          ) : (
            <Col sm={8}>
              <div style={centerTextAlign}>
                <h4>Please check-in patient</h4>
              </div>
            </Col>
          )}
        </Row>
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
