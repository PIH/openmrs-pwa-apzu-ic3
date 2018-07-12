import React from 'react';
import { Container } from 'bahmni-form-controls';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';
import formActions from './formActions';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  encounterType() {
    return null;  // needs to be overwritten in implementing methods
  }

  formDetails() {
    return null;  // needs to be overwritten in implementing methods
  }

  // https://github.com/diegoddox/react-redux-toastr
  formSubmittedActionCreators() {
    return [
      () => toastrActions.add({ title: "Data Saved", type: "success" }),
      () => push(this.queueLink())
    ];
  }

  onClick() {
    this.props.dispatch(formActions.formSubmitted(
      this.containerRef.current.getValue(),
      this.props.patient,
      this.encounterType(),
      this.props.visit,
      this.formSubmittedActionCreators()
    ));
  }

  queueLink() {
    return "/";  // needs to be overwritten in implementing methods
  }

  render() {
    return (
      <div>
        <Link to={this.queueLink()}>
          <Button bsSize='large' bsStyle='danger'>
            Back to Queue
          </Button>
        </Link>
        <Container
          ref={this.containerRef}
          collapse={ false }
          metadata={this.formDetails()}
          observations={[]}
          translations={{}}
        />
        <Button bsSize='large' bsStyle='success' onClick={this.onClick.bind(this)}>Submit</Button>
      </div>
    );
  }


}

export default Form;
