import React from 'react';
import PropTypes from 'prop-types';
import {Col} from "react-bootstrap";

const Form = props => {
  return (
    <Col sm={8}>
      {React.cloneElement(props.form, { backLink: props.backLink })}
    </Col>
  );

};

Form.propTypes = {
  backLink: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired
};


export default Form;
