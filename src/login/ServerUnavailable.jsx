import React from 'react';
import { Button } from 'react-bootstrap';

// Shown when the server can't be reached, rather than sending a user who may well still be logged in away from the app
const ServerUnavailable = props => (
  <div style={{ padding: '20px' }}>
    <p>The server could not be reached.</p>
    <Button onClick={props.onRetry}>Retry</Button>
  </div>
);

export default ServerUnavailable;
