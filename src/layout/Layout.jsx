import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import { AuthenticatedRoute } from '@openmrs/react-components';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Header from '../header/Header';
import LeftRail from './LeftRail';

// TODO extract authenicated route out to a higher level?
// TODO can we pass the patient into the Header as well, so it can be non-connected?

const Layout = props => {

  const contentCols = props.patient.uuid ? 10 : 12;

  return (
    <div id="outer-container" className="ag-theme-material">
      <ReduxToastr />
      <Grid fluid={true}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Header />
          </Col>
        </Row>
        <Row>
          {props.patient.uuid &&
            <Col xs={2} sm={2} md={2} lg={2}>
              <LeftRail patient={props.patient} />
            </Col>
          }
          <Col xs={contentCols} sm={contentCols} md={contentCols} lg={contentCols}>
            <AuthenticatedRoute {...props} />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patient: state.selectedPatient
  };
};

export default connect(mapStateToProps)(Layout);

