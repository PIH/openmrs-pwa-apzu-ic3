import React from 'react';
import PropTypes from 'prop-types';
import { Button, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { OpenMRSForm } from '@openmrs/react-components';
import { actions as toastrActions } from 'react-redux-toastr';

let Form = (props) => {

  // https://github.com/diegoddox/react-redux-toastr
  const formSubmittedActionCreators = [
    () => toastrActions.add({ title: "Data Saved", type: "success" }),
    () => push(props.afterSubmitLink)
  ];


  return (
    <div>
      <Link to={props.backLink}>
        <Button bsSize='large' bsStyle='danger'>
          Back
        </Button>
      </Link>
      <div>
        <h3><Label>{props.title}</Label></h3>
        <OpenMRSForm
          encounterType={props.encounterType}
          formSubmittedActionCreator={formSubmittedActionCreators}
          patient={props.patient}
          visit={props.patient ? props.patient.visit : null}
        >
          { props.formContent }
        </OpenMRSForm>
      </div>
    </div>
  );
};

Form.propTypes = {
  afterSubmitLink: PropTypes.string.isRequired,
  backLink: PropTypes.string.isRequired,
  encounterType: PropTypes.object.isRequired,
  formContent: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  visit: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    patient: state.selectedPatient ? state.patients[state.selectedPatient] : null,
  };
};

export default connect(mapStateToProps)(Form);
