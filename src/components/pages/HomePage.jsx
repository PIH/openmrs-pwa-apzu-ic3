import React from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import CheckInPage from "./CheckInPage";

const HomePage = () => (
    <div className="App">

            <b>Home Page</b>
            <br/>
            <br/>
            <div>
                <Link to="/searchPatient">
                    <ButtonGroup>
                        <Button bsSize="large" >
                            <Glyphicon glyph="check" /> Search Patient
                        </Button>
                    </ButtonGroup>
                </Link>
            </div>

    </div>
)

export default HomePage;
