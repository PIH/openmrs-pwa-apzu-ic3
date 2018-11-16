import React from 'react';
import PropTypes from 'prop-types';
import {Col, Grid, Row} from "react-bootstrap";
import {centerTextAlign, historySection} from "../pwaStyles";

const Summary = props => {

  return (
    <Col sm={4} style={historySection}>
      <Grid>
        <Row>
          <Col sm={6}>
            <span style={centerTextAlign}><h2>Summary</h2></span>
          </Col>
        </Row>
      </Grid>
      {React.cloneElement(props.summary, { backLink: props.backLink })}
    </Col>
  );
};

Summary.propTypes = {
  backLink: PropTypes.string.isRequired,
  summary: PropTypes.object.isRequired,
};

export default Summary;
