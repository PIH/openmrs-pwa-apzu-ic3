import React from 'react';
import PropTypes from 'prop-types';
import {Col} from "react-bootstrap";
import {centerTextAlign} from "../pwaStyles";
import utils from "../utils";

const Form = props => {

  return (
    <Col sm={6}>
      <span style={centerTextAlign}><h1>Today: {utils.formatCalendarDate(new Date())}</h1></span>
      {React.cloneElement(props.form, { patient: props.patient, backLink: props.backLink })}
    </Col>
  );

};

Form.propTypes = {
  backLink: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  patient: PropTypes.object,
};


export default Form;
