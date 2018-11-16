import React from 'react';
import { connect } from 'react-redux';
import IdleTimer from 'react-idle-timer';
import { SESSION_TIMEOUT } from  '../constants';

class UserSession extends React.Component {

  constructor (props) {
    super(props);
    this.idleTimer = null;
    this.state = {
      timeout: SESSION_TIMEOUT,
      remaining: null,
      isIdle: false,
      lastActive: null,
      elapsed: null
    };
    // Bind event handlers and methods
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);
    this.reset = this._reset.bind(this);
    this.pause = this._pause.bind(this);
    this.resume = this._resume.bind(this);
  }

  componentDidMount () {
    this.setState({
      remaining: this.idleTimer.getRemainingTime(),
      lastActive: this.idleTimer.getLastActiveTime(),
      elapsed: this.idleTimer.getElapsedTime()
    });

    setInterval(() => {
      this.setState({
        remaining: this.idleTimer.getRemainingTime(),
        lastActive: this.idleTimer.getLastActiveTime(),
        elapsed: this.idleTimer.getElapsedTime()
      });
    }, 60000);
  }

  render () {
    return (
      <IdleTimer
        ref={ref => { this.idleTimer = ref }}
        onActive={this.onActive}
        onIdle={this.onIdle}
        timeout={this.state.timeout}
        startOnLoad>
      </IdleTimer>
    );
  }

  _onActive () {
    this.setState({ isIdle: false });
  }

  _onIdle () {
    this.setState({ isIdle: true });
    window.location.href = '#/logout';
  }

  _reset () {
    this.idleTimer.reset();
  }

  _pause () {
    this.idleTimer.pause();
  }

  _resume () {
    this.idleTimer.resume();
  }
}

export default connect()(UserSession);
