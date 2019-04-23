import React from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from "react-bootstrap";
import { centerTextAlign } from "../pwaStyles";
import connect from "react-redux/es/connect/connect";
import {selectors} from "@openmrs/react-components";

const Summary = props => {

  return (
    <Col className="summary-layout">
      <Grid>
        <Row>
          <Col sm={12}>
            <span style={centerTextAlign}><h2>Summary</h2></span>
          </Col>
        </Row>
        {(props.patient.visit || !props.requireVisitForForm) &&
        (
          <Row className="swiper-add-new-btn">
            {props.openFormForCurrentVisitButton && props.openFormForCurrentVisitButton()}
          </Row>
        )
        }
      </Grid>
      <div className="summary-layout-content">
        {React.cloneElement(props.summary, {
          backLink: props.backLink,
          formInstanceId: props.formInstanceId,
          gotoForm: props.gotoForm
        })}
      </div>
    </Col>
  );
};

Summary.propTypes = {
  backLink: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  formInstanceId: PropTypes.string.isRequired,
  requireVisitForForm: PropTypes.bool.isRequired,
  sliderButton: PropTypes.func,
  summary: PropTypes.object.isRequired,
};


Summary.defaultProps = {
  requireVisitForForm: true
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
};

export default connect(mapStateToProps)(Summary);

