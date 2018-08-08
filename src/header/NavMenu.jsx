import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

class NavMenu extends React.Component {

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {

    const { anchorEl } = this.state;


    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'nav-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
          aria-label="Menu">
          <MenuIcon />
        </IconButton>

        <Menu
          id="nav-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          <Link to="/">
            <MenuItem onClick={this.handleClose}>
              Home
            </MenuItem>
          </Link>
          <Link to="/searchPatient">
            <MenuItem onClick={this.handleClose}>
              Search Patient
            </MenuItem>
          </Link>
          <Link to="/checkin/checkInTabs">
            <MenuItem onClick={this.handleClose}>
              Check-In
            </MenuItem>
          </Link>
          <Link to="/screening/bloodPressure/queue">
            <MenuItem onClick={this.handleClose}>
              Blood Pressure
            </MenuItem>
          </Link>
          <Link to="/screening/nutrition/queue">
            <MenuItem>
              Nutrition
            </MenuItem>
          </Link>
          <Link to="/screening/nurse/queue">
            <MenuItem onClick={this.handleClose}>
              Nurse
            </MenuItem>
          </Link>
        </Menu>
      </div>
    );
  }
}

export default NavMenu;
