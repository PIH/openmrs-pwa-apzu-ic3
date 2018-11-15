import React from 'react';
import PropTypes from 'prop-types';
import {Col, Grid, Row} from "react-bootstrap";
import {littlePaddingLeft, divContainer, rowStyles} from '../pwaStyles';
import Summary from "./Summary";
import Form from "./Form";

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
            patient={props.patient}
            summary={props.summary}
          />
          <Form
            backLink={props.backLink}
            form={props.form}
            patient={props.patient}
          />
        </Row>
      </Grid>
    </div>

  );
};

SummaryAndForm.propTypes = {
  backLink: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  patient: PropTypes.object,
  summary: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default SummaryAndForm;
