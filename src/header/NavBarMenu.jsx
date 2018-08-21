import React from "react";
import '../assets/css/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown, MenuItem } from 'react-bootstrap';


class NavBarMenu extends React.Component {

  render(){
    var page_path_array = Object.keys(this.props.pageOptions);
    var index_of_current_page = page_path_array.indexOf(this.props.pathname);
    page_path_array.splice(index_of_current_page, 1);
    return(
      <NavDropdown
        title={this.props.title}
        id="dropdown"
        noCaret={this.props.noCaret}
      >
        {page_path_array.map( path => (
          <MenuItem key={path} href={"#" + path}>
            <FontAwesomeIcon icon={this.props.pageOptions[path].icon} size="lg" id="navItemIcon"/>
            {this.props.pageOptions[path].display}
            </MenuItem>
        ))}
      </NavDropdown>
    );
  }
}

export default NavBarMenu;
