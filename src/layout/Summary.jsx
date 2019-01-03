import React from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from "react-bootstrap";
import { centerTextAlign } from "../pwaStyles";

const Summary = props => {

  return (
    <Col className="summary-layout">
      <Grid>
        <Row>
          <Col sm={12}>
            <span style={centerTextAlign}><h2>Summary</h2></span>
          </Col>
        </Row>
        <Row className="swiper-add-new-btn">
          {props.sliderButton && props.sliderButton()}
        </Row>
      </Grid>
      <div className="summary-layout-content">
        {React.cloneElement(props.summary, { backLink: props.backLink })}
      </div>
    </Col>
  );
};

Summary.propTypes = {
  backLink: PropTypes.string.isRequired,
  sliderButton: PropTypes.func.isRequired,
  summary: PropTypes.object.isRequired,
};

export default Summary;
