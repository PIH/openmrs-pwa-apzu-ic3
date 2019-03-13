import React from "react";
import { connect } from "react-redux";
import {
  Dropdown
} from '@openmrs/react-components';
import { FormControl, Glyphicon } from 'react-bootstrap';
import './IdentifierFilters.css';
import { PATIENT_IDENTIFIERS_SUFFIX } from '../constants';
import utils from '../utils';

const reformat = (n) => ("0000" + n).slice(-4);

const formatIdentifier = (identifier) => {
  const terms = identifier.split('-');
  const filteredTerms = terms.filter((term) => term !== 'undefined' && term !== "");
  const numberOfTerms = filteredTerms.length;
  let query = identifier;
  if (numberOfTerms === 1) {
    query = `${filteredTerms[0]} `;
  }
  if (numberOfTerms === 2) {
    query = `${filteredTerms[0]} ${filteredTerms[1].replace(/^0+/, '')}`;
  }

  if (numberOfTerms === 3) {
    query = `${filteredTerms[0]} ${filteredTerms[1].replace(/^0+/, '')} ${filteredTerms[2]}`;
  }
  return query;
};

class ScreeningFilters extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.secondIdentifierSearchValueClear = this.secondIdentifierSearchValueClear.bind(this);
    this.handleTextInputSearch = this.handleTextInputSearch.bind(this);
    const currentLocationPrefix = utils.getCurrentLocationPrefix(props.locations, props.currentLocation);
    const identifier = props.value.split(" ");
    const locationPrefix = currentLocationPrefix[0] ? currentLocationPrefix[0] : '';

    this.state = {
      firstIdentifierSearchValue: props.searchType === 'server' ? locationPrefix : '',
      secondIdentifierSearchValue: identifier[1] ? reformat(identifier[1]) : '',
      thirdIdentifierSearchValue: identifier[2] ? identifier[2] : '',
      patientIdentifier: '',
      searchValue: '',
    };
  }

  handleUndefinedValues = (value, defaultValue) => typeof value === 'undefined' ? defaultValue : value;

  handleSearch(field, value, location) {
    const customMatchSorterConfigs = { threshold: 3 };
    const { firstIdentifierSearchValue, secondIdentifierSearchValue, thirdIdentifierSearchValue } = this.state;
    let first, second, third, searchValue;
    const { searchType } = this.props;

    if (location === 'first') {
      first = this.handleUndefinedValues(value, '');
      searchValue = `${first}${secondIdentifierSearchValue && '-'}${secondIdentifierSearchValue}${thirdIdentifierSearchValue && '-'}${thirdIdentifierSearchValue}`;
      this.setState({
        firstIdentifierSearchValue : this.handleUndefinedValues(value, ''),
        searchValue,
      });
    } else if (location === 'second') {
      second = this.handleUndefinedValues(value, '');
      searchValue = `${firstIdentifierSearchValue}${firstIdentifierSearchValue && '-'}${second}${thirdIdentifierSearchValue && '-'}${thirdIdentifierSearchValue}`;
      this.setState({
        secondIdentifierSearchValue: this.handleUndefinedValues(value, ''),
        searchValue,
      });
      
    } else if (location === 'third') {
      third = this.handleUndefinedValues(value, '');
      searchValue = `${firstIdentifierSearchValue}${secondIdentifierSearchValue && '-'}${secondIdentifierSearchValue}${third && '-'}${third}`;
      this.setState({
        thirdIdentifierSearchValue: this.handleUndefinedValues(value, ''),
        searchValue
      });
    }
    
    if (searchType === 'server') {
      this.props.handleSearchChange(formatIdentifier(searchValue));
    } else {
      this.props.handleSearchChange(searchValue, customMatchSorterConfigs);
    }
  }

  secondIdentifierSearchValueClear() {
    this.handleSearch(null, '', 'second');
  }

  handleTextInputSearch(e) {
    this.handleSearch(null, e.target.value, 'second');
  }



  render() {
    const { locations, currentLocation, searchType } = this.props;
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
              dropdownValue={searchType === 'server' ? this.state.firstIdentifierSearchValue : undefined}
              handleSelect={(field, value) => this.handleSearch(field, value, 'first')} 
              list={utils.getLocationsPrefix(locations, currentLocation)}
              placeholder=" "
            />
            <span>-</span>
            <div className="identifier-filter-number-input-container">
              <FormControl
                className="identifier-filter-number-input"
                onChange={this.handleTextInputSearch}
                onKeyPress={this.props.onKeyPress}
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
              dropdownValue={searchType === 'server' ? this.state.thirdIdentifierSearchValue : undefined}
              handleSelect={(field, value) => this.handleSearch(field, value, 'third')} 
              list={PATIENT_IDENTIFIERS_SUFFIX} 
              onKeyPress={this.props.onKeyPress}
              placeholder=" "
            />
          </span>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    locations: state.openmrs.metadata.locations,
    currentLocation: state.openmrs.session.sessionLocation
  };
};

export default connect(mapStateToProps)(ScreeningFilters);
