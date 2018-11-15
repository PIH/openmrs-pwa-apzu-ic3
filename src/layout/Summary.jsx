import React from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Grid, Row} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {centerTextAlign, littlePaddingTop, historySection} from "../pwaStyles";

const Summary = props => {

  return (
    <Col sm={6} style={historySection}>
      <Grid>
        <Row>
          <Col style={littlePaddingTop} sm={2}>
            <Link to={props.backLink}>
              <Button
                bsStyle="danger"
                bsSize="small"
              >
                Back to List
              </Button>
            </Link>
          </Col>
          <Col sm={6}>
            <span style={centerTextAlign}><h1>Summary</h1></span>
          </Col>
        </Row>
      </Grid>
      {React.cloneElement(props.summary, { patient: props.patient, backLink: props.backLink })}
    </Col>
  );
};

Summary.propTypes = {
  backLink: PropTypes.string.isRequired,
  patient: PropTypes.object,
  summary: PropTypes.object.isRequired,
};


export default Summary;
