import React from "react";
import {
  Dropdown,
} from '@openmrs/react-components';
import { FormControl } from 'react-bootstrap';
import './IdentifierFilters.css';
import { PATIENT_IDENTIFIERS_PREFIX, PATIENT_IDENTIFIERS_SUFFIX } from '../constants';

class ScreeningFilters extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleTextInputSearch = this.handleTextInputSearch.bind(this);

    this.state = {
      firstIdentifierSearchValue: '',
      secondIdentifierSearchValue: '',
      thirdIdentifierSearchValue: ''
    };
  }

  handleUndefinedValues = (value, defaultValue) => typeof value === 'undefined' ? defaultValue : value;

  handleSearch(field, value, location) {
    const { firstIdentifierSearchValue, secondIdentifierSearchValue, thirdIdentifierSearchValue } = this.state;
    let first, second, third, searchValue;

    if (location === 'first') {
      first = this.handleUndefinedValues(value, '');
      this.setState({ firstIdentifierSearchValue : this.handleUndefinedValues(value, '') });
      searchValue = `${first}${secondIdentifierSearchValue}${thirdIdentifierSearchValue}`;
    } else if (location === 'second') {
      second = this.handleUndefinedValues(value, '');
      this.setState({ secondIdentifierSearchValue: this.handleUndefinedValues(value, '') });
      searchValue = `${firstIdentifierSearchValue}${second}${thirdIdentifierSearchValue}`;
    } else if (location === 'third') {
      third = this.handleUndefinedValues(value, '');
      this.setState({ thirdIdentifierSearchValue: this.handleUndefinedValues(value, '') });
      searchValue = `${firstIdentifierSearchValue}${secondIdentifierSearchValue}${third}`;
    }

    this.props.handleSearchChange(searchValue);
  }

  handleTextInputSearch(e) {
    this.handleSearch(null, e.target.value, 'second');
  }

  render() {
    return (
      <div className="queue-filters">
        <div className="identifier-filter-container">
          <div>ID search:</div>
          <span className='identifier-filter'>
            <Dropdown
              dropDownStyle={{
                border: '1px solid black'
              }}
              handleSelect={(field, value) => this.handleSearch(field, value, 'first')} 
              list={PATIENT_IDENTIFIERS_PREFIX}
              placeholder="select ID"
            />
            <span>-</span>
            <FormControl
              onChange={this.handleTextInputSearch}
              type="text"
              value={this.state.secondIdentifierSearchValue}
            />  
            <span>-</span>
            <Dropdown
              dropDownStyle={{
                border: '1px solid black'
              }}
              handleSelect={(field, value) => this.handleSearch(field, value, 'third')} 
              list={PATIENT_IDENTIFIERS_SUFFIX} 
              placeholder="select ID"
            />
          </span>
        </div>
      </div>
    );
  }
};

export default ScreeningFilters;
