import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import PatientAlert from '../../patient/PatientAlert';
import PatientLabTests from '../../patient/PatientLabTests';
import HtcForm from '../htc/HtcForm';
import DnaPcrForm from './DnaPcrForm';
import { colHeight } from "../../pwaStyles";


class EidForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form: null
    };

    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(type) {
    this.setState({ form: type });
  }

  render() {

    return (
      <Grid>
        <Row>
          <Col sm={8}>
        <PatientAlert/>
          </Col>
          <Col sm={4}>
            <PatientLabTests />
          </Col>
        </Row>

        <Row>
          <Col sm={8}>
            <ButtonToolbar>
              <ToggleButtonGroup
                name="eidFormType"
                type="radio"
                value={ this.state.form }
                onChange={ this.handleFormChange }
              >
                <ToggleButton value="htc" bsSize="large" onChange={this.handleFormChange}>HTC</ToggleButton>
                <ToggleButton value="dna-pcr" bsSize="large" onChange={this.handleFormChange}>DNA-PCR</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
          </Col>
        </Row>
        <Row>
          <Col sm={20} md={20} style={ colHeight }>
            <span><h1>{ '' }</h1></span>
          </Col>
        </Row>

        { ( this.state.form !== null ) && (this.state.form === "dna-pcr") &&
          <Row>
            <Col>
              <div>
               <DnaPcrForm/>
              </div>
            </Col>
          </Row>
        }

        { ( this.state.form !== null ) && (this.state.form === "htc") &&
        <Row>
          <Col>
            <div>
              <HtcForm
                backLink="/screening/eid/queue"
              />
            </div>
          </Col>
        </Row>
        }
      </Grid>
    );
  }
}

export default connect(state => {
  return {
    patient: state.openmrs.selectedPatient ? state.openmrs.patients[state.openmrs.selectedPatient] : null,
  };
})(EidForm);

