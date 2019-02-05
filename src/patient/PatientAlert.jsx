import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Well } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectors } from '@openmrs/react-components';
import './styles/patient-alert.css';


const formatEnrollmentText = (text) => {
  let formattedText = text;
  const splittedText = text.split(':');
  const splittedItems = splittedText.length;
  if (splittedItems > 1) {
    formattedText = splittedText[1].trim();
  }
  return formattedText;
}

const getAlertStatus = (alertName) => {
  if (alertName.includes('critical')) return 'critical';
  if (alertName.includes('abnormal')) return 'abnormal';
};

const orderAlerts = (patientAlerts) => {
  const criticalAlerts = patientAlerts.filter(alert => alert.name.includes('critical'));
  const abnormalAlerts = patientAlerts.filter(alert => alert.name.includes('abnormal'));
  const validAlerts = criticalAlerts.concat(abnormalAlerts);
  const alerts = validAlerts.map((alert) => {
    return {
      ...alert,
      status: getAlertStatus(alert.name)
    };
  })
  
  return {
    count: alerts.length,
    criticalCount: criticalAlerts.length,
    abnormalCount: abnormalAlerts.length,
    alerts
  }
}

class PatientAlert extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dropdownState: 'closed'
    };
    this.handleExpandAlert = this.handleExpandAlert.bind(this);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
  }

  handleExpandAlert(e) {
    e.preventDefault();
    this.setState({
      dropdownState: 'open'
    });
  }

  handleCloseAlert(e) {
    e.preventDefault();
    this.setState({
      dropdownState: 'closed'
    });
  }

  getPatientAlertClassName() {
    const { dropdownState } = this.state;
    return `patient-alert ${dropdownState}`;
  }

  render () {
    if ((typeof this.props.patient !== 'undefined')
        && this.props.patient !== null
        && (typeof this.props.patient.alert !== 'undefined')
        && this.props.patient.alert !== null
    ) {
      const patientAlerts = orderAlerts(this.props.patient.alert);
      const { dropdownState } = this.state;
      const isClosed = dropdownState === "closed";
      const isOpen = dropdownState === "open";
      if (patientAlerts.count < 1) {
        return null;
      } else {
        return (
          <div className={this.getPatientAlertClassName()}>
            <Well bsSize="large">
              <div className="alert-summary">
                <span className="alert-icon">
                  <FontAwesomeIcon
                    icon="exclamation-triangle"
                    size="lg"
                  />
                </span>
                <span className="alert-count">{patientAlerts.count} ALERT(S)</span>
                <span>{patientAlerts.criticalCount} Critical Result,</span>
                <span>{patientAlerts.abnormalCount} Abnormal Result</span>
                {isClosed &&
                  <span
                    className="alert-dropdown"
                    onClick={this.handleExpandAlert}
                  >
                    <FontAwesomeIcon
                      icon="caret-down"
                      size="lg"
                    />
                  </span>
                }
                {isOpen &&
                  <span
                    className="alert-dropdown-close"
                    onClick={this.handleCloseAlert}
                  >
                    <FontAwesomeIcon
                      icon="times"
                      size="lg"
                    />
                  </span>
                }
              </div>
              {isOpen &&
                <div className="alert-items">
                  {patientAlerts.alerts.map((alert, index) => {
                    return (
                      <div
                        className="alert-item"
                        key={index}
                      >
                        <span className={`${alert.status}-alert`}>{alert.status}: </span>
                        <span className="alert-description">{alert.alert} </span>
                        <span>{formatEnrollmentText(alert.action)} </span>
                      </div>
                    )
                  })
                  }
                </div>
              }
            </Well>
          </div>
        );
      }
    }
    return null;
  }
};

export default connect(state => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(PatientAlert);

