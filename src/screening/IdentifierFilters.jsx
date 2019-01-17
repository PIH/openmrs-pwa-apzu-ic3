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
    this.handleSearchClick = this.handleSearchClick.bind(this);

    this.state = {
      firstIdentifierSearchValue: '',
      secondIdentifierSearchValue: '',
      thirdIdentifierSearchValue: '',
      patientIdentifier: '',
      searchValue: '',
      currentLocationPrefix: this.getCurrentLocationPrefix()
    };
  }

  handleUndefinedValues = (value, defaultValue) => typeof value === 'undefined' ? defaultValue : value;

  handleSearch(field, value, location) {
    const { firstIdentifierSearchValue, secondIdentifierSearchValue, thirdIdentifierSearchValue } = this.state;
    let first, second, third, searchValue;
    const { searchType } = this.props;

    if (location === 'first') {
      first = this.handleUndefinedValues(value, '');
      searchValue = `${first}-${secondIdentifierSearchValue}-${thirdIdentifierSearchValue}`;
      this.setState({
        firstIdentifierSearchValue : this.handleUndefinedValues(value, ''),
        searchValue,
      });
    } else if (location === 'second') {
      second = this.handleUndefinedValues(value, '');
      searchValue = `${firstIdentifierSearchValue}-${second}-${thirdIdentifierSearchValue}`;
      this.setState({
        secondIdentifierSearchValue: this.handleUndefinedValues(value, ''),
        searchValue,
      });
      
    } else if (location === 'third') {
      third = this.handleUndefinedValues(value, '');
      searchValue = `${firstIdentifierSearchValue}-${secondIdentifierSearchValue}-${third}`;
      this.setState({
        thirdIdentifierSearchValue: this.handleUndefinedValues(value, ''),
        searchValue
      });
    }

    if ( searchType !== 'server') {
      this.props.handleSearchChange(searchValue.replace(/-/g, ''));
    }
  }

  handleSearchClick(e) {
    e.preventDefault();
    const { searchType } = this.props;
    const { searchValue } = this.state;
    if (searchType === 'server') {
      this.props.handleSearchChange(formatIdentifier(searchValue));
    } else {
      this.props.handleSearchChange(searchValue.replace(/-/g, ''));
    }
  }

  secondIdentifierSearchValueClear() {
    this.handleSearch(null, '', 'second');
  }

  handleTextInputSearch(e) {
    this.handleSearch(null, e.target.value, 'second');
  }

  getLocationsPrefix = () => {
    const { locations } = this.props;
    const addedLocations = [];
    if (locations && locations.length > 0) {
      // eslint-disable-next-line
      locations.map(location => {
        if (location.attributes && location.attributes.length > 0) {
          // eslint-disable-next-line
          location.attributes.map(attribute => {
            if (attribute.attributeType.uuid === LOCATION_CODE_UUID) {
              addedLocations.push(attribute.value);
            }
          });
        }
      });
    };
    if (this.getCurrentLocationPrefix()[0]) {
      addedLocations.unshift(this.getCurrentLocationPrefix()[0]);
    }
    return [...new Set(addedLocations)];
  };

  getCurrentLocationPrefix() {
    const { locations, currentLocation } = this.props;
    if (locations && locations.length > 0) {
      let location = locations.filter(location => location.uuid === currentLocation.uuid)[0];
      if (location.attributes && location.attributes.length > 0) {
        // eslint-disable-next-line
        return location.attributes.map(attribute => {
          if (attribute.attributeType.uuid === LOCATION_CODE_UUID) {
            return attribute.value;
          }
        });
      } else {
        return [];
      }
    } else {
      return [];
    }
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
              list={this.getLocationsPrefix()}
              placeholder=" "
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
              placeholder=" "
            />
            <button
              className="search-button"
              onClick={this.handleSearchClick}
            >search</button>
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
