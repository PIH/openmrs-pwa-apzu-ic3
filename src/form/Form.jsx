import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';

class Form extends React.Component {

  // https://github.com/diegoddox/react-redux-toastr
  formSubmittedActionCreators = [
    () => toastrActions.add({ title: "Data Saved", type: "success" }),
    () => push(this.queueLink())
  ];

  queueLink() {
    return "/";  // needs to be overwritten in implementing methods
  }

  formContent() {
    return null;  // needs to be overwritten in implementing methods
  }

  render() {
    return (
      <div>
        <Link to={this.queueLink()}>
          <Button bsSize='large' bsStyle='danger'>
            Back to Queue
          </Button>
        </Link>
        { this.formContent() }
      </div>
    );
  }


}

export default Form;
