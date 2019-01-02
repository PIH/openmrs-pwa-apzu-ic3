import React from 'react';
import PropTypes from 'prop-types';
import {Col} from "react-bootstrap";

const Form = props => {
  return (
    <Col className="form-layout">
      {React.cloneElement(props.form, { backLink: props.backLink, formInstanceId: props.formInstanceId })}
      {props.sliderButton && props.sliderButton()}
    </Col>
  );

};

Form.propTypes = {
  backLink: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  sliderButton: PropTypes.func.isRequired,
};


export default Form;
