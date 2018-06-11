import React from "react";
import { connect } from "react-redux";

import { Grid, Row, Col } from 'react-bootstrap';

class InfoPatient extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form>
                <Grid>
                    <Row>
                        <Col>
                            <label>ID: </label>
                            <input type="text" name="patientId" defaultValue={this.props.patient.id}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>UUID: </label>
                            <input type="text" name="uuid" defaultValue={this.props.patient.uuid}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Identifier: </label>
                            <input type="text" name="uuid" defaultValue={this.props.patient.identifier}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>First Name: </label>
                            <input type="text" name="patientId" defaultValue={this.props.patient.firstName}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Last Name: </label>
                            <input type="text" name="patientId" defaultValue={this.props.patient.lastName}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Gender: </label>
                            <input type="text" name="patientId" defaultValue={this.props.patient.gender}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Age: </label>
                            <input type="text" name="patientId" defaultValue={this.props.patient.age}/>
                        </Col>
                    </Row>
                </Grid>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        patient: state.selected.patient
    };
};

export default connect(mapStateToProps)(InfoPatient);