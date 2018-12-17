import React from "react";
import {
  Dropdown,
  FieldInput
} from '@openmrs/react-components';
import './screeningFilters.css';

let ScreeningFilters = props => (
  <div className="queue-filters">
    <div className="identifier-filter-container">
      <div>ID search:</div>
      <span className='identifier-filter'>
        <Dropdown
          dropDownStyle={{
            border: '1px solid black'
          }}
          list={['mock-ID-1','mock-ID-2']} 
          placeholder="mock-ID-0"
        />
        <span>-</span>
        <FieldInput />
        <span>-</span>
        <Dropdown
          dropDownStyle={{
            border: '1px solid black'
          }}
          placeholder="mock-ID-0"
        />
      </span>
    </div>
  </div>
);

export default ScreeningFilters;
