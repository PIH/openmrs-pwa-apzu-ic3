import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import {AuthenticatedRoute, HeaderAlt, PatientHeader} from '@openmrs/react-components';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import LeftRail from './LeftRail';
import logo from "../assets/images/pih_apzu_logo_white.png";
import {NAV_MENU_PAGES, USER_MENU_PAGES, IDENTIFIER_TYPES} from '../constants';
import { zeroPadding } from "../pwaStyles";
import '../assets/css/header.css';

// TODO extract authenicated route out to a higher level?

const Layout = props => {

  const contentCols = props.patient ? 10 : 12;

  return (
    <div id="outer-container" className="ag-theme-material">
      <ReduxToastr />
      <Grid fluid={true}>
        <Row style={{marginBottom:60}}>
            <HeaderAlt
              className="HeaderAlt"
              logo={logo}
              userMenuPages={USER_MENU_PAGES}
              navMenuPages={NAV_MENU_PAGES}
            />
        </Row>
        <Row>
          {props.patient &&
          <PatientHeader
            identifierTypesToDisplay={
              [IDENTIFIER_TYPES.ART_IDENTIFIER_TYPE,
                IDENTIFIER_TYPES.EID_IDENTIFIER_TYPE,
                IDENTIFIER_TYPES.NCD_IDENTIFIER_TYPE]}
            patient={props.patient}/>
          }
        </Row>
        <Row>
          {props.patient &&
            <Col xs={2} sm={2} md={2} lg={2} style={ zeroPadding }>
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
    patient: state.openmrs.selectedPatient ? state.openmrs.patients[state.openmrs.selectedPatient] : null
  };
};

export default connect(mapStateToProps)(Layout);

