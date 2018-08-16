import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import { AuthenticatedRoute } from '@openmrs/react-components';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from '../header/Header';
import LeftNav from './LeftNav';

// TODO extract authenicated route out to a higher level?

const Layout = props => {
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
          <Col xs={2} sm={2} md={2} lg={2}>
            <LeftNav />
          </Col>
          <Col xs={10} sm={10} md={10} lg={10}>
            <AuthenticatedRoute {...props} />
          </Col>
        </Row>
      </Grid>
    </div>
  )
};

export default Layout;
