import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import {EncounterForm} from '@openmrs/react-components';
import { actions as toastrActions } from 'react-redux-toastr';
import { rowStyles, littlePaddingLeft, divContainer, colHeight } from '../pwaStyles'

let Form = (props) => {

  // https://github.com/diegoddox/react-redux-toastr
  const formSubmittedActionCreators = [
    () => toastrActions.add({ title: "Data Saved", type: "success" }),
    () => push(props.afterSubmitLink)
  ];

  return (
    <div style={divContainer}>
      <Grid style={divContainer}>
        <Row style={rowStyles}>
          <Col sm={20} md={20} style={littlePaddingLeft}>
            <span><h1>{props.title}</h1></span>
          </Col>
        </Row>
        <Row>
          <Col sm={20} md={20} style={ colHeight }>
            <span><h1>{ '' }</h1></span>
          </Col>
        </Row>
      </Grid>
      <div>
        <EncounterForm
          formId={ props.formId }
          encounterType={props.encounterType}
          formSubmittedActionCreator={formSubmittedActionCreators}
          patient={props.patient}
          visit={props.patient ? props.patient.visit : null}
        >
          { props.formContent }
        </EncounterForm>
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
