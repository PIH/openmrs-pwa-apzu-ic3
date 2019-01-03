import React from 'react';
import PropTypes from 'prop-types';
import {Col} from "react-bootstrap";

const Form = props => {
  return (
    <Col className="form-layout">
      <span>{props.sliderButton && props.sliderButton()}</span>
      {React.cloneElement(props.form, {
        backLink: props.backLink,
        formInstanceId: props.formInstanceId
      })}
    </Col>
  );

};

Form.propTypes = {
  backLink: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  formInstanceId: PropTypes.string.isRequired,
  sliderButton: PropTypes.func,
};


export default Form;
