import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';

class Form extends React.Component {

  queueLink() {
    return "/";  // needs to be overwritten in implementing methods
  }

  formContent() {
    return null;  // needs to be overwritten in implementing methods
  }

  formSubmittedActionCreator() {
    return push(this.queueLink());
  }

  render() {
    return (
      <div>
        <Link to={this.queueLink()}>
          <Button bsSize='large'>
            Back to Queue
          </Button>
        </Link>
        { this.formContent() }
      </div>
    );
  }


}

export default Form;
