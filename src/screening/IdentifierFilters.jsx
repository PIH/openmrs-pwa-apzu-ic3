import React from "react";
import {
  Dropdown,
} from '@openmrs/react-components';
import { FormControl, Glyphicon } from 'react-bootstrap';
import './IdentifierFilters.css';
import { PATIENT_IDENTIFIERS_PREFIX, PATIENT_IDENTIFIERS_SUFFIX } from '../constants';

class ScreeningFilters extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.secondIdentifierSearchValueClear = this.secondIdentifierSearchValueClear.bind(this);
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

  secondIdentifierSearchValueClear() {
    this.setState({ secondIdentifierSearchValue: '' });
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
                border: '1px solid black',
                height: '30px',
                textAlignLast: 'center',
                textAlign: 'center',
              }}
              handleSelect={(field, value) => this.handleSearch(field, value, 'first')} 
              list={PATIENT_IDENTIFIERS_PREFIX}
              placeholder="-"
            />
            <span>-</span>
            <div className="identifier-filter-number-input-container">
              <FormControl
                className="identifier-filter-number-input"
                onChange={this.handleTextInputSearch}
                type="number"
                value={this.state.secondIdentifierSearchValue}
              />  
              <Glyphicon 
                className="right-remove-sign-icon"
                glyph="remove-sign" 
                onClick={this.secondIdentifierSearchValueClear}
              />
            </div>
            <span>-</span>
            <Dropdown
              dropDownStyle={{
                border: '1px solid black',
                height: '30px',
                textAlignLast: 'center',
                textAlign: 'center',
              }}
              handleSelect={(field, value) => this.handleSearch(field, value, 'third')} 
              list={PATIENT_IDENTIFIERS_SUFFIX} 
              placeholder="-"
            />
          </span>
        </div>
      </div>
    );
  }
};

export default ScreeningFilters;
