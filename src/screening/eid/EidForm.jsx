import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { selectors } from '@openmrs/react-components';
import HtcForm from '../htc/HtcForm';
import DnaPcrForm from './DnaPcrForm';
import { colHeight } from "../../pwaStyles";
import utils from "../../utils";



class EidForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form: utils.getDefaultEidForm(this.props.patient)
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
            <ButtonToolbar>
              <ToggleButtonGroup
                name="eidFormType"
                onChange={this.handleFormChange}
                type="radio"
                value={this.state.form}
              >
                <ToggleButton
                  bsSize="large"
                  onChange={this.handleFormChange}
                  value="htc"
                >
                Rapid Test
                </ToggleButton>
                <ToggleButton
                  bsSize="large"
                  onChange={this.handleFormChange}
                  value="dna-pcr"
                >
                DNA-PCR
                </ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>
        <Row>
          <Col
            md={20}
            sm={20}
            style={colHeight}
          >
            <span><h1>{ '' }</h1></span>
          </Col>
        </Row>

        { ( this.state.form !== null ) && (this.state.form === "dna-pcr") &&
          <Row>
            <Col>
              <div>
                <DnaPcrForm />
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
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(EidForm);

