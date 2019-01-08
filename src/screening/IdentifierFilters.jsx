import React from "react";
import { connect } from "react-redux";
import {
  Dropdown,
} from '@openmrs/react-components';
import { FormControl, Glyphicon } from 'react-bootstrap';
import './IdentifierFilters.css';
import { LOCATION_CODE_UUID, PATIENT_IDENTIFIERS_SUFFIX } from '../constants';

const formatIdentifier = (identifier) => {
  const terms = identifier.split('-');
  let query = identifier;
  if (terms.length > 2) {
    query = `${terms[0]} ${terms[1].replace(/^0+/, '')} ${terms[2]}`;
  } else {
    query = `${terms[0]} ${terms[1].replace(/^0+/, '')}`;
  }
  return query;
};

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
    const { searchType } = this.props;

    if (location === 'first') {
      first = this.handleUndefinedValues(value, '');
      this.setState({ firstIdentifierSearchValue : this.handleUndefinedValues(value, '') });
      searchValue = `${first}${secondIdentifierSearchValue}${thirdIdentifierSearchValue}`;
      if (searchType !== 'server') {
        this.props.handleSearchChange(searchValue);
      }
    } else if (location === 'second') {
      second = this.handleUndefinedValues(value, '');
      this.setState({ secondIdentifierSearchValue: this.handleUndefinedValues(value, '') });
      searchValue = `${firstIdentifierSearchValue}${second}${thirdIdentifierSearchValue}`;
      if (searchType === 'server') {
        return this.props.handleSearchChange(formatIdentifier(`${firstIdentifierSearchValue}-${second}`));
      } else {
        this.props.handleSearchChange(searchValue);
      }
    } else if (location === 'third') {
      third = this.handleUndefinedValues(value, '');
      this.setState({ thirdIdentifierSearchValue: this.handleUndefinedValues(value, '') });
      searchValue = `${firstIdentifierSearchValue}${secondIdentifierSearchValue}${third}`;
      if (searchType === 'server') {
        return this.props.handleSearchChange(formatIdentifier(`${firstIdentifierSearchValue}-${secondIdentifierSearchValue}-${third}`));
      } else {
        this.props.handleSearchChange(searchValue);
      }
    }
  }

  secondIdentifierSearchValueClear() {
    this.handleSearch(null, '', 'second');
  }

  handleTextInputSearch(e) {
    this.handleSearch(null, e.target.value, 'second');
  }

  getLocationsPrefix = (locations) => {
    const addedLocations = [];
    if (locations && locations.length > 0) {
      // eslint-disable-next-line
      locations.map(location => {
        if (location.attributes.length > 0) {
          // eslint-disable-next-line
          location.attributes.map(attribute => {
            if (attribute.attributeType.uuid === LOCATION_CODE_UUID) {
              addedLocations.push(attribute.value);
            }
          });
        }
      });
    };
    return addedLocations;
  };

  render() {
    const { searchType, locations } = this.props;
    let secondIdentifierDisabled = false;
    let thirdIdentifierDisabled = false;
    if (searchType === 'server') {
      secondIdentifierDisabled = this.state.firstIdentifierSearchValue === '';
      thirdIdentifierDisabled = this.state.secondIdentifierSearchValue === '';
    }

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
              list={this.getLocationsPrefix(locations)}
              placeholder=" "
            />
            <span>-</span>
            <div className="identifier-filter-number-input-container">
              <FormControl
                className="identifier-filter-number-input"
                disabled={secondIdentifierDisabled}
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
              disabled={thirdIdentifierDisabled}
              dropDownStyle={{
                border: '1px solid black',
                height: '30px',
                textAlignLast: 'center',
                textAlign: 'center',
              }}
              handleSelect={(field, value) => this.handleSearch(field, value, 'third')} 
              list={PATIENT_IDENTIFIERS_SUFFIX} 
              placeholder=" "
            />
            <button className="search-button">search</button>
          </span>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    locations: state.openmrs.metadata.locations
  };
};

export default connect(mapStateToProps)(ScreeningFilters);
