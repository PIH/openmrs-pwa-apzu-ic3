import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { conceptActions, selectors } from '@openmrs/react-components'
import { format, startOfDay } from 'date-fns';

class ChronicCareDiagnoses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chronicCareDiagnoses: []
    }

    this.updateChronicCareDiagnoses = this.updateChronicCareDiagnoses.bind(this);
  }

  componentDidMount() {
    if (this.props.selectedPatient.chronic_care_diagnoses) {
      this.props.selectedPatient.chronic_care_diagnoses.map((chronicCareDiagnoses) => {
        if (!this.props.concepts[chronicCareDiagnoses.value]) {
          this.props.dispatch(conceptActions.fetchConcepts([chronicCareDiagnoses.value]));
        }
      })
    }
    this.updateChronicCareDiagnoses()
  }

  componentDidUpdate(prevProps) {
    if (Object.keys(this.props.concepts).length !== Object.keys(prevProps.concepts).length) {
      this.updateChronicCareDiagnoses();
    }
  }

  updateChronicCareDiagnoses() {
    this.props.selectedPatient.chronic_care_diagnoses && this.props.selectedPatient.chronic_care_diagnoses.map(chronicCareDiagnoses => {
      const concept = this.props.concepts[chronicCareDiagnoses.value];
      const isChronicCareDiagnosesInState = this.state.chronicCareDiagnoses.find(diagnosis => diagnosis.display === concept.display)
      if (concept && concept.display && !isChronicCareDiagnosesInState) {
        this.setState({ chronicCareDiagnoses: [...this.state.chronicCareDiagnoses, {display: concept.display, date: chronicCareDiagnoses.date}] }) 
      }
    })
  }
  
  renderChronicCareDiagnoses() {
    if (this.state.chronicCareDiagnoses.length > 0) {

    return this.state.chronicCareDiagnoses.map((chronicCareDiagnoses, index) => {
      return (
        <ul
          key={index}
          style={{ paddingInlineStart: '20px' }}
        >
          <span>
            <b>{chronicCareDiagnoses.display} </b>
            since
            <em> {format(startOfDay(chronicCareDiagnoses.date), 'DD MMM YYYY')}</em>
          </span>
        </ul>
      );
    });
    } else {
      return (<b>No Chronic Care Diagnosis known</b>)
    }
  }

  render() {
    return (
      <div>
        <h4><u>Diagnoses</u></h4>
        <span>
          <li>{this.renderChronicCareDiagnoses()}</li>
        </span>
        <br />
      </div>
    );
  }
}

ChronicCareDiagnoses.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    selectedPatient: selectors.getSelectedPatientFromStore(state),
    concepts: selectors.getConcepts(state)
  };
};

export default connect(mapStateToProps)(ChronicCareDiagnoses);
