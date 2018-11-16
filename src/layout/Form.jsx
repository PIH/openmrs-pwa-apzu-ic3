import React from 'react';
import PropTypes from 'prop-types';
import {Col} from "react-bootstrap";
import {centerTextAlign} from "../pwaStyles";
import utils from "../utils";

const Form = props => {

  return (
    <Col sm={8}>
      <div style={centerTextAlign}>
        <h2>Today</h2>
        <h6>{utils.formatCalendarDate(new Date())}</h6>
      </div>
      {React.cloneElement(props.form, { backLink: props.backLink })}
    </Col>
  );

};

Form.propTypes = {
  backLink: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired
};


export default Form;
