import React from 'react';
import PropTypes from 'prop-types'
import { Container } from 'bahmni-form-controls';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';
import formActions from './formActions';

class BahmniForm extends React.Component {

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    // https://github.com/diegoddox/react-redux-toastr
    this.formSubmittedActionCreators =
      [
        () => toastrActions.add({ title: "Data Saved", type: "success" }),
        () => push(this.props.afterSubmitLink)
      ];
  }

  onClick() {
    this.props.dispatch(formActions.formSubmitted(
      this.containerRef.current.getValue(),
      this.props.patient,
      this.props.encounterType,
      this.props.visit,
      this.formSubmittedActionCreators
    ));
  }

  render() {
    return (
      <div>
        <Link to={this.props.backLink}>
          <Button bsSize='large' bsStyle='danger'>
            Back
          </Button>
        </Link>
        <Container
          ref={this.containerRef}
          collapse={ false }
          metadata={this.props.formDetails}
          observations={[]}
          translations={{}}
        />
        <Button bsSize='large' bsStyle='success' onClick={this.onClick.bind(this)}>Submit</Button>
      </div>
    );
  }
}

BahmniForm.propTypes = {
  afterSubmitLink: PropTypes.string.isRequired,
  backLink: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  encounterType: PropTypes.object.isRequired,
  formDetails: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
  visit: PropTypes.object
};

export default BahmniForm;
